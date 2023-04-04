import { MlProductValidation } from "../../components/MlProductValidation"
import { mlConstants } from "../../constants/mlConstants"

export const getMlProducts = async (cat) => {
    try {
        const fetchedProducts = fetch(mlConstants.mlApiUrl + 'sites/'  + mlConstants.mlSite + '/search?category=' + cat)
        .then(res => res.json())
        
        const {results} =  await fetchedProducts

        /* console.log(results, 'getml') */
/*         .map(
            item => {
                if (MlProductValidation(item)) { item }
            }
        ) */
        return {result: results}
            
    } catch (error) {
        throw new Error(error)
    }
}

