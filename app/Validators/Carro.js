'use strict'

const Antl = use('Antl')

class Carro {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      placa: 'required',
      uf: 'required',
      rntc: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Carro
