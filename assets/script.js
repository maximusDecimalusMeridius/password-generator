// add event listener to button on site
document.getElementById("generate").addEventListener("click", OnClick);

// pwBuild object
let pwBuild = {
    passwordLength: 0,
    availableChars: "",
    guaranteedChars: "",
    newPassword: "",
    lowercase:{
        use: false,
        values: "abcdefghijklmnopqrstuvwxyz",
        ID: "lowercase letters"
    },
    uppercase:{
        use: false,
        values: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        ID: "uppercase letters"
    },
    numbers:{
        use: false,
        values: "0123456789",
        ID: "numbers"
    },
    specialChars:{
        use: false,
        values: "~!@#$%^&*(){}[]:;<>?/-_+=|",
        ID: "special characters"
    }
}

//Prompt user for an input, store value in variable
//If smaller than 8 or larger than 128, prompt again
function OnClick(){
    // Initialize guaranteed char string
    pwBuild.guaranteedChars = "";
    pwBuild.availableChars = "";
    pwBuild.newPassword = "";

    pwBuild.passwordLength = prompt("Enter your desired password length between 8 and 128")
    if(pwBuild.passwordLength == null){
        return;
    }
    while(!(pwBuild.passwordLength >= 8) || !(pwBuild.passwordLength <= 128)){
        pwBuild.passwordLength = prompt("Enter your desired password length between 8 and 128");
        if(pwBuild.passwordLength == null){
            return;
        }
    }

    // Call InitializeChoice which will prompt user for requirement prefs and act accordingly
    InitializeChoice(pwBuild.lowercase);
    InitializeChoice(pwBuild.uppercase);
    InitializeChoice(pwBuild.specialChars);
    InitializeChoice(pwBuild.numbers);

    if(pwBuild.lowercase.use == false && pwBuild.uppercase.use == false && pwBuild.numbers.use == false && pwBuild.specialChars.use == false){
        document.getElementById("password").value = "Come onnnnnnnn, you have to pick at least ONE!";
    } else {
        GeneratePassword(pwBuild.passwordLength);
        JumblePass();
        document.getElementById("password").value = pwBuild.newPassword;
    }

}

// Generate a new password by concatenating pwBuild.newPassword
// The argument passed to Generate Password is the requested password length minus any preloaded
// characters that meet password make-up requirements
function GeneratePassword(remainingLetters) {

    if (remainingLetters === 0){
        return pwBuild.newPassword;
    }

    pwBuild.newPassword += pwBuild.availableChars.charAt(Math.floor(Math.random() * pwBuild.availableChars.length));
    GeneratePassword(remainingLetters - 1);

}

// Accept user preferences through confirm() dialog pop-ups.  If user selects a characteristic,
// it guarantees at least two of those values will be added to the availableChars string 
function InitializeChoice(choice){
    
    if(choice.use = confirm(`Would you like to include ${choice.ID}?
Click OK for 'Yes'`)){
        console.log(choice.use);
        pwBuild.availableChars += choice.values;
        for(let i = 0; i < 2; i++){
            console.log("Adding stuff");
            pwBuild.guaranteedChars += choice.values.charAt(Math.floor(Math.random() * choice.values.length));
            pwBuild.passwordLength -= 1;
        }
    } else {console.log(choice.use)}
}

// Jumble the new password
function JumblePass(){
    let tempArray = [];
    let randomizedPassword = "";
    pwBuild.newPassword += pwBuild.guaranteedChars;
    
    // for loop creating a temp array from the newPassword string value in pwBuild,
    // so we can manipulate the data

    for(let i = 0; i < pwBuild.newPassword.length; i++){
        tempArray.push(pwBuild.newPassword.charAt(i));
    }

    // for loop running for (user selected build length) + (length of the string holding guaranteed characters)
    // fatePicker is assigned 0/1
    for (let j = 0; j < (pwBuild.passwordLength + (pwBuild.guaranteedChars.length)); j++) {

        if(Math.floor(Math.random() * 2) === 1) {
            randomizedPassword += tempArray.shift();
            console.log("I shifted!");
            console.log(tempArray);
        } else {
            randomizedPassword += tempArray.pop(); console.log("I POPPED!");
            console.log(tempArray);
        }
    }
    // Set new password and re-initialized tempArray
    pwBuild.newPassword = randomizedPassword;
    console.log("Guaranteed Chars: " + pwBuild.guaranteedChars)
    console.log("Available Chars: " + pwBuild.availableChars)
    console.log("New Password: " + pwBuild.newPassword)

    //Re-initialize array
    for(index in tempArray){
        delete tempArray[index];
    }
}