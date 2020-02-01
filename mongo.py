from flask import Flask, jsonify, request, json
from flask_pymongo  import PyMongo
from bson.objectid import ObjectId
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)
import numpy as np
app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'meanloginreg'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/meanloginreg'
app.config['JWT_SECRET_KEY'] = 'secret'

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)

@app.route('/users/mock', methods=['POST'])
def mock():
    test = np.load('./SC4001E0.npz')
    name = []
    for i in test:
        name.append(i)
    print(name)
    ans = {
        "x" : test[name[0]],
        "y" :  test[name[1]]
    }

    print(len(test[name[1]].tolist()))
    return jsonify({'x': test[name[0]].tolist(), 'y': test[name[1]].tolist()})

@app.route('/users/upload', methods=['POST'])
def upload():
    print('kaochaiyakarn')
    # print(request)
    # for name in request.get_json():
    #     print(name)
        # print(request.get_json()[name])
    # print(request.files['firewall (1).png'])
    # print(request.files)
    return jsonify({'result': 'kaochaiyakarn'})

@app.route('/users/register', methods=['POST'])
def register():
    users = mongo.db.users
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    password = request.get_json()['password']
    check_password = request.get_json()['checkPassword']
    userName = request.get_json()['userName']
    sex = request.get_json()['sex']
    pnumber = request.get_json()['pnumber']
    chronic = request.get_json()['chronic']
    fChronic = request.get_json()['fChronic']
    addr = request.get_json()['addr']
    addr2 = request.get_json()['addr2']
    city = request.get_json()['city']
    state = request.get_json()['state']
    zips = request.get_json()['zip']
    if password != check_password:
        return jsonify({'error': 'Password mismatch'}), 500

    checkDup = users.find_one({'userName' : userName})
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    created = datetime.utcnow()

    if checkDup:
        return jsonify({'error': 'Duplicate user name'}), 501
    
    user_id = users.insert({
	'first_name' : first_name, 
	'last_name' : last_name, 
	'email' : email, 
	'password' : password,
    'userName': userName,
    'sex': sex,
    'pnumber' : pnumber,
    'chronic' : chronic,
    'fChronic' : fChronic,
    'addr' : addr,
    'addr2' : addr2,
    'city' : city,
    'state' : state,
    'zips' : zips,
	'created' : created, 
	})
    new_user = users.find_one({'_id' : user_id})
    result = {'userName' : new_user['userName'] + ' registered'}
    # raise 422
    return jsonify({'result' : result}), 200
	

@app.route('/users/login', methods=['POST'])
def login():
    users = mongo.db.users
    userName = request.get_json()['userName']
    password = request.get_json()['password']
    result = ""
	
    response = users.find_one({'userName' : userName})

    if response:	
        if bcrypt.check_password_hash(response['password'], password):
            access_token = create_access_token(identity = {
			    'first_name': response['first_name'],
				'last_name': response['last_name'],
				'email': response['email'],
                'sex':response['sex'],
                'userName': response['userName']}
				)
            result = jsonify({"token":access_token})
        else:
            result = jsonify({"error":"Invalid username and password"})            
    else:
        result = jsonify({"result":"No results found"})
    return result
	
	
if __name__ == '__main__':
    print('----stat')
    app.run(host='0.0.0.0', debug=True, port=8081)