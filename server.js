const express = require("express");
const app = express();
const { Restaurant } = require("./models/index");
const { sequelize } = require("./db");

const port = 3000;

// Middleware to parse request bodies as JSON and URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for creating a new restaurant
app.post('/restaurants', async (req, res) => {
  const newRestaurant = await Restaurant.create(req.body);
  res.json(newRestaurant);
});

// Route for updating an existing restaurant by ID
app.put('/restaurants/:id', async (req, res) => {
  const [numRowsUpdated, [updatedRestaurant]] = await Restaurant.update(req.body, {
    where: { id: req.params.id },
    returning: true
  });
  res.json(updatedRestaurant);
});

// Route for deleting a restaurant by ID
app.delete('/restaurants/:id', async (req, res) => {
  const numRowsDeleted = await Restaurant.destroy({
    where: { id: req.params.id }
  });
  res.json({ message: `${numRowsDeleted} rows deleted` });
});

// Route for getting a particular restaurant by ID
app.get('/restaurants/:id', async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  res.json(restaurant);
});

// Route for getting all restaurants
app.get('/restaurants', async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.json(restaurants);
});

// Route for getting a particular restaurant by ID from the "restaurants" endpoint
app.get('/restaurants/:id', async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  res.json(restaurant);
});

app.listen(port, () => {
  sequelize.sync();
  console.log("Your server is listening on port " + port);
});
