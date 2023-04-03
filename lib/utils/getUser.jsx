import { dbInit } from "./dbInit";

let response


export const getUser = async () => {
    try {
        if (!response) response = await dbInit('sample_mflix', 'movies')

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