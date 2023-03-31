import { getUser } from "../../../lib/utils/getUser";

const getUserApi = async (req, res) => {
    if (req.method === 'GET'){
        try {
            const { response, error} = await getUser()
            if (error) throw new Error(error)
            return res.status(200).json({ response })
        }catch(error){
            return res.status(500).json({ error: error.message })
        }
    }

    res.setHeader('Allow', ['GET'])
    res.status(425).end('Only GET method allowed')
}

export default getUserApi