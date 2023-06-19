const getPayment = paymentId => {
    let payment

    if (paymentId){
        fetch('https://api.mercadopago.com/v1/payments/' + paymentId, { method: 'GET' })
        .then(res => res.json())
        .then(data => payment = data)
    }

    return { payment }
}

export default getPayment