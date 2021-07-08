
//logic product 
const price = document.getElementById('price').textContent
console.log(price)
const quantity = document.getElementById('quantity').textContent
const VAT = document.getElementById('VAT').textContent


const subtotal = price * quantity
document.querySelector('#subtotal').innerHTML = subtotal
const IVA = subtotal * (VAT / 100)
document.querySelector('#finalVAT').innerHTML = IVA
const totalProduct = subtotal + IVA
document.querySelector('#totalProduct').innerHTML = totalProduct



//logic payroll

