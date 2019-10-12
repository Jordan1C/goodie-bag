const Sequelize = require("sequelize");
const db = require("../database");

module.exports = db.define("candy", {
  // define your model here!
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 10
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://i.ytimg.com/vi/Csq2pilYDco/hqdefault.jpg",
    validate: {
      isUrl: true
    }
  }
});
