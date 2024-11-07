const { schema_error } = require("../../core/utils");
module.exports = {
    auth_schema: {
        tags: ["Auth"],
        summary: "Signin user",
        description: "Returns a JWT from user login",
        body: {
            type: "object",
            properties: {
                password: {
                    type: "string",
                },
                email: {
                    type: "string",
                },
            },
            required: ["password", "email"],
        },
        response: {
            200: {
                description: "Returns Whatsapp model",
                type: "object",
                properties: {
                    token: {
                        type: "string",
                    },
                },
            },
            404: schema_error(404),
            401: schema_error(401),
        },
    },
    register_schema: {
        tags: ["Register"],
        summary: "Signin user",
        description: "Returns a new user and JWT from user",
        body: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                },
                email: {
                    type: "string",
                },
                password: {
                    type: "string",
                },
                age: {
                    type: "integer",
                },
            },
            required: ["name", "email", "password", "age"],
        },
        response: {
            200: {
                description: "Returns token",
                type: "object",
                properties: {
                    token: {
                        type: "string",
                    },
                },
            },
            404: schema_error(404),
            401: schema_error(401),
        },
    },
};
