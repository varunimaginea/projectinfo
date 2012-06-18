var express = require('express'),	
		app = express.createServer();

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.listen(8000);

app.get('/', function(request, response)
{
	var fs=require('fs');
	fs.readFile('index.html', function (err, data) {
		if (err) throw err;
		response.writeHead(200, {"Content-Type":"text/html"});
		response.write(data);
		response.end();
	});
});

app.get('/js/:docName', function(request, response) 
{
	var docName = request.params.docName;
	console.log("Javascript Doc Name is "+docName);
	var fs=require('fs');
	fs.readFile('./js/'+docName, function (err, data) 
	{
		if (err) 
		{	
			console.log("Error is "+JSON.stringify(err));
			throw err;
		}
		response.writeHead(200, {"Content-Type":"application/x-javascript"});
		response.write(data);
		response.end();
	});
});

app.get('/css/eggplant/:docName', function(request, response) 
{
	var docName = request.params.docName;
	console.log("CSS Document Name is "+docName);

	var fs=require('fs');
	fs.readFile('./css/eggplant/'+docName, function (err, data) 
	{
		if (err) 
		{	
			console.log("Error is "+JSON.stringify(err));
			throw err;
		}
		response.writeHead(200, {"Content-Type":"text/css"});
		response.write(data);
		response.end();
	});
});

app.get('/css/eggplant/images/:docName', function(request, response) 
{
	var docName = request.params.docName;
	console.log("Image Document Name is "+docName);

	var fs=require('fs');
	fs.readFile('./css/eggplant/images/'+docName, function (err, data) 
	{
		if (err) 
		{	
			console.log("Error is "+JSON.stringify(err));
			throw err;
		}
		response.writeHead(200, {"Content-Type":"image/png"});
		response.write(data);
		response.end();
	});
});

app.get('/getProjectDetails.json', function(request, response)
{
	var projectDetails = require("./projectDetails");
	projectDetails.getProjectDetails(function(projectsJsonArray)
	{
		response.writeHead(200, {"Content-Type": "application/json"});
		response.write(JSON.stringify(projectsJsonArray));
		response.end();
	});
});
