import { dbConstants } from "../../constants/dbConstants";
import { dbInit } from "./dbInit";


let response

export const changeUsername = async (email, newUsername) => {
    try {
        if (!response) response = await dbInit(dbConstants.mainDb, dbConstants.usersColl)

        const emailQuery = { email: email }
        const usernameQuery = { username: newUsername }
        const options = {
            projection: { _id: 0 },
        }
        const getRes = await response
        .findOne(usernameQuery, options)

        if (getRes) return { error: 'Username taken'}

        const res = await response
            .updateOne(emailQuery, { $set: { 'username' : newUsername } })

        return { response: res }
    }catch (error){
        throw new Error('Cant get response')
    }
}
