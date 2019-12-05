// var fs=require('fs'),
//     http=require('http'),
//     url=require('url'),
//     path=require('path');

// var indexpage='';

// fs.readFile("index.html",function(err,data){
// 	if(err)
// 	{
// 		throw err;
// 	}
// 	indexpage=data;
// });  

// http.createServer(function(req,res){
// 	var reqResource=url.parse(req.url).pathname;


// console.log(reqResource);

// if(reqResource=="/" || reqResource=="/index.html")
// {
// 	res.writeHead(200,{'content-type':'text/html'});
// 	res.write(indexpage);
// 	res.end();
// }
// else if(reqResource='favicon.ico')
// {
// 	res.writeHead(404);
// 	res.end();
// }
// else
// {
// 	console.log(reqResource);
// 	var file="" + reqResource;
// 	fs.stat(file,function(err,stats){
// 		console.log(stats);
	
// 	if(err)
// 	{
// 		if(err.code==='ENDENT')
// 		{
// 			return res.send.status(404);
// 		}
// 		res.end(err);
// 	}
// 	var range=req.headers.range;
// 	var parts=range.replace(/bytes=/," ").split("-");

// 	var start=parseInt(positions[0],10);
// 	var total=stats.size;
// 	var end=positions[1] ? parseInt(positions[1],10) : total-1;
// 	var chunksize=(end-start)+1;

// 	res.writeHead(206,{
// 		"Content-Range":"bytes" + start + "-" + end,
// 		"Accept-Ranges":"bytes",
// 		"Content-Length":chunksize,
// 		"Content-Type":"video/mp4"
//  	});

//  	var stream=fs.createReadStream(file,{start:start,end:end}).on("open",function(){ stream.pipe(res);}).on("error",function(err){res.end(err);});
//  	});
// }
// }).listen(8080);

var fs=require('fs'),
    http=require('http'),
    url=require('url'),
    path=require('path');
var express=require('express');
var app=express();

app.get('/video', function(req, res) {
  const path = 'videos/Boat_13.mp4'
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] 
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});

app.listen(8080);