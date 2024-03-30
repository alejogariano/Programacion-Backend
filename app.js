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
