import * as Knex from 'knex'

export const up = (knex: Knex) => {
    return knex.schema.createTable('tg_chat_tag', table => {
        table.increments('id')
        table.dateTime('created_at').defaultTo(knex.fn.now())
        table.integer('chat').notNullable()
        table.string('tag', 255).notNullable()

        table.unique(['chat', 'tag'], 'unique__tg_chat_tag__chat__tag')
    })
}

export const down = (knex: Knex) => {
    return knex.schema.dropTable('tg_chat_tag')
}

export const config = { transaction: false }
