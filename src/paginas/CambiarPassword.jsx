import { useState } from "react";
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {

    const {guardarPasswordNueva} = useAuth()

    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo: ''
    });

    const handleSubmit = async e =>{
        e.preventDefault();
        // console.log(Object.values(password));
        // validando que los campos no esten vacios
        if(Object.values(password).some(input => input === '')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return
        }

        if (password.pwd_nuevo.length < 6) {
            setAlerta({
                msg: 'El password debe tener minimo 6 caracteres',
                error: true
            });
            return
        }

        const respuesta = await guardarPasswordNueva(password);

        setAlerta(respuesta);

    }

     const {msg} = alerta;

  return (

        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}<span className="text-indigo-600 font-bold"> Password</span></p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                     {msg && <Alerta alerta={alerta} />}     

                    <form onSubmit={handleSubmit}>

                        <div className="my-3">
                            <label className="uppercase font-bold">Password Actual</label>
                            <input  name="pwd_actual" onChange={e => setPassword({...password, [e.target.name] : e.target.value})} type="password" placeholder="Escribe tu password actual" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" />

                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold">Password Nuevo</label>
                            <input  name="pwd_nuevo" onChange={e => setPassword({...password, [e.target.name] : e.target.value})} type="password" placeholder="Escribe tu Nuevo password" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" />

                        </div>
                        

                        <input type="submit" className="px-10 py-3 font-bold rounded-lg uppercase w-full mt-5 bg-indigo-700 text-white" value="Actualizar password" />

                    </form>
                </div>
            </div>


        </>

    )
}

export default CambiarPassword