console.log("probando")


const btnNode = document.querySelector("#btn")
const containerNode = document.querySelector("#info")


btnNode.addEventListener("click", () => {
  console.log("llamando a Elon")

  // "https://api.spacexdata.com/v5/launches/latest"

  // fetch es un metod de JS que nos permite hacer llamadas externas a API
  const algo = fetch("https://api.spacexdata.com/v5/launches/latest") // 0.5 segundos
  console.log(algo)
  // esto es una operacion asincrona.

  // fetch("https://api.spacexdata.com/v5/launches/latest")
  fetch("https://api.spacexdata.com/v5/launches")
  .then((response) => {
    // console.log(response)
    return response.json()
  })
  .then((data) => {
    
    let launchNumber = 150
    console.log(data[launchNumber])

    const imgNode = document.createElement("img")
    imgNode.src = data[launchNumber].links.patch.small

    containerNode.append(imgNode)

    const ulNode = document.createElement("ul")

    data[launchNumber].crew.forEach((eachCrew) => {
      let liNode = document.createElement("li")
      liNode.innerText = eachCrew.role
      ulNode.append(liNode)
    })

    containerNode.append(ulNode)

  })
  .catch((error) => {
    // ocurre cuando hay problemas en la llamada
  })

})



// replicar esas llamadas externas

// envoltorio de llamada
function pedirUnLibro(numeroDeLibro, funcionDeCallback, errorHandlingCallback) {

  // let dataAEnviar;

  // va a llamar a un lugar externo, toma cierto tiempo real
  // lo replicamos con setTimeout
  setTimeout(() => {

    // devuelve una informacion
    const book = [
      "1. La Comunidad del Anillo",
      "2. Las Dos Torres",
      "3. El Retorno del Rey"
    ]
  
    // return book[numeroDeLibro]
    // console.log("ya tengo la data")
    dataAEnviar = book[numeroDeLibro]
    if (dataAEnviar !== undefined) {
      funcionDeCallback(dataAEnviar)
    } else {
      // queremos decirle a la funcion que hubo un error
      errorHandlingCallback("El libro no se consiguió")
    }



  }, Math.random() * 2000)

  // return dataAEnviar

}

// let laData = pedirUnLibro(0)
// console.log(laData) // undefined


// pedirUnLibro(0, (data) => {
//   // console.log("la data ya deberia estar lista")
//   console.log(data)

//   pedirUnLibro(1, (data) => {
//     // console.log("la data ya deberia estar lista")
//     console.log(data)

//     pedirUnLibro(2, (data) => {
//       // console.log("la data ya deberia estar lista")
//       console.log(data)
//       pedirUnLibro(5, (data) => {
//         // console.log("la data ya deberia estar lista")
//         console.log(data)
  
//       }, (error) => {
//         console.log(error)
//       })

//     }, (error) => {
//       console.log(error)
//     })

//   }, (error) => {
//     console.log(error)
//   })

// }, (error) => {
//   console.log(error)
// })




function pedirLibroPromesa(indiceDelLibro) {

  return new Promise((functionResolve, functionReject) => {

    setTimeout(() => {

      const book = [
        "1. La Comunidad del Anillo",
        "2. Las Dos Torres",
        "3. El Retorno del Rey"
      ]
      const elLibro = book[indiceDelLibro]

      if (elLibro !== undefined) {
        functionResolve(elLibro)
      } else {
        functionReject("El libro no se consiguió")
      }
    }, Math.random() * 2000)
  })
}

// const algo = pedirLibroPromesa(0)
// console.log(algo)

// .then() y .catch()

// pedirLibroPromesa(0)
// .then((response) => {
//   // espera el momento en que la promesa cambia de estado a success/fulfilled
//   console.log(response)

//   // si quiero resolver una nueva promesa justo despues de tener el valor de esta, la encadenamos: retornamos la nueva promesa y cojemos su resolución en otro .then()
//   return pedirLibroPromesa(1)
// })
// .then((response) => {
//   // espera el momento en que la promesa cambia de estado a success/fulfilled
//   console.log(response)

//   return pedirLibroPromesa(2)
// })
// .then((response) => {
//   // espera el momento en que la promesa cambia de estado a success/fulfilled
//   console.log(response)
//   return pedirLibroPromesa(6)
// })
// .then((response) => {
//   console.log(response)
// })
// .catch((error) => {
//   // solo hace falta un gestor de error (.catch). Si falla una, se salta el resto de los .then()
//   // siempre de último
//   console.log(error)
// })



// Promise.all() y promise.allSettled()
// los metodos reciben como argumento un array de promesas

Promise.all([
  pedirLibroPromesa(0), // 0.5s
  pedirLibroPromesa(1), // 1.2s
  pedirLibroPromesa(8) // 0.8s
])
.then((response) => {
  // espera el tiempo que tardó la promesa más larga => 1.2s
  console.log(response) // un array con todas las respuestas
})
.catch((error) => {
  console.log(error)
})

Promise.allSettled([
  pedirLibroPromesa(0), // 0.5s
  pedirLibroPromesa(1), // 1.2s
  pedirLibroPromesa(8) // 0.8s
])
.then((response) => {
  // espera el tiempo que tardó la promesa más larga => 1.2s
  console.log(response) // un array con todas las respuestas
}) // no tiene catch


// El Promise.all es cuando queremos que si una falla, todo falla
// El Promise.allSettled es cuando aunque una falle, nos interesa la data que las que si fueron realizadas correctamentes
// ambas Promise.all y Promise.allSettled las usamos cuando los argumentos de las promesas no dependen re resultados de promesas anteriores