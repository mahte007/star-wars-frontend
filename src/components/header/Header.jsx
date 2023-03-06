export default function Header(props){
    const IMG = (imageName) => {
        return require("../../images/icons/" + imageName)
    }

    return(
        <div className="header">

                <p className="user"><img src={IMG("user.png")} alt="user" /> {props.user.user.lastName} {props.user.user.firstName}</p>

                <p className="logout" onClick={props.handleLogout}>Űrhajó elhagyása <img src={IMG("logout.png")} alt="logout" /></p>
                
        </div>
    )
}