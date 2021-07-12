import { useState, useEffect } from 'react'
import axios from 'axios'
import './Book.scss'

import hu from './lang/hu.json'
import en from './lang/en.json'



const checkIfDatesIntersect = (start1, end1, start2, end2) => {
	start1 = new Date(start1)
	start2 = new Date(start2)
	end1 = new Date(end1)
	end2 = new Date(end2)
	return ((start2 >= start1 && start2 <= end1) || (end2 >= start1 && end2 <= end1) || (start2 <= start1 && end2 >= end1))
}

const Book = (props) => {
	
	const [accomodations, setAccomodations] = useState([])
	const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckout] = useState("")
	const [adults, setAdults] = useState(1)
    const [accomodationId, setAccomodationId] = useState("")
	const [comment, setComment] = useState("")

	const [bookings, setBookings] = useState([])

	const [language, setLanguage] = useState("en")

	const [showFavs, setShoFavs] = useState(false)

	const [favs, setFavs] = useState([])

	const translate = (key) => {
		if (language == "hu") return hu[key]
		else if (language == "en") return en[key]
		return key
	}

	useEffect(()=>{
		axios.get("http://localhost:8000/api/accomodations").then(res => {
			setAccomodations(res.data)
		})
		if (!window.localStorage.favs) window.localStorage.favs = "[]"
		setFavs(JSON.parse(window.localStorage.favs))
	}, [])


	useEffect(()=>{
		if (accomodationId) {
			axios.get("http://localhost:8000/api/accomodations/" + accomodationId + "/bookings").then(res => {
				setBookings(res.data)
			})
		}
	}, [accomodationId])

	const daysOfTheWeek = ["M", "Tu", "W", "Th", "F", "Sa", "Su"]

	let startDate = new Date(checkIn)
	startDate.setDate(1)

	let firstMonday = new Date(startDate.getTime() - (1000 * 60 * 60 * 24 * (startDate.getDay() == 0 ? 6 : startDate.getDay() - 1)))
	let lastDay = new Date(checkOut)
	lastDay.setMonth(lastDay.getMonth() + 1)
	lastDay.setDate(1)
	lastDay.setDate(lastDay.getDay() == 0 ? 1 : 8-lastDay.getDay())

	let days = []

	let now = new Date()

	for (let i = firstMonday; i <= lastDay; i = new Date(i.getTime() + 1000*60*60*24)) {
		let day = i
		let active = !(day.getMonth() != new Date(checkIn).getMonth() && day.getMonth() != new Date(checkOut).getMonth())
		let selected = day.getTime() >= new Date(checkIn).getTime() && day.getTime() <= new Date(checkOut).getTime()
		let today = day.getDate() == now.getDate() && day.getMonth() == now.getMonth() && day.getFullYear() == now.getFullYear()

		let taken = bookings.some(booking => checkIfDatesIntersect(day, day, booking.checkIn, booking.checkOut))

		days.push({d: i, active, selected, taken, today})

	}

	const makeBooking = () => {
		axios.post('http://localhost:8000/api/bookings', {
			accomodationId,
			checkOut, 
			checkIn,
			bookingDate: new Date(),
			comment
		}).then(() => {
			alert("Booked successfully!")
			setAccomodationId("")
			setCheckIn("")
			setCheckout("")
			setComment("")
		}).catch(()=>{
			alert("Could not make booking.")
		})
	}
	
	return (
		<div className="container book">
			{/* <div className="banner-img" style={{backgroundImage: `url(/img/${accomodations.find(a=>a.id == accomodationId)?.img})`}}></div> */}
			<div className="banner form-inline">
				<div className="language">
					<a href="#" onClick={()=>setLanguage("hu")}>hu</a>&nbsp;&nbsp;|&nbsp;

					<a href="#" onClick={()=>setLanguage("en")}>en</a>
				</div>
				<select className="form-control"  value={accomodationId} onChange={e=>setAccomodationId(e.target.value)}>
					<option value="" selected hidden>{translate("select-accomodation")}</option>
                    {accomodations.map(a=><option value={a.id}>{a.name}</option>)}
                </select>
				<label>{translate("check-in")}</label>
                <input className="form-control" type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)}/>
                <label>{translate("check-out")}</label>
                <input className="form-control" type="date" value={checkOut} onChange={e=>setCheckout(e.target.value)}/>
				<label>{translate("adults")}</label>
                <input className="form-control adults" type="number" value={adults} onChange={e=>setAdults(e.target.value)}/>
			</div>
			{ checkIn=="" || checkOut=="" ?
			<div className="accomodations">
				<div className="container">
					<div className="title">Accomodations</div>
					<button className="btn btn-warning show-favs" onClick={()=>setShoFavs(!showFavs)}>{showFavs ? 'Show all' : 'Show favourites'}</button>
					<div className="row">
						{(showFavs ? accomodations.filter(accomodation=>{
							if (!window.localStorage.favs) window.localStorage.favs = "[]"
							let favs = JSON.parse(window.localStorage.favs)
							return (favs.find(a=>a==accomodation.id))
						}) : accomodations).map((accomodation, key) => {
							return (
								<div className="col-4">
									<div className="card">
										<div style={{backgroundImage: `url(/img/${accomodation.img})`}} className="img card-img-top" alt="..." />
										<div className="card-body">
										<h5 className="card-title" onClick={()=>{
											setAccomodationId(accomodation.id)
											window.scrollTo(0,0)
										}}>{accomodation.name}</h5>
										<button className="btn btn-warning fav" onClick={()=>{
											if (!window.localStorage.favs) window.localStorage.favs = "[]"
											
											let favs2 = JSON.parse(window.localStorage.favs)
											if (favs2.find(a=>a==accomodation.id)) return
											favs2.push(accomodation.id)
											setFavs(favs2)
											window.localStorage.favs = JSON.stringify(favs2)
										}}>
											{favs.find(a=>a==accomodation.id) ? 'Remove from favourite' : 'Add to favourites'}
										</button>
										<p className="card-text">{accomodation.description}</p>
										{/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
			 :
			 <>
			<div className="calendar">
				<div className="title">Calendar</div>
				{daysOfTheWeek.map(day=><div className="cell">{day}</div>)}
				{days.map(day=>
					<div className={`cell square ${!day.active ? 'inactive' : ''} ${day.selected ? 'selected' : ''} ${day.taken ? 'taken' : ''}`}>
						<span className={`date ${day.today ? 'today' : ''}`}>{day.d.getDate()}</span>
						{day.taken ? <div className="taken">X</div> : null}
					</div>
				)}
			</div> 
			<div className="summary">
				<div className="title">
					{accomodations.find(a => a.id == accomodationId)?.name}
				</div>
				<div className="days">
					{new Date(checkIn).toLocaleDateString()} - {new Date(checkOut).toLocaleDateString()}
					<br/>
					{days.filter(d=>d.selected).length} days
					<br />
					{adults} adult{adults > 1 ? 's' : ''}
				</div>
				<hr />
				<div className="price">
					Total: ${accomodations.find(a => a.id == accomodationId)?.price * days.filter(d=>d.selected).length * adults}
				</div>
				<br/>
				<label>Comment</label>
				<textarea className="form-control" value={comment} onChange={e=>setComment(e.target.value)}></textarea>
				
				{days.some(d=>d.selected&&d.taken) ? <div className="error">You cannot book for these dates.</div> : null}
				<button className="btn btn-primary btn-lg" disabled={days.some(d=>d.selected&&d.taken)} onClick={makeBooking}>
					Book now
				</button>
				
			</div>
			</>
			}
		</div>
	)
}

export default Book
