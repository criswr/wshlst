'use client'

import React, { useEffect, useState } from 'react'

const Variations = ({variations}) => {
    const [selectedVari, setSelectedVari] = useState({})
    const [uniqueVaris, setUniqueVaris] = useState({})

    const handleOnClick = (id, value) => {
        if (id in selectedVari){
            setSelectedVari(prevState => {
                const newSelected = {...prevState}
                newSelected[id] = value
                return newSelected
            })
        }else{
            setSelectedVari({...selectedVari, [id]: value})
        }
    }

    
    useEffect(() => {
        const uniqueVarsIds = () => {
            const varsIds = []
            for (const vari of variations) {
                for (const atr of vari.attribute_combinations) {
                    varsIds.push(atr.id)
                }
            }
            return [...new Set(varsIds)]
        }

        const uniqueVarsValues = () => {
            const varsObj = uniqueVarsIds().reduce((accumulator, value) => {
                return {...accumulator, [value]: []}
              }, {})

            for (const vari of variations) {
                for (const val of vari.attribute_combinations) {
                    varsObj[val.id] = [...new Set([...varsObj[val.id], val.value_name])]
                }
            }
            return varsObj
        }
        setUniqueVaris(uniqueVarsValues())
    }, [])

    useEffect(() => {
      console.log(selectedVari)
    }, [selectedVari])
    
    
    return (
        <div>
            <p>Variations</p>
            {Object.keys(uniqueVaris).length !== 0 &&
                <div>
                    {Object.keys(uniqueVaris).map((el) => (
                        <div key={el}>
                            <p>{el}</p>
                                {uniqueVaris[el].map((vari) => (
                                    <button onClick={() => handleOnClick(el, vari)} key={vari} disabled={false}>{vari}</button>
                                ))}
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Variations