from src.server_functions import *

# Unit Test 1
def verify_pc_connection():
    print('running pinecone connection unit test')
    if pc_index.describe_index_stats() != None:
        print('passed pinecone connection unit test')
        return True
    else:
        print('failed pinecone connection unit test')
        return False
# Unit Test 2
def verify_mongodb_records_connection():
    print('Unit Test 2')
    print('running mongo db records connection unit test')
    if mongodb_records.count_documents({}) != None:
        print('passed mongo db records connection unit test')
        return True
    else:
        print('failed mongo db records connection unit test')
        return False
# Unit Test 3
def verify_mongodb_matches_connection():
    print('Unit Test 3')
    print('running mongo db matches connection unit test')
    if mongodb_record_matches.count_documents({}) != None:
        print('passed mongo db matches connection unit test')
        return True
    else:
        print('failed mongo db matches connection unit test')
        return False

# Unit Test 4
def verify_openai_connection():
    # funky behavior res and openAI api stuff in same block in collab to work
    #set vectorization model + verify chatGPT API connection
    res = client.embeddings.create(
        input=[
            "Sample document text goes here"
        ], model=MODEL
    )
    if res != None:
        print(res)
        return True
    else:
        print(res)
        return False

# Unit Test 5 - Create User
def create_two_users():
    user_test_1 = {
    "first_name": "Kyle",
    "last_name": "Reichow",
    "email": "kreichow@uncc.edu", # format of email must be first name initial and lastname full so Kyle Reichow becomes kreichow@uncc.edu
    "school_year": "junior", # either freshman, sophmore, junior, senior, super senior
    "user_datetime_created": datetime.datetime.now().isoformat(),
    "age": 21, # it's an Integer since in College typical collage age Range
    "gender": "male", # male, female, or non-binary
    "major": "Computer Science",
    "minor": "Mathematics",
    "bio": "Hi there! I'm a junior at UNC Charlotte, majoring in Computer Science and minoring in Mathematics. I'm passionate about coding and problem-solving, and I'm involved in the ACM and Cybersecurity Club on campus. In my free time, I enjoy playing video games and hiking with my dog, Buddy.",
    "user_likes": "coding, video games, hiking, dogs",
    "user_dislikes": "procrastination, traffic, rainy days",
    "hidden_likes": "sci-fi movies, pineapple on pizza",
    "hidden_dislikes": "public speaking, spicy food",
    "matches": [], # leave empty list
    "match_queue": [] # leave empty list
    }

    user_test_2 = {
    "first_name": "Emma",
    "last_name": "Thompson",
    "email": "ethompso@uncc.edu",
    "school_year": "senior",
    "user_datetime_created": datetime.datetime.now().isoformat(),
    "age": 22,
    "gender": "female",
    "major": "Business Administration",
    "minor": "Art History",
    "bio": "Hey there! I'm Emma, a senior at UNC Charlotte studying Business Administration with a minor in Art History. I'm involved in the Entrepreneurship Club and love exploring new business ideas. In my free time, I enjoy painting, reading, and trying out new restaurants with friends. I have a pet hamster named Nibbles.",
    "user_likes": "painting, reading, trying new foods, entrepreneurship",
    "user_dislikes": "early morning classes, crowded places, rude people",
    "hidden_likes": "romantic comedies, karaoke",
    "hidden_dislikes": "math, horror movies",
    "matches": [],
    "match_queue": []
    }
    user1 = create_record(user_test_1)
    user2 = create_record(user_test_2)
    if user1 and user2:
        return True
    else:
        return False

# Unit Test 6 - Fetch Two Users
def fetch_two_users():
  u1, u1_true = get_user_profile('kreichow@uncc.edu', True)
  u2, u2_true = get_user_profile('ethompso@uncc.edu', True)

  if u1_true and u2_true:
    return True
  else:
    return False

