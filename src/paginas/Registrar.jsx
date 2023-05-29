import {Link} from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'


const Registrar = () => {
  const [nombre,setNombre] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [repetirPassword,setRepetirPassword] = useState('')
  const [alerta,setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })

      setTimeout(() => {
        setAlerta({
          msg: "",
          error: false
        })
      }, 3000);
      return

    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: "Las contraseñas no son iguales",
        error: true
      })

      setTimeout(() => {
        setAlerta({
          msg: "",
          error: false
        })
      }, 3000);
      return
    }

    if (password.length < 6) {
      setAlerta({
        msg: "la contraseña es muy corta, tiene que tener minimo 6 caracteres",
        error: true
      })

      setTimeout(() => {
        setAlerta({
          msg: "",
          error: false
        })
      }, 5000);
      return
    }

    setAlerta({})

    //Crea el usuario en la Base de datos
    try {

        const {data} = await clienteAxios.post(`/usuarios`, {nombre, email, password})
        
        setAlerta({
          msg:data.msg,
          error:false
        })

        setNombre('')
        setEmail('')
        setPassword('')
        setRepetirPassword('')
      
    } catch (error) {
      setAlerta({
        msg: "El usuario ya esta registrado",
        error: true
      })

      setTimeout(() => {
        setAlerta({
          msg: "",
          error: false
        })
      }, 3000);
    }

  }

  const {msg} = alerta

  return (
    <>
      <h1 className="text-violet-950 font-black text-7xl capitalize text-center">Crear{' '}
        <span className=" text-violet-500 ">Cuenta</span></h1>

        {msg && <Alerta alerta={alerta}/>}

        <form 
          className="my-10 bg-indigo-400 shadow-md rounded-lg p-10"
          onSubmit={handleSubmit}
        >

          <div className="my-5">
              <label 
                htmlFor="nombre" 
                className="uppercase text-gray-700 block text-xl">Nombre
              </label>
                <input 
                  type="text" 
                  placeholder="Tu Nombre"
                  className="w-full mt-3 p-3 border rounded-2xl bg-indigo-200"
                  id="nombre"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
              
          </div>

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
                  onChange={e => setEmail(e.target.value)}
              />
            
          </div>

          <div>
            <label 
                htmlFor="password" 
                className="uppercase text-gray-700 block text-xl">Contraseña
              </label>
                <input 
                  type="password" 
                  placeholder="Tu contraseña"
                  className="w-full mt-3 p-3 border rounded-2xl bg-indigo-200"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
          </div>
            

         

          <div className="my-5">
            <label 
              htmlFor="password2" 
              className="uppercase text-gray-700 block text-xl">Repetir Contraseña
            </label>
              <input 
                type="password" 
                placeholder="Repite tu Contraseña"
                className="w-full mt-3 p-3 border rounded-2xl bg-indigo-200"
                id="password2"
                value={repetirPassword}
                  onChange={e => setRepetirPassword(e.target.value)}
              />
            
          </div>

          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-violet-950 mb-4 mt-3 w-full py-4 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-violet-700 transition-colors"
          />
        </form>

        <nav className="lg:flex lg:justify-between">
          <Link
          className='block text-center my-3 mx-5 text-blue-950 uppercase text-lg font-serif ml-4'
            to="/"
          >Ya tienes una cuenta? Iniciar Sesión</Link>

          <Link
          className='block text-center my-3 mx-2 text-blue-950 uppercase text-lg font-serif ml-4'
            to="/olvide-password"
          >Olvidaste tu contraseña? Recuperar Cuenta</Link>
        </nav>

       
         
        
    </>
  )
}

export default Registrar