import React from 'react'

export default function DogsList(props) {
  return (
    <div>
      <h2>Dogs Shelter</h2>
      <ul>
        {props.dogs.map(dog => 
        <li key={dog.id}>
          {`${dog.name}, ${dog.breed}, ${dog.adopted? "": "NOT"} adopted`}
          <div>
            <button onClick={() => props.editDog(dog.id)}>Edit</button>
            <button onClick={() => props.deleteDog(dog.id)}>Delete</button>
          </div>
        </li>
      )}
      </ul>
    </div>
  )
}
