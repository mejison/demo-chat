let members = [];

module.exports = (io) => {
    const usersNamespace = io.of('/users');

    usersNamespace.on('connection', socket => {
        socket.on('get-all-members', function (fn) {
            fn(members)
        });

        socket.on('join-user', function (user) {
            const exist = members.find((member) => member.hash == user.hash);
            if (!exist) {
                members = [...members, user];
                socket.broadcast.emit('new-user', user);
            }
        });
    });
}
