import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
    const[password, setPassword] = useState('');
    const[alerta, setAlerta] = useState({});
    const[tokenValido, setTokenValido] = useState(false);
    const[passwordModificado,setPasswordModificado] = useState(false);
    const params = useParams();
    const {token} = params;

    useEffect(()=>{
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`);
                setAlerta({msg:'coloca tu password',error: false});
                setTokenValido(true);
            } catch (error) {
                setAlerta({msg:'Hubo un error con el enlace' , error:true})
            }

        }

        comprobarToken();

    },[]);

    const handleSumit = async e   =>{
        e.preventDefault();
        //comprobando que el password no sea corto
        if(password.length < 6){
            setAlerta({msg:'El password es muy corto, debe tener minímo 6 caracteres',error: true});
            return;
        }
        //Si el password es válido
        try {
            const url =`/veterinarios/olvide-password/${token}`;
            const {data} = await clienteAxios.post(url,{password});
            setAlerta({
                msg: data.msg,
                error: false
            });
            setPasswordModificado(true);

            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            
        }

    }

    const{msg} = alerta;
  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl text-center ">Reestablece tu password y no pierdas acceso a tus <span className="text-black">Pacientes</span></h1>
        </div>
        <div className="  mt-20 md:mt-5 shadow-lg p-10 border rounded-lg bg-white">
            {msg && <Alerta alerta={alerta}/>}
            {tokenValido && (
               <>
                <form onSubmit={handleSumit} >
                
                    <div className="my-5">
                        <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold"> Nuevo Password</label>
                        <input 
                            type="password" 
                            placeholder="Coloca aquí tu password" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={e =>{setPassword(e.target.value)}}
                        />
                </div>
                <input type="submit" value="Reestablecer password" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 cursor-pointer hover:bg-indigo-800 md:w-auto" />
                </form>
                {passwordModificado && (
                    <nav className='mt-10 lg:flex lg:justify-between '>
                    <Link to="/" className="block text-center my-5 text-gray-500 ">Iniciar sesión</Link >
                    </nav>
                )}
                </> 
            )}
            
        </div>
    </>
  )
}

export default NuevoPassword