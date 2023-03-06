import { useEffect, useState } from "react"

export default function CharacterSelector(props){

    const [position, setPosition] = useState();
    //asd
    const [characters, setCharacters] = useState([{}]);

    useEffect(() => {
        async function fetchData() {
          const headers = {
            "Content-Type": "application/json",
            "Applicant-Id": "7Bna8WyX",
            "Application-Authorization": "Bearer " + props.user.token
          };
          const response = await fetch(
            "https://developer.webstar.hu/rest/frontend-felveteli/v2/characters/",
            { headers }
          );
          const data = await response.json();
          setCharacters(data);
          console.log(characters);
        }
        fetchData();
      }, []);

    return(
        <div className="character-selection-page">

        </div>
    )
}