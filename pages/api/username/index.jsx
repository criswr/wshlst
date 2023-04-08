import { changeUsername } from "../../../lib/utils/changeUsername"

const usernameApi = async (req, res) => {

    if (req.method === 'PUT'){
        try {
            const body = req.body //JSON.parse(req.body)

            const { response, error} = await changeUsername(body.email, body.newUsername)
            if (error) throw new Error(error)
            return res.status(200).json({ response })
            
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }


    res.setHeader('Allow', ['PUT'])
    res.status(425).end('Only PUT methods allowed')
}

export default usernameApi