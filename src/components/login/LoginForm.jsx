import Title from "../reusable/Title";
import CostumForm from "../reusable/CostumForm";

export default function LoginForm(props){
    return(
        <div className="login-form-container">
            <Title content="Star Wars" class="login-small-title" />
            <Title content="Frontend" class="login-big-title" />
            <CostumForm class="login-form" handleSubmit={props.handleSubmit} handleChangeEvent={props.handleChangeEvent} loginCredentials={props.loginCredentials} />
        </div>
    )
}