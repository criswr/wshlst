import { getMlProducts } from "../../../lib/utils/getMlProducts"


const productsApi = async (req, res) => {
    if (req.method === 'GET'){
        try {
            const { cat, q, offset } = req.query
            const queryKey = cat ? 'category' : 'q'
            const query = cat || q
            const { result, error } = await getMlProducts(query, offset, queryKey)
            if (error) throw new Error(error)
            return res.status(200).json(result)
            
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    res.setHeader('Allow', ['GET'])
    res.status(425).end('Only GET method allowed')
}

export default productsApi