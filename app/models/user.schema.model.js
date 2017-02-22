const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email:{
    type: String,
    index: true,
    match: /.+@.+..+/
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  password: {
     type: String,
     validate: [
       function(password) {
         return password.length >= 8
       },
       'Password should be atleast 8 characters long'
     ]
  },
  created: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['Admin', 'Owner', 'User']
  },
  website: {
    type: String,
    get: function(url) {
      if (!url) {
        return url
      } else {
        if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
          url = 'http://' + url
        }
        return url
      }
    }
  }
})

UserSchema.virtual('fullname').get(function(){
  return this.firstName + ' ' + this.lastName
})

UserSchema.set('toJSON', { getters: true, virtuals: true})

UserSchema.statics.findOneByUsername = function(username, callback) {
  this.findOne({ username: new RegExp(username, 'i')},
  callback)
}

UserSchema.methods.authenticate = function(password) {
  return this.password === password
}

// Executes when the document is saved
UserSchema.post('save', function(next) {
  console.log('The user "' + this.username + '" details were saved.')
})

mongoose.model('User', UserSchema)
