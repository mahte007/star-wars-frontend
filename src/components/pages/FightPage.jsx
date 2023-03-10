import { useEffect } from "react"

export default function FightPage(props) {

    const url = "https://developer.webstar.hu/rest/frontend-felveteli/v2/simulate/";
    useEffect(() => {
        console.log(props.finalCharacters)
    }, [props.finalCharacters])

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                       'Applicant-Id': '7Bna8WyX',
                       'Application-Authorization': 'Bearer ' + props.user.token },
            body: JSON.stringify(props.finalCharacters)
        };
        fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        
      }, []);

    return(
        <div className="fight-page">
          
        </div>
    )
}