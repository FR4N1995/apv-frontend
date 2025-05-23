import {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom'
import axios from 'axios';
import Alerta from '../components/Alerta.jsx';

const  ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  // console.log(params);
  const {token} = params;

  useEffect(() =>{
      const confirmarCuenta = async() =>{
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/confirmar/${token}`;
          const {data} = await axios.get(url);
          // console.log(data);
          setCuentaConfirmada(true);
          setAlerta({
            msg: data.msg
          })
        } catch (error) {
          setAlerta({msg: error.response.data.msg, error: true})
        }
        setCargando(false);
      }
      confirmarCuenta();
  }, []);
  

  return (
    <>
    <div>
              <h1 className="text-indigo-600 font-black text-6xl">Confirma tu cuenta y Comienza a Administrar <span className="text-black">tus Pacientes</span></h1>
         </div>
         <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            {!cargando &&  < Alerta alerta={alerta}/>}

            {cuentaConfirmada && (<Link to="/" className='block text-center my-5 text-gray-500'>Inisiar Sesion</Link>
            )}


          </div>
    </>
  )
}

export default ConfirmarCuenta