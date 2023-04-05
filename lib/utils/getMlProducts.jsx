import { MlProductValidation } from "../../components/MlProductValidation"
import { mlConstants } from "../../constants/mlConstants"

export const getMlProducts = async (cat, offset) => {
    const paginate = (length, elementsPerPage, requestPage) => {
        let start = 0, end = 0
        if (length) {
          const maxPages = Math.ceil(length / elementsPerPage)
          const page =
            !requestPage || requestPage <= 0
                ? 1
                : requestPage > maxPages
                ? maxPages
                : requestPage
          start = (page - 1) * elementsPerPage
          end = page * elementsPerPage
        }
        return { start, end }
    }
    
    try {
        const fetchedProducts = fetch(`${mlConstants.mlApiUrl}sites/${mlConstants.mlSite}/search?category=${cat}&logistic_type=fulfillment`)
        .then(res => res.json())
        
        const {results} =  await fetchedProducts
        const customResults = results.filter(el => MlProductValidation(el))

        const elementsPerPage = 2
        const {start, end} = paginate(customResults.length, elementsPerPage, offset)

        if (offset>Math.ceil(customResults.length / elementsPerPage)) return {result : []}

        return {result: customResults.slice(start, end)}
            
    } catch (error) {
        throw new Error(error)
    }
}

