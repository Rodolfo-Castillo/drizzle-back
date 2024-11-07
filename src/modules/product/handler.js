const { sql, eq } = require("drizzle-orm");
const { categoryTable, productTable } = require("../../db/schema.ts");
const { getConnection } = require("../../db/index.ts");

exports.add = async (req, reply) => {
    try {
        const db = await getConnection();
        const data = req.body;
        const categoryFound = await db
            .select()
            .from(productTable)
            .where(
                sql`${productTable.categoryId} = ${data.categoryId} AND ${productTable.productName} = ${data.productName}`
            )
            .execute();
        if (categoryFound.length > 0)
            return reply.code(401).send({ message: "Product alredy added." });
        const newCategory = await db
            .insert(productTable)
            .values({
                productName: data.productName,
                price: data.price,
                categoryId: data.categoryId,
                stock: data.stock,
                image: data.image,
            })
            .returning();
        return reply.code(201).send(newCategory[0]);
    } catch (e) {
        return reply.code(500).send({ message: "Error: " + e.message });
    }
};

exports.list = async (req, reply) => {
    try {
        const db = await getConnection();
        const list = await db
            .select({
                idProduct: productTable.idProduct,
                productName: productTable.productName,
                image: productTable.image,
                categoryName: categoryTable.categoryName,
            })
            .from(productTable)
            .innerJoin(
                categoryTable,
                eq(productTable.categoryId, categoryTable.idCategory)
            )
            .execute();
        console.log(list);
        return reply.code(200).send(list);
    } catch (e) {
        return reply.code(500).send({ message: "Error: " + e.message });
    }
};

exports.get = async (req, reply) => {
    try {
        const db = await getConnection();
        const get = await db
            .select({
                idProduct: productTable.idProduct,
                productName: productTable.productName,
                price: productTable.price,
                stock: productTable.stock,
                image: productTable.image,
                categoryId: productTable.categoryId,
                categoryName: categoryTable.categoryName,
            })
            .from(productTable)
            .innerJoin(
                categoryTable,
                eq(productTable.categoryId, categoryTable.idCategory)
            )
            .where(sql`${productTable.idProduct} = ${req.params.idProduct}`)
            .execute();
        return reply.code(200).send(get[0]);
    } catch (e) {
        return reply.code(500).send({ message: "Error: " + e.message });
    }
};

exports.update = async (req, reply) => {
    try {
        const db = await getConnection();
        const data = req.body;
        const updatedCategory = await db
            .update(productTable)
            .set({
                updatedAt: sql`NOW()`,
                productName: data.productName,
                price: data.price,
                stock: data.stock,
                categoryId: data.categoryId,
            })
            .where(sql`${productTable.idProduct} = ${req.params.idProduct}`)
            .returning();
        return reply.code(200).send(updatedCategory);
    } catch (e) {
        return reply.code(500).send({ message: "Error: " + e.message });
    }
};

exports.delete = async (req, reply) => {
    try {
        const db = await getConnection();

        const deletedProduct = await db
            .delete(productTable)
            .where(sql`${productTable.idProduct} = ${req.params.idProduct}`)
            .returning();
        return reply.code(200).send(deletedProduct[0]);
    } catch (e) {
        return reply.code(500).send({ message: "Error: " + e.message });
    }
};
