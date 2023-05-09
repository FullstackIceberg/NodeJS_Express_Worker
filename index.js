import express from 'express';
import { Worker } from 'worker_threads';
const app = express();
const port = 3000;

app.get('/fibonacci/:n', (req, res) => {
    const n = parseInt(req.params.n);
    console.log(`Get /fibonacci/${n} start`);
    // 워커 스레드를 통해 CPU 집약적인 작업을 백그라운드에서 처리하고, 메인 스레드에서 다른 요청을 병렬적으로 처리할 수 있음.
    const worker = new Worker('./worker.js');
    worker.on('message', (result) => {
        console.log(`Worker Thread End`);
        console.log(`Get /fibonacci/${n} start`);
        return res.send(`Fibonacci(${n}) = ${result}`);
    });

    console.log(`Worker Thread Start)`);
    worker.postMessage(n);
});

app.get('/ping', (req, res) => {
    console.log(`Get /ping`);
    res.send('pong');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});