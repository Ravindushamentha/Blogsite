import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import './Createaccountpage.css';  

const Createaccountpage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [confirmedpw, setConfirmedPw] = useState('');

    const navigate = useNavigate();

    const createAccount = async () => {
        try {
            if (password !== confirmedpw) {
                setError('Check and re-enter the password.');
                return;
            }

            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div className="Signin-container">
            <div className="Signin-box">
                <h1 className="Signin-title">Sign in to your Account</h1>
                {error && <p className="Signin-error">{error}</p>}
                <input
                    className="Signin-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="Signin-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    className="Signin-input"
                    placeholder="Re-enter your password"
                    value={confirmedpw}
                    onChange={e => setConfirmedPw(e.target.value)}
                />
                <button className="Signin-button" onClick={createAccount}>Create account</button>
                <Link className="Signin-link" to='/login'>Already have an account? Login!!!</Link>
            </div>
        </div>
    );
}

export default Createaccountpage;