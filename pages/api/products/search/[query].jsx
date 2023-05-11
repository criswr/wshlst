import { getMlProducts } from "../../../../lib/utils/getMlProducts"

const searchApi = async (req, res) => {
    if (req.method === 'GET'){
        try {
            const { query } = req.query
            const body = req.body //    JSON.parse(req.body)
            const queryKey = 'q'
            const { result, error } = await getMlProducts(query, body.offset, queryKey)
            if (error) throw new Error(error)
            return res.status(200).json(result)
            
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    res.setHeader('Allow', ['GET'])
    res.status(425).end('Only GET method allowed')
}

export default searchApi