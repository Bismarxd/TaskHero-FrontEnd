import useProyectos from "../hooks/UseProyectos"

const Colaborador = ({colaborador}) => {
    const {handleModalEliminarColaborador} = useProyectos()
    const {nombre, email} = colaborador

  return (
    <div className="border-b p-5 flex justify-between items-center">
        <div>
            <p className="text-xl font-bold font-serif">{nombre}</p>
            <p className="text-sky-950 text-lg">{email}</p>
        </div>

        <div>
            <button
                type="button"
                className="bg-red-700 hover:bg-red-400 px-5 py-3 text-white uppercase text-lg rounded-xl font-semibold"
                onClick={() => handleModalEliminarColaborador(colaborador)}

            >Eliminar</button>
        </div>
    </div>
  )
}

export default Colaborador