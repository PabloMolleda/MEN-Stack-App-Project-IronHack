const price = document.getElementById('price').textContent
const quantity = document.getElementById('quantity').textContent
const VAT = document.getElementById('VAT').textContent
console.log(price, quantity, VAT)
//logica producto
let subtotal = Invoice.products[0].price * Invoice.products[0].quantity
let IVA = subtotal * Invoice.products[0].VAT
let totalProduct = subtotal + IVA