# Unit Test 7 - Edit Two Users
def edit_two_users():
  u1 = get_user_profile('kreichow@uncc.edu')
  u2 = get_user_profile('ethompso@uncc.edu')

  u1_hidden_dislikes_old = u1['hidden_dislikes']
  u2_hidden_dislikes_old = u2['hidden_dislikes']

  u1_new = u1
  u1_new['hidden_dislikes'] = 'public speaking, spicy food, Lobster'

  u2_new = u2
  u2_new['hidden_dislikes'] = 'math, horror movies, meat with bones'

  update_record(u1_new)
  update_record(u2_new)

  u1_new_fetched = get_user_profile('kreichow@uncc.edu')
  u2_new_fetched = get_user_profile('ethompso@uncc.edu')

  if u1_new_fetched['hidden_dislikes'] == u1_new['hidden_dislikes'] and u2_new_fetched['hidden_dislikes'] == u2_new['hidden_dislikes']:
    return True
  else:
    return False

# Unit Test 8 - Delete Two Users
def delete_two_users(debug = False):

  u1 = get_user_profile('kreichow@uncc.edu')
  u2 = get_user_profile('ethompso@uncc.edu')

  u1_delete_true = delete_record(u1, debug=debug)
  time.sleep(3)
  u2_delete_true = delete_record(u2, debug=debug)
  time.sleep(3)
  if u1_delete_true and u2_delete_true:
    return True
  else:
    return False

