import { useState } from "react"
import clienteAxios from "../config/axios"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
const Registrar = () => {
    const [nombre,setNombre] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [repetirPassword,setRepetirPassword] = useState('');
    const [alerta,setAlerta] = useState({});

    const handleSumit = async e => {
        e.preventDefault();
        
        //Comprobando que ningún campo este vacio
        if([nombre,email,password,repetirPassword].includes('')){
            setAlerta({msg:'Todos los campos son obligatorios', error: true});
            console.log('campos vacios');
            return;
        }
        //comprobando que los campos PASSWORD y REPETIR PASSWORD sean iguales
        if(password !== repetirPassword){
            setAlerta({msg:'Los password no coinciden', error: true});
            return;
        }
        //comprobando que el password no sea corto
        if(password.length < 6){
            setAlerta({msg:'El password es muy corto, debe tener minímo 6 caracteres',error: true});
            return;
        }
        //Comprobando que el correo tenga un formato adecuado
        if(!/\S+@\S+\.\S+/.test(email)){
            setAlerta({msg:'email inválido', error: true});
            return;
        }

        //crear el usuario en la API
        try {
            
            await clienteAxios.post(`/veterinarios`,{nombre, email, password});
            //NO OLVIDAR PONER UN SETTIMEOUT PARA EL MENSAJE
            setAlerta({msg:'Cuenta creada correctamente, revisa tu email (spam)', error: false});
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error:true});
        }

    }
    const {msg} = alerta;
        

    return (
      <>
        <div className=" ">
            <h1 className="text-indigo-600 font-black text-6xl text-center">Crea tu Cuenta y Administra tus <span className="text-black">Pacientes</span></h1>
        </div>

        <div className="  mt-20 md:mt-5 shadow-lg p-10 border rounded-lg bg-white">
            {msg && <Alerta
                alerta={alerta}
            />}
            <form action="" className="" onSubmit={handleSumit}>

                <div className="my-5">
                    <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold"> Nombre</label>
                    <input 
                        type="text" 
                        placeholder="Introduce tu nombre completo" 
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={nombre}
                        onChange={e =>{setNombre(e.target.value)}} />
                </div>

                <div className="my-5">
                    <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold"> Email</label>
                    <input 
                        type="text" 
                        placeholder="ex. correo@correo.com" 
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={email}
                        onChange={e =>{setEmail(e.target.value)}}
                        />
                </div>


                <div className="my-5">
                    <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold"> Password</label>
                    <input 
                        type="password" 
                        placeholder="Coloca aquí tu password" 
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={password}
                        onChange={e =>{setPassword(e.target.value)}}
                         />
                </div>

                <div className="my-5">
                    <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">  Repetir password</label>
                    <input 
                        type="password" 
                        placeholder="Repite tu password" 
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={repetirPassword}
                        onChange={e =>{setRepetirPassword(e.target.value)}}
                        />
                </div>

                <input type="submit" value="Crear cuenta" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 cursor-pointer hover:bg-indigo-800 md:w-auto" />
            </form>

            <nav className='mt-10 lg:flex lg:justify-between '>
                <Link to="/" className="block text-center my-5 text-gray-500 ">¿Ya tienes una cuenta? Inicia sesión</Link >
                <Link to="/olvide-password" className="block text-center my-5 text-gray-500">Olvide mi password</Link >
            </nav>

        </div>
        
      
      </>
    )
  }
  
  export default Registrar