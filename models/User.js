const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^([a-z0-9\+_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,100})$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  thoughts: ['12', '43', '2234', '23', '12', '345'], //[thoughtSchema],
  friends: ["Mary", "Dan", "Christoph"],
});

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});


const User = mongoose.model('User', userSchema);

module.exports = User;