import AddClient from './AddClient'
import AddProject from './AddProject'
import Clients from './Clients'
import Projects from './Projects'

const Home = () => {
    return (
        <>
            <div className='d-flex gap-3 mb-4'>
                <AddProject />
                <AddClient />
            </div>
            <Projects />
            <hr />
            <Clients />
        </>
    )
}

export default Home