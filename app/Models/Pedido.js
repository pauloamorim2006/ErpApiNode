'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pedido extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  cliente () {
    return this.belongsTo('App/Models/Cliente')
  }

  formaPagamento () {
    return this.belongsTo('App/Models/FormaPagamento')
  }

  condicaoPagamento () {
    return this.belongsTo('App/Models/CondicaoPagamento')
  }

  pedidoItens () {
    return this.hasMany('App/Models/PedidoItem')
  }
}

module.exports = Pedido
