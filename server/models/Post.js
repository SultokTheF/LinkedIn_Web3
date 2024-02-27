const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = model('Post', PostSchema);
