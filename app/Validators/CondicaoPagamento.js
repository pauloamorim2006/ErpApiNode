'use strict'

const Antl = use('Antl')

class CondicaoPagamento {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      descricao: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = CondicaoPagamento
