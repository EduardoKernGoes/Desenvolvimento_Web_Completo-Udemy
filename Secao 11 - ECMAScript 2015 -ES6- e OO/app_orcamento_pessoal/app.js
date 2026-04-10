
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let i in this){
            if(this[i] === undefined || this[i] === '' || this[i] === null){
                return false
            }
        }
        return true
    }
}

class BD{

    constructor() {
        let id = localStorage.getItem('id')
        if (id === null) {
            localStorage.setItem('id', 1)
        }
    }

    getNextID(){
        let nextID = localStorage.getItem('id')
        return parseInt(nextID) + 1
    }

    gravar(d) {
        let id = this.getNextID()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros(){
        let despesas = Array()
        let id = localStorage.getItem('id')

        for(let i = 1; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i))

            if(despesa === null){
                continue
            }
            despesas.push(despesa)
        }

        return despesas
    }
}

let bd = new BD()

function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

    if (despesa.validarDados()) {
        bd.gravar(despesa)

        document.getElementById('modal_title').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal_title_div').className = 'modal-header text-success'
        document.getElementById('modal_body').innerHTML = 'Despesa cadastrada com sucesso'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-success'

        $('#registraDespesa').modal('show')
    } else{
        document.getElementById('modal_title').innerHTML = 'Erro na Gravação'
        document.getElementById('modal_title_div').className = 'modal-header text-danger'
        document.getElementById('modal_body').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente'
        document.getElementById('modal_btn').innerHTML = 'Close'
        document.getElementById('modal_btn').className = 'btn btn-danger'

        $('#registraDespesa').modal('show')
    }
}

function loadListaDespesas(){
    let despesas = bd.recuperarTodosRegistros()

    console.log(despesas)
}