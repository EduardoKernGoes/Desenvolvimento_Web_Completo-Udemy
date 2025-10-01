var mediaAceita = 7.00
var mediaAluno = 0.00
var faltasAceitas = 15
var faltasAluno = null

var nota1 = prompt('Digite a nota do primeiro semestre do aluno:')
var nota2 = prompt('Digite a nota do segundo semestre do aluno:')
var nota3 = prompt('Digite a nota do terceiro semestre do aluno:')
var nota4 = prompt('Digite a nota do quarto semestre do aluno:')
faltasAluno = prompt('Digite a quantidade de faltas que o aluno tem no ano:')

nota1 = parseFloat(nota1)
nota2 = parseFloat(nota2)
nota3 = parseFloat(nota3)
nota4 = parseFloat(nota4)

mediaAluno = (nota1 + nota2 + nota3 + nota4) / 4.00

console.log(mediaAluno)

/*
if(mediaAluno >= mediaAceita && faltasAluno <= faltasAceitas){
    document.write('Parabéns, o aluno passou de ano com a média: ' + mediaAluno)
} else{
    document.write('Que pena, você reprovou.<br />A média necessária par apassar é: ' + mediaAceita + '.<br />Você ficou com a média: ' + mediaAluno)
}
*/

//Operador ternário

var resultado = (mediaAluno >= mediaAceita && faltasAluno <= faltasAceitas) ? 'Aprovado' : 'Reprovado'
document.write(resultado)