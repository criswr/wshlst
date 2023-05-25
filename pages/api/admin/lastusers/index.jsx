import { getToken } from "next-auth/jwt";
import { getLastUsers } from "../../../../lib/utils/admin";
import { getUser } from "../../../../lib/utils/getUser";

const adminApi = async (req, res) => {
    const token = await getToken({
        req, 
        secret: process.env.NEXT_SECRET
    })

    const { user, error} = await getUser(token.email)
    if (error) throw new Error(error)
    if (!user.isAdmin) res.status(401).end('Unauthorized')

    if (req.method === 'GET'){
        try {
            const { users, error } = await getLastUsers()
            if (error) throw new Error(error)
            return res.status(200).json({ users })
        }catch(error){
            return res.status(500).json({ error: error.message })
        }
    }

    res.setHeader('Allow', ['GET', 'POST'])
    res.status(425).end('Only GET or POST methods allowed')
}

export default adminApi