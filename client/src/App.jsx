import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [input, setInput] = useState({
    first_name: '',
    last_name: '',
    email: ''
  })
  const handleInputChange = e => {
    setInput(prev => ({...prev, [e.target.name]: e.target.value}))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let result = await axios('http://localhost:8080/users', {
        method: 'POST',
        data: JSON.stringify(input),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(result)
    } catch(err) {
      console.log(err)
    }
  }
  return (
    <>
    <h1>Registrar nuevo usuario</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre: </label>
        <input type="text" name="first_name" value={input.first_name} onChange={handleInputChange} /><br />
        <label>Apellido: </label>
        <input type="text" name="last_name" value={input.last_name} onChange={handleInputChange} /><br />
        <label>Email: </label>
        <input type="text" name="email" value={input.email} onChange={handleInputChange} /><br />
        <input type="submit" />
      </div>
    </form>
    </>
  )
}

export default App