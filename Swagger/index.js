const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "A simple Express API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  // apis: [path.join(__dirname, '../Routes/**/*.js')], // Path to your route files with Swagger comments
  apis: [path.join(__dirname, './**/*.js')], // Path to your route files with Swagger comments
};

// require('./**/*.js')
const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerSpec };
