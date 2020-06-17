'use strict'

const Antl = use('Antl')

class Pedido {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      cliente_id: 'required|number',
      condicao_pagamento_id: 'required|number',
      condicao_pagamento_id: 'required|number',
      forma_pagamento_id: 'required|number'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Pedido
