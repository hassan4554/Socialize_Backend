"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../Configs/config.js")[env];
const { DB_TABLES } = require("@Constants");
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//////////////////////////////////////////////    USER    /////////////////////////////////////////////////////

// User has only one Profile
db[DB_TABLES.User].hasOne(db[DB_TABLES.Profile], { foreignKey: "userId" });

///////////////////////////////////////////////  PROFILE   ///////////////////////////////////////////////////

// Profile belongs to only one User
db[DB_TABLES.Profile].belongsTo(db[DB_TABLES.User], {
  foreignKey: "userId",
  onDelete: "cascade",
  onUpdate: "cascade",
});

// Profile has many Post
db[DB_TABLES.Profile].hasMany(db[DB_TABLES.Post], { foreignKey: "profileId" });

// Profile can have many requests as sender
db[DB_TABLES.Profile].hasMany(db[DB_TABLES.Request], {
  foreignKey: "requesterId",
});

// Profile can have many requests as reciever
db[DB_TABLES.Profile].hasMany(db[DB_TABLES.Request], {
  foreignKey: "receiverId",
});

///////////////////////////////////////////////  POST   ////////////////////////////////////////////////////

// Post has many Likes
db[DB_TABLES.Post].hasMany(db[DB_TABLES.Like], { foreignKey: "postId" });

// Post has many Comment
db[DB_TABLES.Post].hasMany(db[DB_TABLES.Comment], { foreignKey: "postId" });

// Post has many attachments
db[DB_TABLES.Post].hasMany(db[DB_TABLES.Attachment], {
  foreignKey: "parentId",
});

// Post belongs to only one Profile
db[DB_TABLES.Post].belongsTo(db[DB_TABLES.Profile], {
  foreignKey: "profileId",
  onDelete: "cascade",
  onUpdate: "cascade",
});

///////////////////////////////////////////// LIKE  //////////////////////////////////////////////////////
// Like belongs to only one Post
db[DB_TABLES.Like].belongsTo(db[DB_TABLES.Post], {
  foreignKey: "postId",
  onDelete: "cascade",
  onUpdate: "cascade",
});

//////////////////////////////////////////  COMMENT  ////////////////////////////////////////////////////

// Comment belongs to only one Post
db[DB_TABLES.Comment].belongsTo(db[DB_TABLES.Post], {
  foreignKey: "postId",
  onDelete: "cascade",
  onUpdate: "cascade",
});

//////////////////////////////////////   REQUEST   ////////////////////////////////////////////////////

// Request belongs to only one Profile as Sender
db[DB_TABLES.Request].belongsTo(db[DB_TABLES.Profile], {
  foreignKey: "requesterId",
});

// Request belongs to only one Profile as Reciever
db[DB_TABLES.Request].belongsTo(db[DB_TABLES.Profile], {
  foreignKey: "receiverId",
});

//////////////////////////////////////   ATTACHMENT   ////////////////////////////////////////////////////

// Attachment belongs to only one post
db[DB_TABLES.Attachment].belongsTo(db[DB_TABLES.Post], {
  foreignKey: "parentId",
  onDelete: "cascade",
  onUpdate: "cascade",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
