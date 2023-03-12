import { useEffect, useState } from "react";
import LoginForm from "../login/LoginForm";
import CustomAlert from "../reusable/CustomAlert";

export default function Login(props){

    const url = "https://developer.webstar.hu/rest/frontend-felveteli/v2/authentication/"
    const [loginCredentials, setLoginCredentials] = useState({
        username: '',
        password: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const applicantId = "7Bna8WyX";

    function handleChangeEvent(e){
        setLoginCredentials({
            ...loginCredentials,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e){
        e.preventDefault()
    
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                       'Applicant-Id': applicantId },
            body: JSON.stringify(loginCredentials)
        };
        fetch(url, requestOptions)
        .then((response) => {
            return new Promise((resolve) => response.json()
              .then((json) => resolve({
                status: response.status,
                ok: response.ok,
                json,
              })));
          }).then(({ status, json, ok }) => {
            const message = json;
            if(ok){
                props.setUser(json);
            }else{
                switch (status) {
                  case 400:
                    setErrorMessage(message.error);
                    handleAlert();
                    break;
                  case 405:
                    setErrorMessage(message.error);
                    handleAlert();
                    break;
                  case 500:
                    setErrorMessage(message.error);
                    handleAlert();
                    break;
                  default:
                    setErrorMessage("Unexpected Error!");
                    handleAlert()
                }
            }
          })
    }



    function handleAlert() {
        setShowAlert(true);
    }

    function handleCloseAlert() {
        setShowAlert(false);
    }

    return (
        <div className="login-page">
            <LoginForm handleSubmit={handleSubmit} handleChangeEvent={handleChangeEvent} loginCredentials={loginCredentials} />
            {showAlert && (<CustomAlert message={errorMessage} onClose={handleCloseAlert} />)}
        </div>
    )
}