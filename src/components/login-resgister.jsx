import { useState } from "react"
import { useNavigate } from "react-router-dom";
import("./login-register.css")

function Login() {
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const inpHandler = (e) => {
        // console.log(userData)
        e.preventDefault();
        let temp = e.target.value
        if (e.target.name === "email") {
            setUserData({ ...userData, email: temp })
        }
        if (e.target.name === "password") {
            setUserData({ ...userData, password: temp })
        }
    }
    const loginHandler = (e) => {
        // console.log(userData)
        e.preventDefault();
        fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userData.email,
                password: userData.password
            })
        })
            .then(data => data.json())
            .then(res => {
                console.log(res)
                if (res.message === "success") {
                    sessionStorage.setItem("accessToken", res.token)
                    // console.log(res.token)
                    navigate("/todoList")
                    console.log(res.message)
                }
                else{
                    alert('Incorrect Password')
                }
            })
    }


    return (
        <div className='main-container'>
            <div className='middle-container'>
                <h1 className='h2tag'>Member Login</h1>
                <form className='formclass'>
                    <input type="email" value={userData.email} name="email" onChange={inpHandler} placeholder='USERNAME' required />
                    <input type="password" value={userData.password} name="password" onChange={inpHandler} placeholder='PASSWORD' required />
                    <button className='buttonclass' onClick={loginHandler}>Login</button>
                    <button className='buttonclass' onClick={() => navigate('/register')}>Register</button>
                </form>
                <p className='ptag'>Forgot Password?</p>

            </div>

        </div>
    )

}
export default Login