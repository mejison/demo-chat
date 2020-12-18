let messages = [];

module.exports = (io) => {
    const usersNamespace = io.of('/messages');

    usersNamespace.on('connection', socket => {
        socket.on('get-all-messages', function (fn) {
            fn(messages)
        });

        socket.on('send-message', function (message) {
            socket.broadcast.emit('new-message', message)
            messages = [...messages, message];
        });
    });
}