const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    content: { type: String, required: true },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    pinned: Boolean
}, { timeseries: true });

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;