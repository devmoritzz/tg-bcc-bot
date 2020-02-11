import { Update, Message } from 'telegram-typings'
import model from '../models'
import { dispatch as dispatchCmd } from './command'

const collectTag = async (msg: Message) => {
    const text = msg.text!
    const entries = msg.entities!
    const tags = entries
        .filter(entry => entry.type === 'hashtag')
        .map(entry => text.substr(entry.offset, entry.length))
    if (tags.length <= 0) return
    const chatId = msg.chat.id
    try {
        await model.addTags(chatId, tags)
    } catch (err) {
        console.error(err)
    }
}

const dispatchCommands = (msg: Message) => {
    const text = msg.text!
    const entries = msg.entities!
    const chatId = msg.chat.id
    entries
        .filter(entry => entry.type === 'bot_command')
        .map(entry => text.substr(entry.offset, entry.length))
        .map(cmd => dispatchCmd(cmd, chatId))
}

export const dispatch = (payload: Update) => {
    const aux = (msg: Message | undefined) => {
        if (!msg) return
        const entries = msg.entities
        if (!Array.isArray(entries)) return
        collectTag(msg)
        dispatchCommands(msg)
    }
    aux(payload.message)
    aux(payload.edited_message)
    aux(payload.channel_post)
    aux(payload.edited_channel_post)
}
