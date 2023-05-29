import { useState } from "react"
import useProyectos from "../hooks/UseProyectos"
import Alerta from "./Alerta"

const FormularioColaborador = () => {

  const [email, setEmail] = useState('')

  const {mostrarAlerta, alerta, submitColaborador} = useProyectos()

  const handleSubmit = e => {
    e.preventDefault()

    if (email === '') {
      mostrarAlerta({
        msg: 'El email es obligatorio',
        error: true
      })
    
      return
    }

    submitColaborador(email)
  }

  const {msg} = alerta

  return (
    <form 
      action=""
      onSubmit={handleSubmit}
      className="bg-orange-600 py-10 px-5 md:w-1/2 rounded-xl shadow-md text-white"
    >
      {msg && <Alerta alerta={alerta}/>}
      <div className='mb-5'>
        <label
            className='block  font-bold mb-2'
            htmlFor='nombre'
        >
            Email del Colaborador
        </label>
        <input 
            type="email" 
            id='email'
            placeholder='Email del Usuario'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-orange-200 text-white'
            value={email}
            onChange={e => setEmail(e.target.value)}
        /> 
    </div>

    <input 
        className='bg-teal-950 hover:bg-teal-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-md'
        type="submit" 
        value='Buscar Colaborador'
    />

    </form>
  )
}

export default FormularioColaborador