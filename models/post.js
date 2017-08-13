const db = require('../core/db');
let ObjectId = require('mongodb').ObjectID;

exports.all = (cb) => {
  let collection = db.get().collection('posts');

  collection.find().toArray((err, docs) => {
    cb(err, docs);
  });
};

exports.recent = (cb) => {
  let collection = db.get().collection('posts');

  collection.find().sort({'updated_at': -1}).limit(100).toArray((err, docs) => {
    cb(err, docs);
  });
};



exports.detail = (post_id, cb) => {
  let collection = db.get().collection('posts');
  
  // collection.find({"_id": new ObjectId(post_id)}).limit(1).next(
  // (err, docs) => {
  //     cb(err, docs);
  //  });

  collection.findOne({"_id": new ObjectId(post_id)},
  (err, docs) => {
      cb(err, docs);
   });
};