# Unit Test 9 - Match Multiple Users
def match_multiple_users():
  user_1 = {
    "first_name": "Emily",
    "last_name": "Johnson",
    "email": "ejohnson@uncc.edu",
    "school_year": "freshman",
    "user_datetime_created": datetime.datetime.now().isoformat(),
    "age": 18,
    "gender": "female",
    "major": "Biology",
    "minor": "Psychology",
    "bio": "Hey there! I'm a freshman at UNC Charlotte, and I'm so excited to be here. I'm majoring in Biology and minoring in Psychology because I'm passionate about understanding the natural world and the human mind. In my free time, I love reading, painting, and going for walks in the park.",
    "user_likes": "reading, painting, nature walks",
    "user_dislikes": "loud noises, early mornings, spiders",
    "hidden_likes": "baking, playing the guitar",
    "hidden_dislikes": "math, crowds",
    "matches": [],
    "match_queue": []
  }

  user_2 = {
      "first_name": "David",
      "last_name": "Lee",
      "email": "dlee@uncc.edu",
      "school_year": "freshman",
      "user_datetime_created": datetime.datetime.now().isoformat(),
      "age": 19,
      "gender": "male",
      "major": "Business Administration",
      "minor": "Economics",
      "bio": "What's up, everyone? I'm a freshman here at UNC Charlotte, and I'm pumped to start my journey in the business world. I'm majoring in Business Administration and minoring in Economics because I've always been interested in finance and entrepreneurship. In my free time, you can find me playing basketball, watching movies, or hanging out with friends.",
      "user_likes": "basketball, movies, hanging out with friends",
      "user_dislikes": "homework, traffic, slow internet",
      "hidden_likes": "cooking, dancing",
      "hidden_dislikes": "bugs, cold weather",
      "matches": [],
      "match_queue": []
  }

  user_3 = {
      "first_name": "Sophia",
      "last_name": "Garcia",
      "email": "sgarcia@uncc.edu",
      "school_year": "sophomore",
      "user_datetime_created": datetime.datetime.now().isoformat(),
      "age": 20,
      "gender": "non-binary",
      "major": "Graphic Design",
      "minor": "Art History",
      "bio": "Hi there! I'm a sophomore at UNC Charlotte, and I'm majoring in Graphic Design with a minor in Art History. I've always been passionate about art and design, and I love creating visually stunning pieces. In my free time, you can find me exploring new art museums, listening to music, or working on my latest design project.",
      "user_likes": "art, design, music",
      "user_dislikes": "negativity, clutter, monotony",
      "hidden_likes": "photography, writing poetry",
      "hidden_dislikes": "loud chewers, bad grammar",
      "matches": [],
      "match_queue": []
  }

  user_4 = {
      "first_name": "Michael",
      "last_name": "Thompson",
      "email": "mthompson@uncc.edu",
      "school_year": "sophomore",
      "user_datetime_created": datetime.datetime.now().isoformat(),
      "age": 19,
      "gender": "male",
      "major": "Mechanical Engineering",
      "minor": "Mathematics",
      "bio": "Hey there, it's Michael! I'm a sophomore studying Mechanical Engineering with a minor in Mathematics here at UNC Charlotte. I'm fascinated by how things work and love solving complex problems. When I'm not buried in textbooks, you can find me tinkering with machines, playing chess, or hitting the gym.",
      "user_likes": "problem-solving, chess, working out",
      "user_dislikes": "laziness, disorganization, small talk",
      "hidden_likes": "sci-fi books, video game development",
      "hidden_dislikes": "fake people, bad drivers",
      "matches": [],
      "match_queue": []
  }

  user_5 = {
      "first_name": "Olivia",
      "last_name": "Davis",
      "email": "odavis@uncc.edu",
      "school_year": "junior",
      "user_datetime_created": datetime.datetime.now().isoformat(),
      "age": 21,
      "gender": "female",
      "major": "English Literature",
      "minor": "Creative Writing",
      "bio": "Hello, everyone! I'm Olivia, a junior studying English Literature and Creative Writing at UNC Charlotte. I'm a passionate writer and avid reader, and I love getting lost in the worlds of books and stories. In my free time, you can find me writing poetry, attending open mic nights, or curled up with a good book.",
      "user_likes": "writing, reading, open mic nights",
      "user_dislikes": "procrastination, bad grammar, rude people",
      "hidden_likes": "slam poetry, anime",
      "hidden_dislikes": "mornings, awkward silences",
      "matches": [],
      "match_queue": []
  }

  user_6 = {
      "first_name": "Jacob",
      "last_name": "Brown",
      "email": "jbrown@uncc.edu",
      "school_year": "junior",
      "user_datetime_created": datetime.datetime.now().isoformat(),
      "age": 22,
      "gender": "male",
      "major": "Political Science",
      "minor": "History",
      "bio": "What's up, guys? I'm Jacob, a junior majoring in Political Science and minoring in History at UNC Charlotte. I'm passionate about understanding the world we live in and shaping it for the better. In my free time, you can find me debating with friends, volunteering for local campaigns, or catching up on current events.",
      "user_likes": "debating, volunteering, staying informed",
      "user_dislikes": "ignorance, apathy, close-mindedness",
      "hidden_likes": "playing guitar, hiking",
      "hidden_dislikes": "traffic, slow internet",
      "matches": [],
      "match_queue": []
  }

  user_7 = {
      "first_name": "Ava",
      "last_name": "Martinez",
      "email": "amartinez@uncc.edu",
      "school_year": "senior",
      "user_datetime_created": datetime.datetime.now().isoformat(),
      "age": 22,
      "gender": "female",
      "major": "Nursing",
      "minor": "Spanish",
      "bio": "Hi there! I'm Ava, a senior studying Nursing with a minor in Spanish at UNC Charlotte. I'm passionate about helping others and providing quality healthcare, and I can't wait to start my career as a nurse. In my free time, you can find me volunteering at local clinics, practicing yoga, or exploring new restaurants with friends.",
      "user_likes": "volunteering, yoga, trying new foods",
      "user_dislikes": "negativity, dishonesty, laziness",
      "hidden_likes": "dancing, traveling",
      "hidden_dislikes": "bad drivers, cold weather",
      "matches": [],
      "match_queue": []
  }

  user_8 = {
      "first_name": "William",
      "last_name": "Taylor",
      "email": "wtaylor@uncc.edu",
      "school_year": "senior",
      "user_datetime_created": datetime.datetime.now().isoformat(),
      "age": 23,
      "gender": "male",
      "major": "Finance",
      "minor": "Economics",
      "bio": "Hey there, I'm William, a senior majoring in Finance and minoring in Economics at UNC Charlotte. I'm fascinated by the world of finance and investments, and I can't wait to start my career in the financial industry. In my free time, you can find me analyzing stock trends, playing golf, or catching up on financial news.",
      "user_likes": "analyzing stocks, golf, financial news",
      "user_dislikes": "procrastination, bad investments, slow internet",
      "hidden_likes": "cooking, playing chess",
      "hidden_dislikes": "traffic, small talk",
      "matches": [],
      "match_queue": []
  }

  user_9 = {
    "first_name": "Sophia",
    "last_name": "Wilson",
    "email": "swilson@uncc.edu",
    "school_year": "super senior",
    "user_datetime_created": datetime.datetime.now().isoformat(),
    "age": 24,
    "gender": "female",
    "major": "Psychology",
    "minor": "Sociology",
    "bio": "Hey there! I'm Sophia, a super senior studying Psychology and Sociology at UNC Charlotte. I'm fascinated by the human mind and behavior, and I can't wait to start my career in counseling or social work. In my free time, you can find me volunteering at local mental health organizations, practicing mindfulness, or trying out new recipes.",
    "user_likes": "volunteering, mindfulness, cooking",
    "user_dislikes": "negativity, close-mindedness, unhealthy habits",
    "hidden_likes": "journaling, playing the piano",
    "hidden_dislikes": "gossip, procrastination",
    "matches": [],
    "match_queue": []
  }

  user_10 = {
      "first_name": "James",
      "last_name": "Anderson",
      "email": "janderson@uncc.edu",
      "school_year": "super senior",
      "user_datetime_created": datetime.datetime.now().isoformat(),
      "age": 25,
      "gender": "male",
      "major": "Computer Science",
      "minor": "Mathematics",
      "bio": "What's up, everyone? I'm James, a super senior majoring in Computer Science and minoring in Mathematics at UNC Charlotte. I'm passionate about coding and problem-solving, and I can't wait to start my career as a software engineer. In my free time, you can find me working on personal coding projects, playing video games, or hitting the gym.",
      "user_likes": "coding, video games, working out",
      "user_dislikes": "procrastination, bugs, slow internet",
      "hidden_likes": "sci-fi movies, playing guitar",
      "hidden_dislikes": "public speaking, bad coffee",
      "matches": [],
      "match_queue": []
  }

  create_record(user_1)
  create_record(user_2)
  create_record(user_3)
  create_record(user_4)
  create_record(user_5)
  create_record(user_6)
  create_record(user_7)
  create_record(user_8)
  create_record(user_9)
  create_record(user_10)

  time.sleep(15)

  u1 = get_user_profile(user_1['email'])
  generate_matches(u1, 1)
  time.sleep(25)
  u1 = get_user_profile(u1['email'])

  if len(u1['match_queue']) == 5: # 5 values in array
    return True
  else:
    print("length should be 5 not ", len(u1['match_queue']))
    return False

