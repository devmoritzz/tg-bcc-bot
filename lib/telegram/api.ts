import * as FormData from 'form-data'
import fetch from 'node-fetch'
import * as T from 'telegram-typings'

// https://core.telegram.org/bots/api

const API_PREFIX = `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}`

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

interface SetWebhook {
    url: string
    certificate?: Buffer
    max_connections?: number
    allowed_updates?: string[]
}
export const setWebhook = async (payload: SetWebhook) => {
    const url = `${API_PREFIX}/setWebhook`
    const form = new FormData()
    form.append('url', payload.url)
    if (payload.certificate !== undefined) {
        form.append('certificate', payload.certificate, {
            filename: 'public.pem',
            contentType: 'application/x-pem-file',
        })
    }
    if (payload.max_connections !== undefined) {
        form.append('max_connections', payload.max_connections)
    }
    if (payload.allowed_updates !== undefined) {
        form.append('allowed_updates', payload.allowed_updates)
    }
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            ...form.getHeaders(),
            'User-Agent': 'tg-bcc-bot',
        },
        body: form.getBuffer(),
    })
    return resp
}

export const deleteWebhook = async () => {
    const url = `${API_PREFIX}/deleteWebhook`
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'tg-bcc-bot',
        },
    })
    return resp
}

interface WebhookInfo {
    url: string
    has_custom_certificate: boolean
    pending_update_count: number
    last_error_date?: number
    last_error_message?: string
    max_connections?: number
    allowed_updates?: string[]
}
export const getWebhookInfo = async (): Promise<WebhookInfo> => {
    const url = `${API_PREFIX}/getWebhookInfo`
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'tg-bcc-bot',
        },
    }).then(buf => buf.json())
    return resp
}
