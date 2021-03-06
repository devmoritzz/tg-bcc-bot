import rollbar from '../utils/rollbar'
import model from '../models'
import { sendMessage } from './api'

const BOT_NAME_RE = new RegExp(`@${process.env.TG_BOT_NAME}$`, 'i')

const listHashtag = async (chat: number) => {
    const tags = await model.getTags(chat)
    const text = tags.length === 0 ? 'not found' : tags.join('\n')
    sendMessage({
        chat_id: chat,
        text,
        disable_notification: true,
    })
}

export const dispatch = (command: string, chat: number) => {
    const cmd = command.replace(BOT_NAME_RE, '')
    if (cmd === '/list_hashtag') {
        listHashtag(chat)
    } else {
        rollbar.info('unknown command', { chat, cmd })
    }
}
