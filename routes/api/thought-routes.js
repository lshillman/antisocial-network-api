const { Thought, User } = require('../../models');

const router = require('express').Router();

// get all thoughts
router.get('/', (req, res) => {
  Thought.find()
  .then((thoughts) => res.json(thoughts))
  .catch((err) => res.status(500).json(err));
});

// get a single thought
router.get('/:id', (req, res) => {
  Thought.findOne({_id: req.params.id})
  .then((thought) => res.json(thought))
  .catch((err) => res.status(500).json(err));
});

// create a thought
router.post('/', (req, res) => {
  Thought.create(req.body)
  .then((thought) => {
    return User.findOneAndUpdate(
      { username: req.body.username },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );
  })
  .then((user) =>
    !user
      ? res
          .status(404)
          .json({ message: 'Thought created, but found no user with that ID' })
      : res.json('Created the thought')
  )
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// update a thought
router.put('/:id', (req, res) => {
  Thought.findOneAndUpdate(
    {_id: req.params.id},
    {thoughtText: req.body.thoughtText},
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


// delete a thought
router.delete('/:id', (req, res) => {
  Thought.findOneAndDelete({_id: req.params.id})
    .then((thought) => {
      return User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: thought._id } },
        { new: true }
      );
    })
    .then((user) =>
    !user
      ? res
          .status(404)
          .json({ message: 'Thought deleted, but could not find its user' })
      : res.json('Deleted the thought')
  )
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});


// add a reaction to a thought
router.post('/:id/reactions', (req, res) => {
  let reaction = {username: req.body.username, reactionBody: req.body.reactionBody};
  Thought.findOneAndUpdate(
    {_id: req.params.id},
    {$push: { reactions: reaction }},
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


module.exports = router;
