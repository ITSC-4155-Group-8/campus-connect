import os
from dotenv import load_dotenv
load_dotenv()

# import regular expressions
import re
# objectID for mongodb
from bson import ObjectId
# import JSON for formatting
import json
# import datetime
import datetime
# openAI imports
from openai import OpenAI

from src.db import db, match_collection, user_data_collection
from src.pinecone import pc_index

client = OpenAI(api_key=os.getenv("OPENAI_KEY"))

# vectorization model
MODEL = "text-embedding-3-small"

# Function Name --- data_to_embed
# Description
'''
A function that is given a list of strings [String] it
will embed each string and return a list of an array of embeddings [embedding array]
example input ['test', 'test 2', ...]
example output [[0.4, 0.5, 0.6], [0.0, 0.4, 0.9], ....]
'''
def data_to_embed(embed_list):

  embedded_list = []

  for text in embed_list:
      # convert user_bio into a 1536 vectorized representation
      # this is the openAI chatGPT call
      res = client.embeddings.create(
        input=[
            text
        ], model=MODEL
      )
      # extract embeddings to a list
      embeds = [record.embedding for record in res.data]
      #print('embeds sucess') # uncomment to debug
      #print(embeds[0]) # it's a double array do [0] to get the array of embeddings
      embedded_list.append(embeds[0]) # adds array to array

  return embedded_list

# example code to test functionality of function
#example_test_embed = ['testing', 'testing 2', 'testing 3', 'testing 4']
#embedded_list = data_to_embed(example_test_embed)
#print(embedded_list)

# Function Name --- insert_user_into_pinecone_db
# Description
'''
A function that embeds the users information into the pinecone vectorized database

arguments:

  mongodb_user: JSON object of values added into mongodb, declared in create_record
  inserted_id: Int the object id associated with the mongodb record for the user
  embedded_list: list of arrays of embeddings see function data_to_embed
  list_of_pinecone_tags: a list of tags for the seperate embeddings
      The users data will be vecorized to the number of tags associated in the list
      currently list of pinecone tags looks like this
      ['user_bio', 'user_likes', 'user_dislikes', 'hidden_likes', 'hidden_dislikes']
      this means the user data will have 5 embedding records in the vectorized database
      and we tell them apart by the tags see the for loop below


      # NOTE values accepted into pinecone
      [NoneType, bool, date, datetime, dict, float, int, list, str]

'''

def insert_user_into_pinecone_db(mongodb_user, inserted_id, embedded_list, list_of_pinecone_tags):

  # grabs tags used in all vectorized records
  email = mongodb_user["email"]
  school_year = mongodb_user["school_year"] #tag
  age = mongodb_user["age"] # tag
  gender = mongodb_user["gender"] # tag
  major = mongodb_user["major"] #tag
  minor = mongodb_user["minor"] #tag
  bio = mongodb_user["bio"] # describes hobbies & pastimes

  for i, tag in enumerate(list_of_pinecone_tags):
    #print(i)
    #print(tag)
    # inset data as a vecorized representation into pinecone
    pc_index.upsert(
    vectors=[
      {"id": email, "values": embedded_list[i], # represents which data ['user_bio', user_likes'...ect]
       # adds associated tag
      "metadata": {"text_tag" : tag, "mongo_db_id" : inserted_id, "school_year" : school_year, "age": age, "gender" : gender, "major" : major, "minor" : minor}
      } # the number of vectors must match the number set in query
    ],
    namespace=tag # sets values in correct name spaces for query!
    )
    #print('sucess')
  #print('all values vectorized :)')

  # Function Name --- augment_data
# Description
'''
A helper function that organizes data correctly for the other functions in the create_record
function

returns three values
  inserted_id the mongodb id, this will be a tag for the pinecone db
  list_of_data_to_embed values to embed in vector space
  list_of_pinecone_tags tags for those values in vector space

  #NOTE they will be stored under different namespaces
  where the namespace is the same names in list_of_pinecone_tags

'''

