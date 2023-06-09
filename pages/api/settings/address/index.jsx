import { getToken } from "next-auth/jwt"
import { getAddress, updateAddress } from "../../../../lib/utils/updateAddress"
import { getUser } from "../../../../lib/utils/getUser"

const settingApi = async (req, res) => {

    if (req.method === 'PUT'){
        try {
            const body = req.body
            
            const { response, error} = await updateAddress(body.user, body)
            if (error) throw new Error(error)
            return res.status(200).json({ response })
            
        } catch (error) {
            return res.status(500).json({ error })
        }
    }

    if (req.method === 'GET'){
        try {
            const token = await getToken({
                req, 
                secret: process.env.NEXT_SECRET
            })

            const { user } = await getUser(token.email)
            
            const { response, error } = await getAddress(user.uuid)

            if (error) throw new Error(error)
            return res.status(200).json({ response })
            
        } catch (error) {
            return res.status(500).json({ error })
        }
    }

    res.setHeader('Allow', ['PUT', 'GET'])
    res.status(425).end('Only GET or PUT methods allowed')
}

export default settingApi