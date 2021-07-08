const weeklyHours = document.getElementById('weeklyHours').textContent
const hoursWage = document.getElementById('hoursWage').textContent
const yearlyBonus = document.getElementById('yearlyBonus').textContent

const total = weeklyHours * hoursWage
document.querySelector('#total').innerHTML = total
const totalPerYear = total * 48 + yearlyBonus
document.querySelector('#totalPerYear').innerHTML = totalPerYear



