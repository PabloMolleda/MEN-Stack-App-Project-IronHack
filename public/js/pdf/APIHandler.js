class APIHandler {
  
  constructor() {
    this.axiosApp = axios.create({
        baseURL: 'https://neutrinoapi.net/html-render',
        apiKey: 'sVWirATcUNiDp48dmPBFj1yfA06vwXtpzEYfLWD4jPxTibxb',
        userId: 'pmolleda'
    })
}

  getPDF = (document) => this.axiosApp.get('/')

}
