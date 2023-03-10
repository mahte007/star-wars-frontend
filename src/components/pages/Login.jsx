import { useEffect, useState } from "react";
import LoginForm from "../login/LoginForm";

export default function Login(props){

    const url = "https://developer.webstar.hu/rest/frontend-felveteli/v2/authentication/"
    const [loginCredentials, setLoginCredentials] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);

    function handleChangeEvent(e){
        setLoginCredentials({
            ...loginCredentials,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e){
        e.preventDefault()
        setSubmitted(true)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                       'Applicant-Id': '7Bna8WyX' },
            body: JSON.stringify(loginCredentials)
        };
        fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            props.setUser(data);
        })
    }

    return (
        <div className="login-page">
            <LoginForm handleSubmit={handleSubmit} handleChangeEvent={handleChangeEvent} loginCredentials={loginCredentials} />
        </div>
    )
}