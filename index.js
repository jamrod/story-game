const { get } = require('http')
const readline = require('readline')
const user = require('./user/user')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
})

let gameState = {
    mode: 0,
    currentLocation: "start",
    pastLocations: [],
    player: ""
}

const display = (message) => {
    console.log(message)
}

const processCommand = (command) => {
    display(command)
}

const userInterface = (input) => {
    display(input)
    if (!gameState.player) {
        if (input === 'new') {
            gameState.player = "new"
            display("Enter Name")
        } else if (input === 'load') {
            gameState.player = "load"
            display("Enter user name to load")
        } else if (input === 'list'){
            display("These are the users I have")
            userManager({ type: "list"})
            display("'load', 'new' or 'list'")
        } else {
            display("please enter 'load', 'new' or 'list'")
        }
    } else if (gameState.player === 'new') {
        if (typeof (input) === "string") {
            gameState.player = {
                name: input
            }
            userManager({ type: "post", user: gameState.player })
            display(`Welcome ${input}`)
        } else {
            display("I didn't get that, try again")
        }
    } else if (gameState.player === 'load') {
        display(`loading ${input}`)
        user = userManager({"type": get, "user":{"name": input}})
        if (user) {
            gameState.player = user
            gameState.mode = 1
        } else {
            display("invalid user")
            gameState.player = ''
            display("'load', 'new' or 'list'")
        }
    }
}

const play = () => {
    display("Now playing")
    display("Welcome! Load user or create new?\n(load\\new\\list)")
    rl.prompt()
    rl.on('line', (line) => {
        if (line === 'quit' || line === 'exit') {
            display("quitting")
            rl.close()
            return
        }
        switch (gameState.mode) {
            case 0:
                display("mode 0")
                userInterface(line)
                break
            case 1:
                display("mode 1")
                break
            case 2:
                display("mode 2")
                break
        }
        rl.prompt()
    })
}

play()