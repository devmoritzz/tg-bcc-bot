import rollbar from '../utils/rollbar'
import { sendMessage } from './send'
import model from '../models'

const listHashtag = async (chat: number) => {
    const tags = await model.getTags(chat)
    if (tags.length === 0) return
    sendMessage({
        chat_id: chat,
        text: tags.join('\n'),
        disable_notification: true,
    })
}

export const dispatch = (cmd: string, chat: number) => {
    if (cmd === '/list_hashtag') {
        listHashtag(chat)
    } else {
        rollbar.info('unknown command', { chat, cmd })
    }
}
