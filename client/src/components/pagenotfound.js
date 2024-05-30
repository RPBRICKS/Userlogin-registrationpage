import React from 'react'
import { useNavigate } from 'react-router-dom'
function PageNotFound() {
    const navigate = useNavigate()

    const redirect = (e) => {
        navigate("/login")
    }

  return (
    <div>
      <p onClick={redirect}>404: Page not found, Login to account?</p>
    </div>
  )
}

export default PageNotFound
