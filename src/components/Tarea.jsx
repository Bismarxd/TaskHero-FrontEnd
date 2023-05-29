import { formatearFecha } from "../helpers/formatearFecha"
import useProyectos from "../hooks/UseProyectos"
import useAdmin from "../hooks/useAdmin"

const Tarea = ({tarea}) => {

    const {hanleModalEditarTarea, handleModalEliminarTarea, completarTarea} = useProyectos()

    const admin = useAdmin()

    const {nombre, descripcion, prioridad, fechaEntrega, estado, _id} = tarea

  return (
    <div className="border-b p-5 flex justify-between items-center">
        <div className="flex flex-col items-start">
            <p className="mb-3 text-3xl font-black">{nombre}</p>
            <p className="mb-3 text-xl text-stone-300">{descripcion}</p>
            <p className="mb-3 text-2xl text-teal-950">{formatearFecha(fechaEntrega)}</p>
            <p className="mb-3 text-xl text-stone-300">Prioridad:{prioridad}</p>
            {estado && <p className="text-base font-light bg-orange-950 text-white rounded-lg uppercase p-2">Completada por: {tarea.completado?.nombre}</p>}
            
        </div>

        <div className="flex flex-col md:flex-row mt-4 gap-4">
            {admin && (
            <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 md:p-10 rounded"
            onClick={() => hanleModalEditarTarea(tarea)}
            >
                Editar
            </button>
            )}

            <button 
            className={`${estado ? 'bg-green-800' : 'bg-gray-600'} text-white font-bold p-4 md:p-10 rounded` }
            onClick={() => completarTarea(_id)}
            >
               
            {estado ? 'Completa' : 'Incompleta'}
           </button>

            

           

            {admin && (
            <button 
                type="button"
                className="bg-red-700 hover:bg-red-400 text-white font-bold p-4 md:p-10  rounded"
                onClick={() => handleModalEliminarTarea(tarea)}
                >Eliminar
            </button>
            )}
        </div>
        
    </div>
  )
}

export default Tarea