exports.fileUpload = function(req, res) {
		  res.render('fileUpload', {title:"Testing",res:res });
};

exports.fileUploadPost = function(req, res) {
	gridfs = require("../gridfs");
	shortener = require("../shortener");
	return gridfs.putFile(req.files.image.path, req.files.image.name, {}, function(err, result) {
		shortener.generate(result._id, function(shortId) {
			ret = {};
	      ret.name = result.metadata.filename;
	      ret.size = result.length;
	      ret.url = "http://littlefoot.bluetempest.net:3000/d/"+shortId;
			console.log('Returning:');
			console.log([ret]);
			res.json([ret]);
		});
	});
};

exports.shortDownload = function(req, res) {
	gridfs = require("../gridfs");
	shortener = require("../shortener");
	return shortener.getId(req.params.id, function(fullId) {
		if(fullId == null) return res.render('fileNotFound');
		else
			return gridfs.get(fullId, function(err, file) {
				res.header("Content-Type", 'application/octet-stream');
				res.header("Content-Disposition", "attachment; filename=" + file.filename);
				res.header('Content-Length', file.length);
				return file.stream(true).pipe(res);
			});
	});
};
exports.download = function(req, res) {
	gridfs = require("../gridfs");
	return gridfs.get(req.params.id, function(err, file) {
		res.header("Content-Type", 'application/octet-stream');
		res.header("Content-Disposition", "attachment; filename=" + file.filename);
		res.header('Content-Length', file.length);
		console.log(file.length);
		return file.stream(true).pipe(res);
	});	
};
