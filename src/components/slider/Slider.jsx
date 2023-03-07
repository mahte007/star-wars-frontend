import { useState } from "react";
import parse from "html-react-parser";
import CharacterImage from "../reusable/CharacterImage";

export default function Slider(props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const {isActive, setIsActive} = useState(false);

    console.log(props.characters)

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? props.characters.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    const goToNext = () => {
        const isLastSlide = currentIndex === props.characters.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    const goToIndex = characterIndex => {
        setCurrentIndex(characterIndex);
    }

    const IMG = (imageName) => {
        return require("../../images/icons/" + imageName);
    }

    return(
        <div className="slider">
            <article className="details-article">

                <div className="details-container">

                    <div className="powers-container">

                        <div className="rectangle"></div>

                        <div>
                            <p>Oldal</p>
                            <p>{props.characters[currentIndex].side}</p>
                        </div>

                    </div>

                    <div className="powers-container">

                        <div className="star">
                            <img src={IMG("star.png")} alt="star" />
                        </div>

                        <div>
                            <p>Különleges erő</p>
                            <p>{props.characters[currentIndex].force.power}</p>
                        </div>

                    </div>
                </div>

                <div className="description-container">
                    <p className="name">{parse(props.characters[currentIndex].name)}</p>
                    <p className="description">{props.characters[currentIndex].description}</p>
                </div>

            </article>
            <article>
                <div className="navigation-container">
                    <div className="navigation-dots">
                        {
                            props.characters.map((character, characterIndex) => {
                                return(
                                    <div key={characterIndex} className={characterIndex === currentIndex ? "active" : ""} onClick={() => goToIndex(characterIndex)}>•</div>
                                )
                            })
                        }
                    </div>
                    <div className="arrow prev-arrow" onClick={goToPrevious}> <img src={IMG("arrow_circle.png")} alt="left-arrow" className="chevron" /> </div>
                    <div className="arrow next-arrow" onClick={goToNext}> <img src={IMG("arrow_circle.png")} alt="right-arrow" className="chevron" /> </div>
                </div>
                <div className="background-circle">
                </div>
                    <CharacterImage image={props.characters[currentIndex].id} class="character-image" />
            </article>
        </div>
    )
}