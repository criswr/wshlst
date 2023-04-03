import { dbInit } from "./dbInit";
import { dbConstants } from "../../constants/dbConstants";

let response

export const addRemoveFromList = async (email, item) => {
    try {
        if (!response) response = await dbInit(dbConstants.mainDb, dbConstants.usersColl)

        const userQuery = { email: email }
        
        const user = await response
            .findOne(userQuery)

        if (user.wishlist.includes(item)) {  
            const removeItem = {}         
        }else{
            const addItem = {
                $set: {
                    wishlist: [...user.wishlist, item]
                },
            }
            const result = await response.updateOne(userQuery, addItem)
            return { result }
        }
            
        return { user: res }
    }catch (error){
        throw new Error('Cant get response')
    }
}