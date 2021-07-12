const express = require('express')
const db = require('../db')
const router = express.Router()

router.get("/", (req, res, next) => {
	db.query("SELECT * FROM accomodations;", (err, result) => {
		if (err) return next(err)
		res.send(result)
	})
})

router.get("/:id/bookings", (req, res, next) => {
	db.query("SELECT * FROM bookings WHERE accomodationId=?", [req.params.id], (err, result) => {
		if (err) return next(err)
		res.send(result)
	})
})

module.exports = router