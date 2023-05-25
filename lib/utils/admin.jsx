import { dbConstants } from "../../constants/dbConstants"
import { dbInit } from "./dbInit"

let response

export const getLastUsers = async () => {
    try {
        if (!response) response = await dbInit(dbConstants.mainDb, dbConstants.usersColl)

        const query = { isAdmin: false }

        const options = {
            projection: { _id: 0 },
            limit: 5
        }

        const res = await response
            .find(query, options)
            .sort({timestamp: -1})
            .toArray()
        return { users: res }
    }catch (error){
        throw new Error('Cant get response')
    }
}

export const getUserCount = async () => {
    try {
        if (!response) response = await dbInit(dbConstants.mainDb, dbConstants.usersColl)

        const query = { isAdmin: false }

        const options = {
            projection: { _id: 0 },
        }

        const res = await response
            .count(query, options)
        return { count: res }
    }catch (error){
        throw new Error('Cant get response')
    }
}