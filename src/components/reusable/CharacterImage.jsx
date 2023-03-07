export default function CharacterImage(props) {
    const IMG = (imageName) => {
        return require("../../images/characters/" + imageName + ".png");
    }

    return(
        <img src={IMG(props.image)} alt={props.image} className={props.class} />
    )
}