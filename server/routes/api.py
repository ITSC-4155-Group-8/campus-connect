import datetime

from flask import Blueprint, jsonify, request, Response
from flask_login import current_user, login_required

from src.db import db, login_collection, user_data_collection, match_collection
from src.user import User
from src.server_functions import create_record

# ROUTES -------------------------------

api_routes = Blueprint('api_routes', __name__)

@api_routes.route("/api")
@login_required
def get_api():
    return "Campus Connect API v0.1.0"


@api_routes.route("/api/profile", methods = ['GET', 'POST'])
@login_required
def get_profile_data():
    if request.method == 'GET':
        user_data = user_data_collection.find_one({'email': User.get_user_by_id(current_user.id).__dict__['email']})
        if not user_data:
            return Response(status=404)
        user_data.pop('_id')
        return jsonify({'user': User.get_user_by_id(current_user.id).__dict__, 'user_data': user_data})
    if request.method == 'POST':
        data = request.get_json()
        user_doc = {
            'first_name': data['first_name'],
            'last_name': data['last_name'],
            'email': User.get_user_by_id(current_user.id).__dict__['email'],
            'gender': data['gender'],
            'age': data['age'],
            'school_year': data['school_year'],
            'major': data['major'],
            'minor': data['minor'],
            'user_datetime_created': datetime.datetime.now().isoformat(),
            'user_likes': data['likes'],
            'user_dislikes': data['dislikes'],
            'hidden_likes': data['h_likes'],
            'hidden_dislikes': data['h_dislikes'],
            'matches': [],
            'match_queue': [],
            'bio': data['bio']
        }
#        user_data_collection.replace_one({ 'email': User.get_user_by_id(current_user.id).__dict__['email'] }, user_doc, upsert=True)
        create_record(user_doc)
        return Response(status=200)


@api_routes.route("/api/matches", methods = [ 'GET' ])
@login_required
def get_matches():
    user_data = user_data_collection.find_one({'email': User.get_user_by_id(current_user.id).__dict__['email']})
    if not user_data:
        return Response(status=500)
    return jsonify(user_data['match_queue'])


@api_routes.route("/api/matches/<match_id>", methods = [ 'GET' ])
@login_required
def get_match_data(match_id=None):
    user_data = user_data_collection.find_one({'email': User.get_user_by_id(current_user.id).__dict__['email']})
    if not user_data:
        return Response(status=500)
    
    if match_id not in user_data['match_queue']:
        return Response(status=404)
    
    match = match_collection.find_one(match_id)
    if not match:
        return Response(status=404)

    return jsonify(match)


@api_routes.route("/api/users/<user_id>", methods = [ 'GET' ])
@login_required
def get_user_data(user_id=None):
    user_data = user_data_collection.find_one(user_id)
    if not user_data:
        return Response(status=404)
    
    return jsonify(user_data)
