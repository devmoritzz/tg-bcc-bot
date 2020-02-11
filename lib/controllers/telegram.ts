import * as Joi from '@hapi/joi'
import { reply } from '../telegram'

export const webhook = {
    validate: {
        payload: Joi.object({
            update_id: Joi.number().required(),
            message: Joi.object(),
            edited_message: Joi.object(),
            inline_query: Joi.object(),
            chosen_inline_result: Joi.object(),
            callback_query: Joi.object(),
        })
            .xor(
                'message',
                'edited_message',
                'inline_query',
                'chosen_inline_result',
                'callback_query',
            )
            .required(),
    },
    async handler(request, _h) {
        const payload = request.payload
        reply(payload)
        return 'ok'
    },
}
