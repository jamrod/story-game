fs = require('fs')


USERMODEL =  {
    name: "",
    inventory: {
        maxSize: 10,
        items: []
    },
    history: []
}

if (!fs.existsSync("./user/store.json")){
    fs.writeFileSync("./user/store.json", JSON.stringify({}))
}

const getUsers = () => {
    const data = fs.readFileSync("./user/store.json", (err) => {
        if (err) throw err
    })
    console.log(data + typeof(data))
    return JSON.parse(data)
}

const writeUsers = (user) => {
    const data = JSON.stringify(user)
    fs.writeFileSync("./user/store.json", data, (err) => {
        if (err) throw err
    })
}

module.exports = userManager = (req) => {
    const users = getUsers()

    switch (req.type) {
        case "get":
            console.log(`get for ${req.user.name}`)
            if (users.includes(req.user.name)){
                return users.get(req.user.name)
            }
            break
        case "post":
            console.log(`got ${req.user.name}`)
            let newUser = {...USERMODEL}
            newUser.name = req.user.name
            users[newUser.name] = (newUser)
            writeUsers(users)
            break
        case "save":
            console.log(`saving... ${req.user.name}`)
            break
        case "update":
            console.log(`updating... ${req.user}`)
            break
        case "list":
            return Object.keys(users)
    }
}