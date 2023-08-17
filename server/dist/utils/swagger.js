import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
// import version from "../../package.json" assert { type: "json"};
const version = 1;
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Docs",
            version,
        },
    },
    apis: ["app/routes/*.js", "app/models/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);
export function swaggerDocs(app, port) {
    // Swagger page
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Docs in JSON format
    app.get("/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
}
