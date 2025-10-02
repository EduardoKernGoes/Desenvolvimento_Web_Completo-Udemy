var altura = 0
var largura = 0
var vidas = 1
var tempo = 10

var tempoGeraMosquito = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'normal'){
    tempoGeraMosquito = 1000
}else if(nivel === 'dificil'){
    tempoGeraMosquito = 750
}

function ajustaTamanho(){
    altura = window.innerHeight
    largura = window.innerWidth
}

ajustaTamanho()

var cronometro = setInterval(function(){

    tempo--

    if(tempo < 0 ){

        clearInterval(cronometro)
        clearInterval(geraMosquito)

        window.location.href = 'vitoria.html'

    }else{

        document.getElementById('cronometro').innerHTML = tempo

    }
    
}, 1000)

function posicaoRandom(){

    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()

        if(vidas > 3){

            window.location.href = 'derrota.html'

        }else{
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"


            vidas++
        }
    }

    var posX = Math.floor(Math.random() * largura) - 90
    var posY = Math.floor(Math.random() * altura) - 90

    posX = posX < 0 ? 0: posX
    posY = posY < 0 ? 0: posY

    var mosquito = document.createElement('img')

    mosquito.src = 'imagens/mosquito.png'
    mosquito.className = tamanhoRandom() + ' ' + ladoRandom()
    mosquito.style.position = 'absolute'
    mosquito.style.left = posX + 'px'
    mosquito.style.top = posY + 'px'
    mosquito.id = 'mosquito'
    mosquito.onclick = function(){
        this.remove()
    }

    document.body.appendChild(mosquito)
}

function tamanhoRandom(){

    var classe = Math.floor(Math.random() * 3)

    switch(classe){
        case 0:

            return 'mosquito1'

        case 1:

            return 'mosquito2'

        case 2:

            return 'mosquito3'
    }

}

function ladoRandom(){

    var classe = Math.floor(Math.random() * 2)

    switch(classe){
        case 0:

            return 'ladoA'

        case 1:

            return 'ladoB'

    } 

}