import {useEffect, useState } from 'react';
import Alerta from '../components/alerta';
import axios from 'axios';
import {useParams, Link} from 'react-router-dom';
const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  // console.log(params);
  // const {token} = params;

  const handleSumbit = async(e) =>{
    e.preventDefault();
    if(email === '' || email.length < 6){
        setAlerta({msg: 'El email es Obligatorio', error: true});
        return;
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/olvide-password/`;
      const {data} = await axios.post(url, {email})

      console.log(data);
      setAlerta({msg: data.msg});
    } catch (err) {
      console.log(err);
      setAlerta({msg: err.response.data.msg, error: true})
    }
  }

  const { msg} = alerta;
  return (
    <>
        <div>
          <h1 className="text-indigo-600 font-black text-6xl">Recupera tu Acceso y no Perdas <span className="text-black"> tus Pacientes</span></h1>
        </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

          {msg && <Alerta alerta={alerta}/>}

          <form onSubmit={handleSumbit}>
              <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">
                    Email
                  </label>
                  <input  value={email} onChange={ e => setEmail(e.target.value)} type="email" placeholder="Tu Email"  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
              </div>

              
              <input type="submit" value="Enviar Instrucciones" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"  name="" id="" />
            </form>

            <nav className='mt-10 lg:flex lg: justify-between'>
            <Link to="/" className='block text-center my-5 text-gray-500'>¿Ya tienes una cuenta? Inicia Sesion</Link>
            <Link to="/registrar" className='block text-center my-5 text-gray-500'>¿No tienes una cuenta? Registrate?</Link>
          </nav>
        </div>
    </>
  )
}

export default OlvidePassword