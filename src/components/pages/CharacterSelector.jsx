import { useEffect, useState } from "react"
import Slider from "../slider/Slider";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../reusable/CustomAlert";

export default function CharacterSelector(props){

    const [isLoaded, setIsLoaded] = useState(false);
    const [characters, setCharacters] = useState([{}]);
    const [selectedCharacters, setSelectedCharacters] = useState([])
    const [sides, setSides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const url = "https://developer.webstar.hu/rest/frontend-felveteli/v2/characters/"
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const applicantId = "7Bna8WyX";

     useEffect(() => {
        async function fetchData() {
          const headers = {
            "Content-Type": "application/json",
            "Applicant-Id": applicantId,
            "Application-Authorization": "Bearer " + props.user.token
          };
          
          const response = await fetch(
            url,
            { headers }
          );
          console.log(response);
          if(response.ok){
            const data = await response.json();
            setCharacters(data.characters);
            setIsLoaded(true);
          }else{
            const data = await response.json();
            switch (response.status) {
              case 400:
                setErrorMessage(data.error);
                handleAlert();
                break;
              case 405:
                setErrorMessage(data.error);
                handleAlert();
                break;
              default:
                setErrorMessage("Unexpected Error!");
                handleAlert()
            }
          }
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



      useEffect(() => {
        console.log(selectedCharacters)
        console.log(sides);
      },[selectedCharacters, sides, characters]);



      const fightSimulate = () => {
        if(sides.length === 2 && sides[0] !== sides[1]){          
          if(sides[0] === 'DARK'){
            props.setFinalCharacters({
              "dark": selectedCharacters[0],
              "light": selectedCharacters[1]
            })
          }else{
            props.setFinalCharacters({
              "dark": selectedCharacters[1],
              "light": selectedCharacters[0]
            })
          }
      }else{
        props.setFinalCharacters({
          "dark": selectedCharacters[1],
          "light": selectedCharacters[0]
        })
      }
      props.setCharacterDetails(characters);
      navigate('/fight');
    }


    
    function handleAlert() {
      setShowAlert(true);
    }

    function handleCloseAlert() {
        setShowAlert(false);
    }



    if(!isLoaded){
      return(
        <>
          <div>Loading...</div>
          {showAlert && (<CustomAlert message={errorMessage} onClose={handleCloseAlert} />)}
        </>
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
                <button className={selectedCharacters.includes(characters[currentIndex].id) ? "select-button button active" : "select-button button"} onClick={() => {selectCharacter()}}>Karakter kiválasztása</button>
                <button className="fight-button button" onClick={fightSimulate}>Küzdelem indítása</button>
              </div>
            </div>
          </div>
          {showAlert && (<CustomAlert message={errorMessage} onClose={handleCloseAlert} />)}
        </div>
    )
}