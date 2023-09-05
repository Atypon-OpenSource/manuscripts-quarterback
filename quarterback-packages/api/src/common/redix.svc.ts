import Redis from 'ioredis'
import { Step } from 'prosemirror-transform'

const redisClient = new Redis()

export type DocumentData = {
    steps: Step[]
    version: number
    clientIds: number[]
    doc: any
}

const getRedisKey = (docId: string) => `document:${docId}`

export const createDocumentStorage = () => {
    return {
        set: async (docId: string, data: DocumentData) => {
            await redisClient.set(getRedisKey(docId), JSON.stringify(data))
        },
        get: async (docId: string) => {
            const data = await redisClient.get(getRedisKey(docId))
            return data ? JSON.parse(data) : null
        },
    }
}

export const getDocumentHistory = async (docId: string) => {
    const documentStorage = createDocumentStorage()
    const documentData = await documentStorage.get(docId)

    if (!documentData) {
        const newDocumentData: DocumentData = {
            steps: [], // TODO: Consider dropping steps based on some conditions.
            clientIds: [], // TODO: Consider dropping clientIds based on some conditions.
            version: 0,
            doc: undefined,
        }

        await documentStorage.set(docId, newDocumentData)
        return newDocumentData
    }

    return documentData
}
