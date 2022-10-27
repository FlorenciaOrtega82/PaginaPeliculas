//La API utilizada es: OMDb API - The Open Movie Database  --  https://omdbapi.com/

const inputBuscar = document.getElementById('inputBuscar');
const listaPeli = document.getElementById('listaPeli');
const btnBuscar = document.getElementById('btnBuscar');
const descripcionPeli = document.getElementById('detallePeli');

async function load(pelicula) {
    let url = `https://omdbapi.com/?s=${pelicula}&page=1&apikey=b2daee92`;
    let respuesta = await fetch(`${url}`);
    let data = await respuesta.json();
    if (respuesta.ok) mostrar(data.Search);
}

btnBuscar.addEventListener('click', () => {
    let nombre = inputBuscar.value.trim();
    if (nombre) {
        load(nombre);
    }
    inputBuscar.value = "";
    document.getElementById('footer').classList.add('footerDisplay');
})

function mostrar(peliculas) {
    document.getElementById('listaPeli').classList.remove('lista_Hide')
    listaPeli.innerHTML = ""; //se vacía el contenido para nueva búsqueda
    descripcionPeli.innerHTML = "";
    for (let i = 0; i < peliculas.length; i++) {
        let divPeli = document.createElement('div');
        divPeli.classList.add('listaPelis');
        divPeli.dataset.id = peliculas[i].imdbID;
        divPeli.innerHTML = `
        <img src="${peliculas[i].Poster}">
        <h3>${peliculas[i].Title}</h3>
        <p>Año <b>${peliculas[i].Year}</b></p>
        `;
        listaPeli.appendChild(divPeli);
    }
    loadDetallePelicula();
}

function loadDetallePelicula() {
    let listaPelis = document.querySelectorAll('.listaPelis');
    listaPelis.forEach(peli => {
        peli.addEventListener('click', async () => {
            let detalle = await fetch(`https://www.omdbapi.com/?i=${peli.dataset.id}&apikey=b2daee92`)
            let peliDetalle = await detalle.json();
            mostrarPeliDetalle(peliDetalle);
        })
    })
}

function mostrarPeliDetalle(detalle) {
    document.getElementById('listaPeli').classList.add('lista_Hide')
    descripcionPeli.innerHTML = `
    <div class = "peli_img">
        <img src = "${detalle.Poster}" alt = "Poster película">
    </div>
    <div class = "info_peli">
        <h3 class = "titulo_peli">${detalle.Title}</h3>
        <p class = "año"><b>Año: </b>${detalle.Year}</p>
        <p class = "lanzamiento"><b>Lanzamiento: </b>${detalle.Released}</p>
        <p class = "genre"><b>Genre:</b> ${detalle.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${detalle.Writer}</p>
        <p class = "actors"><b>Actors: </b>${detalle.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${detalle.Plot}</p>
        <p class = "language"><b>Language:</b> ${detalle.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${detalle.Awards}</p>
    </div>
    `;
}