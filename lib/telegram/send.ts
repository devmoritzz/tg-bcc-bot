import fetch from 'node-fetch'
import * as T from 'telegram-typings'

const API_PREFIX = `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}`

// https://core.telegram.org/bots/api#sendmessage
interface SendMessage {
    chat_id: number
    text: string
    parse_mode?: string
    disable_web_page_preview?: boolean
    disable_notification?: boolean
    reply_to_message_id?: number
    reply_markup?:
        | T.InlineKeyboardMarkup
        | T.ReplyKeyboardMarkup
        | T.ReplyKeyboardRemove
        | T.ForceReply
}
export const sendMessage = async (payload: SendMessage) => {
    const url = `${API_PREFIX}/sendMessage`
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'tg-bcc-bot',
        },
        body: JSON.stringify(payload),
    })
    return resp
}
