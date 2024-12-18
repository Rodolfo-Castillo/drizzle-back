require("module-alias/register");

const port = process.env.PORT || 4000;
const config = require("./src/core/config");
const fastify = require("fastify")({ logger: true });
// const nodeEnv = process.env.NODE_ENV || 'development';
fastify.register(require("@fastify/cors"), { origin: "*" });
require("./src/core/auth")(fastify);

// Routes
const routesFn = () => {
    const routes = require("./src/routes/")(fastify);
    routes.map((route) => fastify.route(route));
    fastify.get("/", async (request, reply) => {
        return { hello: "DRIZZLE + VUE + SUPABASE!!" };
    });
};
// Run the server!
const start = async () => {
    try {
        // await fastify.register(multer.contentParser);
        await fastify.register(require("@fastify/swagger"), config.swagger);
        await fastify.register(
            require("@fastify/swagger-ui"),
            config.swagger_ui
        );
        routesFn();
        await fastify.ready();
        await fastify.listen({ port: port, host: "0.0.0.0" });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
start();
