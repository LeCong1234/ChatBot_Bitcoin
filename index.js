const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('User connected'); //Khi người dùng khởi tạo một socket trên nó sẽ gọi tới hàm (socket) => {}
    socket.on('on-chat', (data) => { io.emit('user-chat', data) }); // Sau khi nhận gói tin nó sẽ gửi lại cho toàn bộ người dùng
})

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html')
})
server.listen(3000, () => {

    console.log(`http://localhost:3000`);

})
const delay = require('delay');

async function broadcastBitcoinPrince() {
    while (true) {

        const price = 31750 + Math.random() * 400
        io.emit('bitcoin-price', {

            price: parseFloat(price.toFixed(2))
        })
        await delay(500);
    }
}
broadcastBitcoinPrince();