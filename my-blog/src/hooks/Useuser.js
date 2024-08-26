import { useState, useEffect } from "react";
import {getAuth , onAuthStateChanged} from 'firebase/auth';

const useUser = () => {
    const [user, setuser] = useState(null);
    const [isloading, setisloading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            setuser(user);
            setisloading(false);
        });
        return unsubscribe;
    },[]);
    return {user , isloading};
}
export default useUser;