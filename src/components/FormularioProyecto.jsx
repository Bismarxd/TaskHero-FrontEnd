import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/UseProyectos"
import Alerta from "./Alerta"

const FormularioProyecto =  () => {

    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    const params = useParams()

    const {mostrarAlerta, alerta, submitProyecto, proyecto} = useProyectos();

    useEffect(() => {
        if (params.id) {

            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)
        }
    }, [params])

    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error:true
            })
            
        }

        //Pasar los datos hacoia el provider
        await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente});

        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')

    }

    const {msg} = alerta;

  return (
    <form 
        action=""
        className="bg-white py-10 px-5 m:w-1/2 rounded-xl"
        onSubmit={handleSubmit}
    >
        {msg && <Alerta alerta={alerta}/>}
        <div className="mb-5">
            <label 
                htmlFor="nombre"
                className="text-gray-900 uppercase font-bold text-base"   
            >Nombre del Proyecto</label>

            <input 
                id="nombre"
                type="text" 
                className="border-2 w-full p-2 mt-2 placeholder-white rounded-md bg-orange-400 "
                placeholder="Nombre del Proyecto"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label 
                htmlFor="descripcion"
                className="text-gray-900 uppercase font-bold text-base"   
            >Descripción</label>

            <textarea 
                id="descripcion"
                type="text" 
                className="border-2 w-full p-2 mt-2 placeholder-white rounded-md bg-orange-400 "
                placeholder="Descripción del Proyecto"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label 
                htmlFor="fecha-entrega"
                className="text-gray-900 uppercase font-bold text-base"   
            >Fecha de Entrega</label>

            <input
                id="fecha-entrega"
                type="date" 
                className="border-2 w-full p-2 mt-2 placeholder-white rounded-md bg-orange-400 "
                value={fechaEntrega}
                onChange={e => setFechaEntrega(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label 
                htmlFor="cliente"
                className="text-gray-900 uppercase font-bold text-base"   
            >Nombre del Cliente</label>

            <input
                id="cliente"
                type="text" 
                className="border-2 w-full p-2 mt-2 placeholder-white rounded-md bg-orange-400 "
                placeholder="Nombre del Cliente"
                value={cliente}
                onChange={e => setCliente(e.target.value)}
            />
        </div>

        <input 
            type="submit" 
            value={id ? 'Actualizar Proyecto' : 'Crear nuevo proyecto'}
            className="bg-red-700 w-full p-3 uppercase font-bold text-white rounded-md cursor-pointer hover:bg-red-500 transition-colors"
        />

    </form>
  )
}

export default FormularioProyecto