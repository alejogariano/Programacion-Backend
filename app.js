class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct({ title, description, price, thumbnail, code, stock }) {
      
      const existingProduct = this.products.find(product => product.code === code);
      if (existingProduct) {
        throw new Error("El código de producto ya está en uso.");
      }
  
      
      const id = Date.now().toString();
  
      
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
  
  
  const newProduct = productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
  });
  
  console.log("Producto agregado:", newProduct);
  
  
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
    const foundProduct = productManager.getProductById(newProduct.id);
    console.log("Producto encontrado por ID:", foundProduct);
  } catch (error) {
    console.error("Error al buscar producto por ID:", error.message);
  }
  