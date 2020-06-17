'use strict'

const Antl = use('Antl')

class Cliente {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      nome: 'required',
      cnpj_cpf_di: 'required',
      endereco: 'required',
      numero: 'required',
      bairro: 'required',
      cidade_id: 'required|number',
      ativo: 'required|boolean',
      tipo_pessoa: 'required',
      tipo_inscricao_estadual: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Cliente
