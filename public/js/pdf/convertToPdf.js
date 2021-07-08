const pdfAPI = new APIHandler('http://localhost:8000');


window.addEventListener('load', () => {
  document.getElementById('print-btn').addEventListener('click', function () {

    pdfAPI
      .getPDF(document)
      .then(response => console.log(response))
      .catch(err => console.log(err))
  })

})
