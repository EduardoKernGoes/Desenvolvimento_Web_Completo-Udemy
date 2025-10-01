var a = 10
var b = 20
var c = null

document.write('A váriavel A, tem o valor: ' + a + '. E a váriavel B, tem o valor: ' + b + '.')

c = a
a = b
b = c

document.write('<br />Agora a váriavel A, tem o valor: ' + a + '. E a váriavel B tem o valor: ' + b + '.')