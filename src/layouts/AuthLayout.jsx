import {Outlet} from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
        <main className='container mx-auto mt-8 md:mt-20 p-5 md:flex md:justify-center'>
            <div className='md:2/3 lg:1/3'>
                <Outlet/>
            </div>
            
        </main>
        
    </>
    
  )
}

export default AuthLayout