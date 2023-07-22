//Declaracion de variables
const seccionAtaque = document.getElementById('seleccionar-ataque')
const botonMascotaJugador = document.getElementById('boton-seleccionar')
const seccionReiniciar = document.getElementById('reiniciar-juego')
const botonReiniciar = document.getElementById('boton-reiniciar')

const seccionMascota = document.getElementById('seleccionar-mascota')
const mascotaEnemigo = document.getElementById('mascota-enemigo')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const ataqueDelEnemigo = document.getElementById('ataques-del-enemigo')

const mascotaJugador = document.getElementById('mascota-jugador')
const spanVidasJugador = document.getElementById('vidas-jugador')
const ataqueDelJugador = document.getElementById('ataques-del-jugador')

const mensaje = document.getElementById('resultado')

const contenedorTargeta = document.getElementById('contenedor-targetas')
const contenedorAtaques = document.getElementById('contenedor-ataques')

let jugadorId = null
let mokepones = []
let secuenciaAtaqueJugador = []
let secuenciaAtaqueEnemigo = []
let opcionesMokepones
let inputHipodoge
let inputCapipepo
let inputRatihueya
let nombreMascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMascotaEnemigo
let botonFuego
let botonAgua 
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasjugador = 3
let vidasEnemigo = 3

//variable del canvas
const verMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

//let objetoMokepon
let lienzo = mapa.getContext('2d')
let intervalo
let mapaBackground = new Image()
mapaBackground.src = 'assets/mokemap.png'
let alturaQueBuscamos 
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoMapa = 400

if (anchoDelMapa > anchoMaximoMapa) {
    anchoDelMapa = anchoMaximoMapa - 20
}
alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

console.log(alturaQueBuscamos)

class Mokepon {
    constructor (nombre, foto, vida, avatar, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.avatar = avatar
        this.ataques = []
        this.alto = 40
        this.ancho = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)        
        this.imagenJugador = new Image()
        this.imagenJugador.src = avatar
        this.velocidadX = 0
        this.velocidadY = 0         
    }  
    
    pintarMokepon() {
        lienzo.drawImage(
            this.imagenJugador,
            this.x,
            this.y,
            this.alto,
            this.ancho
            
        )
    }
    
}

let hipodoge = new Mokepon('Hipodoge', 'assets/mokepons_mokepon_hipodoge_attack.png', 5, 'assets/hipodoge.png')

let capipepo = new Mokepon('Capipepo', 'assets/mokepons_mokepon_capipepo_attack.png', 5, 'assets/capipepo.png')

let ratigueya = new Mokepon('Ratigueya', 'assets/mokepons_mokepon_ratigueya_attack.png', 5, 'assets/ratigueya.png')


const HIPODOGE_ATAQUES = [
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
]

const CAPIPEPO_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
]

const RATIGUEYA_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)
   

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego(){
    
    seccionAtaque.style.display = 'none'
    verMapa.style.display = 'none'    
    
    mokepones.forEach((mokepon) => {
        
        opcionesMokepones = `
            <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="carta-mokepom" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
        `
        contenedorTargeta.innerHTML += opcionesMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatihueya = document.getElementById('Ratigueya')
    })

    
    seccionReiniciar.style.display = 'none'

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
        
    botonReiniciar.addEventListener('click', reiniciarJuego) 

    unirseAlJuego()

}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if(res.ok){
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }

        })
}

function seleccionarMascotaJugador(){
   
    seccionMascota.style.display = 'none'
    
    if(inputHipodoge.checked){

        mascotaJugador.innerHTML = inputHipodoge.id
        nombreMascotaJugador = inputHipodoge.id
                
    }else if(inputCapipepo.checked){

        mascotaJugador.innerHTML = inputCapipepo.id
        nombreMascotaJugador = inputCapipepo.id
        
    }else if(inputRatihueya.checked){

        mascotaJugador.innerHTML = inputRatihueya.id
        nombreMascotaJugador = inputRatihueya.id
                
    }else {
        alert("Elige una opcion")
    }
    
    seleccionarMokepon(nombreMascotaJugador)

    extraerAtaques(nombreMascotaJugador)
    verMapa.style.display = 'flex'
    iniciarMapa()
    
    
    
}

function seleccionarMokepon(nombreMascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: nombreMascotaJugador
        })
    })    
}



function extraerAtaques(nombreMascotaJugador){
    
    let ataques
    
    mokepones.forEach((mokepon) => {
        
        if(nombreMascotaJugador === mokepon.nombre){
            ataques = mokepon.ataques
        }

    })
    
    mostraAtaques(ataques)    
}


