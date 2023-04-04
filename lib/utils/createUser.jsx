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
                username: '',
                img: '',
                status: true,
                role: 'user',
                wishlist: [],
            })

        return { response: res }
    }catch (error){
        throw new Error('Cant insert', error.message)
    }
}