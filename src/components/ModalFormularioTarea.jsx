import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProyectos from '../hooks/UseProyectos'
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'

const PRIORIDAD = ["Baja", "Media", "Alta"]


const ModalFormularioTarea = () => {

    const [nombre, setNombre] = useState('')
    const [id, setId] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [prioridad, setPrioridad] = useState('')

    const params = useParams()

    const {modalFormularioTarea, handleModalTarea, mostrarAlerta, alerta, submitTarea, tarea} = useProyectos()

    useEffect(() => {

        if (tarea?._id) {
            setId(tarea._id)
            setNombre(tarea.nombre)
            setDescripcion(tarea.descripcion)
            setFechaEntrega(tarea.fechaEntrega?.split('T')[0])
            setPrioridad(tarea.prioridad)
            return
        }
        setId('')
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setPrioridad('')
        
    },[tarea])

    const handleSubmit =async e => {
        e.preventDefault();

        if ([nombre, descripcion, fechaEntrega, prioridad].includes('')) {
            mostrarAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })

            
           
            return
        }
        submitTarea({id, nombre, descripcion,fechaEntrega, prioridad, proyecto:params.id})

        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setPrioridad('')
    }

   

    const {msg} = alerta
 
    return (
        <Transition.Root show={modalFormularioTarea } as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={ handleModalTarea }>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleModalTarea}
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start bg-orange-700 text-black">
                                <div className="mt-8 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-2xl font-serif leading-6 font-black text-gray-900 uppercase mt-4 text-center">
                                        {id ? 'Editar Tarea' : 'Crear Tarea'}
                                    </Dialog.Title>
                                    {msg && <Alerta alerta= {alerta} />}
                                    <form 
                                        onSubmit={handleSubmit}
                                        className='my-10 text-black mr-5'
                                    >
                                        <div className='mb-5'>
                                            <label
                                                className='block  font-bold mb-2'
                                                htmlFor='nombre'
                                           >
                                                Nombre de la Tarea
                                            </label>
                                            <input 
                                                type="text" 
                                                id='nombre'
                                                placeholder='Nombre de la tarea'
                                                className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-orange-200'
                                                value={nombre}
                                                onChange={e => setNombre(e.target.value)}
                                            /> 
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='block  font-bold mb-2'
                                                htmlFor='descripcion'
                                            >
                                                Descripción
                                            </label>
                                            <textarea 
                                                id='descripcion'
                                                placeholder='Descripción de la tarea'
                                                className='shadow appearance-none border rounded w-full py-2 px-3 bg-orange-200 leading-tight focus:outline-none focus:shadow-outline'
                                                value={descripcion}
                                                onChange={e => setDescripcion(e.target.value)}
                                            /> 
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='block  font-bold mb-2'
                                                htmlFor='fecha-entrega'
                                            >
                                                Fecha de Entrega
                                            </label>
                                            <input 
                                                type="date" 
                                                id='fecha-entrega'
                                                placeholder='Nombre de la tarea'
                                                className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-orange-200'
                                                value={fechaEntrega}
                                                onChange={e => setFechaEntrega(e.target.value)}
                                            /> 
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='block  font-bold mb-2'
                                                htmlFor='prioridad'
                                            >
                                                Prioridad
                                            </label>
                                            <select 
                                                id='prioridad'
                                                className='shadow appearance-none border rounded w-full py-2 px-3   leading-tight focus:outline-none focus:shadow-outline bg-orange-200 text-slate-950'
                                                value={prioridad}
                                                onChange={e => setPrioridad(e.target.value)}
                                            >

                                                <option value="">---SELECCIONAR---</option>

                                                {PRIORIDAD.map(opcion => (
                                                    <option key={opcion}>{opcion}</option>
                                                ))}
                                                

                                            </select> 

                                        </div>

                                        <input 
                                            className='bg-teal-950 hover:bg-teal-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-md'
                                            type="submit" 
                                            value={id ? 'Guargar Cambios' : 'Crear Tarea'}
                                        />
                                    </form>

                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalFormularioTarea