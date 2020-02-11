import * as TG from './controllers/telegram'

const routes = [
    { path: '/tg/webhook', method: 'post', options: TG.webhook },
].filter(Boolean)

export default routes
