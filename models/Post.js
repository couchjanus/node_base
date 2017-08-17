const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title:  { type: String, required: true, validate: /\S+/ },
    content: { type: String, required: true, validate: /\S+/ },
    state: { type: Number, default: 1 },
    public: { type: Number, default: 1 },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }],

});

PostSchema
.virtual('url')
.get(function () {
  return '/admin/post/'+this._id;
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
