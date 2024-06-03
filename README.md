# PictureMe

PictureMe is a native mobile multiplayer game written in React Native using Socket.io to communicate between players.

## The game

A player can create a game as a host where they are given a room ID, other players can then join that room by copying the room ID into the app.

Once the host begins the game, each player is given the same prompt (e.g. 'Take a picture of something from your fridge') and must take a photo using that prompt.

After all players have taken a photo, they are served each photo in random order and have to guess which player took which photo.

At the end of a round, the players are given a score and are shown on a leader board. With each correct guess giving one point.

## Set up

Clone the repo using `git clone https://github.com/Dave-Turnbull/PictureMe-FE`,

Run `npm i` to install dependencies,

Start the game with `npx expo start` with optional `--tunnel` or `--port (port number)` flags,

Scan the QR code in the terminal using the [Expo Go (android)](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_GB) or [Expo app (iOS)](https://apps.apple.com/us/app/expo-go/id982107779),

Enjoy!

## Testing

There are test files included to progress through the game without calls to an external server, to set up testing please replace /contexts/SocketContext.tsx with /contexts/SocketContextTest.tsx by renaming the test file.

The test files will emulate async calls to the server with event listeners and event triggers. Please note this only works on the web preview.

## Backend server set up

When setting up your own backend server using the PictureMe-BE repo, you can connect the front end by changing the URL in /contexts/SocketContext.tsx:

`const socket:socketObject = io("https://the.backend.server.url.com");`
