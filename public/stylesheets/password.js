var usernameInput = document.getElementById("username");
var passwordInput = document.getElementById("password");

function validateUsername() {
    if(!usernameInput.value.match(/^[a-z0-9]{6,15}$/) ) {
        producePrompt("Username needs to be at least 6 characters long and cannot include special characters.", "commentUseramePrompt", "red");
    }
}

function validateUsernameKeyup() {
    if(usernameInput.value.match(/^[a-z0-9]{6,15}$/)) {
        producePrompt("Valid username", "commentUseramePrompt", "green");
    }
}

function validatePassword() {
    if(!passwordInput.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,15}$/) ) {
        producePrompt("Password should contain lowercase letters, at least one uppercase letter, one digit, and at least 6 characters.", "commentPasswordPrompt", "red");
    }
}

function validatePasswordKeyup() {
    if(passwordInput.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,15}$/)) {
        producePrompt("Valid password", "commentPasswordPrompt", "green");
    }
}




function producePrompt(message, promptLocation, color)
    {
        document.getElementById(promptLocation).innerHTML = message;
        document.getElementById(promptLocation).style.color = color;
        
    }
    




// var passwordInput = document.getElementById("password");

// userInput.oninvalid = function(event) {
//     // alert("doesnt work");
//     event.target.setCustomValidity('Username should only contain lowercase letters. e.g. john');
// }

// passwordInput.oninvalid = function(event) {
//     // alert("doesnt work");
//     event.target.setCustomValidity('Password should only contain lowercase letters. e.g. john');
// }


// function validateUsername() {
//     //Validate length
//     if(userInput.value.length<6) {
        
//         producePrompt("Username needs to be at least 6 characters long and cannot include special characters", "commentNamePrompt", "red");
//         return false;
//     }
    
//     // producePrompt("Valid username", "commentNamePrompt", "green");
//     // return true;
    
// }

// function validateUsernameKeyup() {
//     if(userInput.value.length>=6) {
//         producePrompt("Valid username", "commentNamePrompt", "green");
//         return true;
//     }
    
// }

// function producePrompt(message, promptLocation, color)
//     {
//         document.getElementById(promptLocation).innerHTML = message;
//         document.getElementById(promptLocation).style.color = color;
        
//     }