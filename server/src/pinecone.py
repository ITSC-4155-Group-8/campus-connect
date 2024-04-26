import os
from pinecone import Pinecone
from dotenv import load_dotenv

load_dotenv()

pc = Pinecone(api_key=os.getenv("PINECONE_KEY"))
# see https://docs.pinecone.io/v1/docs/quickstart namespaces
pc_index = pc.Index(os.getenv("PINECONE_INDEX"))
