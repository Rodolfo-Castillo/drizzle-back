const { sql } = require("drizzle-orm");
const { categoryTable } = require("../../db/schema.ts");
const { getConnection } = require("../../db/index.ts");

exports.add = async (req, reply) => {
    try {
        const db = await getConnection();
        const data = req.body;
        const categoryFound = await db
            .select()
            .from(categoryTable)
            .where(sql`${categoryTable.categoryName} = ${data.categoryName}`)
            .execute();
        if (categoryFound.length > 0)
            return reply.code(401).send({ message: "Category alredy added." });
        const newCategory = await db
            .insert(categoryTable)
            .values({ categoryName: data.categoryName })
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
                idCategory: categoryTable.idCategory,
                categoryName: categoryTable.categoryName,
            })
            .from(categoryTable)
            .execute();
        return reply.code(200).send(list);
    } catch (e) {
        return reply.code(500).send({ message: "Error: " + e.message });
    }
};

exports.update = async (req, reply) => {
    try {
        const db = await getConnection();

        const updatedCategory = await db
            .update(categoryTable)
            .set({
                updatedAt: sql`NOW()`,
                categoryName: req.body.categoryName,
            })
            .where(sql`${categoryTable.idCategory} = ${req.params.idCategory}`)
            .returning();
        return reply.code(200).send(updatedCategory[0]);
    } catch (e) {
        return reply.code(500).send({ message: "Error: " + e.message });
    }
};

exports.delete = async (req, reply) => {
    try {
        const db = await getConnection();

        const deletedCategory = await db
            .delete(categoryTable)
            .where(sql`${categoryTable.idCategory} = ${req.params.idCategory}`)
            .returning();
        return reply.code(200).send(deletedCategory[0]);
    } catch (e) {
        return reply.code(500).send({ message: "Error: " + e.message });
    }
};
