export default function CostumForm(props){
    return(
        <div className={props.class}>
            <form onSubmit={props.handleSubmit}>
                <label htmlFor="username">Felhasználónév</label><br />
                <input type="email" name="username" id="username" value={props.loginCredentials.username} onChange={props.handleChangeEvent} /><br />

                <label htmlFor="password">Jelszó</label><br />
                <input type="password" name="password" id="password" value={props.loginCredentials.password} onChange={props.handleChangeEvent} /><br />

                <button type="submit">Belépés</button>
            </form>
        </div>
    )
}