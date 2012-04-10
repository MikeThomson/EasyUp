
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
			
}
