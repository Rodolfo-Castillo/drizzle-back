const Handler = require("./handler");
const Schema = require("./schema");
module.exports = (fastify) => [
    {
        method: "POST",
        url: "/product",
        schema: Schema.product_add_schema,
        handler: Handler.add,
    },
    {
        method: "GET",
        url: "/products",
        schema: Schema.product_list_schema,
        handler: Handler.list,
    },
    {
        method: "GET",
        url: "/product/:idProduct",
        schema: Schema.product_get_schema,
        handler: Handler.get,
    },
    {
        method: "PUT",
        url: "/product/:idProduct",
        schema: Schema.product_update_schema,
        handler: Handler.update,
    },
    {
        method: "DELETE",
        url: "/product/:idProduct",
        schema: Schema.product_delete_schema,
        handler: Handler.delete,
    },
];
