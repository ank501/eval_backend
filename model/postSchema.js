const { default: mongoose } = require("mongoose");

const PostSchema = mongoose.Schema({
    title : String,
    body : String,
    device : String
})

const PostModel = mongoose.model("posts",PostSchema);

module.exports = PostModel;