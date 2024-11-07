const { schema_error } = require("../../core/utils");
module.exports = {
    product_add_schema: {
        tags: ["Product"],
        summary: "Add record to product schema",
        description: "Returns a product record",
        body: {
            type: "object",
            properties: {
                productName: {
                    type: "string",
                },
                price: {
                    type: "number",
                },
                categoryId: {
                    type: "number",
                },
                stock: {
                    type: "number",
                },
                image: {
                    type: "string",
                },
            },
            required: ["productName", "price", "stock", "image", "categoryId"],
        },
        response: {
            201: {
                description: "Returns product record added successfully",
                type: "object",
                properties: {
                    idProduct: {
                        type: "number",
                    },
                    productName: {
                        type: "string",
                    },
                    price: {
                        type: "number",
                    },
                    stock: {
                        type: "number",
                    },
                    categoryId: {
                        type: "number",
                    },
                    image: {
                        type: "string",
                    },
                },
            },
            404: schema_error(404),
            401: schema_error(401),
        },
    },
    product_list_schema: {
        tags: ["Product"],
        summary: "List of product schema",
        description: "Returns the product list",
        response: {
            200: {
                description: "Returns an Array product",
                type: "array",
                item: {
                    type: "object",
                    properties: {
                        idProduct: {
                            type: "number",
                        },
                        productName: {
                            type: "string",
                        },
                        price: {
                            type: "number",
                        },
                        stock: {
                            type: "number",
                        },
                        image: {
                            type: "string",
                        },
                        categoryName: {
                            type: "string",
                        },
                    },
                },
            },
            404: schema_error(404),
            401: schema_error(401),
        },
    },
    product_get_schema: {
        tags: ["Product"],
        summary: "Get product schema",
        description: "Returns a product",
        response: {
            200: {
                description: "Returns an object product",
                type: "object",
                properties: {
                    idProduct: {
                        type: "number",
                    },
                    productName: {
                        type: "string",
                    },
                    price: {
                        type: "number",
                    },
                    stock: {
                        type: "number",
                    },
                    image: {
                        type: "string",
                    },
                    categoryId: {
                        type: "number",
                    },
                },
            },
            404: schema_error(404),
            401: schema_error(401),
        },
    },
    product_update_schema: {
        tags: ["Product"],
        summary: "Update a record to product schema",
        description: "Returns Updated product",
        body: {
            type: "object",
            properties: {
                productName: {
                    type: "string",
                },
                price: {
                    type: "number",
                },
                categoryId: {
                    type: "number",
                },
                stock: {
                    type: "number",
                },
                image: {
                    type: "string",
                },
            },
            required: ["productName", "price", "stock", "image", "categoryId"],
        },
        response: {
            200: {
                description: "Returns an object product",
                type: "object",
                properties: {
                    idProduct: {
                        type: "number",
                    },
                    productName: {
                        type: "string",
                    },
                    price: {
                        type: "number",
                    },
                    stock: {
                        type: "number",
                    },
                    image: {
                        type: "string",
                    },
                    categoryId: {
                        type: "number",
                    },
                },
            },
            404: schema_error(404),
            401: schema_error(401),
        },
    },
    product_delete_schema: {
        tags: ["Product"],
        summary: "Delete a record to product schema",
        description: "Returns deleted product",
        response: {
            200: {
                description: "Returns an object product",
                type: "object",
                properties: {
                    idProduct: {
                        type: "number",
                    },
                },
            },
            404: schema_error(404),
            401: schema_error(401),
        },
    },
};
