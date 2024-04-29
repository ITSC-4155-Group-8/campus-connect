import datetime

from flask import Blueprint, jsonify, request, Response, redirect
from flask_login import current_user, login_required

from bson import ObjectId

from src.db import db, login_collection, user_data_collection, match_collection
from src.user import User
from src.server_functions import *

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
    
@api_routes.route("/api/generate_matches", methods = [ 'POST' ])
@login_required
def generate_matches_endpoint():
    user_data = user_data_collection.find_one({'email': User.get_user_by_id(current_user.id).__dict__['email']})
    if not user_data:
        return Response(status=500)

    generate_matches(user_data, 1)
    return Response(status=200)


@api_routes.route("/api/matches", methods = [ 'GET' ])
@login_required
def get_matches():
    user_data = user_data_collection.find_one({'email': User.get_user_by_id(current_user.id).__dict__['email']})
    if not user_data:
        return Response(status=500)

    match_queue = []
    matches = []

    for match in user_data['match_queue']:
        match_obj = get_matched_object(match)
        match_queue.append(match_obj)
    
    for match in user_data['matches']:
        match_obj = get_matched_object(match)
        match_obj.pop('_id')
        matches.append(match_obj)

    return jsonify({'match_queue': match_queue, 'matches': matches})



@api_routes.route("/api/matches/<match_id>/accept", methods = [ 'POST' ])
@login_required
def update_match(match_id=None):
    user_data = user_data_collection.find_one({'email': User.get_user_by_id(current_user.id).__dict__['email']})
    if not user_data:
        return Response(status=500)
    
    if match_id == None:
        return Response(status=404)
    
    # sets user value to true for match
    user_wants_to_match(user_data, match_id)
    match = match_collection.find_one({'_id': ObjectId(match_id)})
    match.pop('_id')
    # redirects back to match page
    return jsonify(match)

@api_routes.route("/api/matches/<match_id>/decline", methods = [ 'POST' ])
@login_required
def delete_match(match_id=None):
    user_data = user_data_collection.find_one({'email': User.get_user_by_id(current_user.id).__dict__['email']})
    if not user_data:
        return Response(status=500)
    
    if match_id == None:
        return Response(status=404)
    
    # deletes match from all user profiles with match id.
    delete_match(match_id)
    # redirects back to match page
    return Response(stauts=200)




@api_routes.route("/api/matches/<match_id>", methods = [ 'GET' ])
@login_required
def get_match_data(match_id=None):
    #user_data = get_user_profile(User.get_user_by_id(current_user.id).__dict__['email'])
    user_data = user_data_collection.find_one({'email': User.get_user_by_id(current_user.id).__dict__['email']})
    if not user_data:
        return Response(status=500)
    
    if match_id not in user_data['match_queue']:
        return Response(status=404)
    
    match = match_collection.find_one({'_id': ObjectId(match_id)})
    if not match:
        return Response(status=404)
    match.pop('_id')
    return jsonify(match)


@api_routes.route("/api/users/<user_id>", methods = [ 'GET' ])
@login_required
def get_user_data(user_id=None):
    print(user_id)
    user_data = user_data_collection.find_one({'_id': ObjectId(user_id)})
    if not user_data:
        return Response(status=404)
    user_data.pop('_id')
    return jsonify(user_data)

@api_routes.route("/api/users/edit", methods = [ 'POST' ])
@login_required
def edit_user_data():

    updated_data = request.get_json()

    update_record(updated_data)

    return Response(status=200)


@api_routes.route("/api/matches/<match_id>/<string:text_message>/send_message", methods = [ 'POST' ])
@login_required
def send_message(match_id=None, text_message=None):
    #user_data = get_user_profile(User.get_user_by_id(current_user.id).__dict__['email'])
    user_data = user_data_collection.find_one({'email': User.get_user_by_id(current_user.id).__dict__['email']})
    if not user_data:
        return Response(status=500)
    
    if match_id == None or text_message == None:
        return Response(status=404)
    
    
    send_match_text(user_data, match_id, text_message)

    match = match_collection.find_one({'_id': ObjectId(match_id)})
    if not match:
        return Response(status=404)
    match.pop('_id')
    return match


@api_routes.route("/api/matches/<match_id>/<string:text_message>/<string:datetime>/delete_message", methods = [ 'POST' ])
@login_required
def delete_message(match_id=None, text_message=None, datetime=None):
    #user_data = get_user_profile(User.get_user_by_id(current_user.id).__dict__['email'])
    user_data = user_data_collection.find_one({'email': User.get_user_by_id(current_user.id).__dict__['email']})
    if not user_data:
        return Response(status=500)
    
    if match_id == None or text_message == None or datetime == None:
        return Response(status=404)
    
    delete_match_text(user_data, match_id, datetime, text_message)

    match = match_collection.find_one({'_id': ObjectId(match_id)})
    if not match:
        return Response(status=404)
    match.pop('_id')
    return match
