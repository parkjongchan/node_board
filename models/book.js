var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    info: { area1:Object,area2:Object, branch:Object,days:Object,time:Object}/*,
    age: Number,
    published_date: { type: Date, default: Date.now  }*/
});

module.exports = mongoose.model('users', bookSchema);
