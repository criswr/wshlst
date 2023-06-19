'use client'

import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../components/context/context'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import profileIcon from '../../public/profileIcon.svg'
import arrowsRight from '../../public/arrowsRight.svg'
import { price } from '../../components/Price'
import { mlConstants } from '../../constants/mlConstants'
import { LoadingText } from '../../components/LoadingPlaceholders'
import PaymentImput from '../../components/payment/PaymentImput'
import PaymentButton from '../../components/payment/PaymentButton'


const Regalar = () => {
    const {gift, recipient } = useContext(UserContext)
    const router = useRouter()

    const [shippingCost, setShippingCost] = useState()
    const [serviceCost, setServiceCost] = useState()
    const [total, setTotal] = useState()
    const [metadata, setMetadata] = useState({name: 'Anónimo', message: '¡Que lo disfrutes!'})
    
    useEffect(() => {
/*         console.log('gift', gift)
        console.log('recipient', recipient) */

        const calculateService = (price, shipping) => {
            const fee = 0.15
            const feeCost = () => {
                const cost = (price + shipping) * fee
                const lastDigit = cost % 10
                const difference = 10 - lastDigit

                if (lastDigit === 0) return cost
                return cost + difference
            }

            setServiceCost(feeCost())
            setTotal(price + shipping + feeCost())
        }

        const findShipping = options => {
            const option = options.find(method => method.display === 'recommended')
            setShippingCost(option.cost)
            calculateService(gift.price, option.cost)
        }

        const fetchShippingCost = () => {
            fetch(mlConstants.mlApiUrl + 'items/' + gift.id + '/shipping_options?city_to=' + recipient.address, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            })
            .then(res => res.json())
            .then(data => {
                console.log('data', data);
                data.options && findShipping(data.options)
            })
        }
        fetchShippingCost()

    }, [gift])

    const handleOnChangeName = e => {
        setMetadata({...metadata, name: e.target.value})
    }

    const handleOnChangeMessage = e => {
        setMetadata({...metadata, message: e.target.value})
    }
    
    if (!gift || !recipient) return router.back()

    return (
        <div className='p-2 pb-5 w-full flex flex-col justify-center gap-10'>
            <h1 className='text-center text-2xl'>Vas a regalarle <span className='font-bold'>{gift.title}</span> a <span className='font-bold'>{recipient.name}</span></h1>
            <div className='flex justify-center gap-5'>
                <Image src={gift.secure_thumbnail ? gift.secure_thumbnail : profileIcon } alt={recipient.name} width={100} height={100} className='rounded-full shadow' />
                <Image src={arrowsRight} alt={recipient.name} width={50} height={50} className='' />
                <Image src={recipient.img ? recipient.img : profileIcon } alt={recipient.name} width={100} height={100} className='rounded-full shadow' />
            </div>
            <div className='w-full flex flex-col items-center gap-2'>
                <PaymentImput type='text' label='Tu nombre' name='name' value={metadata.name} bottom='Puede ser un regalo anónimo' maxLength='20' onChange={e => handleOnChangeName(e)} />
                <PaymentImput type='text' label='Mensaje' name='message' value={metadata.message} bottom='No indiques datos de contacto ni incluyas palabras obsenas' maxLength='50' onChange={e => handleOnChangeMessage(e)} />
            </div>

            <div className='max-w-lg p-3 bg-white rounded mx-auto'>
                <table class='table-fixed mx-auto'>
                    <tbody>
                        <tr>
                            <td className='w-full text-ellipsis line-clamp-1 mr-2 '>{gift.title}</td>
                            <td className='w-1/5 text-right'>{price(gift.price)}</td>
                        </tr>
                        <tr>
                            <td>Despacho</td>
                            <td className='text-right'>
                                {shippingCost === 0 && <span>Gratis</span>}
                                {shippingCost > 0 && price(shippingCost)}
                                {!shippingCost && shippingCost !== 0 && <LoadingText />}
                            </td>
                        </tr>
                        <tr>
                            <td>Cargo por servicio</td>
                            <td className='text-right'>{serviceCost ? price(serviceCost) : <LoadingText />}</td>
                        </tr>
                        <tr className='border-t-2 border-grey mt-3'>
                            <td className='text-xl'>Total</td>
                            <td className='text-right text-xl'>{total ? price(total) : <LoadingText />}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {
                serviceCost && gift &&
                <div className='w-full flex justify-center'>
                    <PaymentButton
                        item={gift}
                        recipient={recipient}
                        shipping={shippingCost}
                        fee={serviceCost}
                        metadata={metadata}
                        />
                </div>
            }
        </div>
    )
}

export default Regalar