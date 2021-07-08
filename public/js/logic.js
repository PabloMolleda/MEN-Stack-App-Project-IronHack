

//array products
function productRows() {
    const arrayProducts =
        `<div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label for="productName">Name</label>
                                <input name="productName" type="text" class="form-control" id="productName">
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="form-group">
                                <label for="price">Price</label>
                                <input name="price" type="number" class="form-control" id="price">
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="form-group">
                                <label for="quantity">Quantity</label>
                                <input name="quantity" type="number" class="form-control" id="quantity">
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="form-group">
                                <label for="VAT">VAT</label>
                                <input name="VAT" type="number" class="form-control" id="VAT">
                            </div>
                        </div>
                    </div>`

    document.querySelector('.add-product').innerHTML = arrayProducts
    document.getElementById('add-btn').addEventListener('click', function () {
        alert('soy el boton')
    });
}
//logic product 
const price = document.getElementById('price').textContent
const quantity = document.getElementById('quantity').textContent
const VAT = document.getElementById('VAT').textContent


const subtotal = price * quantity
document.querySelector('#subtotal').innerHTML = subtotal
const IVA = subtotal * (VAT / 100)
document.querySelector('#finalVAT').innerHTML = IVA
const totalProduct = subtotal + IVA
document.querySelector('#totalProduct').innerHTML = totalProduct



//logic payroll

