'use strict'

const Antl = use('Antl')

class FormaPagamento {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      nome: 'required',
      ativo: 'required|boolean',
      tipo: 'required',
      tef: 'required|boolean',
      credito: 'required|boolean',
      permitir_troco: 'required|boolean',
      configuracao_fiscal: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = FormaPagamento
