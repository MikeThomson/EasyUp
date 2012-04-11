(function() {
	mongoose = require("mongoose");
	request = require("request");
	GridStore = mongoose.mongo.GridStore;
	Grid = mongoose.mongo.Grid;
	ObjectID = mongoose.mongo.BSONPure.ObjectID;
 	
	exports.get = function(id, fn) {
		var db, store;
		db = mongoose.connection.db;
		id = new ObjectID(id);
		store = new GridStore(db, id, "r", {
			root: 'fs'
		});
		return store.open(function(err, store) {
			if(err) {
				return fn(err);
			}
			console.log('Filename: ' + store.filename);
			console.log(store);
			if (("" + store.filename) === ("" + store.fileId) && store.metadata && store.metadata.filename) {
				store.filename = store.metadata.filename;
			}
			return fn(null, store);
		});
	};

}).call(this);
