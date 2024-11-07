const { sql } = require("drizzle-orm");
const { integer, pgTable, varchar, uuid, timestamp, doublePrecision,text } = require("drizzle-orm/pg-core");

const usersTable = pgTable("User", {
    "idUser": integer('idUser').primaryKey().generatedAlwaysAsIdentity(),
    "name": text('name').notNull(),
    "email": text('email').notNull(),
    "password": varchar('password',{ length: 255 }).notNull(),
    "age": integer('age').notNull(),
});


 const bitacoraLoginTable = pgTable("BiacoraLogin", {
    "idBitacora": integer('idBitacora').primaryKey().generatedAlwaysAsIdentity(),
    "idUser": integer('idUser').notNull().references(() => usersTable.idUser),
    "logInAt": timestamp('logInAt').defaultNow(),
    "logoutAt": timestamp('logoutAt'),
    "createdAt": timestamp('createdAt').defaultNow(),
    "updatedAt": timestamp('updatedAt').defaultNow(),
    }
);

// -- CreateTable
 const categoryTable = pgTable("Category", {
    "idCategory": integer('idCategory').primaryKey().generatedAlwaysAsIdentity(),
    "categoryName":  varchar('categoryName',{ length: 255 }).notNull(),
    "createdAt": timestamp('createdAt').defaultNow(),
    "updatedAt": timestamp('updatedAt').defaultNow(),

}
);

// CreateTable
 const productTable = pgTable("Product", {
    "idProduct": integer('idProduct').primaryKey().generatedAlwaysAsIdentity(),
    "productName":  varchar('productName',{ length: 255 }).notNull(),
    "price": doublePrecision('price').default(10.2),
    "stock": integer('stock').default(0),
    "categoryId": integer('categoryId').references(() => categoryTable.idCategory),
    "image": text("image"),
    "createdAt": timestamp('createdAt').defaultNow(),
    "updatedAt": timestamp('updatedAt').defaultNow(),
}
 );

module.exports = {
    usersTable,
    bitacoraLoginTable,
    categoryTable,
    productTable
}