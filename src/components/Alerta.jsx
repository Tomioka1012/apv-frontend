
const Alerta = ({alerta}) => {
  return (
    <>
        <div className={`${alerta.error ? 'from-red-400 to-red-500 ' : 'from-indigo-500 to-indigo-600'} bg-gradient-to-r text-center p-2 text-white rounded uppercase`}>
            {alerta.msg}
            
        </div>

    </>
  )
}

export default Alerta