import {Link} from 'react-router-dom'
import { useState } from 'react'
import clienteAxios from '../config/clienteAxios'
import Alerta from '../components/Alerta'


const OlvidePassword = () => 
{

  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();

    if (email === '' || email.length < 6) {
      setAlerta({
        msg: "El email es obligatorio",
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
    
    try {
      const { data } = await clienteAxios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password`, { email });

      setAlerta({
        msg: data.msg,
        error: false
      })
      
    } catch (error) 
    {
      setTimeout(() => {
        setAlerta({
          msg: error.response.data.msg,
          error:true
        })
        setAlerta({
          msg: '',
          error:false
        })
        
      }, 3000);
    
    }
  }

  const {msg} = alerta

  return (
    <>
    <h1 className="text-violet-950 font-black text-7xl capitalize text-center">Recuperar{' '}
      <span className=" text-violet-500 ">Cuenta</span></h1>

      { msg && <Alerta alerta={alerta}/>}

      <form 
      onSubmit={handleSubmit}
      className="my-10 bg-indigo-400 shadow-md rounded-lg p-10"
      
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
              onChange={ e => setEmail(e.target.value)}
            />
          
        </div>



       

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="bg-violet-950 mb-4 mt-3 w-full py-4 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-violet-700 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
        className='block text-center my-3 mx-5 text-blue-950 uppercase text-lg font-serif ml-4'
          to="/"
        >Ya tienes una cuenta? Iniciar Sesión</Link>

        <Link
          className='block text-center my-3 text-blue-950 uppercase text-xl font-serif ml-4'
            to="/registrar"
          >Aún no estas registrado? Registrarse</Link>

      </nav>

     
       
      
  </>
  )
}

export default OlvidePassword