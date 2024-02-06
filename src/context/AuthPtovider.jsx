import {useState, useEffect, createContext} from 'react'
import  axios  from "axios";


const AuthContext = createContext();

const AuthProvider = ({children}) =>{

    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});


    useEffect(() =>{
        const autenticarUsuario = async() =>{
            const token = localStorage.getItem('apv_token');
             if(!token){
                setCargando(false)
                return
             }
            // console.log(token);

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/perfil`;
                const {data} = await axios(url, config);
                // console.log(data);
                setAuth(data);
                
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }
            setCargando(false)
        }
        autenticarUsuario()
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('apv_token')
        setAuth({})
    }

    const actualizarPerfil = async datos => {
        console.log(datos);
        const token = localStorage.getItem('apv_token');
             if(!token){
                setCargando(false)
                return
             }
            // console.log(token);

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/perfil/${datos._id}`;
            const {data} = await axios.put(url, datos, config);

            console.log('es el data', data);
            return {
                msg: 'Almacenado Correctamente'
            }
            
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPasswordNueva = async (datos) =>{
        console.log(datos);
        const token = localStorage.getItem('apv_token');
        if(!token){
           setCargando(false)
           return
        }
       // console.log(token);
       const config = {
           headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
           }
       }

       try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/cambiar-password`
        const {data} = await axios.put(url, datos, config);
        console.log(data);
        return{
            msg: data.msg
        }
       } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
       }


    }

    return(
        <AuthContext.Provider value={{auth, setAuth, cargando, guardarPasswordNueva, actualizarPerfil, cerrarSesion}}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext