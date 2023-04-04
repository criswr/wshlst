import { createUser } from "../../../lib/utils/createUser";
import { getUser, getUserByUsername } from "../../../lib/utils/getUser";

const userApi = async (req, res) => {
    if (req.method === 'GET'){
        try {
            const { response, error} = await getUser()
            if (error) throw new Error(error)
            return res.status(200).json({ response })
        }catch(error){
            return res.status(500).json({ error: error.message })
        }
    }

    if (req.method === 'POST'){
        try {
            const body = req.body //JSON.parse(req.body)

            if (body.username){
                const { user } = await getUserByUsername(body.username)
                return res.status(200).json({ user })
            }

            const { user } = await getUser(body.email)

            if (!user){
                const { response, error} = await createUser(body.email, body.name)
                if (error) throw new Error(error)
                return res.status(200).json({ response })
            }

            return res.status(200).json({ user })
            
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }


    res.setHeader('Allow', ['GET', 'POST'])
    res.status(425).end('Only GET or POST methods allowed')
}

export default userApi