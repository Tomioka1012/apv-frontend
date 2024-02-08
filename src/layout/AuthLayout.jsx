import {Outlet} from 'react-router-dom'
const AuthLayout = () => {
  return (
    <>
        
        <main className='container mx-auto md:grid md:grid-cols-2 my-12 gap-10 p-5 items-center h-[85vh]'>
          <Outlet/>
        </main>
        
    
    </>
  )
}

export default AuthLayout