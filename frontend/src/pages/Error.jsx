import { NavLink } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div>
      <h2>Page Not Found</h2>
      <button><NavLink to="/home">Go to Home Page</NavLink></button>
    </div>
  )
}

export default PageNotFound