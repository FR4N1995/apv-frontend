import { useState, useEffect } from "react";
import Alerta from "./alerta";
import usePacientes from "../hooks/usePAcientes";

const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState(null);
    const [alerta, setAlerta] = useState({});

    const {guardarPaciente, paciente} = usePacientes()
    // console.log(paciente);

    useEffect(() =>{
        if (paciente?.nombre) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
            setId(paciente._id)
        }
    },[paciente])

    const handleSubmit = (e) =>{
        e.preventDefault();

        // validar formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }
        
        guardarPaciente({nombre, propietario, email, fecha, sintomas, id})
        setAlerta({
            masg: 'Guardado Correctamente'
        })

        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId('')

    }

    const {msg} = alerta;

  return (
    <>
        <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2> 
          <p className="text-xl mt-5 mb-10 text-center">Añade tus Pacientes y{''} <span className="text-indigo-600 font-bold"> Administralos</span></p>

    {msg && <Alerta alerta={alerta} /> }
    
    <form className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md" onSubmit={handleSubmit}>
        <div className="mb-5">
            <label className="text-gray-700 uppercase font-bold" htmlFor="nombre">Nombre Mascota</label>
            <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="text" id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre Mascota" />
        </div>
        <div className="mb-5">
            <label className="text-gray-700 uppercase font-bold" htmlFor="propietario">Nombre Propietario</label>
            <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="text" id="propietario"value={propietario} onChange={e => setPropietario(e.target.value)} placeholder="Nombre Mascota" />
        </div>
        <div className="mb-5">
            <label className="text-gray-700 uppercase font-bold" htmlFor="email">Email</label>
            <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu Email" />
        </div>
        <div className="mb-5">
            <label className="text-gray-700 uppercase font-bold" htmlFor="fecha">Fecha de alta</label>
            <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="date" value={fecha} onChange={e => setFecha(e.target.value)} id="fecha"  />
        </div>
        <div className="mb-5">
            <label className="text-gray-700 uppercase font-bold" htmlFor="sintomas">Sintomas</label>
            <textarea value={sintomas} onChange={e =>setSintomas(e.target.value)} className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" id="sintomas" placeholder="Describe los sintomas"></textarea>
            
        </div>

        <input className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors" type="submit" value={ id ? 'Guardar Cambios' : 'Agregar Paciente'}  />
    </form>

    </>
  )
}

export default Formulario