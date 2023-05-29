
const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-600 to-red-900' : 'from-emerald-300 to-emerald-800'} bg-gradient-to-br text-center text-white p-5 uppercase font-bold text-base my-8`}>
        {alerta.msg}
    </div>
  )
}

export default Alerta