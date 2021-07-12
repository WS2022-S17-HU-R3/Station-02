import { useState } from 'react'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'

import Accomodation from './Accomodations'
import Bookings from './Bookings'

const Admin = (props) => {

    const history = useHistory()
    const location = useLocation()
    console.log(location)

	return (
        <div className="container admin-container">
            <div className="header">
                <div className="header-title">
                    Admin
                </div>
                <div className={`header-link ${location.pathname === '/admin/accomodations' ? 'active' : ''}`} onClick={()=>history.push("/admin/accomodations")}>
                    Accomodations
                </div>
                <div className={`header-link ${location.pathname === '/admin/bookings' ? 'active' : ''}`}  onClick={()=>history.push("/admin/bookings")}>
                    <span>Bookings</span>
                </div>
                <div className="header-link header-logout" onClick={props.logout}>
                    <div>Logout</div>
                </div>
            </div>
            <div className="content">
                <Switch>
                    <Route path="/admin/accomodations">
                        <Accomodation />
                    </Route>
                    <Route path="/admin/bookings">
                        <Bookings />
                    </Route>
                </Switch>
                
            </div>
        </div>
	)
}

export default Admin
