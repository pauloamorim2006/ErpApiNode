'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PedidoItemSchema extends Schema {
  up () {
    this.create('pedido_items', (table) => {
      table.increments()
      table
        .integer('pedido_id')
        .unsigned()
        .references('id')
        .inTable('pedidos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('item')
      table
        .integer('produto_id')
        .unsigned()
        .references('id')
        .inTable('produtos')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.decimal('quantidade', 15, 4).notNullable()
      table.decimal('unitario', 15, 2).notNullable()
      table.decimal('desconto', 15, 2).notNullable()
      table.decimal('acrescimo', 15, 2).notNullable()
      table.decimal('total', 15, 2).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('pedido_items')
  }
}

module.exports = PedidoItemSchema
