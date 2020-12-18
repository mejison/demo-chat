import io from 'socket.io-client'

const namespaces = {
    'members': 'users',
    'messages': 'messages'
}

let name, path, sockets;
for (let namespace in namespaces) {
    path = namespaces[namespace];
    sockets = {
        ...sockets,
        [namespace]: io(`${process.env.WS_URL}/${path}`)
    };
}

export default sockets