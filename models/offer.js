const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    jobTitle : {
      type : String, 
      required : [true, "Please enter a job title"]
    },
    companyName : String,
    website : String,
    contact : {
      name : String,
      email : String,
      phone : Number,
      address : String,
    },
    origin : String,
    status : String,
    comment : String,
  });


const Offer = mongoose.model('offer', offerSchema) 

module.exports = Offer