import React , {useRef} from 'react';
import {v4 as uuidV4} from 'uuid';

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
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter Your ID:</label>
                <input type="text" ref={idRef} required />
                <button type="submit">Login</button>
                <button onClick={createNewID} variant="secondary">Create a new ID</button>
            </form>
        </div>
    )
}

export default Login;