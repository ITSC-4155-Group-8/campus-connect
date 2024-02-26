from flask import Flask, send_file
from flask_cors import CORS

# serve static files at the server route
app = Flask(__name__, static_url_path='', static_folder='static')
CORS(app)

@app.route('/api')
def get_api():
    return 'Campus Connect API'

# redirect 404 errors to the index file to be handled by the client
@app.errorhandler(404)
def page_not_found(e):
    return send_file('static/index.html'), 200

