const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

// This module allows you to 'wrap' your API for serverless use. No HTTP server, no ports or sockets. 
// https://github.com/dougmoscrop/serverless-http
const serverless = require('serverless-http');

// Connecting to Mongoo Atlas database
mongoose.connect('mongodb+srv://ander_frago:4Vientos@cluster0.wdu3m.mongodb.net/productsdb?retryWrites=true&w=majority', { 
  useNewUrlParser: true,
  useUnifiedTopology: true });


const app = express();
const router = express.Router();

let contactSchema = new mongoose.Schema({
  title: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
  },
  price: {
      type: Number,
      required: true,
  },
  rating: {
      type: Number,
      required: true,
  }, 
  shortDescription: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
  },
  description: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
  },
  categories: {
      type: Array,
      required: true,
  },
  images: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
});
let Product = mongoose.model('products', contactSchema);


app.use(function (req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "http://dazzling-hypatia-8b2b7c.netlify.app"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())
app.use('/.netlify/functions/store-rest-server', router);  // path must route to lambda

router.get('/products', async (req:any, res:any) => {
  const products = await Product.find({}); 
  try {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(products);
    res.end();
  } catch (err) {
    res.status(500).send(err);
  }
});


router.post('/products', async (req:any, res:any) => {
  const product = new Product(req.body);

  try {
    await product.save();
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/product/:id', async (req:any, res:any) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
});

router.patch('/product/:id', async (req:any, res:any)=> {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body)
    await Product.save()
    res.send(product)
  } catch (err) {
    res.status(500).send(err)
  }
});

/*
const server = app.listen(8000, "localhost", () => {
  const { address, port } = server.address();

  console.log('Listening on %s %s', address, port);
});

*/
module.exports = app;
module.exports.handler = serverless(app);