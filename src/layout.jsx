import { Navbar } from '@components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => (
    <section className='min-h-screen'>
        <Navbar />
        <main>
            <Outlet />
        </main>
    </section>
)

export default Layout
