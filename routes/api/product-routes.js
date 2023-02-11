

const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


//
// the "/api/product" route endpoint
//


// to find all products
// being sure to include its associated Category and Tag data
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{model: Category}, {model: Tag}]
    });
    res.status(200).json(products);
    //res.send(products);
  } 
  catch (err) {
    res.status(500).json(err);
    //res.send(err);
  }
});


// to find all product-tag records
router.get('/tag', async (req, res) => {  // ** AN ADDITIONAL ROUTE THAT WAS CREATED FOR EXTRA DATA-CHECK FUNCTIONALITY **
  try {
    const productTags = await ProductTag.findAll({
    //include: [{model: Product}, {model: Tag}]
    });
    res.status(200).json(productTags);
    //res.send(productTags);
  } 
  catch (err) {
    res.status(500).json(err);
    //res.send(err);
  }
});


// to find 1 product by its 'id'
// being sure to include its associated Category and Tag data
router.get('/:id', async (req, res) => {
  const requested_id = req.params.id;
  try {
    const product = await Product.findOne({
      where: {id: requested_id}, 
      include: [{model: Category}, {model: Tag}]
    });
    if (product != null) {
      res.status(200).json(product);
      //res.send(product);
    }
    else {
      res.status(404).json({message: 'A product of the requested ID does not exist.'});
    }
    return;
  } 
  catch (err) {
    res.status(500).json(err);
    //res.send(err);
  }
});


// to find 1 product-tag record by its 'id'
// being sure to include its associated Category and Tag data
router.get('/tag/:id', async (req, res) => {  // ** AN ADDITIONAL ROUTE THAT WAS CREATED FOR EXTRA DATA-CHECK FUNCTIONALITY **
  const requested_id = req.params.id;
  try {
    const productTag = await ProductTag.findOne({
      where: {id: requested_id}, 
      //include: [{model: Product}, {model: Tag}]
    });
    if (productTag != null) {
      res.status(200).json(productTag);
      //res.send(productTag);
    }
    else {
      res.status(404).json({message: 'A product-tag record of the requested ID does not exist.'});
    }
    return;
  } 
  catch (err) {
    res.status(500).json(err);
    //res.send(err);
  }
});


// to create a new product
// being sure to also create any indicated tag ID records
router.post('/', async (req, res) => {
  //
  // req.body should contain the following object update information:
  // ** DISCOVERED TO REQUIRE A TRUE JSON-FORMAT POST REQUEST; NOT A FIELD FORM **
  //  {
  //    "product_name": "<product>",
  //    "price": <amount>,
  //    "stock": <amount>,
  //    "category": <ID number>  // added; was not included in the starter code
  //    "tagIds": [ <value>, ... ]
  //  }
  //
  try {
    let productResponse;
    const productResult = await Product.create(req.body)
      .then((product) => {
        // a retainer variable for compiled response display at later
        productResponse = "product id: NEW CREATED; product fields: " + JSON.stringify(req.body);
        // If there are product tags then create pairings to bulk create in the ProductTag model.
        if ((req.body.tagIds != undefined) && (req.body.tagIds.length > 0)) {
          const tagIds = req.body.tagIds.slice(0);
          //console.log("tagIds: " + tagIds.length);
          //console.log(tagIds);
          const productTags = tagIds.map((tag_id) => {
            return {
              product_id: product.id,
              tag_id
            };
          });
          return ProductTag.bulkCreate(productTags);
        // If there are not any provided product tags then just respond.
        }
        //res.status(200).json(product);
      })  // ** AN ENHANCED DUAL-DATA-SET RESPONSE MESSAGE THAT CONTAINS BOTH PRODUCT DATA AND PRODUCT-TAG DATA **
      .then((productTags) => res.status(200).json(productResponse + "; tag fields: " + JSON.stringify(productTags)))
      .catch((err) => {
        //console.log(err);
        res.status(400).json(err);
      });
  }
  catch (err) {
    res.status(500).json(err);
    //res.send(err);
  }
});


// to update a product by its 'id' value
// being sure to also update any indicated or/and associated tag ID records
router.put('/:id', async (req, res) => {
  try {
    let productResponse;  // a retainer variable for compiled response display at later
    const product = await Product.update(req.body, {
      where: {id: req.params.id},
    })
    .then((product) => {
      productResponse = "product id: " + req.params.id + "; product fields: " + JSON.stringify(req.body);
      // Find all associated tags from the ProductTag table.
      return ProductTag.findAll({
        where: {product_id: req.params.id}});
    })
    .then((productTags) => {
      // Get a list of current tag IDs.
      const productTagIds = productTags.map(({tag_id}) => tag_id);
      // Create a filtered list of new tag IDs.
      const newProductTags = req.body.tagIds  // a presumed required data component for the request message
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // Figure-out about which tags have to be removed.
      const productTagsToRemove = productTags
        .filter(({tag_id}) => !req.body.tagIds.includes(tag_id))
        .map(({id}) => id);
      // Run both database update actions.
      return Promise.all([
        ProductTag.destroy({where: {id: productTagsToRemove}}),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })  // ** AN ENHANCED DUAL-DATA-SET RESPONSE MESSAGE THAT CONTAINS BOTH PRODUCT DATA AND PRODUCT-TAG DATA **
    .then((updatedProductTags) => res.status(200).json(productResponse + "; tag fields: " + JSON.stringify(updatedProductTags)))
    .catch((err) => {
      res.status(400).json(err);
      // console.log(err);
      return;
    });
  }
  catch (err) {
    res.status(500).json(err);
    //res.send(err);
  }
});


// to delete a product by its 'id' value
router.delete('/:id', async (req, res) => {
  const requested_id = req.params.id;
  try {
    const product = await Product.destroy({
      where: {id: requested_id}
    });
    if (product != 0) {
      res.status(200).send('The requested product was deleted. ==> ' + 
        'requested_id: ' + requested_id + ' (' + JSON.stringify(requested_id) + ' record)');
      //res.status(200).json({message: ''});
    }
    else{
      res.status(404).json({message: 'A product of the requested ID does not exist.'});
    }
  return;
  } 
  catch (err) {
    res.status(500).json(err);
    //res.send(err);
  }
});


// to delete a product-tag record by its 'id' value
router.delete('/tag/:id', async (req, res) => {  // ** AN ADDITIONAL ROUTE THAT WAS CREATED FOR EXTRA DATA-CHECK FUNCTIONALITY **
  const requested_id = req.params.id;
  try {
    const productTag = await ProductTag.destroy({
      where: {id: requested_id}
    });
    if (productTag != 0) {
      res.status(200).send('The requested product-tag record was deleted. ==> ' + 
        'requested_id: ' + requested_id + ' (' + JSON.stringify(requested_id) + ' record)');
      //res.status(200).json({message: ''});
    }
    else{
      res.status(404).json({message: 'A product-tag record of the requested ID does not exist.'});
    }
  return;
  } 
  catch (err) {
    res.status(500).json(err);
    //res.send(err);
  }
});


// Export the Router system code for usage in other areas of the application.
module.exports = router;

