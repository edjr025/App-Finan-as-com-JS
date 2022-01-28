class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let i in this){
           if(this[i] == undefined || this[i] == '' || this[i] == null){
               return false
           }
        }
        return true
    }

}

class Bd{

    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return (parseInt(proximoId) + 1)
    }

    gravar(d){
       let id =  this.getProximoId()

       localStorage.setItem(id,JSON.stringify(d))

       localStorage.setItem('id', id)
    }

    recuperarTodosRegistro(){
       //array despesa
       let despesas = Array() 

       let id = localStorage.getItem('id')

       //recuperar todas as despesas
       for(let i = 1; i <= id; i++){
            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i)) 

            //existe a possibilidade de haver indices que foram removidos
            //nesses casos vamos pular o indice

            if(despesa != null){
                despesa.id = i //pegando as keys das despasas
                despesas.push(despesa)
            }           
       }
       //console.log(despesas)
       return despesas
    }

    pesquisar(despesa){
        //console.log(despesa)

        let despesasFiltradas = Array()

        despesasFiltradas =  this.recuperarTodosRegistro()
        //console.log(despesasFiltradas)

        //ano
        if(despesa.ano != ''){
            console.log(despesasFiltradas.filter(d => d.ano == despesa.ano))
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        //mes
        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(m => m.mes == despesa.mes)
            console.log(despesasFiltradas.filter(m => m.mes == despesa.mes))
        }

         //dia
         if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(day => day.dia == despesa.dia)
            console.log(despesasFiltradas.filter(day => day.dia == despesa.dia))
        }

         //tipo
         if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(t => t.tipo == despesa.tipo)
            console.log(despesasFiltradas.filter(t => t.tipo == despesa.tipo))
            
        }

         //descrição
         if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(description => description.descricao == despesa.descricao)
            console.log(despesasFiltradas.filter(description => description.descricao == despesa.descricao))
        }

         //tipo
         if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(v => v.valor == despesa.valor)
            console.log(despesasFiltradas.filter(v => v.valor == despesa.valor))
        }
        
        return despesasFiltradas
    }

    remover(id){
        localStorage.removeItem(id)
    }
}

let bd = new Bd

function cadastrarDespesas(){

   let ano = document.getElementById('ano')
   let mes = document.getElementById('mes')
   let dia = document.getElementById('dia')
   let tipo = document.getElementById('tipo')
   let descricao = document.getElementById('descricao')
   let valor = document.getElementById('valor')

   //console.log(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

   let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
   )

   if(despesa.validarDados()){
        bd.gravar(despesa)

        document.getElementById('modal_titulo').innerHTML = ' Registro Inserido'
        document.getElementById('moda_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa Cadastrada'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-success'
      
         $('#modalRegistraDespesa').modal('show')
    
   }else{

    document.getElementById('modal_titulo').innerHTML = ' Erro na Inclusão do Registro'
    document.getElementById('moda_titulo_div').className = 'modal-header text-danger'
    document.getElementById('modal_conteudo').innerHTML = 'Existem campos obrigatorios que não foram preenchidos'
    document.getElementById('modal_btn').innerHTML = 'Voltar e Corrigir'
    document.getElementById('modal_btn').className = 'btn btn-danger'

       $('#modalRegistraDespesa').modal('show')
   }
   limparFormulario()
}

function limparFormulario(){
    ano.value = ''
    mes.value = ''
    dia.value = ''
    tipo.value = ''
    descricao.value = ''
    valor.value = ''

 }


function carregaListaDespesas(despesas = Array(), filtro =false){

    //let despesas = Array()
    if(despesas.length == 0 && filtro == false){
        despesas = bd.recuperarTodosRegistro()
    }
     //selecionando o elemento tbody da tabela
     let listaDespesas =  document.getElementById('listaDespesas')
     listaDespesas.innerHTML = ''

     //percorrer o aaray despesas, listando cada despesa de forma dinamica
    despesas.forEach(function(d){
        //console.log(d)

        //criar a linha (tr)
        let linha = listaDespesas.insertRow()

        //criar as colunuas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        //ajustar o tipo
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
        linha.insertCell(3).innerHTML = d.valor
        
        //criando o botão de exclusão
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-trash"></i>'
        btn.id = `id_despesa_${d.id}`

        btn.onclick = function(){
            //remover a despesa
            //alert('Despesa Removida ' + this.id)
            let id = this.id.replace('id_despesa_', '') //tirando do id do botão a string id_espesa_
            //alert(id)

            bd.remover(id)
            window.location.reload()


        }

        linha.insertCell(4).append(btn)

        console.log(d)

    })

}

function pesquisarDespesa(){
   let ano = document.getElementById('ano').value
   let mes = document.getElementById('mes').value
   let dia = document.getElementById('dia').value
   let tipo = document.getElementById('tipo').value
   let descricao = document.getElementById('descricao').value
   let valor = document.getElementById('valor').value

   let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)

   //console.log(despesa) 
   let despesas =  bd.pesquisar(despesa)

   carregaListaDespesas(despesas, true)
  
    //selecionando o elemento tbody da tabela
    /*
   let listaDespesas =  document.getElementById('listaDespesas')
   listaDespesas.innerHTML = ''

   despesas.forEach(function(d){
    //console.log(d)

    //criar a linha (tr)
    let linha = listaDespesas.insertRow()

    //criar as colunuas (td)
    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

    //ajustar o tipo
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
    linha.insertCell(3).innerHTML = d.valor 
})
*/  
}