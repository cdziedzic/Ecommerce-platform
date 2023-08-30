const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const productData = await Category.findAll( {
      include: { model: Product },
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//find category by id
router.get('/:id', async (req, res) => {
  try {
    const productData = await Category.findByPk(req.params.id, {
      include: { model: Product }
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//create new category
router.post('/', async (req, res) => {
  try {
    const productData = await Category.create(req.body)
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});
//update category by id
router.put('/:id', async (req, res) => {
  try {
    const productData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!productData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete category by id
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!productData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
