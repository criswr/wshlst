import { getMlProducts } from "../../../lib/utils/getMlProducts"


const productsApi = async (req, res) => {
    if (req.method === 'POST'){
        try {
            const body = req.body //JSON.parse(req.body)
            const { result, error } = await getMlProducts(body.category, body.page)
            if (error) throw new Error(error)
            return res.status(200).json(result)
            
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    res.setHeader('Allow', ['POST'])
    res.status(425).end('Only POST method allowed')
}

export default productsApi