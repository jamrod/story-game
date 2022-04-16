const fs = require('fs')

USERMODEL = {
    name: "",
    inventory: {
        maxSize: 10,
        items: []
    }
}

const jsonArray = [USERMODEL]

fs.writeFileSync('user/store.json', JSON.stringify(jsonArray))
// const user = fs.readFileSync('test.json')
// console.log(user)
// console.log(JSON.parse(user))
