import { dbConstants } from "../../constants/dbConstants";
import { dbInit } from "./dbInit";

let response


export const getUser = async (email) => {
    try {
        if (!response) response = await dbInit(dbConstants.mainDb, dbConstants.usersColl)

        const query = { email: email }
        const options = {
            projection: { _id: 0 },
        }

        const res = await response
            .findOne(query, options)
        return { user: res }
    }catch (error){
        throw new Error('Cant get response')
    }
}

export const getUserByUsername = async (username) => {
    try {
        if (!response) response = await dbInit(dbConstants.mainDb, dbConstants.usersColl)

        const query = { username: username }
        const options = {
            projection: { _id: 0 },
        }
        const res = await response
            .findOne(query, options)
        return { user: res }
    }catch (error){
        throw new Error('Username not found')
    }
}


const getresponse = async () => {
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