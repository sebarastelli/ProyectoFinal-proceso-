let compra = document.getElementById("compra");
let compra2 = document.getElementById("compra2");
let cartel = document.getElementById("cartel");
let volver = document.getElementById("volver");
let volver2 = document.getElementById("volver2");
let buttonA = document.getElementById("butA");
let buttonB = document.getElementById("butB");
let buttonC = document.getElementById("butC");
let first = document.getElementById("fg");
let second = document.getElementById("seven");
let third = document.getElementById("gone");
let buttonCartelera = document.getElementById("butCartelera");
let info = document.getElementById("info");
let cantidad = document.getElementById("cantidad");
let cantidad2 = document.getElementById("cantidad2");
let total = document.getElementById("total");
let total2 = document.getElementById("total2");
let pagar = document.getElementById("pagar");
let pagar2 = document.getElementById("pagar2");
let final = document.getElementById("final");
let user = document.getElementById("user");
let final2 = document.getElementById("final2")
let carrito = [];
let btnCompra = document.querySelectorAll(".botonCompra");
let resultado;
let pelicula = [
  { nombre: "Fight Club", precio: 300 },
  { nombre: "Seven", precio: 250 },
  { nombre: "Gone Girl", precio: 200 },
];

cartel.style.display = "none";
compra.style.display = "none";
compra2.style.display = "none";

//EN CASO DE QUERER MODIFICAR ALGUNA PELICULA EN EL FUTURO.
let [pelicula1,pelicula2,pelicula3] = pelicula;
let agotada1 = {...pelicula1};
let agotada2 = {...pelicula2};
let agotada3 = {...pelicula3};
agotada1.disponible = true;
agotada2.disponible = true;
agotada3.disponible = true;


user.innerHTML = JSON.stringify(localStorage.getItem("usuario"));

const cargarPeliculas = async() => {
  try {const respuesta = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=f9b48198447b1a12a2bdadf0da2895a4&language=es-MX")
  console.log(respuesta)
  const datos = await respuesta.json();
  let films = ``
  datos.results.forEach(film=>{
      films += `<div class="pelicula">
      <img class="poster" src="https://image.tmdb.org/t/p/w500/${film.poster_path}">
      <h3 class="titulo">${film.title}</h3>
      <a class="voto btn btn-primary">Votar</a>
    </div>`
  })

  
  final2.innerHTML = films;
}
  catch(error) {
      console.log(error)
  }
}


cantidad.addEventListener(`input`, () => {
  resultado = cantidad.value * pelicula.precio;
  total.textContent =
    cantidad.value + " entrada/s x $" + pelicula.precio + " = $" + resultado;
  cantidad.value < 1 || cantidad.value > 12
    ? pagar.removeEventListener(`click`, data)
    : pagar.addEventListener(`click`, data);
});

volver.addEventListener(`click`, reset);
volver2.addEventListener(`click`, reset);

function reset() {
  cartel.style.display = "flex";
  second.style.display = "block";
  third.style.display = "block";
  first.style.display = "block";
  compra.style.display = "none";
  compra2.style.display = "none";
  pelicula = [
    { nombre: "Fight Club", precio: 300 },
    { nombre: "Seven", precio: 250 },
    { nombre: "Gone Girl", precio: 200 },
  ];
  total.textContent = "";
  buttonA.style.display = "flex";
  buttonB.style.display = "flex";
  buttonC.style.display = "flex";
}

buttonCartelera.addEventListener(`click`, () => {
  info.style.display = "none";
  cartel.style.display = "flex";
});

buttonA.addEventListener(`click`, () => {
  second.style.display = "none";
  third.style.display = "none";
  cartel.style.justifyContent = "center";
  compra.style.display = "flex";
  pelicula = pelicula[0];
  buttonA.style.display = "none";
});
buttonB.addEventListener(`click`, () => {
  first.style.display = "none";
  third.style.display = "none";
  cartel.style.justifyContent = "center";
  compra.style.display = "flex";
  pelicula = pelicula[1];
  buttonB.style.display = "none";
});
buttonC.addEventListener(`click`, () => {
  first.style.display = "none";
  second.style.display = "none";
  cartel.style.justifyContent = "center";
  compra.style.display = "flex";
  pelicula = pelicula[2];
  buttonC.style.display = "none";
});

function data(e) {
  compra2.style.display = "flex";
  compra.style.display = "none";
  total2.textContent = "$" + resultado;
  total2.value = resultado;
}

pagar2.addEventListener(`click`, pago);

function pago(e) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    color: `#fff`,
    background: `rgb(56, 168, 56)`,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  if (cantidad2.value == total2.value) {
    final.innerHTML = `<p class="text-center encabezado">Disfrute la película ${pelicula.nombre}🎥</p><br><h1 class="text-center">Estas son películas populares del momento, en un futuro podrás votar para que la más deseada la tengamos en cartelera.</h1>`;
    cartel.style.display = "none";
    compra.style.display = "none";
    compra2.style.display = "none";
    cargarPeliculas();
    Toast.fire({
      title: 'Gracias por tu compra' + localStorage.getItem("usuario"),
    })
  } else if (cantidad2.value > total2.value) {
    final.innerHTML = `<p class="text-center encabezado">Su vuelto es: $${
      cantidad2.value - total2.value
    }, disfrute la película ${pelicula.nombre}🎥</p><br><h1 class="text-center">Estas son películas populares del momento, en un futuro podrás votar para que la más deseada la tengamos en cartelera.</h1>`;
    cartel.style.display = "none";
    compra.style.display = "none";
    compra2.style.display = "none";
    cargarPeliculas();
    Toast.fire({
      title: 'Gracias por tu compra ' + localStorage.getItem("usuario"),
    })
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Dinero Insuficiente',
      text: 'Intentelo nuevamente..',
    })
  }
}