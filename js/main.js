
// data start
let users = [
    {
        name: 'User 1',
        password: '111',
        age: 30,
        isLogin: false,
        getMessages: [],
        sendMessages: []
    },
    {
        name: 'User 2',
        password: '222',
        age: 33,
        isLogin: false,
        getMessages: [],
        sendMessages: []
    },
    {
        name: 'User 3',
        password: '333',
        age: 21,
        isLogin: false,
        getMessages: [],
        sendMessages: []
    },
    {
        name: 'User 4',
        password: '444',
        age: 56,
        isLogin: false,
        getMessages: [],
        sendMessages: []
    },
    {
        name: 'User 5',
        password: '555',
        age: 42,
        isLogin: false,
        getMessages: [],
        sendMessages: []
    },
    {
        name: 'User 6',
        password: '666',
        age: 13,
        isLogin: false,
        getMessages: [],
        sendMessages: []
    },
    {
        name: 'User 7',
        password: '777',
        age: 29,
        isLogin: false,
        getMessages: [],
        sendMessages: []
    },
    {
        name: 'User 8',
        password: '888',
        age: 53,
        isLogin: false,
        getMessages: [],
        sendMessages: []
    },
    {
        name: 'User 9',
        password: '999',
        age: 18,
        isLogin: false,
        getMessages: [],
        sendMessages: []
    },
    {
        name: 'User 10',
        password: '10',
        age: 48,
        isLogin: false,
        getMessages: [],
        sendMessages: []
    }
];
// data end


//// users scripts start
let inSystem = '';
function changeInSystemUser(userName='') {
    inSystem = userName;
    let h3 = document.querySelector('h3');
    inSystem ? h3.innerText = `User: ${inSystem} in system` : h3.innerText = `No users in system`
};

//// creare logic

function checkUniqueUserName (userName) {
    return users.some(item => item.name === userName)
};

function checkPassword(pass, passConfirm){
    return pass === passConfirm
};

function registerUser(){
    let userName = prompt('Enter username');
    if(checkUniqueUserName(userName)) {
        alert('User already exists!');
        return;
    };
    let pass = prompt('Enter password');
    let passConfirm = prompt('Enter password confirmation');
    if(!checkPassword(pass, passConfirm)){
        alert('Passwords don\'t match')
        return;
    };
    let age = +prompt('Enter age')
    let userObj = {
        name: userName,
        password: pass,
        age: age,
        isLogin: false,
        getMessages: [],
        sendMessages: []
    };
    users.push(userObj);
    alert('Created successfully');
    console.log(users);
};

///                       login logic

function getUserObj(userName) {
    return users.find(item => item.name === userName);
};

function checkUserPassword(userName, pass){
    let user = getUserObj(userName);
    return user.password === pass;
};

function loginUser() {
    let userName = prompt('Enter username');
    if(!checkUniqueUserName(userName)) {
        alert('User didn\'t find');
        return;
    };
    let pass = prompt('Enter password');
    if(!checkUserPassword(userName, pass)) {
        alert('Password doesn\'t match this account');
        return;
    };
    let user = getUserObj(userName);
    user.isLogin = true;
    changeInSystemUser(userName);
};



// //update logic

function getUserObj(username) {
    return users.find(item => item.name == username)
}

function updateUser() {
    if (!inSystem) {
        alert('Only autorized users can update their accounts');
        return
    };
    let user = getUserObj(inSystem);

    let updateAsk = prompt('what you want to update age(write "age"), name(write "name") of password(white "pass") ???').toLowerCase();
    if(updateAsk === "age"){
        let newAge = +prompt('Enter how old are you now?')
        for(i of users){
            if(inSystem == i){
                i.age = newAge
            }
        }
        user.age = newAge;
        alert('Age successfully updated');
        console.log(users);
        let secondChance = confirm('Do you wand to update anything else?')
        if(secondChance){
            updateUser()
        } else{
            return
        }
    } else if (updateAsk === "name"){
        let newName = prompt('Enter what is your name now?')
        if (checkUniqueUserName(newName)) {
            alert('Username already exists!')
            return
        }
            user.name = newName;
            changeInSystemUser(newName);
        alert('Name successfully updated');
        let secondChance = confirm('Do you wand to update anything else?');
        console.log(users);
        if(secondChance){
            updateUser()
        }  
        }
        else if(updateAsk === "pass"){
            let oldPassword = prompt('Enter your password')
        if (!checkPassword(user.password, oldPassword)) {
            alert('Password doesn\'t match this account')
            return
        } 
        let newPassword = prompt('Enter new password');
                user.password = newPassword;
                alert('Password successfully changed')
                let secondChance = confirm('Do you wand to update anything else')
                if(secondChance){
                    updateUser()
                }
                console.log(users)
                return
    }else {
        alert ('You should answer "age" or "name" or "pass"');
        updateUser()
    }
    console.log(users);
};

