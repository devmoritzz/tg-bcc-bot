import * as Knex from 'knex'
import cfg from './cfg'
import lazy from '../utils/lazy'

const conn = lazy(() => Knex(cfg))

export default {
    async init() {},
    async destroy() {
        await conn().destroy()
    },

    async addTags(chat: number, tags: string[]): Promise<void> {
        if (tags.length === 0) return
        const vals = tags.map(tag => ({ chat, tag }))
        const insert = conn()
            .insert(vals)
            .toString()
        const query = `${insert} ON CONFLICT DO NOTHING`
        await conn().raw(query)
    },

    async getTags(chat: number): Promise<string[]> {
        const r = await conn()
            .select('tag')
            .from('tg_chat_tag')
            .where({ chat })
        return r
    },
}

export interface ChatTag {
    id: number
    chat: number
    tag: string
}
