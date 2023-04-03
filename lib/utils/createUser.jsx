import { dbInit } from "./dbInit";
import { dbConstants } from "../../constants/dbConstants";

let response

export const createUser = async (email, name) => {
    try {
        if (!response) response = await dbInit(dbConstants.mainDb, dbConstants.usersColl)

        const res = await response
            .insertOne({
                email,
                name,
                status: true,
                wishlist: {},
            })

        return { response: res }
    }catch (error){
        throw new Error('Cant insert', error.message)
    }
}