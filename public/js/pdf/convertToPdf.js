window.onload = () => {
    document.getElementById('print-btn').onclick = () => {

        generatePDF()
    
    }

function generatePDF(element) {
    const element = document.getElementById('makePDF')

    ht()
        .from(element)
        .save
}
