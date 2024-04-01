class ProductManager {
  constructor() {
    this.products = [];
    this.currentId = 1; 
  }

  getProducts() {
    return this.products;
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Todos los campos son obligatorios.");
    }

    const existingProduct = this.products.find(product => product.code === code);
    if (existingProduct) {
      throw new Error("El código de producto ya está en uso.");
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

    return newProduct;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw new Error("Producto no encontrado.");
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new Error("Producto no encontrado.");
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updatedFields
    };

    return this.products[productIndex];
  }

  deleteProduct(id) {
    const initialLength = this.products.length;
    this.products = this.products.filter(product => product.id !== id);
    if (this.products.length === initialLength) {
      throw new Error("Producto no encontrado.");
    }
  }
}

const productManager = new ProductManager();

try {
  const newProduct = productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
  });
  console.log("Producto agregado:", newProduct);
} catch (error) {
  console.error("Error al agregar producto:", error.message);
}

console.log("Todos los productos:", productManager.getProducts());

try {
  productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
  });
} catch (error) {
  console.error("Error al agregar producto:", error.message);
}

try {
  const foundProduct = productManager.getProductById(1);
  console.log("Producto encontrado por ID:", foundProduct);
} catch (error) {
  console.error("Error al buscar producto por ID:", error.message);
}

try {
  const updatedProduct = productManager.updateProduct(1, { price: 250 });
  console.log("Producto actualizado:", updatedProduct);
} catch (error) {
  console.error("Error al actualizar producto:", error.message);
}

try {
  productManager.deleteProduct(1);
  console.log("Producto eliminado con éxito.");
} catch (error) {
  console.error("Error al eliminar producto:", error.message);
}

