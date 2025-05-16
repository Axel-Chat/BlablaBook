export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mon API Blablbook",
      version: "1.0.0",
      description: "Documentation générée avec Swagger et ES6",
    },
    servers: [{ url: "https://blablabook-svfm.onrender.com", description: "Serveur distant (Render)" }],
  },
  apis: [
    "./src/router/**/*.js",     // routes
    "./src/swagger/**/*.js"     // schemas & components
  ],
};
