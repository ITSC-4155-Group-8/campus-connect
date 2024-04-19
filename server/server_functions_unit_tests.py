from server_functions import *

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
    "email": "kreichow@uncc.edu",
    "school_year": "junior",
    "user_datetime_created": datetime.datetime.now().isoformat(),
    "age": 21,
    "gender": "male",
    "major": "Computer Science",
    "minor": "Mathematics",
    "bio": "Hi there! I'm a junior at UNC Charlotte, majoring in Computer Science and minoring in Mathematics. I'm passionate about coding and problem-solving, and I'm involved in the ACM and Cybersecurity Club on campus. In my free time, I enjoy playing video games and hiking with my dog, Buddy.",
    "user_likes": "coding, video games, hiking, dogs",
    "user_dislikes": "procrastination, traffic, rainy days",
    "hidden_likes": "sci-fi movies, pineapple on pizza",
    "hidden_dislikes": "public speaking, spicy food",
    "matches": [],
    "match_queue": []
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

    
def run_unit_tests():
    passed = 0
    failed = 0

    ut1 = verify_pc_connection()
    if ut1:
        passed += 1
    else:
        failed += 1
    ut2 = verify_mongodb_records_connection()
    if ut2:
        passed += 1
    else:
        failed += 1
    ut3 = verify_mongodb_matches_connection() 
    if ut3:
        passed += 1
    else:
        failed += 1

    ut4 = verify_openai_connection() 
    if ut4:
        passed += 1
    else:
        failed += 1
    
    ut5 = create_two_users()
    if ut5:
        passed += 1
    else:
        failed += 1

    print("passed: ", passed)
    print("failed", failed)
    print("Total passed: " + str(passed) + " " + str(passed + failed))
