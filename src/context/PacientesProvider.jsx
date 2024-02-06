import {useState, useEffect, createContext} from 'react'
import  axios  from "axios";
import useAuth from '../hooks/useAuth'

const PacientesContext = createContext();

 const PacientesProvider = ({children}) =>{

    const [pacientes, setPacientes] = useState({})
    const [paciente, setPaciente] = useState({})
    const {auth} = useAuth();

    useEffect(()=>{
        
        const obtenerPacientes = async () =>{

            try {
                const token = localStorage.getItem('apv_token');
                if(!token) return
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const url = `${import.meta.env.VITE_BACKEND_URL}/api/pacientes`
                const {data} = await axios.get(url, config)
                setPacientes(data);

                
            } catch (error) {
                console.log(error)
            }


        }
        obtenerPacientes();

    }, [auth]);

    const guardarPaciente = async (paciente) =>{ 
         console.log(paciente);
        const token = localStorage.getItem('apv_token');
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        if(paciente.id){
             console.log('Editando...');
            try {
                console.log('entra catch');
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/pacientes/${paciente.id}`;
                const {data} = await axios.put(url, paciente, config);
                // console.log(data);
                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacientesActualizado);
                console.log('fin del catch');

            } catch (error) {
                console.log(error);
                
            }
        }else{
            // console.log('Creando nuevo');
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/pacientes`;
                const {data} = await axios.post(url, paciente, config);
                // console.log(data);
                // quitamos los primeros tres argumentos y creamos un arreglo con los demas como pacienteAlmacenado
                const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data
                console.log(pacienteAlmacenado);
                setPacientes([pacienteAlmacenado, ...pacientes]);
            } catch (error) {
                console.log(error);
                
            }
        }
        

 
    }


    const editarPaciente = (paciente) =>{
        setPaciente(paciente);
    }

    const eliminarPaciente = async(id) =>{
        // console.log('Eliminando a..', id)
        const consfirmar = confirm('¿Confirmas que deseas eliminar?');

        if(consfirmar){
            try {
                const token = localStorage.getItem('apv_token');
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const url = `${import.meta.env.VITE_BACKEND_URL}/api/pacientes/${id}`
                const {data} = await axios.delete(url, config);
                console.log(data);
                const pacientesActualizados = pacientes.filter(pacientesState => pacientesState._id !== id);
                setPacientes(pacientesActualizados);
                
            } catch (error) {
                console.log(error);
            }
        }
    }

    return(
        <PacientesContext.Provider value={{pacientes, paciente, eliminarPaciente, guardarPaciente, editarPaciente}} >
            {children}
        </PacientesContext.Provider>
    )
}

export{
    PacientesProvider
}


export default PacientesContext;