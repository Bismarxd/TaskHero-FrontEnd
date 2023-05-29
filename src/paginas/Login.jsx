import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const {setAuth} = useAuth();

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    if ([email, password].includes('')) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      });

      setTimeout(() => {
        setAlerta({
          msg: ""
        });
      }, 3000);
      return
    }
  
    try {
    
      const {data} = await clienteAxios.post('/usuarios/login', {email, password})

      setAlerta({})
      localStorage.setItem('token', data.token)
      setAuth(data)

      navigate('/proyectos')
  
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });

      setTimeout(() => {
        setAlerta({
          msg: ""
        });
      }, 3000);
      return
    }
  }

  
 

  const {msg} = alerta

  return (
    <>
      <h1 className="text-violet-950 font-black text-5xl capitalize">Accede a tu cuenta y {' '}
        <span className=" text-violet-500 ">gestiona tus proyectos</span></h1>

        {msg && <Alerta alerta={alerta} />}

        <form 
          className="my-10 bg-indigo-400 shadow-md rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label 
              htmlFor="email" 
              className="uppercase text-gray-700 block text-xl">Email
            </label>
              <input 
                type="email" 
                placeholder="Tu correo electronico"
                className="w-full mt-3 p-3 border rounded-2xl bg-indigo-200"
                id="email"
                value={email}
                onChange={e=> setEmail(e.target.value)}
              />
            
          </div>

          <div className="my-5">
            <label 
              htmlFor="password" 
              className="uppercase text-gray-700 block text-xl">Password
            </label>
              <input 
                type="password" 
                placeholder="Tu contraseña"
                className="w-full mt-3 p-3 border rounded-2xl bg-indigo-200"
                id="password"
                value={password}
                onChange={e=> setPassword(e.target.value)}
              />
            
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-violet-950 mb-4 mt-3 w-full py-4 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-violet-700 transition-colors"
          />
        </form>

        <nav className="lg:flex lg:justify-between">
          <Link
          className='block text-center my-3 text-blue-950 uppercase text-xl font-serif ml-4'
            to="/registrar"
          >Aún no estas registrado? Registrarse</Link>

          <Link
          className='block text-center my-3 text-blue-950 uppercase text-xl font-serif ml-4'
            to="/olvide-password"
          >Olvidaste tu contraseña? Recuperar Cuenta</Link>
        </nav>

       
         
        
    </>
  )
}

export default Login