const fs = require('fs').promises;
const path = require('path');

class ProductManager {
  constructor(filename) {
    this.filename = filename;
    this.products = [];
    this.currentId = 1;
  }

  async init() {
    try {
      await fs.access(this.filename);
      await this.loadProducts();
    } catch (error) {
      if (error.code === 'ENOENT') {
        await this.saveProducts([]); 
      } else {
        throw error;
      }
    }
  }

  async loadProducts() {
    const data = await fs.readFile(this.filename, 'utf8');
    this.products = JSON.parse(data);
    const lastProduct = this.products[this.products.length - 1];
    if (lastProduct) {
      this.currentId = lastProduct.id + 1;
    }
  }

  async saveProducts(products) {
    await fs.writeFile(this.filename, JSON.stringify(products, null, 2));
  }

  async getProducts() {
    return this.products;
  }

  async addProduct({ title, description, price, thumbnail, code, stock }) {
    const existingProduct = this.products.find(product => product.code === code);
    if (existingProduct) {
      throw  Error("El código de producto ya está en uso.");
    }

    const id = this.currentId++;

    const newProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    this.products.push(newProduct);
    await this.saveProducts(this.products);

    return newProduct;
  }

  async getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw  Error("Producto no encontrado.");
    }
    return product;
  }

  async updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw  Error("Producto no encontrado.");
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updatedFields
    };

    await this.saveProducts(this.products);

    return this.products[productIndex];
  }

  async deleteProduct(id) {
    const initialLength = this.products.length;
    this.products = this.products.filter(product => product.id !== id);
    if (this.products.length === initialLength) {
      throw  Error("Producto no encontrado.");
    }

    await this.saveProducts(this.products);
  }
}

const dataDirectory = 'data';
const productsFile = path.join(dataDirectory, 'products.json');

(async () => {
  try {
    try {
      await fs.access(dataDirectory);
    } catch (error) {
      await fs.mkdir(dataDirectory);
    }

    const productManager = new ProductManager(productsFile);
    await productManager.init();

    console.log("Se crea una instancia de ProductManager");

    const emptyProducts = await productManager.getProducts();
    console.log("getProducts recién creada la instancia:", emptyProducts);

    const newProduct = await productManager.addProduct({
      title: "producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25
    });
    console.log("Producto agregado:", newProduct);

    const updatedProducts = await productManager.getProducts();
    console.log("getProducts después de agregar producto:", updatedProducts);

    const foundProduct = await productManager.getProductById(newProduct.id);
    console.log("Producto encontrado por ID:", foundProduct);

    const updatedProduct = await productManager.updateProduct(newProduct.id, { price: 250 });
    console.log("Producto actualizado:", updatedProduct);

    await productManager.deleteProduct(newProduct.id);
    console.log("Producto eliminado con éxito.");

  } catch (error) {
    console.error("Error:", error);
  }
})();
