import usePacientes from "../hooks/UsePacientes"
import Paciente from "./Paciente"

const ListadoPacientes = () => {
  const {pacientes} = usePacientes();
  
  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className="text-gray-700 font-black text-3xl text-center">Listado de Pacientes</h2>
          <p className="text-lg text-center mb-10">
            Administra a tus <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
        </p>
          {pacientes.map(paciente=>(
            <Paciente
              key={paciente._id}
              paciente={paciente}
            />

          ))}

        </>
      ) : (
        <>
          <h2 className="text-gray-300 font-black text-3xl text-center">No hay pacientes aún</h2>
          <p className="text-gray-300 font-black text-xl text-center">Comienza agregando un paciente </p>
        </>
      )}

    </>
  )
}

export default ListadoPacientes