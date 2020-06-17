'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CarroSchema extends Schema {
  up () {
    this.create('carros', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('placa').notNullable()
      table.string('uf').notNullable()
      table.string('rntc').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('carros')
  }
}

module.exports = CarroSchema
