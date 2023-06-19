import { mercadopago } from "../../../lib/utils/mercadopagoConfigure"

const paymentApi = async (req, res) => {
    if (req.method === 'POST'){

        try {
            const body = req.body
            if (body) {
                const item = body.item
                const shipping = body.shipping
                const fee = body.fee
                const recipient = body.recipient
                const metadata = body.metadata

                const preference = {
                    items: [
                        {
                            title: item.title,
                            unit_price: item.price,
                            id: item.id,
                            picture_url: item.thumbnail,
                            quantity: 1,
                        },
                        {
                            title: 'Cargo por servicio',
                            unit_price: fee,
                            quantity: 1,
                        },
                    ],

                    shipments: {
                        cost: shipping,
                        mode: 'not_specified',
                    },

                    metadata,

                    payer: {
                        identification: 
                        {
                            number: recipient.uudi,
                            type: 'uuid'
                        }
                    },

                    back_urls: {
                        success: process.env.BASE_FETCH_URL + 'regalar/suc',
                        pending: process.env.BASE_FETCH_URL + 'regalar/pen',
                        failure: process.env.BASE_FETCH_URL + 'regalar/fai',
                    },

                    auto_return: 'approved',
                }

                const getPreference = async () => {
                    let global = await mercadopago.preferences
                    .create(preference)
                    .then(async function (response) {
                        let id = await response.body.id
                        return id
                    })
                    .catch(function (error) {
                        console.log('error', error)
                    })
                    return global
                }

                const preferenceId = await getPreference()

                return res.status(200).json({ global: preferenceId })
            }
            
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    res.setHeader('Allow', ['POST'])
    res.status(425).end('Only POST method allowed')
}

export default paymentApi