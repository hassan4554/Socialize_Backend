const { DB_TABLES } = require("@Constants");

module.exports = (db) => {
  //////////////////////////////////////////////    USER    /////////////////////////////////////////////////////

  // User has only one Profile
  db[DB_TABLES.User].hasOne(db[DB_TABLES.Profile]);

  ///////////////////////////////////////////////  PROFILE   ///////////////////////////////////////////////////

  // Profile belongs to only one User
  db[DB_TABLES.Profile].belongsTo(db[DB_TABLES.User], {
    foreignKey: "userId",
    onDelete: "cascade",
    onUpdate: "cascade",
  });

  // Profile has many likes
  db[DB_TABLES.Profile].hasMany(db[DB_TABLES.Like]);

  // Profile has many Post
  db[DB_TABLES.Profile].hasMany(db[DB_TABLES.Post]);

  // Profile has many comments
  db[DB_TABLES.Profile].hasMany(db[DB_TABLES.Comment]);

  ///////////////////////////////////////////////  POST   ////////////////////////////////////////////////////

  // Post has many Likes
  db[DB_TABLES.Post].hasMany(db[DB_TABLES.Like]);

  // Post has many Comment
  db[DB_TABLES.Post].hasMany(db[DB_TABLES.Comment]);

  ///////////////////////////////////////////// LIKE  //////////////////////////////////////////////////////
  // Like belongs to only one Post
  db[DB_TABLES.Like].belongsTo(db[DB_TABLES.Post], {
    foreignKey: "postId",
    onDelete: "cascade",
    onUpdate: "cascade",
  });

  // Like belongs to only one Profile
  db[DB_TABLES.Like].belongsTo(db[DB_TABLES.Profile], {
    foreignKey: "profileId",
    onDelete: "cascade",
    onUpdate: "cascade",
  });

  /////////////////////////// //////////////  COMMENT  ////////////////////////////////////////////////////

  // Comment belongs to only one Post
  db[DB_TABLES.Comment].belongsTo(db[DB_TABLES.Post], {
    foreignKey: "postId",
    onDelete: "cascade",
    onUpdate: "cascade",
  });

  // Comment belongs to only one Profile
  db[DB_TABLES.Comment].belongsTo(db[DB_TABLES.Profile], {
    foreignKey: "profileId",
    onDelete: "cascade",
    onUpdate: "cascade",
  });
};
