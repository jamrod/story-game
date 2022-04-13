const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
})

let gameState = {
    mode : 0,
    currentLocation: "start",
    pastLocations: [],
    player: {}
}

const display = (message) => {
    console.log(message)
}

const processCommand = (command) => {
    display(command)
}

const play = () => {
    display("Now playing")
    rl.prompt()
    rl.on('line', (line) => {
        if (line === 'quit' || line === 'exit') {
            display(quitting)
            rl.close()
        }
        switch(gameState.mode){
            case 0:
                display("mode 0")
                break
            case 1:
                display("mode 1")
                break
            case 2:
                display("mode 2")
                break
        }
    })
}

play()