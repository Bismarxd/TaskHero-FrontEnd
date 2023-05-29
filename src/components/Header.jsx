import { Link } from "react-router-dom"
import useProyectos from "../hooks/UseProyectos"
import useAuth from "../hooks/useAuth"
import Busqueda from "./Busqueda"


const Header = () => {

    const {handleBuscador, cerrarSesionProyectos} = useProyectos()
    const {cerrarSesionAuth} = useAuth()

    const handleCerrarSesion = () => {
        if (confirm('Esta seguro que desea cerrar sesión?')) {
            cerrarSesionAuth()
            cerrarSesionProyectos()
            localStorage.removeItem('token')
        }
       
    }

  return (
    <header className="px-4 py-5 bg-gradient-to-r from-red-500 to-orange-500 border-b">
        <div className=" md:flex md:justify-between">
            <h2 className="text-8xl text-red-700 font-black text-center mb:5 md:mb-0">
                TaskHero
            </h2>


            <div className="flex flex-col md:flex-row items-center gap-4">
                <Link
                    to="/proyectos"
                    className="font-bold uppercase"
                >Proyectos</Link>

                <button
                type="button"
                className="font-bold uppercase"
                onClick={handleBuscador}
            >Buscar Proyecto</button>

                <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded-md uppercase"
                    onClick={handleCerrarSesion}
                >
                    Cerrar Sesión
                </button>
                <Busqueda/>
            </div>

           

        </div>

    </header>
  )
}

export default Header