import { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const {setAuth} = useAuth();

    //para redireccionar al usuario
    const navigate = useNavigate();
    

    const handleSumit = async e  =>{
      e.preventDefault();
      
      //comprobar que el formulario no este vacio
      if([email,password].includes('')){
        setAlerta({ msg:'Todos los campos son obligatorios', error: true});
        return;
      }
      //comprobar que el formato del correo sea correcto
      if(!/\S+@\S+\.\S+/.test(email)){
        setAlerta({msg:'email inválido', error: true});
        return;
      }
      //En caso de que el campo este lleno y con un formato correcto, intentar authenticar
      try {
        const {data} = await clienteAxios.post('/veterinarios/login',{email,password});
        setAuth(data);
        localStorage.setItem('token',data.token);
        //redireccionar al ususario a su perfil
        navigate('/admin');

        
      } catch (error) {
        setAlerta({msg: error.response.data.msg, error:true});
      }
      
      


      
    }

    const {msg} = alerta;


  return (
    <>
      
      <div className=" ">
        <h1 className="text-indigo-600 font-black text-6xl text-center ">Inicia Seción y Administra a tus <span className="text-black">Pacientes</span></h1>
      </div>
      <div className="  mt-20 md:mt-5 shadow-lg p-10 border rounded-lg bg-white">
        {msg && <Alerta alerta={alerta}/>}
        <form action="" className="" onSubmit={handleSumit}>
          <div className="my-5">
            <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold"> Email</label>
            <input 
              type="email"  
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
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            value={password}
            onChange={e =>{setPassword(e.target.value)}} />
          </div>

          <input type="submit" value="Iniciar Sesión" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 cursor-pointer hover:bg-indigo-800 md:w-auto" />
        </form>
        <nav className='mt-10 lg:flex lg:justify-between '>
          <Link to="/registrar" className="block text-center my-5 text-gray-500 ">¿No tienes una cuenta? Regístrate</Link >
          <Link to="/olvide-password" className="block text-center my-5 text-gray-500">Olvide mi password</Link >
        </nav>
      </div>
    </>
    
  )
}

export default Login