def augment_data(insert_result, mongodb_user):

  email = mongodb_user["email"]
  school_year = mongodb_user["school_year"] #tag
  age = mongodb_user["age"] # tag
  gender = mongodb_user["gender"] # tag
  major = mongodb_user["major"] #tag
  minor = mongodb_user["minor"] #tag
  bio = mongodb_user["bio"] # describes hobbies & pastimes
  user_likes = mongodb_user["user_likes"]
  user_dislikes = mongodb_user["user_dislikes"]
  hidden_likes = mongodb_user["hidden_likes"]
  hidden_dislikes = mongodb_user["hidden_dislikes"]

  # grab inserted_id to add to pinecone_db
  inserted_id = str(insert_result)
  #print(inserted_id)
  # vectorize and store user data on pinecone_db

  # user bio embedding
  bio = school_year + " " + "age " + str(age) + " " + gender + " major " + major + " minor " + minor + " " + bio + " "

  # NOTE
  # names of values in list_of_data_to_embed must match value names in list_of_pinecone_tags
  list_of_data_to_embed = [bio, user_likes, user_dislikes, hidden_likes, hidden_dislikes]
  list_of_pinecone_tags = ['bio', 'user_likes', 'user_dislikes', 'hidden_likes', 'hidden_dislikes']

  return inserted_id, list_of_data_to_embed, list_of_pinecone_tags

# Function Name --- create_mongo_db_user
# Description
'''
  A helper function that that takes raw user JSON from website and
  formates it into a the usable version for the databases
'''
def create_mongo_db_user(user):

  # parse JSON into a dictionary
  user_dict = user
  first_name = user_dict["first_name"]
  last_name = user_dict["last_name"]
  email = user_dict["email"]
  user_datetime_created = user_dict["user_datetime_created"]
  school_year = user_dict["school_year"] #tag
  age = user_dict["age"] # tag
  gender = user_dict["gender"] # tag
  major = user_dict["major"] #tag

  minor = user_dict["minor"] #tag
  if minor == "":
    minor = "none"

  bio = user_dict["bio"] # describes hobbies & pastimes
  user_likes = user_dict["user_likes"]
  user_dislikes = user_dict["user_dislikes"]
  hidden_likes = user_dict["hidden_likes"]
  hidden_dislikes = user_dict["hidden_dislikes"]
  matches =  user_dict["matches"]
  match_queue =  user_dict["match_queue"]
  #
  #update the mongodb
  #filter_criteria = {"email": email}
  #checked_user = user_data_collection.find_one(filter_criteria)

  #if checked_user:
  # create mongodb user
  mongodb_user = {
    "first_name" : first_name,
    "last_name" : last_name,
    "email": email,
    "school_year" : school_year,
    "age" : age,
    "gender" : gender,
    "major" : major,
    "user_datetime_created" : user_datetime_created,
    "minor" : minor,
    "bio" : bio,
    "user_likes" : user_likes,
    "user_dislikes" : user_dislikes,
    "hidden_likes" : hidden_likes,
    "hidden_dislikes" : hidden_dislikes,
    # the matches object is empty on creation
    # matches contains a "_id" to a mached object
    "matches" : matches,
    "match_queue" : match_queue
  }


  return mongodb_user


# Function Name --- create_record
# Description
'''
  given a JSON input this function will create a record in the mongo_db and
  its vectorized representation in pinecone_db

  EXPECTED INPUT

  user = {
      "first_name" : "",
      "last_name" : "",
      "email": "",
      "school_year" : "", # tag
      "age" : "", # tag
      "gender" : "", # tag
      "major" : "", #tag
      "minor" : "", #tag
      "bio" : "",
      "user_likes" : "",
      "user_dislikes" : "",
      "hidden_likes" : "",
      "hidden_dislikes" : ""
  }

'''
def create_record(user):
  # creats the JSON format for a mongodb_user
  mongodb_user = create_mongo_db_user(user)
  # add user to mongodb
  insert_result = user_data_collection.insert_one(mongodb_user)
