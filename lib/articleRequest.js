var request = require('request');

module.exports = function(credentials){
	
	var baseUrl = 'http://localhost:8080/' + credentials.id + '-' + credentials.secret;

	function getRequest(urlPath, cb){
		return request({
			url: baseUrl + urlPath,
			json: true
		}, cb);
	}
	
	function postRequest(urlPath, data, cb){
		return request({
			url: baseUrl + urlPath,
			json: true,
			method: 'POST',
			body: data
		}, cb);
	}
	
	function list(cb){
		getRequest('/list', function(err, resp, body){
			if(err){
				cb(err);
			}else{
				cb(null, body);
			}
		});
		return null;
	}
	
	function get(id, cb){
		getRequest('/get?id=' + id, function(err, resp, body){
			if(err){
				cb(err);
			}else{
				cb(null, body);
			}
		});
		return null;
	}
	
	function create(data, cb){
		postRequest('/create', data, function(err, resp, body){
			if(err){
				cb(err);
			}else{
				cb(null, body);
			}
		});
		return null;
	}
	
	function update(data, cb){
		postRequest('/update', data, function(err, resp, body){
			if(err){
				cb(err);
			}else{
				cb(null, body);
			}
		});
		return null;
	}
	
	return {
		list: list,
		get: get,
		create: create,
		update: update
	};
};