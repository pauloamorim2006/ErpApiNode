'use strict'

const Antl = use('Antl')

class Unidade {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      descricao: 'required',
      sigla: 'required|max:6'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Unidade
