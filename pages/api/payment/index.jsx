import { mercadopago } from "../../../lib/utils/mercadopagoConfigure"

const paymentApi = async (req, res) => {
    if (req.method === 'POST'){

        try {
            const body = req.body
            if (body) {
                const item = body.item
                const shipping = body.shipping
                const recipient = body.recipient
                let global

                let preference = {
                    items: [
                        {
                            title: item.title,
                            unit_price: item.price,
                            quantity: 1,
                        },
                        {
                            title: 'Despacho',
                            unit_price: shipping,
                            quantity: 1,
                        },
                        {
                            title: 'Cargo por servicio',
                            unit_price: item.price * 0.1,
                            quantity: 1,
                        },
                    ],
                }
            
                mercadopago.preferences
                    .create(preference)
                    .then(function (response) {
                        global = response.body.id
                    })
                    .catch(function (error) {
                        console.log(error)
                    })

                return res.status(200).json({global: global})
            }
            
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    res.setHeader('Allow', ['POST'])
    res.status(425).end('Only POST method allowed')
}

export default paymentApi