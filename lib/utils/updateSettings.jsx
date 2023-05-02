import { dbConstants } from "../../constants/dbConstants";
import { dbInit } from "./dbInit";


let response

export const updateSettings = async ({email, newUsername, newName, newBirthdate, newConfig}) => {
    try {
        if (!response) response = await dbInit(dbConstants.mainDb, dbConstants.usersColl)

        const emailQuery = { email: email }
        const options = {
            projection: { _id: 0 },
        }

        if (newUsername) {
            const usernameQuery = { username: newUsername }
            const getRes = await response
            .findOne(usernameQuery, options)
            
            if (getRes) return { error: 'Nombre de usuario no disponible'}
            
            const res = await response
            .updateOne(emailQuery, { $set: { 'username' : newUsername } })
            
            return { response: res }
        }

        if (newName) {
            const res = await response
            .updateOne(emailQuery, { $set: { 'name' : newName } })
            
            return { response: res }
        } 

        if (newBirthdate) {
            const res = await response
            .updateOne(emailQuery, { $set: { 'birthdate' : newBirthdate } })
            
            return { response: res }
        }

        if (newConfig) {
            const res = await response
            .updateOne(emailQuery, { $set: { 'config' : newConfig } })
            
            return { response: res }
        } 
    }catch (error){
        throw new Error('Hubo un error, intenta en un momento')
    }
}
