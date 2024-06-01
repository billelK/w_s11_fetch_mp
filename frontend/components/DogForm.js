import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const initialState = {name:"", breed:"", adopted:false}
// Use this form for both POST and PUT requests!
export default function DogForm(props) {
  const [breeds, setBreeds] = useState([])
  const values = props.formVals
  const navigate = useNavigate()

  useEffect(() => {

    function fetchBreeds () {
      fetch("http://localhost:3003/api/dogs/breeds")
      .then(res => res.json())
      .then(data => setBreeds(data))
    }
    fetchBreeds()
  },[])
  
  const resetForm = () => {
    props.setFormVals(initialState)
  } 

  const onSubmit = (event) => {
    event.preventDefault()
    let url = "http://localhost:3003/api/dogs/"
    if (values.id) {
      url += values.id 
    }
      fetch(url,
        {
          method: values.id?"PUT":"POST",
          body: JSON.stringify(values),
          headers: {"Content-Type": "Application/json"}
        }
       )
       .then(res => res.json()
       .then(data => {
          props.setFormVals(data)
          resetForm()
          navigate("/")
      })
      )
  }

  const onChange = (event) => {
    let { name, value, type, checked } = event.target
    if (type === "checkbox") value = checked
    props.setFormVals({...props.formVals, [name]: value})
  }


  return (
    <div>
      <h2>
        Create Dog
      </h2>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          value={values.name}
          onChange={onChange}
          placeholder="Name"
          aria-label="Dog's name"
        />
        <select
          name="breed"
          value={values.breed}
          onChange={onChange}
          aria-label="Dog's breed"
        >
          <option value="">---Select Breed---</option>
          {breeds.map((breed, idx) => <option key={idx}>{breed}</option>)}
        </select>
        <label>
          Adopted: <input
            type="checkbox"
            name="adopted"
            checked={values.adopted}
            onChange={onChange}
            aria-label="Is the dog adopted?"
          />
        </label>
        <div>
          <button type="submit">
            {values.id? "Edit Dog": "Create Dog"}
          </button>
          <button onClick={resetForm} aria-label="Reset form">Reset</button>
        </div>
      </form>
    </div>
  )
}
