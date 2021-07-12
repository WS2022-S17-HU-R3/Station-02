import { useState, useEffect } from 'react'
import axios from 'axios'

const Bookings = (props) => {

    const [accomodations, setAccomodations] = useState([])
    const [bookings, setBookings] = useState([])

    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckout] = useState("")
    const [bookingDate, setBookingDate] = useState("")
    const [comment, setComment] = useState("")
    const [accomodationId, setAccomodationId] = useState("")
    

    const fetchBookings = () => {
        return axios.get("http://skills-it.hu/api/bookings").then(res => {
            setBookings(res.data)
        })
    }

    useEffect(()=>{
        fetchBookings()
        axios.get("http://skills-it.hu/api/accomodations").then(res => {
            setAccomodations(res.data)
        })
    }, [])

    const deleteBooking = (id) => {
        axios.delete("http://skills-it.hu/api/bookings/" + id).then(res => {
            fetchBookings()
        }).catch(() => {
            alert("Cannot delete")
        })
    }

    const saveBooking = () => {
        axios.post("http://skills-it.hu/api/bookings/", {
            checkIn, checkOut, accomodationId, bookingDate, comment
        }).then(() => fetchBookings()).catch(() => {
            alert("Cannot add booking")
        })
    }

	return (
        <div>
            <div className="title">
                Bookings
            </div>
            <hr />
            <div className="form-inline">
                <select className="form-control"  value={accomodationId} onChange={e=>setAccomodationId(e.target.value)}>
                    {accomodations.map(a=><option value={a.id}>{a.name}</option>)}
                </select>
                <label>Check in</label>
                <input className="form-control" type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)}/>
                <label>Check out</label>
                <input className="form-control" type="date" value={checkOut} onChange={e=>setCheckout(e.target.value)}/>
                <label>Booking date</label>
                <input className="form-control" type="date" value={bookingDate} onChange={e=>setBookingDate(e.target.value)}/>
            </div>
            <label>Comment</label>
                <input className="form-control" type="text" value={comment} onChange={e=>setComment(e.target.value)}/>
                <br />
            <div className="btn btn-primary btn-large" onClick={saveBooking}>
                Save booking
            </div>
            <hr />
            
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Accomodation</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Date</th>
                        <th>Comment</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(row => {
                        return <tr key={row.id}>
                            <td style={{width: '10px'}}>{row.id}</td>
                            <td>{accomodations.find(a=>a.id == row.accomodationId)?.name}</td>
                            <td>{new Date(row.checkIn).toLocaleDateString()}</td>
                            <td>{new Date(row.checkOut).toLocaleDateString()}</td>
                            <td>{new Date(row.bookingDate).toLocaleDateString()}</td>
                            <td>{row.comment}</td>
                            <td>
                                <div className="btn btn-danger" onClick={()=>deleteBooking(row.id)}>
                                    Delete
                                </div>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
	)
}

export default Bookings
