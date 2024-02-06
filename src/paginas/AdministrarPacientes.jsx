import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";
import {useState} from 'react'





const AdministarPacientes = () =>{
    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    return (
            <div className="flex flex-col md:flex-row">
                
                <button onClick={() => setMostrarFormulario(!mostrarFormulario)} className="bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md mb-7 md:hidden" type="button">{mostrarFormulario ? 'Ocultar formulario' : 'Mostrar Formulario'}</button>

                <div className={`${mostrarFormulario ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
                    <Formulario />
                </div>

                <div className="md:w-1/2 lg:w-3/5">
                    <ListadoPacientes />
                </div>
            </div>
    );
};

export default AdministarPacientes;