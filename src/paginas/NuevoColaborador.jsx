import { useEffect } from "react"
import FormularioColaborador from "../components/FormularioColaborador"
import useProyectos from "../hooks/UseProyectos"
import { useParams } from "react-router-dom"
import Alerta from "../components/Alerta"

const NuevoColaborador = () => {

  const { obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, alerta } = useProyectos()
  const params = useParams()

  useEffect(() => {
    obtenerProyecto(params.id)

  }, [])


  if (!proyecto?._id) return <Alerta alerta={alerta}/>
  

  return (
    <>
        <h1 className="text-5xl font-black text-white">Añadir Colaborador(a) al proyecto: {proyecto.nombre}</h1>

        <div className="mt-10 flex justify-center">
            <FormularioColaborador/>
        </div>

        {cargando ? <p className="text-center font-bold text-xl">cargando...</p> : colaborador?._id && (
          <div className="flex justify-center mt-10 text-white">
            <div className="bg-orange-700 py-10 px-5 md:w-1/2 rounded-xl shadow-md w-full">
              <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>

              <div className="flex justify-between items-center">
                <p className="text-white text-3xl font-serif">{colaborador.nombre}</p>

                <button
                type="button"
                className="bg-blue-950 text-white uppercase py-5 px-2 rounded-xl font-bold "
                onClick={() => agregarColaborador({
                  email:colaborador.email
                })}
                
                >Agregar al Proyecto</button>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default NuevoColaborador