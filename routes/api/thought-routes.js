const router = require('express').Router();
// const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all thoughts
router.get('/', async (req, res) => {
  try {
    res.status(200).json("This is the GET route for thoughts");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one thought
router.get('/:id', async (req, res) => {
  try {
    res.status(200).json("This is the GET route for a single thought");
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new thought
router.post('/', (req, res) => {
      res.status(200).json("This is the POST route for a new thought");
    });

// update thought
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const prodData = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(prodData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
