import { dbInit } from "./dbInit";
import { dbConstants } from "../../constants/dbConstants";
import { updateSettings } from "./updateSettings";

let response

export const updateAddress = async (uuid, address) => {
    try {
        if (!response) response = await dbInit(dbConstants.mainDb, dbConstants.addressesColl)

        const query = { user: uuid }

        const update = { $set: address }

        const options = {
            upsert: true
        }

        const res = await response
        .updateOne(query, update, options)

        const userBody = {
            uuid,
            newAddress: address.city.id
        }

        const userRes = await updateSettings(userBody)

        return { response: res, userRes }
    }catch (error){
        throw new Error('Cant update', error.message)
    }
}

export const getAddress = async (uuid) => {
    try {
        if (!response) response = await dbInit(dbConstants.mainDb, dbConstants.addressesColl)

        const query = { user: uuid }
        const options = {
            projection: { _id: 0 },
        }
        const res = await response
            .findOne(query, options)

        return { response: res }
    }catch (error){
        throw new Error('Cant update', error.message)
    }
}