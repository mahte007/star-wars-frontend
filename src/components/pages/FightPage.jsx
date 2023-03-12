import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import CharacterImage from "../reusable/CharacterImage";
import CustomAlert from "../reusable/CustomAlert";
import { useNavigate } from "react-router-dom";



function simulate(characterAttributes, setCharacterAttributes, setWinner, setIsFinished) {
    const max = 20;
    const min = 10;
    let damageDealt;
    let receiver;

    const loop = () => {

        damageDealt = Math.round(Math.random() * (max - min +1) + min);
        receiver = Math.round(Math.random());

        if(receiver === 0){
            characterAttributes = {
                light: {
                    ...characterAttributes.light,
                    hp: Math.max(characterAttributes.light.hp - damageDealt, 0),
                },
                dark: {
                    ...characterAttributes.dark,
                },
            };
        }else {
            characterAttributes = {
                light: {
                    ...characterAttributes.light,
                },
                dark: {
                    ...characterAttributes.dark,
                    hp: Math.max(characterAttributes.dark.hp - damageDealt, 0),
                },
            };
        }
        setCharacterAttributes(characterAttributes);
        console.log(characterAttributes);
        if(characterAttributes.light.hp <= 0 || characterAttributes.dark.hp <= 0){
            if(characterAttributes.light.hp <= 0){
                setWinner("dark");
            }else if(characterAttributes.dark.hp <= 0){
                setWinner("light");
            }
            setIsFinished(true);
            return;
        }
        setTimeout(loop, 2000);
    };
    setTimeout(loop, 2000);
}

export default function FightPage(props) {

    const url = "https://developer.webstar.hu/rest/frontend-felveteli/v2/simulate/";
    const [characterAttributes, setCharacterAttributes] = useState({
        light: {
            id: props.finalCharacters.light,
            hp: 100
        },
        dark: {
            id: props.finalCharacters.dark,
            hp: 100
        },
    });;
    const [data, setData] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [winner, setWinner] = useState("");
    const applicantId = '7Bna8WyX';
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData(){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                           'Applicant-Id': applicantId,
                           'Application-Authorization': 'Bearer ' + props.user.token },
                body: JSON.stringify(props.finalCharacters)
            };

            const response = await fetch(url, requestOptions);
            const json = await response.json();
            setData(json);
            if(response.ok){
                setIsLoaded(true);
            }else{
                switch (response.status) {
                    case 400:
                        setErrorMessage(json.error);
                        handleAlert();
                        break;
                    case 405:
                        setErrorMessage(json.error);
                        handleAlert();
                        break;
                    case 500:
                        setErrorMessage(json.error);
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

    useEffect(() => {
        if(isLoaded){
            simulate(characterAttributes, setCharacterAttributes, setWinner, setIsFinished);
        }
    }, [isLoaded])

    const getColorOfHp = (hp) => {
        if(hp > 70) {
            return "hp-bar-green"
        }else if(hp > 30) {
            return "hp-bar-yellow"
        }else {
            return "hp-bar-red"
        }
    }

    useEffect(() => {
        console.log(winner);
    }, [winner])


    function handleAlert() {
      setShowAlert(true);
    }
  
    function handleCloseAlert() {
        setShowAlert(false);
        navigate('/')
    }

    if(!isLoaded){
        return(
            <>
                <div>...Loading</div>
                {showAlert && (<CustomAlert message={errorMessage} onClose={handleCloseAlert} />)}
            </>
        )
    }else{
        return(
            <div className="fight-page">
            <p className="fight-page-title">A tudás legyen veled</p>
              <div className={isFinished ? (winner === "dark" ? "winner winner-dark dark-side" : "looser dark-side") : "dark-side" }>
              <p className="side-title">Sötét oldal</p>
                <div>
                 <CharacterImage image={props.finalCharacters.dark} class="fighting-character-image dark-character-image" />
                </div>
                <p className="character-name">
                    {props.characterDetails.map((character) => {
                        if(character.id === props.finalCharacters.dark){
                            return character.name.replace('<br>', ' ');
                        }
                    })}
                </p>
                <span className="hp-bar"><span style={ {width: characterAttributes.dark.hp + "%"} } className={getColorOfHp(characterAttributes.dark.hp)} /></span>
                <p className="hp-number">{characterAttributes.dark.hp} %</p>
              </div>
              <div className={isFinished ? "looser" : "versus"}>
                VS
              </div>
              <div className={isFinished ? (winner === "light" ? "winner winner-light light-side" : "looser light-side") : "light-side" }>
                <p className="side-title">Világos oldal</p>
                <div>  
                 <CharacterImage image={props.finalCharacters.light} class="fighting-character-image light-character-image" />
                </div>
                <p className="character-name">
                    {props.characterDetails.map((character) => {
                        if(character.id === props.finalCharacters.light){
                            return character.name.replace('<br>', ' ');
                        }
                    })}
                </p>
                <span className="hp-bar"><span style={ { width: characterAttributes.light.hp + "%"} } className={getColorOfHp(characterAttributes.light.hp)} /></span>
                <p className="hp-number">{characterAttributes.light.hp} %</p>
              </div>
              <Link to={"/"} className={isFinished ? "go-back-button-link" : "hide"}><button className="go-back-button">Vissza a fedélzetre</button></Link> {/* finished */}
              {showAlert && (<CustomAlert message={errorMessage} onClose={handleCloseAlert} />)}
            </div>
        )
    }
}