#  insert_result = user_data_collection.replace_one({ 'email': user['email'] }, user, upsert=True)
  #print(insert_result.inserted_id)
  insert_id = insert_result.inserted_id

  # get data augmented for use
  inserted_id, list_of_data_to_embed, list_of_pinecone_tags = augment_data(insert_id, mongodb_user)
  # embed data
  embedded_list = data_to_embed(list_of_data_to_embed)
  # add vectorized values to pinecone_db
  insert_user_into_pinecone_db(mongodb_user, inserted_id, embedded_list, list_of_pinecone_tags)
  #print('sucessfly created record in both data bases :)')

  return True

def update_record(user):

  mongodb_user = create_mongo_db_user(user)

  #update the mongodb
  filter_criteria = {"email": mongodb_user['email']}

  update_values = {
        "$set": {
        "school_year" : mongodb_user['school_year'], # tag
        "age" : mongodb_user['age'], # tag
        "gender" : mongodb_user['gender'], # tag
        "major" : mongodb_user['major'], #tag
        "minor" : mongodb_user['minor'], #tag
        "bio" : mongodb_user['bio'],
        "user_likes" : mongodb_user['user_likes'],
        "user_dislikes" : mongodb_user['user_dislikes'],
        "hidden_likes" : mongodb_user['hidden_likes'],
        "hidden_dislikes" : mongodb_user['hidden_dislikes']
        # Add more fields and values to update as needed
    }
  }

  user_data_collection.update_one(filter_criteria, update_values)
  # same code in create_record and named the same for understanding, all it does is it grabs the _id
  insert_result = user_data_collection.find_one(filter_criteria)
  # '_id': ObjectId('6609cc0a5097d9acf1f2e529')
  id = insert_result['_id']
  # get data augmented for use
  inserted_id, list_of_data_to_embed, list_of_pinecone_tags = augment_data(id, mongodb_user)
  # embed data
  embedded_list = data_to_embed(list_of_data_to_embed)
  # add vectorized values to pinecone_db
  insert_user_into_pinecone_db(mongodb_user, inserted_id, embedded_list, list_of_pinecone_tags)
  #print('sucessfly update record in both data bases :)')


# given a match id delete that match from the matched_user profile.
def delete_match(_id, debug=False):
    if debug:
      print('attempting to deleting id', _id)


    _id = ObjectId(_id)
    filter_criteria = {"_id" : _id}

    # gets local copy of match_object
    match_object = match_collection.find_one(filter_criteria)
    _id = str(_id)

    match_collection.delete_one(filter_criteria)
    if debug:
      print('deleting match object sucessful')

    if debug:
      print('finding match user')

    user_to_find = match_object['match_id']

    filter_criteria = {"_id" : ObjectId(user_to_find)}
    matched_user = user_data_collection.find_one(filter_criteria)
    if debug:
      print('found match user', matched_user)

    matches = matched_user['matches']
    match_queue = matched_user['match_queue']

    if debug:
      print('matched users matches and match_queued list')
      print(matches)
      print(match_queue)

    if debug:
      print('attempting to remove id from list')
    if _id in matches:
        if debug:
          print('removing id from match list', _id)
        matches.remove(_id)
    if _id in match_queue:
        if debug:
          print('removing id from match queue', _id)
        match_queue.remove(_id)

    if debug:
      print('remove id sucessful from local copys')
      print('local copy matches', matches)
      print('local copy match_queue', match_queue)
      print('attempting to update other user profile')

    filter_criteria = {"_id": ObjectId(user_to_find)}
    update_values = {
          "$set": {
          "matches" : matches,
          "match_queue" : match_queue
          # Add more fields and values to update as needed
      }
    }

    if debug:
      print('update values to send to record', update_values)
      print('updating the users matches')
    user_data_collection.update_one(filter_criteria, update_values)

    if debug:
      print('update sucessful')




