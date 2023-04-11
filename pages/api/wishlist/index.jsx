import { addRemoveFromList } from "../../../lib/utils/addRemoveFromList"

const wishlistApi = async (req, res) => {
    if (req.method === 'POST'){
        try {
            const body = req.body //JSON.parse(req.body)
            const { result, error } = await addRemoveFromList(body.email, body.item)
            if (error) return res.status(500).json({ error: error })
            return res.status(200).json({ result })
            
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    res.setHeader('Allow', ['POST'])
    res.status(425).end('Only GET or POST methods allowed')
}

export default wishlistApi