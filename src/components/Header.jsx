import { Link } from "react-router-dom"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark} from '@fortawesome/free-solid-svg-icons'
import useAuth from "../hooks/useAuth"
const Header = () => {

    const{cerrarSesion} = useAuth();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    // Función para alternar la visibilidad del menú de hamburguesa
    const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    };
  return (
    <>
        <header className="py-7 bg-indigo-600 ">
            <div className="container mx-auto flex justify-between items-center px-2 gap-2">
                <h1 className="font-bold text-2xl text-center  text-indigo-200">Administrador de Pacientes de <span className="text-white font-black">Veterinaria </span> </h1>
                <nav className="hidden md:flex gap-4 ">
                    <Link to={"/admin"} className="text-white text-sm uppercase font-bold">Pacientes</Link>
                    <Link to={"/admin/perfil"} className="text-white text-sm uppercase font-bold">Perfil</Link>
                    <button 
                    type="button" 
                    className="text-white text-sm font-bold uppercase"
                    onClick={cerrarSesion}
                    >Cerrar sesión</button>
                </nav>
                {/* Menú de hamburgesa para dispositivos moviles */}
                <div className="md:hidden">
                    <button
                    id="menu-toggle"
                    className="text-white focus:outline-none"
                    onClick={toggleMobileMenu}
                    >
                    <FontAwesomeIcon className="text-2xl" icon={isMobileMenuOpen? faXmark:faBars} />
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && 
                    <nav className="flex-col gap-4">
                        <Link to={"/admin"} className="text-white text-sm uppercase font-bold block py-2 pl-2 hover:bg-indigo-500 ">Pacientes</Link>
                        <Link to={"/admin/perfil"} className="text-white text-sm uppercase font-bold block py-2 pl-2 hover:bg-indigo-500">Perfil</Link>
                        <button type="button"
                         className="text-white text-sm font-bold block w-full py-2 pl-2 text-left hover:bg-indigo-500 uppercase"
                         onClick={cerrarSesion}
                         >Cerrar sesión</button>
                    </nav>
                }


        </header>
    </>
  )
}

export default Header