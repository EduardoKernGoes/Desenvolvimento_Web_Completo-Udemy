
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

            despesa.id = i
            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar(despesa){
        let despesasFiltradas = this.recuperarTodosRegistros()

        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }
        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltradas
    }

    remover(id){
        localStorage.removeItem(id.replace('id_despesa_', ''))
        window.location.reload()
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

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    } else{
        document.getElementById('modal_title').innerHTML = 'Erro na Gravação'
        document.getElementById('modal_title_div').className = 'modal-header text-danger'
        document.getElementById('modal_body').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente'
        document.getElementById('modal_btn').innerHTML = 'Close'
        document.getElementById('modal_btn').className = 'btn btn-danger'

        $('#registraDespesa').modal('show')
    }
}

function loadListaDespesas(despesas = Array(), filtro = false){

    if(filtro == false){
        despesas = bd.recuperarTodosRegistros()
    }

    let listaDespesas = document.getElementById('listaDespesas')

    listaDespesas.innerHTML = ''

    despesas.forEach(function(d){
        let linha = listaDespesas.insertRow()

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        switch(d.tipo){
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo

        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = `R$ ${d.valor}`
        linha.insertCell(4).innerHTML = 
        `
            <button id="id_despesa_${d.id}" class="btn btn-danger" onclick="bd.remover(this.id)">
                <i class="fas fa-times"></i>
            </button>
        `
        console.log(d.id)
    })
}

function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    loadListaDespesas(despesas, true)
}