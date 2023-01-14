import { ManagerOptions, SocketOptions } from 'socket.io-client';
export interface Config {
    methodNames?: (keyof Console)[];
    socketConfig: Partial<ManagerOptions & SocketOptions> & {
        url: string;
    };
}
export declare const config: Required<Config>;
export declare const defineConfig: (cfg: Partial<Config>) => void;
