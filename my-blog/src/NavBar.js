import { Link , useNavigate} from "react-router-dom";
import useUser from "./hooks/Useuser";
import { getAuth,signOut } from "firebase/auth";

function NavBar() {
    const navigate = useNavigate();
    const {user} = useUser();
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">homepage</Link>
                </li>
                <li>
                    <Link to="/About">About</Link>
                </li>
                <li>
                    <Link to="/Articles">Articles</Link>
                </li>

            </ul>
            
            <div className="nav-right">
                {user ? <button className= "logout-btn" onClick={() => {
                    signOut(getAuth());
                }}>Log Out</button>
                      : <button className="login-btn" onClick={() => {
                        navigate('/login');
                      }}>Log In</button>}
            </div>

        </nav>

    );

}
export default NavBar