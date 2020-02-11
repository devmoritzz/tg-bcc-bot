import { init } from '../lib/server'

let server: any
beforeAll(async () => {
    server = await init()
})
afterAll(async () => {
    if (server) {
        await server.stop()
    }
})

describe('webhook', () => {
    const url = process.env.TG_WEBHOOK_PATH!
    // https://core.telegram.org/bots/webhooks#testing-your-bot-with-updates
    test('message with text', async () => {
        const payload = {
            update_id: 10000,
            message: {
                date: 1441645532,
                chat: {
                    last_name: 'Test Lastname',
                    id: 1111111,
                    type: 'private',
                    first_name: 'Test Firstname',
                    username: 'Testusername',
                },
                message_id: 1365,
                from: {
                    last_name: 'Test Lastname',
                    id: 1111111,
                    first_name: 'Test Firstname',
                    username: 'Testusername',
                },
                text: '/start',
            },
        }

        const resp = await server.inject({
            method: 'post',
            url,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            payload,
        })
        expect(resp.result).toMatchSnapshot()
    })

    test('forwarded message', async () => {
        const payload = {
            update_id: 10000,
            message: {
                date: 1441645532,
                chat: {
                    last_name: 'Test Lastname',
                    id: 1111111,
                    type: 'private',
                    first_name: 'Test Firstname',
                    username: 'Testusername',
                },
                message_id: 1365,
                from: {
                    last_name: 'Test Lastname',
                    id: 1111111,
                    first_name: 'Test Firstname',
                    username: 'Testusername',
                },
                forward_from: {
                    last_name: 'Forward Lastname',
                    id: 222222,
                    first_name: 'Forward Firstname',
                },
                forward_date: 1441645550,
                text: '/start',
            },
        }

        const resp = await server.inject({
            method: 'post',
            url,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            payload,
        })
        expect(resp.result).toMatchSnapshot()
    })

    test('forwarded channel message', async () => {
        const payload = {
            update_id: 10000,
            message: {
                date: 1441645532,
                chat: {
                    last_name: 'Test Lastname',
                    type: 'private',
                    id: 1111111,
                    first_name: 'Test Firstname',
                    username: 'Testusername',
                },
                message_id: 1365,
                from: {
                    last_name: 'Test Lastname',
                    id: 1111111,
                    first_name: 'Test Firstname',
                    username: 'Testusername',
                },
                forward_from: {
                    id: -10000000000,
                    type: 'channel',
                    title: 'Test channel',
                },
                forward_date: 1441645550,
                text: '/start',
            },
        }

        const resp = await server.inject({
            method: 'post',
            url,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            payload,
        })
        expect(resp.result).toMatchSnapshot()
    })

    test('message with a reply', async () => {
        const payload = {
            update_id: 10000,
            message: {
                date: 1441645532,
                chat: {
                    last_name: 'Test Lastname',
                    type: 'private',
                    id: 1111111,
                    first_name: 'Test Firstname',
                    username: 'Testusername',
                },
                message_id: 1365,
                from: {
                    last_name: 'Test Lastname',
                    id: 1111111,
                    first_name: 'Test Firstname',
                    username: 'Testusername',
                },
                text: '/start',
                reply_to_message: {
                    date: 1441645000,
                    chat: {
                        last_name: 'Reply Lastname',
                        type: 'private',
                        id: 1111112,
                        first_name: 'Reply Firstname',
                        username: 'Testusername',
                    },
                    message_id: 1334,
                    text: 'Original',
                },
            },
        }

        const resp = await server.inject({
            method: 'post',
            url,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            payload,
        })
        expect(resp.result).toMatchSnapshot()
    })

    test('edited message', async () => {
        const payload = {
            update_id: 10000,
            edited_message: {
                date: 1441645532,
                chat: {
                    last_name: 'Test Lastname',
                    type: 'private',
                    id: 1111111,
                    first_name: 'Test Firstname',
                    username: 'Testusername',
                },
                message_id: 1365,
                from: {
                    last_name: 'Test Lastname',
                    id: 1111111,
                    first_name: 'Test Firstname',
                    username: 'Testusername',
                },
                text: 'Edited text',
                edit_date: 1441646600,
            },
        }

        const resp = await server.inject({
            method: 'post',
            url,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            payload,
        })
        expect(resp.result).toMatchSnapshot()
    })

    test('message with entities', async () => {
        const payload = {
            update_id: 10000,
            message: {
                date: 1441645532,
                chat: {
                    last_name: 'Test Lastname',
                    type: 'private',
                    id: 1111111,
                    first_name: 'Test Firstname',
                    username: 'Testusername',
                },
                message_id: 1365,
                from: {
                    last_name: 'Test Lastname',
                    id: 1111111,
                    first_name: 'Test Firstname',
                    username: 'Testusername',
                },
                text: 'Bold and italics',
                entities: [
                    {
                        type: 'italic',
                        offset: 9,
                        length: 7,
                    },
                    {
                        type: 'bold',
                        offset: 0,
                        length: 4,
                    },
                ],
            },
        }

        const resp = await server.inject({
            method: 'post',
            url,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            payload,
        })
        expect(resp.result).toMatchSnapshot()
    })

    test('message with audio', async () => {
        const payload = {
            update_id: 10000,
            message: {
                date: 1441645532,
                chat: {
                    last_name: 'Test Lastname',
                    type: 'private',
                    id: 1111111,
                    first_name: 'Test Firstname',
                    username: 'Testusername',
                },
                message_id: 1365,
                from: {
                    last_name: 'Test Lastname',
                    id: 1111111,
                    first_name: 'Test Firstname',
                    username: 'Testusername',
                },
                audio: {
                    file_id: 'AwADBAADbXXXXXXXXXXXGBdhD2l6_XX',
                    duration: 243,
                    mime_type: 'audio/mpeg',
                    file_size: 3897500,
                    title: 'Test music file',
                },
            },
        }

        const resp = await server.inject({
            method: 'post',
            url,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            payload,
        })
        expect(resp.result).toMatchSnapshot()
    })

    test('voice message', async () => {
        const payload = {
            update_id: 10000,
            message: {
                date: 1441645532,
                chat: {
                    last_name: 'Test Lastname',
                    type: 'private',
                    id: 1111111,
                    first_name: 'Test Firstname',
                    username: 'Testusername',
                },
                message_id: 1365,
                from: {
                    last_name: 'Test Lastname',
                    id: 1111111,
                    first_name: 'Test Firstname',
                    username: 'Testusername',
                },
                voice: {
                    file_id: 'AwADBAADbXXXXXXXXXXXGBdhD2l6_XX',
                    duration: 5,
                    mime_type: 'audio/ogg',
                    file_size: 23000,
                },
            },
        }

        const resp = await server.inject({
            method: 'post',
            url,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            payload,
        })
        expect(resp.result).toMatchSnapshot()
    })

    test('message with a document', async () => {
        const payload = {
            update_id: 10000,
            message: {
                date: 1441645532,
                chat: {
                    last_name: 'Test Lastname',
                    type: 'private',
                    id: 1111111,
                    first_name: 'Test Firstname',
                    username: 'Testusername',
                },
                message_id: 1365,
                from: {
                    last_name: 'Test Lastname',
                    id: 1111111,
                    first_name: 'Test Firstname',
                    username: 'Testusername',
                },
                document: {
                    file_id: 'AwADBAADbXXXXXXXXXXXGBdhD2l6_XX',
                    file_name: 'Testfile.pdf',
                    mime_type: 'application/pdf',
                    file_size: 536392,
                },
            },
        }

        const resp = await server.inject({
            method: 'post',
            url,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            payload,
        })
        expect(resp.result).toMatchSnapshot()
    })

    test('inline query', async () => {
        const payload = {
            update_id: 10000,
            inline_query: {
                id: 134567890097,
                from: {
                    last_name: 'Test Lastname',
                    type: 'private',
                    id: 1111111,
                    first_name: 'Test Firstname',
                    username: 'Testusername',
                },
                query: 'inline query',
                offset: '',
            },
        }

        const resp = await server.inject({
            method: 'post',
            url,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            payload,
        })
        expect(resp.result).toMatchSnapshot()
    })

    test('chosen inline query', async () => {
        const payload = {
            update_id: 10000,
            chosen_inline_result: {
                result_id: '12',
                from: {
                    last_name: 'Test Lastname',
                    type: 'private',
                    id: 1111111,
                    first_name: 'Test Firstname',
                    username: 'Testusername',
                },
                query: 'inline query',
                inline_message_id: '1234csdbsk4839',
            },
        }

        const resp = await server.inject({
            method: 'post',
            url,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            payload,
        })
        expect(resp.result).toMatchSnapshot()
    })

    test('callback query', async () => {
        const payload = {
            update_id: 10000,
            callback_query: {
                id: '4382bfdwdsb323b2d9',
                from: {
                    last_name: 'Test Lastname',
                    type: 'private',
                    id: 1111111,
                    first_name: 'Test Firstname',
                    username: 'Testusername',
                },
                data: 'Data from button callback',
                inline_message_id: '1234csdbsk4839',
            },
        }

        const resp = await server.inject({
            method: 'post',
            url,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            payload,
        })
        expect(resp.result).toMatchSnapshot()
    })
})
