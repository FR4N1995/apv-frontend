import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta";

const EditarPerfil = () => {

    const {auth, actualizarPerfil} = useAuth();
    // console.log(auth);
    const [perfil, setPerfil] = useState({});
    const [alerta, setAlerta] = useState({})

    useEffect(() =>{
            setPerfil(auth);
    }, [auth]);

    const handleSubmit = async e =>{
        e.preventDefault();
        // validar formulario
        const {nombre, email} = perfil

        if([nombre, email].includes('')){
            setAlerta({
                msg: "Email y nombre son obligatorios",
                error: true
            })

        }
        const resultado = await actualizarPerfil(perfil)
        setAlerta(resultado);

    }

    const {msg} = alerta;


  return (

    <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}<span className="text-indigo-600 font-bold"> Informacion</span></p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                    {msg && <Alerta alerta={alerta} />}     

                    <form onSubmit={handleSubmit}>

                        <div className="my-3">
                            <label className="uppercase font-bold">nombre</label>
                            <input value={perfil.nombre || ''} onChange={e => setPerfil({...perfil, [e.target.name] : e.target.value})} name="nombre" type="text" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" />

                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold">sitio web</label>
                            <input  value={perfil.web || ''} onChange={e => setPerfil({...perfil, [e.target.web] : e.target.value})} name="web" type="text" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" />

                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold">telefono</label>
                            <input  value={perfil.telefono || ''} onChange={e => setPerfil({...perfil, [e.target.telefono] : e.target.value})} name="telefono" type="text" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" />

                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold">email</label>
                            <input  value={perfil.email || ''} onChange={e => setPerfil({...perfil, [e.target.name] : e.target.value})} name="email" type="text" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" />

                        </div>

                        <input type="submit" className="px-10 py-3 font-bold rounded-lg uppercase w-full mt-5 bg-indigo-700 text-white" value="guardar cambios" />

                    </form>
                </div>
            </div>
    
    </>
  
  )
}

export default EditarPerfil