function mostraAtaques(ataques){

    ataques.forEach((ataque) => {

        ataquesMokepon = `
        <button id=${ataque.id} class="boton-ataque btn-ataque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon

    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.btn-ataque')

        

}


function secuenciaAtaque(){
    
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                secuenciaAtaqueJugador.push('FUEGO')
                console.log('jugador', secuenciaAtaqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }else if (e.target.textContent === '🌱') {
                secuenciaAtaqueJugador.push('TIERRA')
                console.log('jugador', secuenciaAtaqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }else {
                secuenciaAtaqueJugador.push('AGUA')
                console.log('jugador', secuenciaAtaqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
        
    })

}


function seleccionarMascotaEnemigo(enemigo){

    //let numeroAleatorio = aleatorio(0, mokepones.length - 1)
    
    mascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMascotaEnemigo = enemigo.ataques

    
    secuenciaAtaque()

}

function ataqueAleatorioEnemigo(){
    let numeroAleatorioEnemigo = aleatorio(0, ataquesMascotaEnemigo.length - 1)

    if(numeroAleatorioEnemigo == 0 || numeroAleatorioEnemigo == 1){
        secuenciaAtaqueEnemigo.push('FUEGO')
        console.log('enemigo', secuenciaAtaqueEnemigo)
    }else if(numeroAleatorioEnemigo == 3 || numeroAleatorioEnemigo == 4){
        secuenciaAtaqueEnemigo.push('AGUA')
        console.log('enemigo', secuenciaAtaqueEnemigo)
    }else {
        secuenciaAtaqueEnemigo.push('TIERRA')
        console.log('enemigo', secuenciaAtaqueEnemigo) 
    }

    iniciaPelea()
    
}

function iniciaPelea(){
    if (secuenciaAtaqueJugador.length === 5) {
        combate()
    }

}

function ataquesJugadorEnemigo(jugador, enemigo){
    indexAtaqueJugador = secuenciaAtaqueJugador[jugador]
    indexAtaqueEnemigo = secuenciaAtaqueEnemigo[enemigo]
}

function combate(){

    for (let i = 0; i < secuenciaAtaqueJugador.length; i++) {
        if (secuenciaAtaqueJugador[i] === secuenciaAtaqueEnemigo[i]) {
            ataquesJugadorEnemigo(i, i)
            crearMensaje('ENPATASTES')
            spanVidasJugador.innerHTML = victoriasJugador           
        }else if(secuenciaAtaqueJugador[i] == 'FUEGO' &&  secuenciaAtaqueEnemigo[i] == 'TIERRA'){
            ataquesJugadorEnemigo(i, i)
            crearMensaje('GANASTES')
            victoriasJugador ++ 
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(secuenciaAtaqueJugador[i] == 'AGUA' &&  secuenciaAtaqueEnemigo[i] == 'FUEGO'){
            ataquesJugadorEnemigo(i, i)
            crearMensaje('GANASTES') 
            victoriasJugador ++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(secuenciaAtaqueJugador[i] == 'TIERRA' && secuenciaAtaqueEnemigo[i] == 'AGUA'){
            ataquesJugadorEnemigo(i, i)
            crearMensaje('GANASTES') 
            victoriasJugador ++
            spanVidasJugador.innerHTML = victoriasJugador
        }else {
            ataquesJugadorEnemigo(i, i)
            crearMensaje('PERDISTES') 
            victoriasEnemigo ++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
        
    }   
    
    revisarVidas()

}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function revisarVidas(){
    if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal('Esto fue un empate !!!!')
                   
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal('Felicitaciones! Ganastes')
        
    }else {
        crearMensajeFinal('Lo siento, perdistes')

    }
}

function crearMensaje(resultado){
    
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    mensaje.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal){
        
    mensaje.innerHTML = resultadoFinal  
            
    seccionReiniciar.style.display = 'block'

}


function reiniciarJuego() {
    location.reload()
}


function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    enemigoCapipepo.pintarMokepon()
    enemigoHipodoge.pintarMokepon()
    enemigoRatigueya.pintarMokepon()

    if(mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0){

            revisarColision(enemigoHipodoge)
            revisarColision(enemigoCapipepo)
            revisarColision(enemigoRatigueya)    
    }

}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    }).then(function (res) {
        if (res.ok) {
            res.json().then(function ({ enemigos }) {
                console.log(enemigos);
                
                enemigos.forEach(function (enemigo){
                    let mokeponEnemigo = null
                    const nombreMokep = enemigo.mokepon.nombre || ""
                    if (nombreMokep === "Hipodoge") {
                        mokeponEnemigo = new Mokepon('Hipodoge', 'assets/mokepons_mokepon_hipodoge_attack.png', 5, 'assets/hipodoge.png')
                    }else if(nombreMokep === "Capipepo"){
                        mokeponEnemigo = new Mokepon('Capipepo', 'assets/mokepons_mokepon_capipepo_attack.png', 5, 'assets/capipepo.png')
                    }else if(nombreMokep === "Ratigueya"){
                        mokeponEnemigo = new Mokepon('Ratigueya', 'assets/mokepons_mokepon_ratigueya_attack.png', 5, 'assets/ratigueya.png')
                    }

                    mokeponEnemigo.x = enemigo.x
                    mokeponEnemigo.y = enemigo.y

                    mokeponEnemigo.pintarMokepon()
                })
                
                
                

            })
        }
    })
    
}


function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}
    
function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function precionarTecla(event){
    console.log(event.key)
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break;
        case 'ArrowRight':
            moverDerecha()
            break; 
        case 'ArrowDown':
            moverAbajo()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;             
        default:
            break;
    }
}

function iniciarMapa(){
    
    mascotaJugadorObjeto = obtenerObjetoMascota(nombreMascotaJugador)
    console.log(mascotaJugadorObjeto, nombreMascotaJugador);
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', precionarTecla)
    window.addEventListener('keyup', detenerMovimiento)
}


function obtenerObjetoMascota(){
    
    for (let i = 0; i < mokepones.length; i++) {
        if(nombreMascotaJugador === mokepones[i].nombre){
            return mokepones[i]
        }
        
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemgo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemgo ||
        izquierdaMascota > derechaEnemigo
    ){
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    seccionAtaque.style.display = 'flex'
    verMapa.style.display = 'none'
    console.log(enemigo.nombre)
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)
