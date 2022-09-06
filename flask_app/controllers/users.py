from flask_app.models.user import User
from flask_app import app
from flask import render_template, jsonify, request, redirect

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/users')
def users():
    response = jsonify(User.get_all_json())
    return response

@app.route('/create/user',methods=['POST'])
def create_user():
    data = {
        'user_name': request.form['name'],
        'email': request.form['email']
    }
    User.save(data)
    return jsonify(message='Add a user!!!')


