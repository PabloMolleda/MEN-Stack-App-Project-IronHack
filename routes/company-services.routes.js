const router = require("express").Router()

// pagina de legal

router.get("/", (req, res) => res.render("services/company/index"))

//pagina de hr

router.get("/hr", (req, res) => res.render("services/company/hr/index"))

router.get("/hr/payroll", (req, res) => res.render("services/company/hr/payroll"))

router.get("/hr/new-hire-agreement", (req, res) => res.render("services/company/hr/new-hire-agreement"))

//pagina de business

router.get("/business", (req, res) => res.render("services/company/business/index"))

router.get("/business/invoice", (req, res) => res.render("services/company/business/invoice"))


module.exports = router

  