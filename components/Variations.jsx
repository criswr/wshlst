'use client'

import React, { useEffect, useState } from 'react'

import AddButton from './AddButton'

const Variations = ({variations, product, wishlist}) => {
    const [selectedVari, setSelectedVari] = useState({})
    const [uniqueVaris, setUniqueVaris] = useState({})

    const handleOnClick = (id, value) => {
        if (id in selectedVari){
            if (uniqueVaris[id].length === 1) return

            if (selectedVari[id] === value){
                setSelectedVari(prevState => {
                    const newSelected = {...prevState}
                    delete newSelected[id]
                    return newSelected
                })
                return
            }
            
            setSelectedVari(prevState => {
                const newSelected = {...prevState}
                newSelected[id] = value
                return newSelected
            })
        }else{
            setSelectedVari({...selectedVari, [id]: value})
        }
    }

    const isButtonDisabled = (id, value) => {
        if (!Object.keys(selectedVari).length) return false

        if (Object.keys(selectedVari).length === 1 && Object.keys(selectedVari)[0] === id) return false

        const isVariAvailable = (comb) => {
            for (const elem in selectedVari) {
                return comb.name === elem && comb.value_name === selectedVari[elem]
            }
        }

        const variExists = variations.some((el) => (
            el.attribute_combinations.some((comb) => comb.name === id && comb.value_name === value) &&
            el.attribute_combinations.some((comb) => isVariAvailable(comb))
            
        )) 
        if (!variExists) return true
    }

    const isButtonSelected = (id, value) => selectedVari[id] === value
    
    useEffect(() => {
        const uniqueVarsIds = () => {
            const varsIds = []
            for (const vari of variations) {
                for (const atr of vari.attribute_combinations) {
                    varsIds.push(atr.name)
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
                    varsObj[val.name] = [...new Set([...varsObj[val.name], val.value_name])]
                }
            }
            return varsObj
        }
        setUniqueVaris(uniqueVarsValues())
    }, [])

    useEffect(() => {
        let defaultSelected = {}
        for (const vari in uniqueVaris) {
            if (uniqueVaris[vari].length === 1) {
                defaultSelected = {...defaultSelected, [vari]: uniqueVaris[vari][0]}
            }
        }
        setSelectedVari(defaultSelected)
    }, [uniqueVaris])
    
    return (
        <div>
            {Object.keys(uniqueVaris).length !== 0 &&
                <div>
                    {Object.keys(uniqueVaris).map((el) => (
                        <div key={el}>
                            <p className='font-semibold mt-4'>{el}:</p>
                                {uniqueVaris[el].map((vari) => (
                                    <button 
                                        onClick={() => handleOnClick(el, vari)} key={vari} disabled={isButtonDisabled(el, vari)}
                                        className={`bg-grey font-semibold py-2 px-4 mr-2 mb-2 border border-muted rounded shadow disabled:opacity-40 disabled:cursor-default ${isButtonSelected(el, vari) ? 'bg-primary hover:bg-primary' : 'hover:bg-white'}`}
                                    >{vari}</button>
                                ))}
                        </div>
                    ))}

                    <AddButton product={product} uniqueVaris={uniqueVaris} selectedVari={selectedVari} wishlist={wishlist} single/>
                </div>
            }
        </div>
    )
}

export default Variations