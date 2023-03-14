const express = require("express");
const app = express();

const ProductManager = require("./productManager.js");
const productManager = new ProductManager("./products.json");

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

app.get("/products", async (request, response) => {
  let products = await productManager.getProducts();
  let limit = request.query.limit;

  if (!limit || limit > products.length) return response.send({ products });
  let limitedProducts = [];
  for (i = 0; i < limit; i++) {
    limitedProducts.push(products[i]);
  }
  response.send({ limitedProducts });
});

app.get("/products/:pid", async (request, response) => {
  let products = await productManager.getProducts();
  let productId = request.params.pid;

  let product = await products.find((e) => e.id == productId);

  if (!product) return response.send({ error: "Product not found" });

  response.send({ product });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

/* productManager.addProduct(
  "Chemex",
  "A pour-over method, which means that the water passes through a bed of coffee and a filter.",
  46,
  "Sin imagen",
  "coffeemaker1",
  12
);

productManager.addProduct(
  "French press",
  "A manual coffee maker with a cylindrical carafe.",
  38,
  "Sin imagen",
  "coffeemaker2",
  19
);

productManager.addProduct(
  "Moka pot",
  "A stovetop coffee maker used to make espresso-like coffee.",
  45,
  "Sin imagen",
  "coffeemaker3",
  31
);

productManager.addProduct(
  "AirScape coffee storage",
  "Large food container patented airtight lid 2-way valve.",
  42,
  "Sin imagen",
  "accessories1",
  23
);

productManager.addProduct(
  "Coffee scale with timer",
  "Black mirror basic PRO coffee scale with timer.",
  68,
  "Sin imagen",
  "accessories2",
  14
);

productManager.addProduct(
  "Knock box",
  "Tap your portafilter against the knock bar and directly into the 650ml knock box.",
  18,
  "Sin imagen",
  "accessories3",
  7
);

productManager.addProduct(
  "Manual coffee grinder",
  "Portable mill faster grinding efficiency espresso to coarse for italian coffee.",
  124,
  "Sin imagen",
  "accessories4",
  7
);

productManager.addProduct(
  "Eight O'Clock Ground Coffee",
  "Medium roast ground coffee, 100% Arabica. The bag contains 36 ounce of The Original coffee.",
  15,
  "Sin imagen",
  "coffee1",
  16
);

productManager.addProduct(
  "San Francisco Bay Coffee DECAF",
  "Medium roast swiss water processed decaffeinated coffee. The bag contains 32 ounce of DECAF Gourmet Blend.",
  25,
  "Sin imagen",
  "coffee2",
  8
);

productManager.addProduct(
  "Stumptown Coffee Roasters",
  "Medium roast organic whole bean coffee. The bag contains 12 ounce of Holler Mountain coffee.",
  16,
  "Sin imagen",
  "coffee3",
  22
); */

//productManager.getProducts();

//productManager.getProductById(1678294226877);

//productManager.updateProduct(1678294226877, 15);

//productManager.deleteProduct(1678294226877);
