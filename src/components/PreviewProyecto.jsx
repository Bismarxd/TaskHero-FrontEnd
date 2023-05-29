import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PreviewProyecto = ({proyecto}) => {

    const {auth} = useAuth()

    const {nombre, _id, cliente, creador} = proyecto

  return (
    <div className="border-b-2 p-8 flex flex-col md:flex-row justify-between">

        <div className=" flex items-center gap-2">
          <p className="flex-1 text-2xl">
              {nombre}

              <span className="ml-3 text-gray-200 uppercase">{' '}{cliente}</span>
          </p>

          {auth._id !== creador && (
              <p className="p-2 text-xs font-bold text-white uppercase rounded-xl bg-green-900">Colaborador</p>
          )} 
        </div>
        

        <Link
            to={`${_id}`}
            className="text-gray-100 hover:text-gray-700 uppercase text-xl font-extrabold"
        >Ver Proyecto</Link>
        
    </div>
  )
}

export default PreviewProyecto