var mongoose = require('mongoose');

var RequestSchema = new mongoose.Schema({
  client: {
    clientId: { type: String },
    cep: { type: String },
    email: { type: String },
    name: { type: String },
    phone: { type: String },
  },
  request: {
    proListId: { type: Array },
    service: { type: Array },
    when: { type: Array },
    who: { type: Array },
    amount: { type: Array },
    addInfo: { type: String },
    status: { type: String },
    requestId: { type: String },
    price: {type: Number},
  },
});

module.exports = mongoose.model('Request', RequestSchema);