# Unit test 10 - make two users match
def two_users_want_to_match():
  #  '662681ef3a90203840c8bb2a', 'match_email': 'odavis@uncc.edu', 'match_owner_email': 'ejohnson@uncc.edu',
  # user_wants_to_match(user_test_2, "66118303d83bfa26c2373515")

  u1 = get_user_profile('ejohnson@uncc.edu')
  match_queue_id = u1['match_queue'][0]

  matched_object = get_matched_object(u1['match_queue'][0])


  u2 = get_user_profile(matched_object['match_email'])

  match_id = matched_object['match_id']


  user_wants_to_match(u1, match_queue_id)
  user_wants_to_match(u2, match_queue_id)

  u1 = get_user_profile('ejohnson@uncc.edu')

  if len(u1['matches']) == 0:
    return False

  matched_object_new = get_matched_object(u1['matches'][0])

  u2 = get_user_profile(matched_object_new['match_email'])

  if len(u2['matches']) == 0:
    return False

  if u1['matches'][0] == u2['matches'][0]:
    return True

  return False

# Unit Test 11 - Send Matched Users Text
def send_matched_users_text():
  ##send_match_text(user_test_2, '66117c7ed83bfa26c2373511', "hi")
  u1 = get_user_profile('ejohnson@uncc.edu')

  match_id = u1['matches'][0]

  matched_object = get_matched_object(match_id)

  u2 = get_user_profile(matched_object['match_email'])

  send_match_text(u1, match_id, "Hi!")
  time.sleep(2)
  send_match_text(u2, match_id, "Hy!")
  time.sleep(2)
  chat_log = matched_object['chat_text']
  time.sleep(2)
  get_chat_time = None

  for chat_object in chat_log:
    if chat_object["msg_text"] == 'Hy!':
        get_chat_time = chat_object["msg_datetime"]
        break

  delete_match_text(u2, match_id, get_chat_time, 'Hy!')
  time.sleep(2)
  send_match_text(u2, match_id, "*Hi!!!")

  return True

