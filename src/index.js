document.addEventListener('DOMContentLoaded',()=>{
  const filterBtn = document.getElementById('good-dog-filter')
  filterBtn.addEventListener('click',filterDogs)

  // getData()
  // .then((pups) => {
  //   pups.forEach(addDogToBar)
  // })
})

//Get all the dogs
const getData = ()=> {
  return fetch('http://localhost:3000/pups')
  .then(res => res.json())
}

//show correct information
const handleSpanClick = (e) => {
  const DogInfo = document.getElementById('dog-info')
  DogInfo.innerHTML = ''

  fetch(`http://localhost:3000/pups/${e.target.dataset.id}`)
  .then(res => res.json())
  .then(dog => {

       const img = document.createElement('img')
       img.src = dog.image

       const h2 = document.createElement('h2')
       h2.innerText = dog.name

       const button = document.createElement('button')
       button.innerText = dog.isGoodDog ?
        "Good Dog!"
          : "Bad Dog!"

       button.addEventListener('click',(e) => handleDogStatus(e,dog))

       DogInfo.appendChild(img)
       DogInfo.appendChild(h2)
       DogInfo.appendChild(button)
  })
}

//handle button click to flip dog status
const handleDogStatus = (e,dog) => {
  fetch(`http://localhost:3000/pups/${dog.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({ isGoodDog: !dog.isGoodDog })
  })
  .then(res => res.json())
  .then(pup => {
    e.target.innerText = pup.isGoodDog ?
     "Good Dog!"
       : "Bad Dog!"
  })
}

//Show it on the top bar
//handle click
const addDogToBar = (dog) =>{
  const NavBar = document.getElementById('dog-bar')
  NavBar.innerHTML = ''
  let span = document.createElement('span')
  span.innerText = dog.name
  span.dataset.id = dog.id

  span.addEventListener('click',handleSpanClick)
  NavBar.appendChild(span)
}

//Bonus: Filter dogs
const filterDogs = (e) => {
  getData()
  .then(pups => {
    pups.forEach(pup => {
      pup.isGoodDog
        ? addDogToBar(pup)
          : console.log(pup)
    })
  })
}
