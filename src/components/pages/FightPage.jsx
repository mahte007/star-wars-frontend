import { useEffect, useState } from "react"
import CharacterImage from "../reusable/CharacterImage";


function simulate(characterAttributes, setCharacterAttributes) {
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

    useEffect(() => {
        async function fetchData(){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                           'Applicant-Id': '7Bna8WyX',
                           'Application-Authorization': 'Bearer ' + props.user.token },
                body: JSON.stringify(props.finalCharacters)
            };

            const response = await fetch(url, requestOptions);
            const json = await response.json();

            setData(json);
            setIsLoaded(true);
        }
        fetchData();
      }, []);

    useEffect(() => {
        if(isLoaded){
            simulate(characterAttributes, setCharacterAttributes);
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

    if(!isLoaded){
        return(
            <div>...Loading</div>
        )
    }else{
        return(
            <div className="fight-page">
            <p className="fight-page-title">A tudás legyen veled</p>
              <div className="dark-side">
                <div>
                <p className="side-title">Sötét oldal</p>
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
              <div className="versus">
                VS
              </div>
              <div className="light-side">
                <div>  
                <p className="side-title">Világos oldal</p>
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
            </div>
        )
    }
}