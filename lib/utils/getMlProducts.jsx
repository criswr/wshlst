import { MlProductValidation } from "../../components/MlProductValidation"
import { mlConstants } from "../../constants/mlConstants"

export const getMlProducts = async (cat, offset) => {
    
    try {
        const fetchedProducts = fetch(`${mlConstants.mlApiUrl}sites/${mlConstants.mlSite}/search?category=${cat}&logistic_type=fulfillment&offset=${(offset - 1)*50}`)
        .then(res => res.json())
        
        const {results} =  await fetchedProducts
        const customResults = results.filter(el => MlProductValidation(el))

        if (offset>1000) return {result : []}

        return {result: customResults}
            
    } catch (error) {
        throw new Error(error)
    }
}

