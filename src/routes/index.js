module.exports = (fastify) => [
    ...require("../modules/auth/router")(fastify),
    ...require("../modules/category/router")(fastify),
    ...require("../modules/product/router")(fastify),
];
