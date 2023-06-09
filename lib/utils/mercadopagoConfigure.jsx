// SDK de Mercado Pago
export const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
})