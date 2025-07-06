import net from 'net';

const MCP_PORT = +(process.env.MCP_PORT ?? 5000);

export function startMcpServer(handleMessage: (msg: any) => Promise<string> | string): void {
  const server = net.createServer(async (socket) => {
    let requestData = '';
    socket.on('data', (data) => {
      requestData += data.toString();
    });

    socket.on('end', async () => {
      let response = '';
      try {
        const payload = JSON.parse(requestData);
        response = await handleMessage(payload);
      } catch (err) {
        response = JSON.stringify({ error: `Erro no summarizer: ${err}` });
      }
      socket.write(response, () => {
        socket.end();
      });
    });

    socket.on('error', (err) => {
      console.error('Erro de socket MCP:', err);
    });
  });

  server.listen(MCP_PORT, () => {
    console.log(`[MCP] Summarizer MCP server ouvindo na porta ${MCP_PORT}`);
  });
}
