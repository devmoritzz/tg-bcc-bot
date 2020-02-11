import * as Joi from '@hapi/joi'
import { dispatch } from './telegram/dispatch'

export const routes = [
    {
        path: process.env.TG_WEBHOOK_PATH,
        method: 'post',
        options: {
            validate: {
                payload: Joi.object().required(),
            },
            async handler(request) {
                dispatch(request.payload)
                return 'ok'
            },
        },
    },
]
