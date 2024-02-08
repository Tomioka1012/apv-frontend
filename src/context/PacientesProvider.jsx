import { createContext, useState, useEffect} from "react"
import clienteAxios from "../config/axios"
import useAuth from "../hooks/useAuth"
//crear el contexto
const PacientesContext = createContext();
//crear el provedor del contexto
export const PacientesProvider = ({children}) => {

    const[pacientes,setPacientes] = useState([]);
    const[paciente,setPaciente] = useState({});

    const{auth} = useAuth();
    

    useEffect(()=>{
        const obtenerPacientes = async () =>{
            try {
                const token = localStorage.getItem('token');
                if(!token){
                    return;
                }
                //configuración de las credenciales
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                //obteniendo los registros de la API
                const {data} = await clienteAxios('/pacientes',config);
                setPacientes(data);
     
            } catch (error) {
                console.log(error);
                
            }
        }
        obtenerPacientes();

    },[auth]);

    const guardarPaciente = async (paciente) =>{

        const token = localStorage.getItem('token');
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
        
        if(paciente.id){
            //Actualizar al paciente
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`,paciente, config);
                //Actualizar el listado pacientes
                const pacienteActualizado = pacientes.map(pacienteState => pacienteState._id === data._id? data: pacienteState);
                setPacientes(pacienteActualizado);
                
            } catch (error) {
                console.log(error);
            }
        }else{
            delete paciente.id;
            //guardando el paciente
            try {
                const {data} = await clienteAxios.post('/pacientes',paciente, config);
                //crea un nuevo objeto excluyendo a los valores de la izquierda
                const {createdAt,updatedAt,__v, ...pacienteAlmacenado} = data;
                setPacientes([pacienteAlmacenado.pacienteAlmacenado,...pacientes]);
                
            } catch (error) {
                console.log(error.response.data.msg);
                
            } 
        }
        

    }

    const setEdicion = async (paciente) =>{
        setPaciente(paciente);
        //console.log(paciente);
    }

    const eliminarPaciente = async (id) =>{
        const confirmar = confirm('¿Confirmas que deceas eliminar a este paciente?');
        if(confirmar){
            const token = localStorage.getItem('token');
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

            const {data} = await clienteAxios.delete(`/pacientes/${id}`, config);
            const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id);
            setPacientes(pacientesActualizado);
        }else{
            console.log('Descartando eliminación');
        }

    }


  return (
    <>
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente,

            }}
        >
            {children}
        </PacientesContext.Provider>

    </>
  )
}



export default PacientesContext