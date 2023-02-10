

// Establish the import of the Router system components that allow for multiple URL route-definition files.
const router = require('express').Router();
const { Category, Product } = require('../../models');


//
// the "/api/category" route endpoint
//


// to find all categories
// being sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: {model: Product}
    });
    res.send(categories);
    //res.status(200).json(categories);
  } 
  catch (err) {
    res.send(err);
  }
});


// to find 1 category by its 'id' value
// being sure to include its associated Products
router.get('/:id', async (req, res) => {
  const requested_id = req.params.id;
  try {
    const category = await Category.findOne({
      where: {id: requested_id}, 
      include: {model: Product}
    });
    if (category != null) {
      res.send(category);
      //res.status(200).json(category);
    }
    else {
      res.status(404).json({message: 'A category of the requested ID does not exist.'});
    }
    return;
  }
  catch (err) {
    res.send(err);
    //res.status(500).json(err);
  }
});


// to create a new category
router.post('/', async (req, res) => {
  const requested_data = req.body;
  try {
    const category = await Category.create(requested_data);
    res.send('The requested category was created. ==> ' + JSON.stringify(category));
    // res.status(200).json(category);
  } 
  catch (err) {
    res.send(err);
  }
});


// to update a category by its 'id' value
router.put('/:id', async (req, res) => {
  const requested_id = req.params.id;
  const requested_data = req.body;
  try {
    const category = await Category.update(requested_data, {
      where: {id: requested_id}
      });
    if (category[0] != 0) {
      res.send('The requested category was updated. ==> ' + 
        'requested_id: ' + requested_id + ' ' + JSON.stringify(requested_data));
        //res.status(200).json({message: ''});
    }
    else {
      res.status(404).json({message: 'A category of the requested ID does not exist.'});
    }
  return;
  } 
  catch (err) {
    res.send(err);
  }
});


// to delete a category by its 'id' value
router.delete('/:id', async (req, res) => {
  const requested_id = req.params.id;
  try {
    const category = await Category.destroy({
      where: {id: requested_id}
    });
    if (category != 0) {
      res.send('The requested category was deleted. ==> ' + 
        'requested_id: ' + requested_id + ' (' + JSON.stringify(requested_id) + ' record)');
      //res.status(200).json({message: ''});
    }
    else {
      res.status(404).json({message: 'A category of the requested ID does not exist.'});
    }
  return;
  } 
  catch (err) {
    res.send(err);
  }
});


// Export the Router system code for usage in other areas of the application.
module.exports = router;

