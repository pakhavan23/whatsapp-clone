import React , {useRef} from 'react';
import {v4 as uuidV4} from 'uuid';
import '../styles/login.css';

const Login = ({onIdSubmit}) => {

    const idRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        onIdSubmit(idRef.current.value);
    }

    const createNewID = () => {
        onIdSubmit(uuidV4());
    }

    return (
        <section className="login-form">
            <h1>Welcome to What's app Clone!</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter Your ID:</label>
                <input type="text" ref={idRef} required />
                <button type="submit">Login</button>
                <button onClick={createNewID} variant="secondary">Create a new ID</button>
            </form>
        </section>
    )
}

export default Login;