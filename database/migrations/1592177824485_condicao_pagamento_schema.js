'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CondicaoPagamentoSchema extends Schema {
  up () {
    this.create('condicao_pagamentos', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('descricao').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('condicao_pagamentos')
  }
}

module.exports = CondicaoPagamentoSchema
