var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var heartSchema = new Schema({
	color: { type: String },
  size: { type: String }
});


module.exports = mongoose.model('heart', heartSchema);
