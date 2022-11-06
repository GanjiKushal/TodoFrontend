import { useState } from 'react'
// import user from '../../../server/models/user';
import './register.css'
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        email: '',
        name: "",
        password: "",
        confPass: ""
    })
    // const [pass, setPass] = useState({ password: "" });
    // const [confPass, setConfPass] = useState({ password: "" });

    const inpHandler = (e) => {
        if (e.target.name === "email") {
            setUserData({ ...userData, email: e.target.value })
        }
        if (e.target.name === "name") {
            setUserData({ ...userData, name: e.target.value })
        }
        if (e.target.name === "password") {
            setUserData({ ...userData, password: e.target.value })
        }
        if (e.target.name === "confirmPass") {
            setUserData({ ...userData, confPass: e.target.value })
        }
    }

    const registerHandler = (e) => {
        e.preventDefault();
        console.log(userData.password, userData.confPass)
        if(userData.password.length<6){
            alert("Minimum length of Password is 6")
        }
        else{
            if (userData.password === userData.confPass) {
                fetch("http://localhost:8080/register", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        email: userData.email,
                        name: userData.name,
                        password: userData.password
                    })
                })
                    .then(data => data.json())
                    .then(res => {
                        console.log(res.message)
                        navigate("/")
                    })
            }
            else {
                console.log("pasword does not match")
                alert("Pasword does not Match")
            }
    
        }
        
    }

    return (
        <div className='main-container'>
            <div className='middle-container'>
                <h2 className='h2tag'>Register</h2>
                <form className='formclass'>
                    <input type="email" placeholder='USERNAME' name="email" required onChange={inpHandler} />
                    <input type="text" placeholder='NAME' name="name" required onChange={inpHandler} />
                    <input type="password" placeholder='PASSWORD' name="password" required onChange={inpHandler} />
                    <input type="password" placeholder='CONFIRM PASSWORD' name="confirmPass" required onChange={inpHandler} />
                    <button className='buttonclass' onClick={registerHandler}>Register</button>
                </form>
                <p className='ptag'>Member Login</p>

            </div>

        </div>
    )

}
export default Register