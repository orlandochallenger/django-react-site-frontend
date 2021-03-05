import React, {useState, useEffect} from 'react'
import APIService from "./APIService";
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useCookies(["mytoken"])
    const [isLogin, setLogin] = useState(true)
    let history = useHistory()

    useEffect(() => {
       if(token["mytoken"]){
           history.push("/articles")
       }
    },[ history, token])

    const loginBtn = () =>{
        APIService.LoginUser({username, password})
        .then(res =>  setToken("mytoken", res.token))
        .catch(error => console.log(error))
    }

    const RegisterBtn = () =>{
        APIService.RegisterUser({username, password})
        .then(() =>  loginBtn())
        .catch(error => console.log(error))
    }

    return (
        <div className="App">
        <br/>
            {isLogin ? <h1>Please Login</h1> : <h1>Please Register</h1>}
            
            <div className="mb-3">
                <label htmlFor="username" className="form-lable">Username</label>
                <input type="text" className="form-control" id="username" 
                placeholder="Please enter Username" value={username} onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-lable">Password</label>
                <input type="password" className="form-control" id="password" 
                placeholder="Please enter Password" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
                {isLogin ? <button className="btn btn-primary" onClick={loginBtn}>Login</button> : <button className="btn btn-primary" onClick={RegisterBtn}>Register</button>}
            <br/>
            <div className="mb-3">
                {isLogin ? <h5>If You Don't Have Account, Please <button className="btn btn-primary" 
                onClick={() => setLogin(false)}>Register</button> Here</h5> : <h5>If You Have Account, Please <button className="btn btn-primary" 
                onClick={() => setLogin(true)}>Login</button>Here</h5>}
            </div>
        </div>
    )
}

export default Login
