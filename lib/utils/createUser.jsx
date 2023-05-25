import { dbInit } from "./dbInit";
import { dbConstants } from "../../constants/dbConstants";

let response

export const createUser = async (email, name) => {
    try {
        if (!response) response = await dbInit(dbConstants.mainDb, dbConstants.usersColl)

        const uuid = () => {
            return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g,
            (c) => {
               const id = Math.random() * 16 | 0
               return id.toString(16)
            })
        }

        const res = await response
            .insertOne({
                uuid: uuid(),
                email,
                name,
                username: '',
                img: '',
                address: {},
                birthdate: '',
                status: true,
                isAdmin: false,
                wishlist: [],
                timestamp: Date.now(),
                config: {
                    showBirthday: false
                }
            })

        return { response: res }
    }catch (error){
        throw new Error('Cant insert', error.message)
    }
}