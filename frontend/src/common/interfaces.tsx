export interface IServer {
    id?: number;
    alias: string;
    ip_address: string;
    hostingId?: number;
    provider_name: string;
    server_status: boolean;
    time_created: number;
}

export interface IProvider {
    provider_name: string;
    id?: number;
}