import Koa, { DefaultState, DefaultContext } from "koa";

export const startServer = (app: Koa<DefaultState, DefaultContext>, port: string | number) => {
    const server = app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

    server.on('error', (error) => {
        console.error("Server failed to start", error);
    });
}
