
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

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
                url: "https://gateway-9pxx.onrender.com",
            },
        ],
    },
    apis: ["./routes/*.js"], 
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
export { swaggerDocs, swaggerUi };
