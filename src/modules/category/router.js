const Handler = require("./handler");
const Schema = require("./schema");
module.exports = (fastify) => [
    {
        method: "POST",
        url: "/category",
        schema: Schema.category_add_schema,
        handler: Handler.add,
    },
    {
        method: "GET",
        url: "/category",
        schema: Schema.category_list_schema,
        handler: Handler.list,
    },
    {
        method: "PUT",
        url: "/category/:idCategory",
        schema: Schema.category_update_schema,
        handler: Handler.update,
    },
    {
        method: "DELETE",
        url: "/category/:idCategory",
        schema: Schema.category_delete_schema,
        handler: Handler.delete,
    },
];
