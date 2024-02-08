import { useState } from "react"
import Alerta from "../components/Alerta"
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"



const CambiarPassword = () => {
  //states
  const[alerta,setAlerta] = useState({});
  const[password,setPassword] = useState({
    pwd_actual:'',
    pwd_nuevo:''
  });
  //hook
  const{guardarPassword} = useAuth();

  const handleSubmit= async(e) =>{
    e.preventDefault();
    if(Object.values(password).some(campo => campo === '')){
      setAlerta({msg:'Todos los campos son obligatorios',error:true});
      setTimeout(()=>{
        setAlerta({});
      },3000);
      return;
    }

    if(Object.values(password).some(campo => campo.length < 6)){
      setAlerta({msg:'La contraseña no puede ser menor a 6 caracteres',error:true});
      setTimeout(()=>{
        setAlerta({});
      },3000);
      return;
    }

    const respuesta = await guardarPassword(password);
    setAlerta(respuesta);
    setTimeout(()=>{
      setAlerta({});
    },3000);

  }

  const{ msg }= alerta;
  return (
    <>
        <AdminNav/>
        <h2 className="font-black text-3xl text-center mt-10">Cambiar password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu <span className="text-indigo-600 font-bold">Password aquí</span></p>
        <div className="flex justify-center">
            <div className="w-full mx-5 md:w-1/2 bg-white shadow rounded-lg p-5">
              {msg && <Alerta alerta={alerta}/>}
              <form action="">
                  <div className="my-3">
                      <label htmlFor="" className="uppercase font-bold text-gray-600">Password actual</label>
                      <input 
                          type="password"
                          className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                          name="pwd_actual"
                          placeholder="Escribe tu password actual"
                          onChange={e => setPassword({
                            ...password,
                            [e.target.name] : e.target.value
                          })}
                      />
                  </div>
                  <div className="my-3">
                      <label htmlFor="" className="uppercase font-bold text-gray-600">nuevo password</label>
                      <input 
                          type="password"
                          className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                          name="pwd_nuevo"
                          placeholder="Escribe tu nuevo password"
                          onChange={e => setPassword({
                            ...password,
                            [e.target.name] : e.target.value
                          })}
                      />
                  </div>

                  <input 
                      type="submit" 
                      value="actualizar password"
                      className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer hover:bg-indigo-800"
                      onClick={handleSubmit}
                  />

                </form>
            </div>
        </div>
    </>
  )
}

export default CambiarPassword