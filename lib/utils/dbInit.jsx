import clientPromise from "../mongo";


export const dbInit = async (dataBase, collection) => {
    try {
        const client = await clientPromise
        const db = await client.db(dataBase)
        return await db.collection(collection)
    }catch(error){
        throw new Error('DB connection failed')
    }
}