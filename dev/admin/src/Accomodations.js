import { useState, useEffect } from 'react'
import axios from 'axios'

const Accomodation = (props) => {

    const [accomodations, setAccomodations] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:8000/api/accomodations").then(res => {
            setAccomodations(res.data)
        })
    }, [])

	return (
        <div>
            <div className="title">
                Accomodations
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {accomodations.map(row => {
                        return <tr>
                            <td style={{width: '10px'}}>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.price}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
	)
}

export default Accomodation
