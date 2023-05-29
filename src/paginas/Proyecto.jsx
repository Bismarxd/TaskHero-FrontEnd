import { useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import useProyectos from "../hooks/UseProyectos";
import useAdmin from "../hooks/useAdmin";
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";
import Tarea from "../components/Tarea";
import Alerta from "../components/Alerta";
import Colaborador from "../components/Colaborador";
import io from 'socket.io-client'

let socket;

const Proyecto = () => 
{

  const params = useParams()

  const {obtenerProyecto, proyecto, cargando, handleModalTarea, alerta, submitTareasProyecto, eliminarTareasProyecto, actualizarTareaProyecto, actualizarEstado} = useProyectos()

  const admin = useAdmin()


  useEffect(() => {
    obtenerProyecto(params.id)
  }, [])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('abrir proyecto', params.id)
  },[])

  useEffect(() => {
      socket.on('respuesta', (persona) => {
        console.log(persona);
      })
  })

  useEffect(() => 
{
  socket.on('tarea agregada', tareaNueva => 
  {
    if (tareaNueva.proyecto === proyecto._id) {
      submitTareasProyecto(tareaNueva);
    }
  }); // Agregar llave de cierre aquí

  socket.on('tarea eliminada', tareaEliminada=> {
    if (tareaEliminada.proyecto === proyecto._id) {
      eliminarTareasProyecto(tareaEliminada);
    }       
  });
  
  socket.on('tarea actualizada', tareaActualizada=> {
    if (tareaActualizada.proyecto._id === proyecto._id) {
      actualizarTareaProyecto(tareaActualizada);  
    }       
  });

  socket.on('nuevo estado', estadoActualizado=> {
    if (estadoActualizado.proyecto._id === proyecto._id) {
      actualizarEstado(estadoActualizado);  
    }       
  });

  
});

  
  const {nombre} = proyecto

  if (cargando) return '...'

  const {msg} = alerta



  return (
    
      <>  
      <div className="flex justify-between">
        <h1 className="font-black text-white text-6xl">{nombre}</h1>

        {admin && (
  
          <div className="flex items-center gap-2 text-cyan-950 hover:text-cyan-950">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>

            <Link
              to={`/proyectos/editar/${params.id}`}
              className="uppercase font-bold"
            >Editar</Link>
          </div>
          )}
        </div>

          {admin && (
        <button
        onClick={handleModalTarea}
        type="button"
        className="text-xl px-5 py-3 w-full md:w-auto rounded-xl uppercase font-bold bg-cyan-900 text-white text-center mt-5 flex gap-3 items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>

          
          Nueva Tarea
        </button>
        )}

        <p className="font-extrabold text-2xl mt-10">Tareas del Proyecto</p>

        <div className="flex justify-center">
          <div className="w-full md:w-1/3 lg:w-1/4">
            {msg && <Alerta alerta={alerta}/>}
          </div>
          
        </div>
        

        <div className="bg-orange-700 shadow-lg mt-10 rounded-lg">
          {proyecto.tareas?.length ? 
            proyecto.tareas?.map(tarea => (
              <Tarea
                key={tarea._id}
                tarea={tarea}
              />
            )):
          <p className="text-center font-bold text-2xl my-5 p-10 text-white">Aun no hay Tareas</p>}
        </div>

        {admin && (
          <>
            <div className="flex items-center justify-between mt-10">
          <p className="font-extrabold text-2xl mt-10">Colaboradores</p>
          <Link
            to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
            className="text-white hover:text-black uppercase font-bold text-2xl"
          >Añadir +</Link>
        </div>

              
        <div className="bg-orange-700 shadow-lg mt-10 rounded-lg">
          {proyecto.colaboradores?.length ? 
            proyecto.colaboradores?.map(colaborador => (
              <Colaborador
                key={colaborador._id}
                colaborador={colaborador}
              />
            )):
          <p className="text-center font-bold text-2xl my-5 p-10 text-white">Aun no hay Colaboradores en este proyecto</p>}
        </div>
          </>
        
        )}
        

        <ModalFormularioTarea/>
        <ModalEliminarTarea/>
        <ModalEliminarColaborador/>
      
      
    </>
    )
    
}


export default Proyecto