const { schema_error } = require("../../core/utils");
module.exports = {
    category_add_schema: {
        tags: ["Category"],
        summary: "Add record to category schema",
        description: "Returns a category record",
        body: {
            type: "object",
            properties: {
                categoryName: {
                    type: "string",
                },
            },
            required: ["categoryName"],
        },
        response: {
            201: {
                description: "Returns Category record added successfully",
                type: "object",
                properties: {
                    idCategory: {
                        type: "number",
                    },
                    categoryName: {
                        type: "string",
                    },
                },
            },
            404: schema_error(404),
            401: schema_error(401),
        },
    },
    category_list_schema: {
        tags: ["Category"],
        summary: "List of category schema",
        description: "Returns the category list",
        response: {
            200: {
                description: "Returns an Array Category",
                type: "array",
                item: {
                    type: "object",
                    properties: {
                        idCategory: {
                            type: "number",
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
    category_update_schema: {
        tags: ["Category"],
        summary: "Update a record to category schema",
        description: "Returns Updated category",
        body: {
            type: "object",
            properties: {
                categoryName: {
                    type: "string",
                },
            },
            required: ["categoryName"],
        },
        response: {
            200: {
                description: "Returns a updated Category successfully",
                type: "object",
                properties: {
                    idCategory: {
                        type: "number",
                    },
                    categoryName: {
                        type: "string",
                    },
                },
            },
            404: schema_error(404),
            401: schema_error(401),
        },
    },
    category_delete_schema: {
        tags: ["Category"],
        summary: "Delete a record to category schema",
        description: "Returns deleted category",
        response: {
            200: {
                description: "Returns a deleted Category successfully",
                type: "object",
                properties: {
                    idCategory: {
                        type: "number",
                    },
                    categoryName: {
                        type: "string",
                    },
                },
            },
            404: schema_error(404),
            401: schema_error(401),
        },
    },
};
