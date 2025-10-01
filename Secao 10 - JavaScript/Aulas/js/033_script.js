/*
function calcularAreaTerreno (largura, comprimento) {
    return largura * comprimento
}

var largura = parseInt(prompt('Digite a largura do terreno em metros:'))

var comprimento = parseInt(prompt('Digite o comprimento do terreno em metros:'))

var area = calcularAreaTerreno(largura, comprimento)

document.write('O terreno possui ' + area + ' metros quadrados')
*/

function soma (a, b) {
    a = a === undefined ? 0 : a
    b = b === undefined ? 0 : b
    return a + b
}

document.write(soma(7, 7) + '<br />')
document.write(soma(7, 7, 9, 3) + '<br />')
document.write(soma(7) + '<br />')
document.write(soma() + '<br />')