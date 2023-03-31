import clientPromise from "../mongo";

let db
let response

const init = async (dataBase, collection) => {
    if (db) return

    try {
        const client = await clientPromise
        db = await client.db(dataBase)
        response = await db.collection(collection)
    }catch(error){
        throw new Error('DB connection failed')
    }
}


export const getUser = async () => {
    try {
        if (!response) await init('sample_mflix', 'movies')
        const res = await response
            .find({})
            .limit(20)
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        return { response: res }
    }catch (error){
        throw new Error('Cant get response')
    }
}


export const getresponse = async () => {
    try {
        if (!response) await init()
        const res = await response
            .find({})
            .limit(20)
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        return { response: res }
    }catch (error){
        throw new Error('Cant get response')
    }
}