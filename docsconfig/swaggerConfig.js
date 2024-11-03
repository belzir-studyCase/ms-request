// swaggerConfig.js
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';




// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Request API",
            version: "1.0.0",
            description: "API for request management",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js"], // Adjust path if needed
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
export { swaggerDocs, swaggerUi };
