
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};
exports.index2 = function(req, res) {
		  res.render('index', { title: 'Express2' });
};



exports.fileUpload = function(req, res) {
		  res.render('fileUpload', {title:"Testing",res:res });
};

exports.fileUploadPost = function(req, res) {
	res.send(console.log('\nuploaded %s (%d Kb) to %s as %s'
		    , req.files.image.name
	     , req.files.image.size / 1024 | 0 
     , req.files.image.path
    , req.body.title));	  

	gridfs = require("../gridfs");
	return gridfs.putFile(req.files.image.path, req.files.image.name, {}, function(err, result) {});
};

exports.download = function(req, res) {
	gridfs = require("../gridfs")
	return gridfs.get(req.params.id, function(err, file) {
		res.header("Content-Type", 'application/octet-stream');
		res.header("Content-Disposition", "attachment; filename=" + file.filename);
		return file.stream(true).pipe(res);
	});	
};