def delete_record(user, debug=False):
  # parse user json into a dictionary
  mongodb_user = create_mongo_db_user(user)
  #delete user but also for the match queue in user, and maches lists in user,
  # delete those from the other profiles. that have those in them

  # delete data in pinecone db
  list_of_pinecone_tags = ['bio', 'user_likes', 'user_dislikes', 'hidden_likes', 'hidden_dislikes']

  if debug:
    print('deleting user vectors')

  for tag in list_of_pinecone_tags:
    pc_index.delete(ids=mongodb_user['email'], namespace=tag) # delete a value from database

  if debug:
    print('deleting user vectors sucess')

  if debug:
    print('User\'s match list', mongodb_user['matches'])
    print('User\'s match queue list', mongodb_user['match_queue'])

  if mongodb_user['matches']:

    if debug:
      print('attempting to delete items in matches list')

    for _id in mongodb_user['matches']:

      if debug:
        print('attempting to delete id', _id)

      delete_match(_id, debug=debug) # takes a matched object id

  if mongodb_user['match_queue']:

    if debug:
      print('attempting to delete items in match queue list')

    for _id in mongodb_user['match_queue']:

      if debug:
        print('attempting to delete id', _id)

      delete_match(_id, debug=debug)

  #update the mongodb
  if debug:
    print('deleting user from mongodb')

  filter_criteria = {"email": mongodb_user['email']}

  user_data_collection.delete_one(filter_criteria)

  return True

def sort_similar_users(data):
    sorted_data = []
    for d in data:
        for match in d['matches']:
            email = str(match['id'])
            mongo_db_id = str(match['metadata']['mongo_db_id'])
            score = float(match['score']) * 0.2  # counts for 20% of score

            email_exists = any(item['email'] == email for item in sorted_data)
            if not email_exists:
                sorted_data.append({'email': email, 'mongo_db_id': mongo_db_id, 'score': score})
            else:
                for item in sorted_data:
                    if item['email'] == email:
                        item['score'] += score
                        break

    sorted_data = sorted(sorted_data, key=lambda x: x['score'], reverse=True)
    #print(sorted_data)
    return sorted_data

