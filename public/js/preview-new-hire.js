const salaryPerYear = document.getElementById('salaryPerYear').textContent
const yearlyBonus = document.getElementById('yearlyBonus').textContent

const total = salaryPerYear + yearlyBonus
document.querySelector('#total').innerHTML = total