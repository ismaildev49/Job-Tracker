const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')
const Offer = require('./offer')

const userSchema = new mongoose.Schema({
  firstName: {
      type : String,
      required : [true, 'Please enter a first name'], 
  },
  lastName: {
    type : String,
    required : [true, 'Please enter a last name']
  },
  email: {
    type: String,
    required : [true, "Please enter an email"],
    unique: true,
    lowercase : true,
    validate :[isEmail, 'Plase enter a valid email']
},
  github: {
    type : String,
    unique : true
  },
  profilePicture: String,
  cv: String,
  password : {
    type : String,
    required : [true, 'Please enter a password'],
    minlength : [6, 'Minimum password length is 6 characters']
},
offers: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Offer'
}],

})


userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

//Static method to login user

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({email});
  if (user) {
      try {
          const auth = await bcrypt.compare(password, user.password);
          if (auth) {
              return user;
          } else {
              throw Error('Incorrect password');
          }
      } catch (err) {
          console.error('Error during bcrypt.compare:', err);
          throw Error('An error occurred during login');
      }
  }
  throw Error('Incorrect email');
};

const User = mongoose.model('users', userSchema) 

module.exports = User