# finds compatible people and returns a result of people with an openAI explanation of why they are compatible
#
'''
    Use to filter metadata

    $eq - Equal to (number, string, boolean)
    $ne - Not equal to (number, string, boolean)
    $gt - Greater than (number)
    $gte - Greater than or equal to (number)
    $lt - Less than (number)
    $lte - Less than or equal to (number)
    $in - In array (string or number)
    $nin - Not in array (string or number)
    $exists - Has the specified metadata field (boolean)

'''
def query_records(user, num):

  print('querying records')
  mongodb_user = create_mongo_db_user(user)
  email = mongodb_user['email']
  user_mongo_db = ''
  #print(email)

  list_of_pinecone_tags = ['bio', 'user_likes', 'user_dislikes', 'hidden_likes', 'hidden_dislikes']
  user_vectors = []
  # returns vectors for user and puts into an array
  for tag in list_of_pinecone_tags:
      pinecone_result = pc_index.fetch([email], namespace=tag)
      # print(pinecone_result)
      # pinecone_result returns an object, this is the parsed version only getting the vectors
      user_vectors.append(pinecone_result['vectors'][email]['values'])
      # note this is cheesed a bit here sloppy code
      user_mongo_db = pinecone_result['vectors'][email]['metadata']['mongo_db_id']

  #filter out already matched people with this
  # https://docs.pinecone.io/guides/data/filtering-with-metadata

  filters = {
      "id": {"$ne": email},
      "mongo_db_id": {"$ne": user_mongo_db}
  }

  # query the pinecone database
  similar_users = []
  for i, tag in enumerate(list_of_pinecone_tags):
    pc_results = pc_index.query(
      namespace=tag,
      vector=user_vectors[i],
      filter=filters,
      top_k=num, # this returns the most similar people from each vector
      include_values=False, # optional
      include_metadata=True
    )
    similar_users.append(pc_results)
  print('getting similar users')

  #print(similar_users)

  # now I have a list where it contains multiple users, 5 vectors per each user.
  # organize into a list of  [{email: '', mongo_db_id: '', score: ''}]

  # first index represents user with highest score, last least
  # but every user is this list has a metric that overlaps with the user who searched
  print('sorting similar users')
  sorted_users = sort_similar_users(similar_users)

  # now query mongodb

  # Extract IDs from matches as a list to query in mongoDB
  ids = [user['email'] for user in sorted_users]
  #print(ids)

  # search the mongodb
  query = {"email": {"$in": ids, "$ne": email}}
  # cursor contains a list of documents
  cursor = user_data_collection.find(query)

  list_of_compatible_people = []
  list_of_compatible_people_full = []
  # prepare for user privacy
  for document in cursor:
    list_of_compatible_people_full.append(document)
    user = {
      "school_year" : document['school_year'],
      "age" : document['age'],
      "gender" : document['gender'],
      "major" : document['major'],
      "minor" : document['minor'],
      "bio" : document['bio'],
      "user_likes" : document['user_likes'],
      "user_dislikes" : document['user_dislikes'],
      "hidden_likes" : document['hidden_likes'],
      "hidden_dislikes" : document['hidden_dislikes']
    }
    list_of_compatible_people.append(user)
  #print(list_of_compatible_people_full)
  #return
  #print(list_of_compatible_people)
  user_hidden = {
    "school_year": mongodb_user['school_year'],
    "age": mongodb_user['age'],
    "gender": mongodb_user['gender'],
    "major": mongodb_user['major'],
    "minor": mongodb_user['minor'],
    "bio": mongodb_user['bio'],
    "user_likes": mongodb_user['user_likes'],
    "user_dislikes": mongodb_user['user_dislikes'],
    "hidden_likes": mongodb_user['hidden_likes'],
    "hidden_dislikes": mongodb_user['hidden_dislikes']
  }

  print('getting list_of_compatible_people')
  results_list = []

  for i, item in enumerate(list_of_compatible_people):

    response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
    {"role": "system", "content": '''
      Given JSON information about USER_1 and USER_2 write a one paragraph response on why these two people
      would be compatible as friends. You are not allowed to talk about the ‘hidden_likes’, and ‘hidden_dislikes’
      JSON fields in your response but use them when calculating your compatibility_score, ranked 1 through 10.
      Format your response as JSON exactly like this and double check for errors
      {
        "compatibility_description" : “response goes here”,
        "compatibility_score" : “score 1-10 goes here”
      }

    '''},
    {"role": "user", "content": "USER_1 "+ str(user_hidden) +" USER_2 "+ str(item)},
    ],
    temperature=0,
    )

    result_text = response.choices[0].message.content
    result_text = re.sub(r'USER_1', mongodb_user['first_name'], result_text)
    result_text = re.sub(r'USER_2', list_of_compatible_people_full[i]['first_name'], result_text)
    result_JSON = json.loads(result_text)

    result_JSON['match_name'] = list_of_compatible_people_full[i]['first_name']
    result_JSON['match_id'] = str(list_of_compatible_people_full[i]['_id'])
    result_JSON['match_email'] = str(list_of_compatible_people_full[i]['email'])
    result_JSON['match_owner_email'] = mongodb_user['email']
    result_JSON['match_datetime'] = datetime.datetime.now().isoformat()
    result_JSON['chat_text'] = []
    result_JSON['owner_wants_match'] = False
    result_JSON['match_wants_match'] = False
    results_list.append(result_JSON)
    print(result_JSON)

  #for result in results_list:
  #  print(result)
  #  print()
  return results_list


  # now that the documents have been returned do a chat gpt call to write if these two people would be compatible friends


def create_matches(matches):

  match_ids = []

  for match_ppl in matches:
    insert_result = match_collection.insert_one(match_ppl)
    #print(insert_result.inserted_id)
    insert_id = insert_result.inserted_id
    match_ids.append(str(insert_id))

  return match_ids

