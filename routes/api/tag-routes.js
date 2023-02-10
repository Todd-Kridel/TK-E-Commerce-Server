

const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// the "/api/tags" endpoint


// to find all tags
// being sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: {model: Product }
    });
    res.send(tags);
  } catch (err) {
    res.send(err);
  }
});


// to find a single tag by its 'id'
// being sure to include its associated Product data
router.get('/:id', async (req, res) => {
  const requested_id = req.params.id;
  try {
    const tag = await Tag.findOne({
      where: {id: requested_id}, 
      include: {model: Product}
    });
    if (tag != null) {
      res.send(tag);
      //res.status(200).json(tag);
    }
    else {
      res.status(404).json({message: 'A tag of the requested ID does not exist.'});
    }
    return;
  }
  catch (err) {
    res.send(err);
    //res.status(500).json(err);
  }
});


// to create a new tag
router.post('/', async (req, res) => {
  const requested_data = req.body;
  try {
    const tag = await Tag.create(requested_data);
    res.send('The requested tag was created. ==> ' + JSON.stringify(tag));
    // res.status(200).json(tag);
  } 
  catch (err) {
    res.send(err);
  }
});


// to update a tag by its 'id' value
router.put('/:id', async (req, res) => {
  const requested_id = req.params.id;
  const requested_data = req.body;
  try {
    const tag = await Tag.update(requested_data, {
      where: {id: requested_id}
      });
    if (tag[0] != 0) {
      res.send('The requested tag was updated. ==> ' + 
        'requested_id: ' + requested_id + ' ' + JSON.stringify(requested_data));
        //res.status(200).json({message: ''});
    }
    else {
      res.status(404).json({message: 'A tag of the requested ID does not exist.'});
    }
  return;
  } 
  catch (err) {
    res.send(err);
  }
});


// to delete 1 tag by its 'id' value
router.delete('/:id', async (req, res) => {
  const requested_id = req.params.id;
  try {
    const tag = await Tag.destroy({
      where: {id: requested_id}
    });
    if (tag != 0) {
      res.send('The requested tag was deleted. ==> ' + 
        'requested_id: ' + requested_id + ' (' + JSON.stringify(requested_id) + ' record)');
      //res.status(200).json({message: ''});
    }
    else {
      res.status(404).json({message: 'A tag of the requested ID does not exist.'});
    }
  return;
  } 
  catch (err) {
    res.send(err);
  }
});


// Export the Router system code for usage in other areas of the application.
module.exports = router;

