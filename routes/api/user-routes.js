const router = require('express').Router();
const { User, Thought } = require('../../models');


// create a user
router.post('/', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
  });
  const savedUser = await newUser.save();
  if (savedUser) {
    res.status(200).json(newUser);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

// get all users
router.get('/', (req, res) => {
  User.find({}, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(500).json(err)
    }
  })
})

// get a single user
router.get('/:id', (req, res) => {
  User.findOne({_id: req.params.id})
    .select('-__v')
    .populate('thoughts')
    .populate('friends')
    .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
})


// update a user
router.put('/:id', (req, res) => {
  User.findOneAndUpdate(
    {_id: req.params.id},
    {username: req.body.username, email: req.body.email},
    {new: true},
    (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ message: 'failed to update!' });
      }
    }
  );
});

// delete a user and its associated thoughts
router.delete('/:id', (req, res) => {
  User.findOneAndDelete({_id: req.params.id})
    .then((user) => {
      return Thought.deleteMany(
        { username: user.username },
        { new: true }
      );
    })
    .then((data) => res.status(200).json(data))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});


// add a friend to a user
router.post('/:uid/friends/:fid', (req, res) => {
  User.findOneAndUpdate(
    {_id: req.params.uid},
    {$addToSet: { friends: req.params.fid }},
    {new: true},
    (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ message: 'failed to add friend!' });
      }
    }
  );
});

// remove a friend to a user
router.delete('/:uid/friends/:fid', (req, res) => {
  User.findOneAndUpdate(
    {_id: req.params.uid},
    {$pull: { friends: req.params.fid }},
    {new: true},
    (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ message: 'failed to remove friend!' });
      }
    }
  );
});



module.exports = router;
