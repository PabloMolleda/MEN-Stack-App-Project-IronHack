module.exports = {
    checkLoggedUser: (req, res, next) => {
        req.session.currentUser ? next() : res.render('users/log-in', { errorMessage: 'Please, log in to continue' })
    },
    checkCompanyOrAdmin: (req, res, next) => {
        const isCompany = req.session.currentUser.role === 'company'
        const isAdmin = req.session.currentUser.role === 'admin'

        isCompany || isAdmin ? next() : res.render('users/log-in', { errorMessage: "Only available for company's accounts" })
    },
    checkPersonalOrAdmin: (req, res, next) => {
        const isPersonal = req.session.currentUser.role === 'client'
        const isAdmin = req.session.currentUser.role === 'admin'

        isPersonal || isAdmin ? next() : res.render('users/log-in', { errorMessage: "Only available for personal's accounts" })
    }
}