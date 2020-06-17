'use strict'

const Antl = use('Antl')

class Cidade {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      codigo_ibge: 'required|number',
      descricao: 'required',
      uf: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Cidade
