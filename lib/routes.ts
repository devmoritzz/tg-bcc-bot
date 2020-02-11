import * as Joi from '@hapi/joi'
import { dispatch } from './telegram/dispatch'

export const routes = [
    {
        path: '/tg/webhook',
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
