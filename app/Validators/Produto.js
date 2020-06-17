'use strict'

const Antl = use('Antl')

class Produto {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      nome: 'required',
      estoque: 'required|number',
      valor: 'required|number',
      unidade_id: 'required',
      ativo: 'required|boolean'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Produto
