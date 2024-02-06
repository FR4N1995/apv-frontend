// esta importacion  es para mejorar elc performance en los enlaces
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Alerta from '../components/Alerta';
import  axios  from "axios";
import useAuth from '../hooks/useAuth'


const Login = () => {

  // const  {auth} = useAuth()
  // console.log(auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState('');
  const navigate = useNavigate();
  const {setAuth} = useAuth();

  const handleSubmit = async(e) =>{
        e.preventDefault();
        if ([email, password].includes('')) {
          setAlerta({
            msg: 'todos los campos obligatorios',
            error: true
          });
          return;
        }
        // console.log('iniciando sesion');
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/login`;
          const {data} = await axios.post(url, {email, password});
          console.log(data);
          localStorage.setItem('apv_token', data.token);
          setAuth(data);
          navigate('/admin');
        } catch (error) {
          setAlerta({
            msg: error.response.data.msg,
            error: true
          })
        }

  }



  const {msg} = alerta;
  return (
    <>
      <div>
          <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesion y Administra tus <span className="text-black">Pacientes</span></h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        {msg && <Alerta alerta={alerta} />}
          <form  onSubmit={handleSubmit}>
              <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">
                    Email
                  </label>
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email de Registro"  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
              </div>
              <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">
                    Password
                  </label>
                  <input value={password} onChange={e => setPassword(e.target.value)}  type="password" placeholder="Tu Password"  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
              </div>

              <input type="submit" value="Iniciar Sesion" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"  name="" id="" />

          </form>

          <nav className='mt-10 lg:flex lg: justify-between'>
            <Link to="/registrar" className='block text-center my-5 text-gray-500'>¿No tienes una cuenta? Registrate?</Link>
            <Link to="/olvide-password" className='block text-center my-5 text-gray-500' >olvide mi Password</Link>
          </nav>
      </div>
    
    </>
  )
}

export default Login