///             logout logic
function logoutUser() {
    let user = getUserObj(inSystem);
    user.isLogin = false;
    inSystem = '';
    changeInSystemUser('');
    console.log(users)
};


////Delete account logic

function deleteUser(){
    let user = getUserObj(inSystem);
    if (!inSystem) {
        alert("Only aurorized users can delete themself");
        return;
    }
    let lastQuestion = confirm('ARE YOU SURE????');
    if (lastQuestion){
        let oldPassword = prompt('Enter your password')
        if (!checkPassword(user.password, oldPassword)) {
            alert('Password doesn\'t match this account')
            return
        } 
        users = users.filter(accounts => accounts.name != inSystem)
        changeInSystemUser('')
        console.log(users)
    }
}



//message logic

function createMessage() {
    if (!inSystem) {
    alert("Only aurorized users can send message");
    return;
    }
    let user = getUserObj(inSystem);
    let num = 0;
    let from = prompt("Enter recipient");
    let to = from;
    for (i of users) {
        if (from == i.name) {
        num++;
    }
    }
    if (num == 1) {
        let message = prompt("Enter message");
        let from = {
            id: Date.now(),
            content: message,
            user: inSystem
        };
        user.sendMessages.push(from)
        for (i of users) {
            if (to == i.name) {
            i.getMessages.push(from)
        }
    }
        searchUser(from);
        function searchUser(from) {
        for (i of users) {
            if (i.name == from) {
            i.getMessages.push(to);
            alert("Successfuly created");
        }
        }
    }

    console.log(users);
    } else {
        alert("There is no user with such name, Try again!");
        return;
    }
}


//delete message logic

function checkIdMs(id){
    return (users.some(item => item.sendMessages.some(item1 => item1.id === id)) || users.some(item => item.getMessages.some(item1 => item1.id === id)));
}  

function checkUserIdMs(userName,id){
        let user = getUserObj(userName);
        return (user.sendMessages.some(item =>item.id === id) || user.getMessages.some(item =>item.id === id));
}  

function getMessagesObj(userName,id){
    let obj = getUserObj(userName);
    return (obj.sendMessages.find(item =>item.id === id) || obj.getMessages.find(item =>item.id === id));
}

function messageFindSent(obj1,obj2){
    return obj1.sendMessages.some(item => item === obj2);
}
function messageFindGet(obj1,obj2){
    return obj1.getMessages.some(item => item === obj2);
}


function deleteMessage(){
    if (!inSystem){
        alert('Only aurorized users can delete message');
        return;
    }
    let idMessage = +prompt("Enter id of message you want to delete");
    if(!checkIdMs(idMessage)){
        alert('tehere is no message with such id');
        return;
    }
    if(!checkUserIdMs(inSystem,idMessage)){
        alert("Not your message");
        return;
    }
    let  userObj = getUserObj(inSystem);
    let messageObj = getMessagesObj(inSystem,idMessage);
    console.log(messageObj);

    if(messageFindSent(userObj,messageObj)){
    userObj.sendMessages.splice(userObj.sendMessages.indexOf(messageObj),1);
    alert("Deleted successfully");
    }
    else if(messageFindGet(userObj,messageObj)) {
        userObj.getMessages.splice(userObj.getMessages.indexOf(messageObj),1);
        alert("Deleted successfully");
    }
    console.log(users)
}


