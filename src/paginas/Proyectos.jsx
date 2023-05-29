import { useEffect } from "react";
import useProyectos from "../hooks/UseProyectos";
import PreviewProyecto from "../components/PreviewProyecto";
import Alerta from "../components/Alerta";

const Proyectos = () => 
{

  const {proyectos, alerta} = useProyectos()



  const {msg} = alerta
  
  return (
    <>
      <h1 className="text-6xl font-black text-white">Proyectos</h1>

      {msg && <Alerta alerta={alerta}/>}

      <div className="bg-orange-400 shadow mt-10 rounded-xl">
        {proyectos.length ? 
          proyectos.map(proyecto => (
            <PreviewProyecto
              key={proyecto._id}
              proyecto={proyecto}

            />
          ))
          : <p className=" p-5 text-center text-gray-600 uppercase font-serif font-extrabold text-3xl">No hay proyectos aun</p>}
      </div>
    </>
  )
}

export default Proyectos