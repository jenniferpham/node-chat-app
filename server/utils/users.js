// [
//     {
//         id: '/#120393',
//         name: 'Andrew',
//         room: 'The Office Fans'
//     }
// ]

//addUser (id, name, room)
//removeUser
//getUser(id) - returns object
//getUserList(room) - returns array of names


class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        var users = this.users;
        var userIndex = users.findIndex( (user) => user.id === id);
        var removedUser;
        if(userIndex >=0){
            removedUser = this.users.splice(userIndex, 1)[0];
        }
        return removedUser;

        // var user = this.getUser(id);
        // if(user){
        //     this.users = this.users.filter( (user) => user.id !== id);
        // }
        // return user; //will return the user removed or undefined
    }

    getUser(id){
        // var users = this.users.filter( (user) => user.id);
        // return users[0];
        return this.users.filter( (user) => user.id === id)[0]; //filter returns an array and then index number returns that specific object
    }

    getUserList(room){
        var users = this.users.filter( (user) => user.room === room);
        var namesArray = users.map( (user) => user.name)
        return namesArray;
    }

}

module.exports = {Users};


//**TESTING
// var users = new Users();
// var user = {
//     id: '123',
//     name: 'Andrew',
//     room: 'The Office Fans'
// }

// var resUser = users.addUser(user.id, user.name, user.room);
// console.log('resUser', resUser);

// var getUser = users.getUser(user.id);
// console.log('getUser', getUser);

// var getUserInvalid = users.getUser(0);
// console.log('getUserInvalid', getUserInvalid);

// var removeUser = users.removeUser(123);
// console.log('removeUser', removeUser);

// console.log('users.users (users list)', users.users);





//create set of data and methods for manipulating the person
// class Person {
//     constructor (name, age) {
//         this.name = name; //this refers to this instance rather than the class
//         this.age = age;
//     }
//     getUserDescription() {
//         return `${this.name} is ${this.age} year(s) old.`
//     }
// }

// var me = new Person('Andrew', 25);
// var description = me.getUserDescription();
// console.log(description);