import React, {useEffect, useState} from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import DogForm from './DogForm'
import DogsList from './DogsList'
import { useNavigate } from 'react-router-dom'


export default function App() {
  const [formVals,setFormVals] = useState({name:"", breed:"", adopted:false})
  const [dogs, setDogs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    function getData() {
      fetch("http://localhost:3003/api/dogs")
        .then(res => res.json())
        .then(data => setDogs(data))
    }
    getData()
  },[dogs])

 const editDog = (id) => {
  const dog = dogs.find(dg => id === dg.id)
  setFormVals({name: dog.name, breed: dog.breed, adopted: dog.adopted, id: dog.id})
  navigate("/form")
 }

 const deleteDog = (id) => {
   fetch(`http://localhost:3003/api/dogs/${id}`, {method: "DELETE"})
  setDogs(dogs.filter(dg => id !== dg.id))
 }

  return (
    <div>
      <nav>
        <NavLink to="/">Dogs</NavLink>
        <NavLink to="/form">Form</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<DogsList dogs={dogs} editDog={editDog} deleteDog={deleteDog}/>} />
        <Route path="/form" element={<DogForm formVals={formVals} setFormVals={setFormVals}/>} />
      </Routes>
    </div>
  )
}
