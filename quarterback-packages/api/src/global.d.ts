import {AuthResponse} from "$typings/request";

export type Client = {
    id: number
    res: AuthResponse<string>
}

declare global {
    var clients: Client[]
}
