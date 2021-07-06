import { MongoClient } from "mongodb";

declare let process : {
    env: {
        DATABASE_URL: string
    }
}

const client = new MongoClient(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function connect() {
    if (!client.isConnected()) await client.connect();
    const db = client.db("invitation");
    return { db, client };
}

export { connect };