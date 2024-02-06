import {useState} from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/alerta';
import axios from 'axios';
const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setrepetirPassword] = useState('');

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async(e) =>{
      e.preventDefault();
      // console.log('Enviando desde Formulario');
      if([nombre, email, password, repetirPassword].includes('')){
        setAlerta({msg: 'Todos campos son obligatorios', error: true});
        // console.log('Todos los Campos son obligatorios');
        return;
      }

      if(password !== repetirPassword){
        setAlerta({msg: 'Los Password deben ser iguales', error: true});
        // console.log('Los Password deben ser iguales');
        return;
      }

      if(password.length < 6){
          setAlerta({msg: 'El passsword debe tener mas de 6 caracteres', error: true});
          // console.log('El passsword debe tener mas de 6 caracteres');
          return;
      }
      setAlerta({});
      console.log('Todo bien..');

      // crear el usuario en la api / base de datos
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios`;
          const respuesta = await axios.post(url, {nombre, email, password})
          setAlerta({msg: 'Creado correctamente, Revisa tu email', error: false});
      } catch (error) {
          setAlerta({msg: error.response.data.msg, error: true})
        
      }

  }

    const {msg} = alerta;

  return (
    <>
         <div>
              <h1 className="text-indigo-600 font-black text-6xl">Crea tu cuenta y Administra <span className="text-black">tus Pacientes</span></h1>
         </div>
         <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            {msg && <Alerta alerta={alerta}/>}

          <form onSubmit={handleSubmit}>
              <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">
                    Nombre
                  </label>
                  <input value={nombre} onChange={e => setNombre(e.target.value)} type="text" placeholder="Tu nombre"  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
              </div>
              <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">
                    Email
                  </label>
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email de Registro"  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
              </div>
              <div className="my-5">
                  <label  className="uppercase text-gray-600 block text-xl font-bold">
                    Password
                  </label>
                  <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Tu Password"  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
              </div>
              <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">
                    Repetir Password
                  </label>
                  <input value={repetirPassword} onChange={e => setrepetirPassword(e.target.value)} type="password" placeholder="Repite tu Password"  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
              </div>

              <input type="submit" value="Crear Cuenta" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"  name="" id="" />

          </form>

          <nav className='mt-10 lg:flex lg: justify-between'>
            <Link to="/" className='block text-center my-5 text-gray-500'>¿Ya tienes una cuenta? Inicia Sesion</Link>
            <Link to="/olvide-password" className='block text-center my-5 text-gray-500' >olvide mi Password</Link>
          </nav>
          
          
    </div>
    </>
  )
};

export default Registrar;
