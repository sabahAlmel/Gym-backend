import sequelize from "./config/sequelizeConnections.js";
import Category from "./models/categoriesSequelize.js";
import Product from "./models/productsSequelize.js";

Category.hasMany(Product, { as: "products", onDelete: "CASCADE" });
Product.belongsTo(Category, {
  onDelete: "CASCADE",
});

// await sequelize.sync({ alter: true });
