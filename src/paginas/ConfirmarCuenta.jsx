import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import clienteAxios from "../config/axios"
import Alerta from "../components/Alerta"

const ConfirmarCuenta = () => {

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const {id} = params;
  useEffect(() =>{
    const confirmarCuenta = async () =>{
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const {data} = await clienteAxios(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg:data.msg,
          error:false
        });
        

        
      } catch (error) {
        setAlerta({
          msg:error.response.data.msg,
          error: true
        })   
      }

      setCargando(false);

    };
    confirmarCuenta();

  },[]);
    return (
      <>
        <div className=" ">
            <h1 className="text-indigo-600 font-black text-6xl text-center">Confirma tu cuenta y Administra a tus <span className="text-black">Pacientes</span></h1>
        </div>

        <div className="  mt-20 md:mt-5 shadow-lg p-10 border rounded-lg bg-white">
          {!cargando && <Alerta
            alerta = {alerta}
          />}
          {cuentaConfirmada && (
            <Link to="/" className="block text-center my-5 text-gray-500 ">Inicia sesión</Link >
          ) }
        
           
        </div>
      
      </>
    )
  }
  
  export default ConfirmarCuenta