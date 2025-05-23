import usePacientes from "../hooks/usePacientes";
const Paciente = ({paciente}) => {
    // console.log(paciente);
    const {email, fecha, nombre, propietario, sintomas, _id} = paciente

    const {editarPaciente, eliminarPaciente}= usePacientes()


    // console.log(fecha);

    const formatearFecha = (fecha) =>{
        const nuevaFecha = new Date(fecha);
        return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nuevaFecha);
    }
    // console.log(fecha);

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold uppercase text-indigo-800 my-2">Nombre: <span className="font-normal normal-case text-black">{nombre}</span></p>
        <p className="font-bold uppercase text-indigo-800 my-2">Propietario: <span className="font-normal normal-case text-black">{propietario}</span></p>
        <p className="font-bold uppercase text-indigo-800 my-2">email: <span className="font-normal normal-case text-black">{email}</span></p>
        <p className="font-bold uppercase text-indigo-800 my-2">fecha de alta: <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span></p>
        <p className="font-bold uppercase text-indigo-800 my-2">sintomas: <span className="font-normal normal-case text-black">{sintomas}</span></p>

        <div className="flex justify-between my-5">
            <button onClick={() => editarPaciente(paciente)} type="button" className="py-2 px-10 bg-indigo-600 hover:bg-indigo-800 text-white font-bold rounded-lg uppercase" >Editar</button>
            <button onClick={()  => eliminarPaciente(_id)} type="button" className="py-2 px-10 bg-red-600 hover:bg-red-800 text-white font-bold rounded-lg uppercase">Eliminar</button>

        </div>

    </div>
  )
}

export default Paciente