'use strict'

const Antl = use('Antl')

class PedidoItem {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      item: 'required|number',
      produto_id: 'required|number',
      quantidade: 'required|number',
      unitario: 'required|number',
      desconto: 'number',
      acrescimo: 'number',
      total: 'required|number',
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = PedidoItem
