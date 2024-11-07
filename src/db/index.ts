const { drizzle } = require('drizzle-orm/postgres-js')
const postgres = require('postgres')

const getConnection = async () => {
    const client = postgres("postgresql://postgres.vxadwwlgjrhoshndlxhu:E4R6s2i1G3$@aws-0-us-east-1.pooler.supabase.com:6543/postgres",{prepare:false})
    const db = drizzle({ client });
    return db;
}



async function main() {
    const client = postgres("postgresql://postgres.vxadwwlgjrhoshndlxhu:E4R6s2i1G3$@aws-0-us-east-1.pooler.supabase.com:6543/postgres",{prepare:false})
    const db = drizzle({ client });
}
main();

module.exports = {
    getConnection
}