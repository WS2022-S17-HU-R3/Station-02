import './App.scss'
//import {  } from 'react-router'
import { BrowserRouter as Router, Route, useHistory, Switch, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Login from './Login'
import Admin from './Admin'
import Book from './Book'

const App = () => {

	const [loggedIn, setLoggedIn] = useState(false)
	const history = useHistory()
	const location = useLocation()
	
	useEffect(() => {
        if (!loggedIn && location.pathname.startsWith("/admin")) history.push("/admin/login")
    }, [loggedIn])
	
	return (
		<div className="bg">
			<Switch>
				{/* <Route path="/admin/login">
					<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
				</Route>
				<Route path="/admin">
					 <Admin logout={()=>setLoggedIn(false)} />
				</Route> */}
				<Route path="/">
					<Book />
				</Route>
			</Switch>
		</div>
	)
}

export default App
