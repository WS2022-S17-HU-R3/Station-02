import { useState } from 'react'
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'
import { useEffect } from 'react'


const Login = (props) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()

    const login = () => {
        if (username === 'admin' && password === '123'){
            props.setLoggedIn(true)
        }
    }

    useEffect(() => {
        if (props.loggedIn) history.push("/admin/accomodations")
    }, [props.loggedIn])

	return (
        <div className="login-container">
            <div className="login">
                <div className="title">Login</div>
                <input type="text" placeholder="Username" className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}/>
                <button className="btn btn-primary btn-block" onClick={login}>Login</button>
            </div>
        </div>
	)
}

export default Login
