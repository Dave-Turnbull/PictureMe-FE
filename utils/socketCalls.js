export const hostGame = (username) => {
    return 'gameroomid' //emit hostgame
}

export const joinGame = (roomId, username) => {
    return [
        { name: "Emil", id: "1", isHost: false },
        { name: "Ian", id: "2", isHost: false },
        { name: "Dave", id: "3", isHost: false },
        { name: "Jake", id: "4", isHost: false },
        { name: "Paul", id: "5", isHost: true }
      ]
}
