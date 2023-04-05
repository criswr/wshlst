import { dbInit } from "./dbInit";
import { dbConstants } from "../../constants/dbConstants";

let response

export const addRemoveFromList = async (email, item) => {
    try {
        if (!response) response = await dbInit(dbConstants.mainDb, dbConstants.usersColl)

        const userQuery = { email: email }
        
        const user = await response
            .findOne(userQuery)
        
        const addItem = {
            $set: {
                wishlist: [...user.wishlist, item]
            },
        }

        const removeItem = {
            $set: {
                wishlist: user.wishlist.filter(el => el.id !== item.id)
            },
        }

        const isAdded = user.wishlist.some(el => el.id === item.id)

        const result = await response.updateOne(userQuery, isAdded ? removeItem : addItem)

        return { result }

    }catch (error){
        throw new Error('Cant get response')
    }
}