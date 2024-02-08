import Alerta from "./Alerta";
import { useState, useEffect } from "react"
import usePacientes from "../hooks/UsePacientes";
const Formulario = () => {
    //UseState del formulario
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('') 
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const[id,setId] = useState(null);
    //UseState de la alerta
    const [alerta,setAlerta] = useState({});
    //Destructuring de context pacientes
    const {guardarPaciente,paciente} = usePacientes()
    //useefect para editar al paciente
    useEffect (() =>{
        if(paciente?.nombre){
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha('');
            setSintomas(paciente.sintomas);

            setId(paciente._id);

        }
    },[paciente])





    

    //submit del formulario
    const handleSubmit = e =>{
        e.preventDefault();
        
        //validando que todos los campos este llenos
        if([nombre,propietario,email,fecha,sintomas].includes('')){
            setAlerta({msg:'Todos los campos son obligatorios', error: true});
            return;
        }
        //Validando que el email tenga un formato correcto
        if(!/\S+@\S+\.\S+/.test(email)){
            setAlerta({msg:'email inválido', error: true});
            return;
        }

        //si los campos estan llenos y el email es correcto
        setAlerta({msg:'guardando paciente', error: false});
        guardarPaciente({nombre,propietario,email,fecha,sintomas,id});
        setTimeout(()=>{
            setAlerta({});
            setNombre('');
            setPropietario('');
            setEmail('');
            setFecha('');
            setSintomas('');
          },3000);
        
        
        
    }

    //si existe mensaje para mostrar en alerta
    const {msg} = alerta;

    
  return (
    <>
        <h2 className="text-gray-700 font-black text-3xl text-center">Administrador de Pacientes</h2>
        <p className="text-lg text-center mb-10">
            Añade a tus Pacientes y <span className="text-indigo-600 font-bold">Administralos</span>
        </p>
        <form action="" className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md">
            {msg && (
                <Alerta alerta={alerta}/>
            )}
            <div className="mb-5">
                <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">Nombre masacota</label>
                <input
                id="nombre" 
                type="text"
                placeholder="Nombre de la mascota" 
                value={nombre}
                onChange={e=>{setNombre(e.target.value)}}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
            </div>

            <div className="mb-5">
                <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre propietario</label>
                <input
                id="propietario" 
                type="text"
                placeholder="Nombre del propietario" 
                value={propietario}
                onChange={e=>{setPropietario(e.target.value)}}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
            </div>

            <div className="mb-5">
                <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email del propietario</label>
                <input
                id="email" 
                type="email"
                placeholder="Email del propietario" 
                value={email}
                onChange={e=>{setEmail(e.target.value.trim())}}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
            </div>

            <div className="mb-5">
                <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">fecha de alta</label>
                <input
                id="fecha" 
                type="date" 
                value={fecha}
                onChange={e=>{setFecha(e.target.value)}}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
            </div>

            <div className="mb-5">
                <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">sintomas de la mascota</label>
                <textarea
                id="sintomas" 
                type="text"
                placeholder="sintomas de la mascota" 
                value={sintomas}
                onChange={e=>{setSintomas(e.target.value)}}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md resize-none" />
            </div>

            <input 
            type="submit" 
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
            value={id?'Guardar Cambios':'Agregar paciente'}
            onClick={handleSubmit}
             />

            
        </form>
    </>
  )
}

export default Formulario