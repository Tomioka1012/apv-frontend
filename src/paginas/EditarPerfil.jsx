import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta";


const EditarPerfil = () => {

    const {auth,actualizarPerfil} = useAuth();
    const [perfil,setPerfil] = useState({});
    const [alerta,setAlerta] = useState({});
    

    useEffect(()=>{
        setPerfil(auth);


    },[auth]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log('Guardando cambios')
        //validación del formulario
        const {nombre,email} = perfil;
        if([nombre,email].includes('')){
            setAlerta({msg:'Nombre e email son campos obligatorios',error:true});
            return;
        }
        //Comprobando que el correo tenga un formato adecuado
        if(!/\S+@\S+\.\S+/.test(email)){
            setAlerta({msg:'email inválido', error: true});
            return;
        }
        //en caso de que el formulario sea válido
        const resultado = await actualizarPerfil(perfil);
        setAlerta(resultado);
        setTimeout(()=>{
            setAlerta({});
          },3000);
          
    }

    const{msg} = alerta;

   
  return (
    <>
        
        <AdminNav/>
        <h2 className="font-black text-3xl text-center mt-10">Editar perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Edita tu <span className="text-indigo-600 font-bold">Perfil aquí</span></p>

        <div className="flex justify-center">
            <div className="w-full mx-5 md:w-1/2 bg-white shadow rounded-lg p-5">
                {msg && <Alerta alerta={alerta}/>}
                <form action="">
                    <div className="my-3">
                        <label htmlFor="" className="uppercase font-bold text-gray-600">Nombre</label>
                        <input 
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="nombre"
                            value={perfil.nombre || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}
                         />
                    </div>
                    <div className="my-3">
                        <label htmlFor="" className="uppercase font-bold text-gray-600">Sitio web</label>
                        <input 
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="web"
                            value={perfil.web || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}
                            
                         />
                    </div>
                    <div className="my-3">
                        <label htmlFor="" className="uppercase font-bold text-gray-600">Teléfono</label>
                        <input 
                            type="tel"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="telefono"
                            value={perfil.telefono || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}
                         />
                    </div>
                    <div className="my-3">
                        <label htmlFor="" className="uppercase font-bold text-gray-600">email</label>
                        <input 
                            type="email"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="email"
                            value={perfil.email || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}
                         />
                    </div>

                    <input 
                        type="submit" 
                        value="guardar cambios"
                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer hover:bg-indigo-800"
                        onClick={handleSubmit}
                     />

                </form>
            </div>
        </div>
    </>
    
  )
}

export default EditarPerfil