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
       
#change

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
    
def run_unit_tests():
    passed = 0
    failed = 0

    ut1 = verify_pc_connection()
    if ut1:
        passed += 1
    else:
        failed += 1
    verify_mongodb_records_connection()
    verify_mongodb_matches_connection()

    print("passed: ", passed)
    print("failed")

