import { useEffect, useState } from "react"
import CharacterImage from "../reusable/CharacterImage";

function simulate(characterAttributes) {
    const max = 20;
    const min = 10;
    let damageDealt;
    let receiver;

    const loop = () => {
        if(characterAttributes.light.hp <= 0 || characterAttributes.dark.hp <= 0){
            return;
        }

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
        console.log(characterAttributes);
        setTimeout(loop, 1000);
    };

    setTimeout(loop, 1000);
}

export default function FightPage(props) {

    const url = "https://developer.webstar.hu/rest/frontend-felveteli/v2/simulate/";
    const [characterAttributes, setCharacterAttributes] = useState("");
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
      }, [props.finalCharacters]);


    useEffect(() => {
            if(data && isLoaded){
                console.log(data);
                setCharacterAttributes({
                    light: {
                        id: props.finalCharacters.light,
                        hp: 100
                    },
                    dark: {
                        id: props.finalCharacters.dark,
                        hp: 100
                    },
                });
            }
            characterAttributes !== "" && setCharacterAttributes(simulate(characterAttributes));
    }, [data])

    if(!isLoaded){
        return(
            <div>...Loading</div>
        )
    }else{
        return(
            <div className="fight-page">
              <div className="dark-side">
                <div>
                 <CharacterImage image={props.finalCharacters.dark} class="fighting-character-image dark-character-image" />
                </div>
                <span className="hp-bar"><span></span></span>
              </div>
              <div className="versus">
                VS
              </div>
              <div className="light-side">
                <div>  
                 <CharacterImage image={props.finalCharacters.light} class="fighting-character-image light-character-image" />
                </div>
                <span className="hp-bar"><span></span></span>
              </div>
            </div>
        )
    }
}