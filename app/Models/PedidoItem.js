'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PedidoItem extends Model {
  pedido() {
    return this.belongsTo('App/Models/Pedido')
  }
}

module.exports = PedidoItem
