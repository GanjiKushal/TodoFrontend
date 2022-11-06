import './todoList.css'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
function TodoList() {
    const navigate = useNavigate()
    const [user, setUser] = useState("")
    const [todo, setTodo] = useState([]);
    const [completedTasks, setCompetedTasks] = useState([]);
    const [visible, setVisible] = useState(false);
    const [toggle, setToggle] = useState(false)
    // states for timer
    const [seconds, setSceonds] = useState(0);
    const [minutes, setMinuits] = useState(0);
    const [hours, setHours] = useState(0)
    const [timeToggle, setTimeToggle] = useState(false)
    const endActivityHandler = (e) => {
        setToggle(!toggle)
        setTimeToggle(false);
        setHours(0);
        setMinuits(0);
        setSceonds(0);
        let id = e.target.id;
        let activity
        let time = `0${hours}:0${minutes}:${seconds}`
        todo.map((ele, i) => {
            if (i == id) {
                activity = ele.Activity
            }
        })
        fetch("http://localhost:8080/endTask", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "accessToken": sessionStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                activity, time
            })
        })
    }
    useEffect(() => {
        fetch("http://localhost:8080/getCompletedTasks", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "accessToken": sessionStorage.getItem("accessToken")
            }
        })
            .then(data => data.json())
            .then(res => {
                if (res.message === "success") {
                    setCompetedTasks(res.data);
                }
            })
    }, [toggle])
    useEffect(() => {
        fetch("http://localhost:8080/getUser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "accessToken": sessionStorage.getItem("accessToken")
            }
        })
            .then(data => data.json())
            .then(res => {
                setUser(res.user)
            })
        // fetching todo data
        fetch("http://localhost:8080/todoList", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "accessToken": sessionStorage.getItem("accessToken")
            }
        })
            .then(data => data.json())
            .then(res => {
                if (res.data) {
                    setTodo(res.data)
                    res.data.map(ele => {
                    })
                }
            })
        // fetching completed tasks
    }, [toggle])
    // timer code started
    const startHandler = (e) => {
        e.preventDefault()
        if (e.target.innerText == "Start") {
            e.target.innerText = "Pause"
        }
        else if (e.target.innerText == "Pause") {
            e.target.innerText = "Start"
        }
        setTimeToggle(!timeToggle);
    }
    let timer;
    useEffect(() => {
        timer = timeToggle && setInterval(() => {
            setSceonds(seconds + 1);
            if (seconds === 59) {
                setSceonds(0);
                setMinuits(minutes + 1);
            }
            if (minutes === 59) {
                setHours(hours + 1)
                setMinuits(0)
            }
        }, 1000);
        return () => clearInterval(timer);
    });
    // timer code ended
    const handleLogOut = (e) => {
        e.preventDefault()
        sessionStorage.removeItem("accessToken");
        navigate("/")
    }
    const newActivityHandler = (e) => {
        navigate("/newActivity")
    }
    return (
        <div className='body'>
            <div className='top-bar'>
                <h3 className='username'>{user}</h3>
            </div>
            <div className="bodyContainer">
                <div className='sidebar'>
                    <div>
                        <h2 className='todo'>TODO List</h2>
                    </div>
                    <div>
                        <h2>Histroy</h2>
                        {
                            completedTasks.length > 0
                                ?
                                completedTasks.map(ele => {
                                    return (
                                        <>
                                            <span>{ele.Activity} -  </span>
                                            <span>{ele.timeTaken}</span>
                                            <br />
                                        </>
                                    )
                                })
                                :
                                <p>No history found</p>
                        }
                    </div>
                    <h2 className='logout' style={{ cursor: "pointer" }} onClick={handleLogOut}>Logout</h2>
                </div>
                <div className="rightside">
                    <div className='newActivity'>
                        <span>Timer</span>
                        <span>{`${hours}:${minutes}:${seconds}`}</span>
                        <span className='button1' onClick={newActivityHandler}>Add New Activity</span>
                    </div>
                    <div className='tablebar'>
                    <table>
                        <thead>
                            <tr className='tr1'>
                                <th>Activity</th>
                                <th>Status</th>
                                <th>Time Taken</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                todo.length > 0
                                    ?
                                    todo.map((ele, i) => {
                                        return (
                                            <tr >
                                                <td >{ele.Activity}</td>
                                                <td>{ele.status}</td>
                                                <td>{ele.timeTaken}</td>
                                                <td>
                                                    {
                                                        ele.status === "pending"
                                                            ?
                                                            <>
                                                                <button onClick={startHandler}>Start</button>
                                                                <button id={i} onClick={endActivityHandler}>End</button>
                                                            </>
                                                            :
                                                            <span onClick={startHandler}>completed</span>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <p>no data fount</p>
                            }
                        </tbody>
                    </table>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default TodoList