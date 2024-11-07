const { encrypt, decrypt } = require("../../core/utils/index.js");
const { sql } = require("drizzle-orm");
const { usersTable, bitacoraLoginTable } = require("../../db/schema.ts");
const { getConnection } = require("../../db/index.ts");
const { eq } = require("drizzle-orm");

exports.register = async (req, reply) => {
    try {
        const db = await getConnection();
        const data = req.body;
        const userFound = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, data.email))
            .execute();
        if (userFound.length > 0)
            return reply.code(400).send({ message: "User alredy exists." });
        data.password = encrypt(data.password);
        const newUser = await db.insert(usersTable).values(data).returning();
        //ENVIA TODOS LOS DATOS EXCEPTO PASSWORD
        const { password: _, ...user } = newUser[0];
        const token = await addBitacora(user.idUser);
        const params = {
            token: token.token,
            username: user.name,
        };
        const jwtToken = req.server.jwt.sign(params, {
            expiresIn: "1d",
        });
        return reply.code(201).send({ token: jwtToken });
    } catch (e) {
        return reply.code(500).send({ message: "Error: " + e.message });
    }
};

exports.signin = async (req, reply) => {
    try {
        const db = await getConnection();
        const data = req.body;
        const userFound = await db
            .select()
            .from(usersTable)
            .where(sql`${usersTable.email} = ${data.email}`)
            .execute();
        const user = userFound[0];
        if (user.length == 0)
            return reply.code(401).send({ message: "User doesn't exists." });
        if (decrypt(user.password) != data.password)
            return reply.code(401).send({ message: "Wrong Credentials." });
        const token = await addBitacora(user.idUser);
        const params = {
            token: token.token,
            username: user.name,
        };
        const jwtToken = req.server.jwt.sign(params, {
            expiresIn: "1d",
        });
        return reply.code(201).send({ token: jwtToken });
    } catch (e) {
        return reply.code(500).send({ message: "Error: " + e.message });
    }
};

const addBitacora = async (idUser) => {
    const db = await getConnection();
    const data = { idUser };
    const token = await db
        .insert(bitacoraLoginTable)
        .values({ idUser: data.idUser })
        .returning();
    return token;
};
