module.exports = {
    checkLoggedUser: (req, res, next) => {
        req.session.user ? next() : res.render('users/log-in', { errorMessage: 'Please, log in to continue' })
    },
    
    checkCompanyOrAdmin: (req, res, next) => {
        const isCompany = req.session.user.role === 'company'
        const isAdmin = req.session.user._id === 'admin'

        isCompany || isAdmin ? next() : res.render('users/log-in', { errorMessage: "Only available for company's accounts" })
    }
}