def generate_matches(user, num):

  print('getting matches')
  matches = query_records(user, num)
  print('getting match ids')
  create_match_ids = create_matches(matches)

  mongodb_user = create_mongo_db_user(user)

  #update the mongodb owner
  filter_criteria = {"email": mongodb_user['email']}
  update_values = {
        "$set": {
        "match_queue" : create_match_ids
        # Add more fields and values to update as needed
    }
  }
  user_data_collection.update_one(filter_criteria, update_values)


  '''
  {'_id': ObjectId('662677c43a90203840c8bb21'),
  'compatibility_description': "text here",
   'compatibility_score': '8',
   'match_name': 'David',
   'match_id': '662677973a90203840c8bb18',
   'match_email': 'dlee@uncc.edu',
   'match_owner_email': 'ejohnson@uncc.edu',
   'match_datetime': '2024-04-22T14:44:09.515190',
   'chat_text': [],
   'owner_wants_match': False,
   'match_wants_match': False}
  '''
  for match_u in create_match_ids:
    # add records to the matched persons queue
    filter_criteria = {"_id" : ObjectId(match_u)}
    matched_user = match_collection.find_one(filter_criteria)
    print(matched_user)
    email = matched_user['match_email']
    match_id = matched_user['match_id']

    #new code
    matched_user = get_user_profile(email)
    matched_user['match_queue'].append(match_u)

    #update the mongodb matched user
    filter_criteria = {"_id" : ObjectId(match_id)}
    update_values = {
          "$set": {
          "match_queue" : matched_user['match_queue'] # match queue is a list how do I append to it
          # Add more fields and values to update as needed
      }
    }
    user_data_collection.update_one(filter_criteria, update_values)


def user_wants_to_match(user, match_queue_id):
  mongodb_user = create_mongo_db_user(user)
  #print('mongodb_user')
  #print(mongodb_user)
  filter_criteria = {"_id" : ObjectId(match_queue_id)}
  print('filter criteria')
  print(filter_criteria)
  print('the object for the database')
  print(match_collection)
  matched_object = match_collection.find_one(filter_criteria)
  print('matched object')
  print(matched_object)
  #print(matched_object)
  #if (matched_object['match_wants_match'] == True) and (matched_object['owner_wants_match'] == True):
  #    print('error already matched')
  #    return

  if mongodb_user['email'] == matched_object['match_owner_email'] and matched_object['owner_wants_match'] == False:
    matched_object['owner_wants_match'] = True
    update_values = {
        "$set": {
        "owner_wants_match" : matched_object['owner_wants_match']
        # Add more fields and values to update as needed
        }
    }
    match_collection.update_one(filter_criteria, update_values)
    #print('match owner wants to match is set to true')


  if mongodb_user['email'] == matched_object['match_email'] and matched_object['match_wants_match'] == False:
    matched_object['match_wants_match'] = True
    update_values = {
        "$set": {
        "match_wants_match" : matched_object['match_wants_match']
        # Add more fields and values to update as needed
        }
    }
    match_collection.update_one(filter_criteria, update_values)
    #print('match wants to match is set to true')


  #update matched object to the users involved in match
  if (matched_object['match_wants_match'] == True) and (matched_object['owner_wants_match'] == True):
    print('Updating the match list')
    # add matched id to the 'matched' and remove from 'queued_matches'
    if mongodb_user['email'] == matched_object['match_email']:
        print('updating the owner')
        #update the the match
        filter_criteria = {"_id" : ObjectId(matched_object['match_id'])}
        matched_user = user_data_collection.find_one(filter_criteria)
        matches = matched_user['matches']

        queued_matches = matched_user['match_queue']
        print('queued matched')
        print(queued_matches)

        matches.append(match_queue_id)
        queued_matches.remove(match_queue_id)
        update_values = {
          "$set": {
          "matches" : matches,
          "match_queue" : queued_matches
          # Add more fields and values to update as needed
          }
        }
        user_data_collection.update_one(filter_criteria, update_values)
        #print('match updated')

    if mongodb_user['email'] != matched_object['match_owner_email']:
        print('updating the match')
        #update the owner who matched
        filter_criteria = {"email" : matched_object['match_owner_email']}
        user_object = user_data_collection.find_one(filter_criteria)

        #print(user_object)
        matches_user = user_object['matches']
        queued_matches_user = user_object['match_queue']
        #print('matches')
        #print(matches_user)
        #print('queued_matches')
        #print(queued_matches_user)
        matches_user.append(match_queue_id)
        queued_matches_user.remove(match_queue_id)
        #print('updated values')
        #print(matches_user)
        #print(queued_matches_user)
        update_values = {
          "$set": {
          "matches" : matches_user,
          "match_queue" : queued_matches_user
          # Add more fields and values to update as needed
          }
        }
        user_data_collection.update_one(filter_criteria, update_values)
        #print('user updated')

