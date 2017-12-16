var mongoose = require('mongoose');

var ProSchema = new mongoose.Schema({
  proId: {type: String},
  services: {type: Array},
  cep: {type: String},
  name: {type: String},
  email: {type: String},
  phone: {type: String},
  credits: {type: Number},
});

module.exports = mongoose.model('Pro', ProSchema);
