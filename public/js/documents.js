const documentsAPI = new APIHandler();

let documentToPrint = document.getElementById('makePDF')
console.log(documentToPrint)

document.querySelector('#print-btn').addEventListener('click', function (e) {
    createDocuments(documentToPrint)
})

function createDocuments(document) {
    documentsAPI
      .getDocuments(document)
      .then(response => {
        console.log(response.data)
      })
      .catch(err => console.log(err))
  
  }