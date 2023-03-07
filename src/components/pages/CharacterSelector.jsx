import { useEffect, useState } from "react"
import Slider from "../slider/Slider";
import { useNavigate } from "react-router-dom";

export default function CharacterSelector(props){

    const [isLoaded, setIsLoaded] = useState(false);
    const [characters, setCharacters] = useState([{}]);
    const [selectedCharacters, setSelectedCharacters] = useState([])
    const [sides, setSides] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const url = "https://developer.webstar.hu/rest/frontend-felveteli/v2/characters/"
    const navigate = useNavigate();

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

      const selectCharacter = () => {
        if(selectedCharacters.length < 2){

          if(!selectedCharacters.includes(characters[currentIndex].id)){

            setSelectedCharacters([
              ...selectedCharacters,
              characters[currentIndex].id
            ])

            setSides([
              ...sides,
              characters[currentIndex].side
            ])
          }else {

            setSelectedCharacters(selectedCharacters.filter(e => e !== characters[currentIndex].id))
            setSides(sides.filter(e => e !== characters[currentIndex].side))

          }
        }else if(selectedCharacters.includes(characters[currentIndex].id)){

          setSelectedCharacters(selectedCharacters.filter(e => e !== characters[currentIndex].id))

          if(sides[0] !== sides[1]){
            setSides(sides.filter(e => e !== characters[currentIndex].side))
          }else{
            setSides(sides.splice(1))
          }
        }
      }

      const handleSelect = () => {
        setIsSelected(!isSelected);
      }

      useEffect(() => {
        console.log(selectedCharacters)
        console.log(sides);
      },[selectedCharacters, sides]);


      const fightSimulate = () => {
        if(sides.length === 2 && sides[0] !== sides[1]){
          navigate('/fight');
        }else if(sides.length < 2){
          alert("2 karaktert kell kiválasztanod")
        }
      }

    if(!isLoaded){
      return(
        <div>Loading...</div>
      )
    }
    return(
        <div className="character-selection-page">
          <Slider characters={characters} setCurrentIndex={setCurrentIndex} />
          <div className="moduls-container">
            <span>Modulok</span>
            <div className="simulation-container">
              <span>Szimuláció</span>
              <div>
                Válassz két karaktert ellentétes oldalakról
                <button className="select-button button" onClick={() => {selectCharacter(); handleSelect()}}>Karakter kiválasztása</button>
                <button className="fight-button button" onClick={fightSimulate}>Küzdelem indítása</button>
              </div>
            </div>
          </div>
        </div>
    )
}