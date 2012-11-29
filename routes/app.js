var DEFAULT_ARTICLE = {author:"Frédéric Gascon"};

var articleRequest = require('../lib/articleRequest');

module.exports = function(app){
	
	var articleRequester = articleRequest(app.get('appCredentials'));

	app.get('/', showWriter);
	app.get('/:article', showWriter);
	app.post('/', createArticle);
	app.post('/:article', updateWriter);
	
	function showWriter(req, res){
		if(req.params.article){
			articleRequester.get(req.params.article, function(err, article){
				if(err){
					res.send('Error: ' + err);
				}else{
					renderWriter(req, res, article);
				}
			});
		}else{
			renderWriter(req, res, DEFAULT_ARTICLE);
		}
	}
	
	function createArticle(req, res){
		var params = req.body;
		if(params.title && params.body && params.author){
			articleRequester.create({title:params.title, body:params.body, author:params.author}, function(err, result){
				if(err){
					res.send('Error: ' + err);
				}else{
					res.redirect('/' + result.data.id);
				}
			});
		}
	}
	
	function updateWriter(req, res){
		var params = req.body;
		if(params.title && params.body && params.author){
			articleRequester.update({id:req.params.article ,title:params.title, body:params.body, author:params.author}, function(err, result){
				if(err){
					res.send('Error: ' + err);
				}else{
					renderWriter(req, res, result.data);
				}
			});
		}
	}
	
	function renderWriter(req, res, article){
		res.render('index', {
			title: app.get('name'),
			article: article
		});
	}
	
};