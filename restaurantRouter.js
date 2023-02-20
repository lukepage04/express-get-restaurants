const express = require('express');
const router = express.Router();
const { Restaurant } = require('./models');

// Route for creating a new restaurant
router.post('/', async (req, res) => {
  const newRestaurant = await Restaurant.create(req.body);
  res.json(newRestaurant);
});

// Route for updating an existing restaurant by ID
router.put('/:id', async (req, res) => {
  const [numRowsUpdated, [updatedRestaurant]] = await Restaurant.update(req.body, {
    where: { id: req.params.id },
    returning: true
  });
  res.json(updatedRestaurant);
});

// Route for deleting a restaurant by ID
router.delete('/:id', async (req, res) => {
  const numRowsDeleted = await Restaurant.destroy({
    where: { id: req.params.id }
  });
  res.json({ message: `${numRowsDeleted} rows deleted` });
});

// Route for getting a particular restaurant by ID
router.get('/:id', async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  res.json(restaurant);
});

// Route for getting all restaurants
router.get('/', async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.json(restaurants);
});

module.exports = router;
