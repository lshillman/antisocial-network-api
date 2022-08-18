const router = require('express').Router();
const { User, Thought } = require('../../models');

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




module.exports = router;
