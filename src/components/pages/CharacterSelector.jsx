import { useEffect, useState } from "react"
import Slider from "../slider/Slider";

export default function CharacterSelector(props){

    const [characters, setCharacters] = useState([{}]);
    const [isLoaded, setIsLoaded] = useState(false);
    const url = "https://developer.webstar.hu/rest/frontend-felveteli/v2/characters/"

     useEffect(() => {
        async function fetchData() {
          const headers = {
            "Content-Type": "application/json",
            "Applicant-Id": "7Bna8WyX",
            "Application-Authorization": "Bearer " + props.user.token
          };
          const response = await fetch(
            url,
            { headers }
          );
          const data = await response.json();
          setCharacters(data.characters);
          setIsLoaded(true);
        }
        fetchData();
      }, []);


    if(!isLoaded){
      return(
        <div>Loading...</div>
      )
    }
    return(
        <div className="character-selection-page">
          <Slider characters={characters} />
        </div>
    )
}