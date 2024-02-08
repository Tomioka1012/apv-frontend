import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"
const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta,setAlerta] = useState({});

  const handleSumit = async e => {
    e.preventDefault();
    //Comprobando que no sea un campo vacio
    if(email === ''){
      setAlerta({msg:'El email es obligatorio', error: true});
      return;
    }
    //Comprobando que el correo tenga un formato adecuado
    if(!/\S+@\S+\.\S+/.test(email)){
      setAlerta({msg:'email inválido', error: true});
      return;
  }

  //si el email es válido
  try {
    const {data} = await clienteAxios.post('/veterinarios/olvide-password',{email});
    setAlerta({msg: data.msg , error: false});
    setTimeout(()=>{
      setAlerta({});
    },3000);
    
    
  } catch (error) {
    setAlerta({
      msg: error.response.data.msg,
      error: true
    })
    
  }


  };

  const {msg} = alerta;
  return (
    <>
        <div>
          <h1 className="text-indigo-600 font-black text-6xl text-center ">Recupera tu Acceso y No Pierdas a tus <span className="text-black">Pacientes</span></h1>
        </div>
        <div className="  mt-20 md:mt-5 shadow-lg p-10 border rounded-lg bg-white">
        {msg && <Alerta
                alerta={alerta}
            />}
          <form onSubmit={handleSumit}>
            <div className="my-5">
              <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold"> Email</label>
              <input type="text" value={email} placeholder="ex. correo@correo.com" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl " onChange={e => setEmail(e.target.value)} />
            </div>
            <input type="submit" value="Enviar instrucciones" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 cursor-pointer hover:bg-indigo-800 md:w-auto" />
          </form>
          <nav className='mt-10 lg:flex lg:justify-between '>
            <Link to="/" className="block text-center my-5 text-gray-500 ">¿Ya tienes una cuenta? Inicia sesión</Link >
            <Link to="/registrar" className="block text-center my-5 text-gray-500 ">¿No tienes una cuenta? Regístrate</Link >
            
          </nav>
        </div>
    
    </>
  )
}

export default OlvidePassword