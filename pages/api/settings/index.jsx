import { updateSettings } from "../../../lib/utils/updateSettings"

const settingApi = async (req, res) => {

    if (req.method === 'PUT'){
        try {
            const body = req.body //    JSON.parse(req.body)
            
            const { response, error} = await updateSettings(body)
            if (error) throw new Error(error)
            return res.status(200).json({ response })
            
        } catch (error) {
            return res.status(500).json({ error })
        }
    }

    res.setHeader('Allow', ['PUT'])
    res.status(425).end('Only PUT methods allowed')
}

export default settingApi