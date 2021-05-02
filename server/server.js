const mongoose = require("mongoose")

mongoose.connect('mongodb://localhose/google-docs', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const io = require('socket.io')(3001, {
    cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    }
})

io.on("connection", socket => {
    socket.on('get-document', documentId => {
        const data = ""
        socket.join(documentId)
        socket.emit('load-document', data)
    })
    socket.on('send-changes', delta => {
        socket.broadcast.to(document).emit("receive-changes", delta)
    })
})