

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
      //{model: ProductTag, where: {product_id: Product.id}}]
      //{model: Category, where: {id: Category.id}} 
      //{model: ProductTag, where: {id: ProductTag.product_id}}
    });
    res.send(products);
    //res.status(200).json(products);
  } 
  catch (err) {
    res.send(err);
  }
});


router.get('/tag', async (req, res) => {  // ** AN ADDITIONAL ROUTE THAT WAS CREATED FOR EXTRA DATA-CHECK FUNCTIONALITY **
  try {
    const products = await ProductTag.findAll({
      //include: [{model: Product}, {model: Tag}]
      //include: [{model: Product, attributes: [product_name], where: {product_id: Product.id}}, 
      //  {model: Tag, attributes: [tag_name], where: {tag_id: Tag.id}}]
    });
    res.send(products);
    //res.status(200).json(products);
  } 
  catch (err) {
    res.send(err);
  }
});


// to find 1 product by its `id`
// be sure to include its associated Category and Tag data
router.get('/:id', async (req, res) => {
  const requested_id = req.params.id;
  try {
    const product = await Product.findOne({
      where: {id: requested_id}, 
      include: [{model: Category}, {model: Tag}]
    });
    if (product != null) {
      res.send(product);
      //res.status(200).json(product);
    }
    else {
      res.status(404).json({message: 'A product of the requested ID does not exist.'});
    }
    return;
  } 
  catch (err) {
    res.send(err);
    //res.status(500).json(err);
  }
});


// to create a new product
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
        productResponse = product;
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
        res.status(200).json(product);
      })  // ** AN ENHANCED DUAL-DATA-SET RESPONSE MESSAGE THAT CONTAINS BOTH PRODUCT DATA AND PRODUCT-TAG DATA **
      .then((productTags) => res.status(200).json(JSON.stringify(productResponse) + JSON.stringify(productTags)))
      .catch((err) => {
        //console.log("!!!!!!!!");
        //console.log(err);
        res.status(400).json(err);
      });
      //res.status(500).json(err);
    //return;
  }
  catch (err) {
    res.send(err);
    //res.status(500).json(err);
  }
});


// to update a product by its 'id' value
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.update(req.body, {
      where: {id: req.params.id},
    })
    .then((product) => {
      // Find all associated tags from the ProductTag table.
      return ProductTag.findAll({
        where: {product_id: req.params.id}});
    })
    .then((productTags) => {
      // Get a list of current tag IDs.
      const productTagIds = productTags.map(({tag_id}) => tag_id);
      // Create a filtered list of new tag IDs.
      const newProductTags = req.body.tagIds
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
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
      return;
    });
  }
  catch (err) {
    res.send(err);
    //res.status(500).json(err);
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
      res.send('The requested product was deleted. ==> ' + 
        'requested_id: ' + requested_id + ' (' + JSON.stringify(requested_id) + ' record)');
      //res.status(200).json({message: ''});
    }
    else{
      res.status(404).json({message: 'A product of the requested ID does not exist.'});
    }
  return;
  } 
  catch (err) {
    res.send(err);
  }
});


// Export the Router system code for usage in other areas of the application.
module.exports = router;

