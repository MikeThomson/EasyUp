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
			if (("" + store.filename) === ("" + store.fileId) && store.metadata && store.metadata.filename) {
				store.filename = store.metadata.filename;
			}
			return fn(null, store);
		});
	};

	exports.putFile = function(path, name, options, fn) {
		var db;
		db =  mongoose.connection.db;
		options = parse(options);
		options.metadata.filename = name;
		var id = new ObjectID();
		return new GridStore(db, id,'w', options).open(function(err, file) {
			if(err) {
				return fn(err);
			}
			return file.writeFile(path, fn);
		});
	};

	parse = function(options) {
		var opts;
		opts = {};
		if (options.length > 0) {
			opts = options[0];
		}
		if (!opts.metadata) {
			opts.metadata = {};
		}
		return opts;
	};

}).call(this);
