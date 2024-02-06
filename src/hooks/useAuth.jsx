import {useContext} from 'react';
import AuthContext from '../context/AuthPtovider';


const useAuth = () =>{

    return useContext(AuthContext);
}

export default useAuth