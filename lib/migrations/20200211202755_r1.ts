import * as Knex from 'knex'

export const up = (knex: Knex) => {
    return knex.schema.alterTable('tg_chat_tag', table => {
        table.dropUnique(['chat', 'tag'], 'unique__tg_chat_tag__chat__tag')
        table.dropColumn('chat')
        table.dropColumn('created_at')
    })
}

export const down = (knex: Knex) => {
    return knex.schema.alterTable('tg_chat_tag', table => {
        table.dateTime('created_at').defaultTo(knex.fn.now())
        table.integer('chat').notNullable()
        table.unique(['chat', 'tag'], 'unique__tg_chat_tag__chat__tag')
    })
}
