import { useState, useEffect } from "react"
import {Link, useParams} from 'react-router-dom'
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

const NuevoPassword = () => {

  const [passwordModificado, setPasswordModificado] = useState(false)
  const [password, setPassword] =useState('')
  const [tokenValido, setTokenValido] =useState(false)
  const [alerta, setAlerta] =useState({})

  const params = useParams()

  const {token} = params

  useEffect(() => {
    const comprobarToken = async () => {
      try {

  
        await clienteAxios.get(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)
        
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }

    comprobarToken()
  
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([password].includes('')) {
      setAlerta({
        msg: "La contraseña no puede estar Vacia",
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

   

    try {
    
      const url = `/usuarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });

      setAlerta({
        msg: data.msg,
        error: false
      })

      setPasswordModificado(true)
      
      
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
       <h1 className="text-violet-950 font-black text-7xl capitalize text-center">Reestablecer {' '}
        <span className=" text-violet-500 ">Contraseña</span></h1>

        {msg && <Alerta alerta={alerta}/>}

       {tokenValido && (
          <form 
            className="my-10 bg-indigo-400 shadow-md rounded-lg p-10"
            onSubmit={handleSubmit}
          >

         <div>
           <label 
               htmlFor="password" 
               className="uppercase text-gray-700 block text-xl">Nueva Contraseña
             </label>
               <input 
                 type="password" 
                 placeholder="Escribir la nueva contraseña"
                 className="w-full mt-3 p-3 border rounded-2xl bg-indigo-200"
                 id="password"
                 value={password}
                 onChange={e => setPassword(e.target.value)}
               />
         </div>
           

        

       

         <input
           type="submit"
           value="Guardar Password"
           className="bg-violet-950 mb-4 mt-3 w-full py-4 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-violet-700 transition-colors"
         />

          
          {passwordModificado && (
              <Link
              className='mt-5 block text-center my-3 mx-5 text-blue-950 uppercase text-lg font-serif ml-4'
                to="/"
              >Iniciar Sesión</Link>
            )}
          </form>
       )}

       
    </>
  )
}

export default NuevoPassword