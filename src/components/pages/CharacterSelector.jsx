import { useEffect, useState } from "react"

export default function CharacterSelector(props){

    const [position, setPosition] = useState();
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
          setCharacters(data);
          console.log(characters);
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
          {characters.characters.map((character) => {
            return(<div>{character.name}</div>)
          })}
        </div>
    )
}