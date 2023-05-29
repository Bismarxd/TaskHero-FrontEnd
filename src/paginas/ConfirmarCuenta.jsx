import { useEffect, useState } from "react"
import { useParams, Link} from 'react-router-dom'
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const params = useParams()
  const {id} = params

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {

        const url = `/usuarios/confirmar/${id}`
        const {data} = await clienteAxios.get(url)

        setAlerta({
          msg: data.msg,
          error: false
        })

        setCuentaConfirmada(true)
        
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
        
      }
    }

    confirmarCuenta()
  }, [])

  const { msg } =alerta
  

  return (
    <>
       <h1 className="text-violet-950 font-black text-7xl capitalize text-center">Confirma {' '}
        <span className=" text-violet-500 ">tu Cuenta</span></h1>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-lg bg-white">
          {msg && <Alerta alerta={alerta}/>}

          {cuentaConfirmada && (
            <Link
            className='mt-5 block text-center my-3 mx-5 text-blue-950 uppercase text-lg font-serif ml-4'
              to="/"
            >Iniciar Sesión</Link>
          )}
        </div>
    </>
  )
}

export default ConfirmarCuenta