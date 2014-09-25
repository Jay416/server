var mongoose = required('lib/mongoose');

var Article = new mongoose.Schema({
    title: {type: String, required: true},
    anchor: {type: String, unique: true, sparse: true},
    group: {type: String, sparse: true},
    description: {type: String, required: true},
    modified: { type: Date, default: Date.now },
    visible: { type: Boolean, default: false}
});

module.exports = mongoose.model('Article', Article);