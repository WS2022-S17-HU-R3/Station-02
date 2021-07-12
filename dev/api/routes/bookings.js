const express = require('express')
const db = require('../db')
const router = express.Router()

router.get("/", (req, res, next) => {
	let query = (req.query.comment) ? `SELECT * FROM bookings WHERE comment LIKE '%${req.query.comment}%'` : "SELECT * FROM bookings;"
	
	db.query(query, (err, bookings) => {
		if (err) return next(err)
		res.send(bookings)
	})
})

const checkIfDatesIntersect = (start1, end1, start2, end2) => {
	start1 = new Date(start1)
	start2 = new Date(start2)
	end1 = new Date(end1)
	end2 = new Date(end2)
	return ((start2 > start1 && start2 < end1) || (end2 > start1 && end2 < end1) || (start2 < start1 && end2 > end1))
}

router.post("/", (req, res, next) => {
	db.query("SELECT * FROM bookings WHERE accomodationId = ?;", [req.body.accomodationId], (err, bookings) => {
		if (err) return next(err)
		if (bookings.some(booking => checkIfDatesIntersect(booking.checkIn, booking.checkOut, req.body.checkIn, req.body.checkOut))) {
			res.status(400).send({
				error: true,
				taken: true
			})
		} else {
			db.query(`INSERT INTO bookings VALUES (NULL, ${req.body.accomodationId}, '${req.body.checkIn}', '${req.body.checkOut}', '${req.body.bookingDate}', '${req.body.comment}');`, (err, result) => {
				if (err) return next(err)
				res.send({id: result.insertId, ...req.body})
			})
		}
	})
})

const nextDay = d => new Date(d.getTime() + 24 * 60 * 60 * 1000)

router.delete("/:id", (req, res, next) => {
	db.query("SELECT * FROM bookings WHERE id = ?;", [req.params.id], (err, result) => {
		if (err) return next(err)
		if (!result.length) return res.status(404).send()
		let booking = result[0]

		let workingDays = 0
		let lastDate = new Date(new Date(booking.bookingDate) + 1000 * 60 * 60 * 2)
		
		while (workingDays < 3) {
			lastDate = nextDay(lastDate)
			if (lastDate.getDay() != 0 && lastDate.getDay() != 6) workingDays++
		}
		lastDate = nextDay(lastDate)
		
		if (new Date().getTime() > lastDate.getTime()) {
			return res.status(400).send({
				error: true,
				tooLate: true,
				lastDate
			})
		} else {
			db.query("DELETE FROM bookings WHERE id = ?;", req.params.id, (err) => {
				if (err) return next(err)
				res.send({})
			})
		}
	})
})

module.exports = router