# Unit Test 12 - Delete User with matched object associated with them
def delete_user_with_match_test(debug=False):
  u1 = get_user_profile('ejohnson@uncc.edu')
  u1_delete_true = delete_record(u1, debug=debug)

  if u1_delete_true:
    return True
  else:
    return False

# Unit Test 13 - Delete Final users all tests passed
def delete_remaining_test_users():
  #u1 = get_user_profile('ejohnson@uncc.edu')
  u2 = get_user_profile('dlee@uncc.edu')
  u3 = get_user_profile('sgarcia@uncc.edu')
  u4 = get_user_profile('mthompson@uncc.edu')
  u5 = get_user_profile('odavis@uncc.edu')
  u6 = get_user_profile('jbrown@uncc.edu')
  u7 = get_user_profile('amartinez@uncc.edu')
  u8 = get_user_profile('wtaylor@uncc.edu')
  u9 = get_user_profile('swilson@uncc.edu')
  u10 = get_user_profile('janderson@uncc.edu')

  #delete_record(u1)
  delete_record(u2)
  delete_record(u3)
  delete_record(u4)
  delete_record(u5)
  delete_record(u6)
  delete_record(u7)
  delete_record(u8)
  delete_record(u9)
  delete_record(u10)

  return True


def run_unit_tests():
    passed = 0
    failed = 0

    ut1 = verify_pc_connection()
    if ut1:
        print('passed unit test 1')
        passed += 1
    else:
        failed += 1
    ut2 = verify_mongodb_records_connection()
    if ut2:
        print('passed unit test 2')
        passed += 1
    else:
        failed += 1
    ut3 = verify_mongodb_matches_connection()
    if ut3:
        print('passed unit test 3')
        passed += 1
    else:
        failed += 1

    ut4 = verify_openai_connection()
    if ut4:
        print('passed unit test 4')
        passed += 1
    else:
        failed += 1

    ut5 = create_two_users()
    if ut5:
        print('passed unit test 5')
        passed += 1
    else:
        failed += 1

    ut6 = fetch_two_users()
    if ut6:
        print('passed unit test 6')
        passed += 1
    else:
        failed += 1

    ut7 = edit_two_users()
    if ut7:
        print('passed unit test 7')
        passed += 1
    else:
        failed += 1

    ut8 = delete_two_users()
    if ut8:
        print('passed unit test 8')
        passed += 1
    else:
        failed += 1

    ut9 = match_multiple_users()
    if ut9:
        print('passed unit test 9')
        passed += 1
    else:
        failed += 1
    two_users_want_to_match

    ut10 = two_users_want_to_match()
    if ut10:
        print('passed unit test 10')
        passed += 1
    else:
        failed += 1
    ut11 = send_matched_users_text()
    if ut11:
        print('passed unit test 11')
        passed += 1
    else:
        failed += 1
    ut12 = delete_user_with_match_test()
    if ut12:
        print('passed unit test 12')
        passed += 1
    else:
        failed += 1
    ut13 = delete_remaining_test_users()
    if ut13:
        print('passed unit test 13')
        passed += 1
    else:
        failed += 1

    print("passed: ", passed)
    print("failed", failed)
    print("Total passed: " + str(passed) + " " + str(passed + failed))