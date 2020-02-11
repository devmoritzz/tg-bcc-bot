import * as Path from 'path'
import * as Hapi from '@hapi/hapi'
import * as dotenv from 'dotenv-safe'
import { routes } from './routes'
import plugins from './plugins'
import model from './models'
import { setWebhook } from './telegram/api'

process.on('unhandledRejection', err => {
    console.error(err)
    process.exit(1)
})

const common = async () => {
    dotenv.config({
        path: Path.resolve(__dirname, '../../dotenv'),
        example: Path.resolve(__dirname, '../../dotenv.example'),
    })

    await model.init()

    const server = Hapi.server({
        port: Number(process.env.PORT || 8000),
        host: '0.0.0.0',
        routes: {
            payload: { allow: 'application/json' },
        },
    })
    await plugins(server)
    server.route(routes)

    server.events.on('stop', async () => {
        await model.destroy()
    })

    return server
}

export const init = async () => {
    const server = await common()
    server.initialize()
    return server
}

export const start = async () => {
    const server = await common()
    await server.start()

    const url = `https://${process.env.TG_WEBHOOK_DOMAIN}/tg/webhook`
    await setWebhook({ url })

    return server
}
