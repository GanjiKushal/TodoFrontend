import { useNavigate } from "react-router-dom";
// import "./addNewActivity.css";
import './activity.css'
import { useState } from "react";
const CreateNewActivity = () => {
    const navigate = useNavigate()
    const [activity, setActivity] = useState('');
    const createHandler = (e) => {
        fetch("http://localhost:8080/todoList", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accessToken": sessionStorage.getItem("accessToken")
            },
            body: JSON.stringify({ activity })
        })
            .then(data => data.json())
            .then(res => {
                if (res.message === "success") {
                    alert("task created successfull");
                    navigate("/todoList")
                }
            });
    }
    return (
        <>
            <div className="activity-Container">
                <div className="container-1">
                    <h3 className="h2tag1">Create New Activity</h3>
                    <input className="inputtag1" type="text" placeholder="Give Your Activity Name" value={activity} onChange={(e)=>setActivity(e.target.value)} />
                    <br />
                    <button className="buttontag1" onClick={createHandler}>Create</button>
                </div>
            </div>
        </>
    )
}
export default CreateNewActivity;