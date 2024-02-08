import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
      <FaExclamationTriangle className='text-danger' size='5em' />
      <h1>404</h1>
      <h4 className='lead'>Page does not exist</h4>
      <Link to='/' className='btn btn-success'>Go Back</Link>
    </div>
  )
}

export default NotFound