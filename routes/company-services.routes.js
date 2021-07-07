const router = require("express").Router()


router.get("/", (req, res) => res.render("services/company/index"))


router.get("/hr", (req, res) => res.render("services/company/hr/index"))


router.get("/business", (req, res) => res.render("services/company/business/index"))


module.exports = router

  