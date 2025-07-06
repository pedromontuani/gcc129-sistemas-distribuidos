import net from 'net';

const MCP_PORT = +(process.env.MCP_PORT ?? 5000);
const MCP_HOST = process.env.MCP_HOST ?? 'summarizer';

export function sendToSummarizer(payload: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();
        let responseData = '';

        client.connect(MCP_PORT, MCP_HOST, () => {
            client.write(payload);
        });

        client.on('data', (data) => {
            responseData += data.toString();
        });

        client.on('end', () => {
            resolve(responseData);
        });

        client.on('error', (err) => {
            reject(err);
        });
    });
}
