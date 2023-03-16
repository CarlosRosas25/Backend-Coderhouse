class ProductManager {
  constructor(path) {
    this.path = path;
    this.fs = require("fs");
    this.products = [];
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    try {
      if (this.products.find((e) => e.code === code)) {
        console.log("Error! Can't add an existing product.");
      } else {
        this.products.push({
          id: Date.now(),
          title: title,
          description: description,
          price: price,
          thumbnail: thumbnail,
          code: code,
          stock: stock,
        });
        await this.fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products)
        );
      }
    } catch (error) {
      throw Error(`Error adding a new product. Error detail: ${error}`);
    }
  };

  getProducts = async () => {
    try {
      if (!this.fs.existsSync(this.path)) {
        await this.fs.promises.writeFile(this.path, "[]");
      }

      let products = await this.fs.promises.readFile(this.path, "utf-8");
      console.log(products);
      this.products = JSON.parse(products);
      console.log(this.products);
      return this.products;
    } catch (error) {
      throw Error(`Error reading products. Error detail: ${error}`);
    }
  };

  getProductById = async (id) => {
    try {
      let products = await this.fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(products);

      let productFound = this.products.find((e) => e.id === id);

      if (productFound) {
        console.log(productFound);
        return productFound;
      } else {
        console.log("Product not found");
      }
    } catch (error) {
      throw Error(`Error reading the specific product. Error detail: ${error}`);
    }
  };

  updateProduct = async (id, newStock) => {
    try {
      let products = await this.fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(products);

      let productToUpdate = this.products.find((e) => e.id === id);

      if (productToUpdate) {
        productToUpdate = [{ ...productToUpdate, stock: newStock }];
        console.log(productToUpdate);
        await this.fs.promises.writeFile(
          this.path,
          JSON.stringify(productToUpdate)
        );
      } else {
        console.log("Couldn't find the product to update");
      }
    } catch (error) {
      throw Error(
        `Error updating the specific product. Error detail: ${error}`
      );
    }
  };

  deleteProduct = async (id) => {
    try {
      let products = await this.fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(products);

      let productToDelete = this.products.find((e) => e.id === id);

      if (productToDelete) {
        await this.fs.promises.unlink(this.path);
        console.log("File deleted");
      } else {
        console.log("Couldn't find the product to delete");
      }
    } catch (error) {
      throw Error(
        `Error deleting the specific product. Error detail: ${error}`
      );
    }
  };
}

module.exports = ProductManager;
