const {Schema, model} = require('mongoose');

const userSchema = new Schema({
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
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'thought'
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
},
{
  toJSON: {virtuals: true},
  id: false
});

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});


const User = model('user', userSchema);

module.exports = User;