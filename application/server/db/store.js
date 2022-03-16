const config = require('./config');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const pool = mysql.createPool({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0 
});

async function getAllUsers() {
  const result = await pool.query(
    "SELECT id, first_name AS firstName, last_name AS lastName, age FROM users"
  );
  return result[0].length < 1 ? {} : result[0];
}

async function getAllProducts() {
  const result = await pool.query(
    "SELECT product_id, seller_id AS seller_id, title AS title, description AS description, price AS price, image AS image FROM products"
  );
  return result[0].length < 1 ? {} : result[0];
}

async function getAllProductsWith(category) {
  const result = await pool.query(
    "SELECT * FROM products WHERE category = ?",
    [category]
  );
  return result[0].length < 1 ? {} : result[0];
}

async function getUserById(id) {
  const result = await pool.query(
    "SELECT user_id, username AS username, first_name AS first_name, last_name AS last_name FROM users WHERE user_id = ?",
    [id]
  );
  if (result[0].length < 1) {
    throw new Error(`User with id = ${id} not found`);
  }
  return result[0][0];
}

async function getProductById(id) {
  const result = await pool.query(
    "SELECT product_id, seller_id AS seller_id, title AS title, description AS description, price AS price, image AS image FROM products WHERE product_id = ?",
    [id]
  );
  if(result[0].length < 1) {
    throw new Error(`Product with id = ${id} not found`);
  }
  return result[0][0];
}

async function getShoppingCartById(id) {
  const result = await pool.query(
    "SELECT shopping_cart_id, buyer_id AS buyer_id, subtotal AS subtotal, products AS products FROM shopping_cart WHERE shopping_cart_id = ?",
    [id]
  );

  if(result[0].length < 1) {
    throw new Error(`Shopping cart with id = ${id} not found`);
  }

  return result[0][0];
}

async function getShoppingCartByUserId(id) {
  const result = await pool.query(
    "SELECT buyer_id, shopping_cart_id AS shopping_cart_id, subtotal AS subtotal, products AS products FROM shopping_cart WHERE buyer_id = ?",
    [id]
  );

  if(result[0].length < 1) {
    throw new Error(`Shopping cart with buyer id = ${id} not found`);
  }

  return result[0][0];
}

async function getPriceMatchingProductsById(id) {
  const result = await pool.query(
    "SELECT pm_product_id, product_id AS product_id, pm_products AS pm_products FROM puppeteer_data WHERE pm_product_id = ?",
    [id]
  );

  if(result[0].length < 1) {
    throw new Error(`Price matching products with id = ${id} not found`);
  }

  return result[0][0];
}

async function getPriceMatchingProductsByProductId(id) {
  const result = await pool.query(
    "SELECT product_id, pm_product_id AS pm_product_id, pm_products AS pm_products, avgPrice AS avgPrice, minPrice AS minPrice, maxPrice AS maxPrice FROM puppeteer_data WHERE product_id = ?",
    [id]
  );

  if(result[0].length < 1) {
    throw new Error(`Price matching products with product id = ${id} not found`);
  }

  return result[0][0];
}

async function createUser(firstname, lastname, email, username, password) {

  const encPassword = await bcrypt.hash(password, saltRounds);

  const date = new Date();

  const result = await pool.query(
    "INSERT INTO users SET first_name = ?, last_name = ?, email = ?, username = ?, password = ?, created_at = ?, is_active = ?, is_buyer = ?, is_seller = ?",
    [firstname, lastname, email, username, encPassword, date, 1, 1, 0]
  );
  if (result[0].length < 1) {
    throw new Error(
      `Failed to create a new user ${username}`
    );
  }
  return getUserById(result[0].insertId);
}

async function createUserCart(id) {

  const result = await pool.query(
    "INSERT INTO shopping_cart SET buyer_id = ?",
    [id]
  );

  if(result[0].length < 1) {
    throw new Error(
      `Failed to create new shopping cart for user ${id}`
    );
  }

  return getShoppingCartById(result[0].insertId);
}

async function createPriceMatchingProducts(product_id, priceMatchingProducts, avgPrice, minPrice, maxPrice) {

  const result = await pool.query(
    "INSERT INTO puppeteer_data SET product_id = ?, pm_products = ?, avgPrice = ?, minPrice = ?, maxPrice = ?",
    [product_id, priceMatchingProducts, avgPrice, minPrice, maxPrice]
  );

  if(result[0].length < 1) {
    throw new Error(
      `Failed to add price matching products into puppeteer_data table with product id of: ${product_id}`
    );
  }

  return getPriceMatchingProductsById(result[0].insertId);
}

async function loginUser(username, password) {
  
  const result = await pool.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );
  
  if(result[0].length === 1) {
    const comparison = await bcrypt.compare(password, result[0][0].password);

    if(comparison) {
      return result[0][0];
    }
    else {
      throw new Error(
        `Username and password do not match`
      );
    }
  }
  else {
    throw new Error(
      `Username does not exist`
    );
  }
}

async function uploadProduct(aProduct, id) {

  const result = await pool.query(
    "INSERT INTO products SET title = ?, description = ?, price = ?, category = ?, image = ?, seller_id = ?",
    [aProduct.title, aProduct.description, aProduct.price, aProduct.category, aProduct.image, id] // change 6 to user with current session 
  );
  
  if(result[0].length < 1) {
    throw new Error(
      `Failed to create a new product ${aProduct.title}`
    );
  }

  return getProductById(result[0].insertId);
}

async function deleteUserById(id) {
  const result = await pool.query("DELETE FROM users WHERE id = ?", [id]);
  if (result[0].affectedRows < 1) {
    throw new Error(`User with id ${id} does not exist`);
  }
  return "";
}

async function updateUser(firstName, lastName, birthday, email, phone, username, password, id) {

  const encPassword = await bcrypt.hash(password, saltRounds);

  const result = await pool.query(
    "UPDATE users SET first_name = ?, last_name = ?, birthdate = ?, email = ?, phone = ?, username = ?, password = ? WHERE user_id = ?",
    [firstName, lastName, birthday, email, phone, username, encPassword, id]
  );

  if (result[0].affectedRows < 1) {
    throw new Error(`Was not able to update user with first name: ${firstName} and last name: ${lastName}`);
  }
  return getUserById(id);
}

async function updateProfile(bioDescription, location, socialMedia) {
  const result = await pool.query(
    "UPDATE users SET first_name = ?, last_name = ?, birthdate = ?, email = ?, phone = ?, username = ?, password = ? WHERE user_id = ?",
    [bioDescription, location, socialMedia]
  );

  if (result[0].affectedRows < 1) {
    throw new Error(`Was not able to update user with bio description: ${bioDescription}, location: ${location}, socialMedia: ${socialMedia}`);
  }
  return getUserById(id);
}

async function updateCart(id, subtotal, products) {

  const result = await pool.query(
    "UPDATE shopping_cart SET subtotal = ?, products = ? WHERE shopping_cart_id = ?",
    [subtotal, products, id]
  );

  if(result[0].affectedRows < 1) {
    throw new Error(`Was not able to update shopping cart with id = ${id}`);
  }

  return getShoppingCartById(id);
}

module.exports = {
  getAllUsers,
  getAllProducts,
  getAllProductsWith,
  createUser,
  createUserCart,
  createPriceMatchingProducts,
  loginUser,
  uploadProduct,
  getUserById,
  getProductById,
  getShoppingCartById,
  getShoppingCartByUserId,
  getPriceMatchingProductsById,
  getPriceMatchingProductsByProductId,
  deleteUserById,
  updateUser,
  updateCart,
  updateProfile
};