def get_user_profile(email, debug = False):

  filter_criteria = {"email" : email}
  matched_object = user_data_collection.find_one(filter_criteria)

  mongodb_user = {
        "first_name" : matched_object['first_name'],
        "last_name" : matched_object['last_name'],
        "email": matched_object['email'],
        "school_year" : matched_object['school_year'],
        "age" : matched_object['age'],
        "gender" : matched_object['gender'],
        "major" : matched_object['major'],
        "user_datetime_created" : matched_object['user_datetime_created'],
        "minor" : matched_object['minor'],
        "bio" : matched_object['bio'],
        "user_likes" : matched_object['user_likes'],
        "user_dislikes" : matched_object['user_dislikes'],
        "hidden_likes" : matched_object['hidden_likes'],
        "hidden_dislikes" : matched_object['hidden_dislikes'],
        "matches" : matched_object['matches'],
        "match_queue" : matched_object['match_queue']
    }
  if debug:
    return mongodb_user, True
  else:
    #print(mongodb_user)
    return mongodb_user
  
def get_matched_object(match_id):

  filter_criteria = {"_id" : ObjectId(match_id)}
  matched_object = match_collection.find_one(filter_criteria)

  matched_object = {
    "match_name" : matched_object["match_name"],
    "match_email" : matched_object["match_email"],
    "match_id" : matched_object["match_id"],
    "match_owner_email" : matched_object["match_owner_email"],
    "match_datetime" : matched_object["match_datetime"],
    "compatibility_score" : matched_object["compatibility_score"],
    "compatibility_description" : matched_object["compatibility_description"],
    "chat_text" : matched_object["chat_text"], # [chat_object]
    "owner_wants_match": matched_object["owner_wants_match"],
    "match_wants_match": matched_object["match_wants_match"]
  }

  return matched_object

def send_match_text(user, match_id, message_string):

  mongodb_user = create_mongo_db_user(user)

  filter_criteria = {"_id" : ObjectId(match_id)}

  matched_object = match_collection.find_one(filter_criteria)

  chat_object = {
    "owner_email" : mongodb_user['email'],
    "match_email" : matched_object['match_email'],
    "msg_datetime" : datetime.datetime.now().isoformat(),
    "msg_text" : message_string,
  }

  chat = matched_object['chat_text']
  chat.append(chat_object)

  update_values = {
        "$set": {
        "chat_text" : chat
        # Add more fields and values to update as needed
        }
    }
  match_collection.update_one(filter_criteria, update_values)

def delete_match_text(user, match_id, msg_datetime, message_string):

  mongodb_user = create_mongo_db_user(user)

  filter_criteria = {"_id" : ObjectId(match_id)}

  matched_object = match_collection.find_one(filter_criteria)

  chat_log = matched_object['chat_text']

  for chat_object in chat_log:
    # Check if the msg_text attribute of the current chat object is equal to text_to_check
    if chat_object["msg_text"] == message_string and chat_object["msg_datetime"] == msg_datetime:
        chat_object["msg_text"] = 'Deleted'
        break

  update_values = {
        "$set": {
        "chat_text" : chat_log
        # Add more fields and values to update as needed
        }
    }
  match_collection.update_one(filter_criteria, update_values)