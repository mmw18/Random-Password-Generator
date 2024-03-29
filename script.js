// Shortened rundown of what we are having the computer do in order to
//    produce a password that meets criteria decided by the user:

//  1. Ask the user for the password length and if they'd like to include 
//      uppercase letters, special characters, or numbers along with lowercase letters
//  2. I have exctracted the numberic value ranges that corespond with each of the 
//      optional additional classes, as well as our main lowercase range 
//  3. For password length times, the computer will chose a range to choose from
//      and a value that is within that range



// Using the queryselector to assign newly made 'generateBtn' variable to the id=generate in our HTML
var generateBtn = document.querySelector("#generate");

// Dictionaries respresenting the ascii values for each desired character range
var lowercaseRange = {min: 97, max: 123}
var specialRange = {min: 33, max: 47}
var numberRange = {min: 48, max: 57}
var uppercaseRange = {min: 65, max: 90}

// Funtion to return a random integar between specified min and max 
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

// If user decides to input password length, this function will ensure input is a numeric value, and that it falls within assigned range (8-128)
function checkPasswordLength(passwordLength) {
  // Check to ensure input is a number
  if (isNaN(passwordLength)) {
    alert("Please enter a numeric value.");
    return false;
  }

  // Converting the string input to a number
  var length = parseInt(passwordLength, 10);

  // Check to ensure input is within the valid range
  if (length >= 8 && length <= 128) {
    return true;
  } else {
    alert("Password length must be between 8 and 128 characters.");
    return false;
  }
}

// Funtion ran when user clicks the 'generate password' button on the screen
function generatePassword() {
  // Asking the user if they would like to include uppercase letters 
  var uppercasePrompt = "Do you want your password to include uppercase letters? ";
  var uppercaseEnabled = confirm(uppercasePrompt);
// Asking the user if they would like to inlcude numbers
  var numberPrompt = "Do you want your password to include numbers? ";
  var numberEnabled = confirm(numberPrompt);
// Asking the user if they would like to include special characters
  var specialPrompt = "Do you want your password to include special characters? ";
  var specialEnabled = confirm(specialPrompt);

// Asking the user if they'd like to chose the length of their password
  var passwordPrompt = "Do you want to set a specific length to this password? If not, a length of 8-128 characters will be chosen at random. ";
  var lengthEnabled = confirm(passwordPrompt);
  var passwordLength;
  // Asking for specific length if answered yes to previous question
  if (lengthEnabled) {
    var passwordLengthPrompt = "What would you like the length of your password to be? ";
    passwordLength = prompt(passwordLengthPrompt);
    var passwordLengthValid = checkPasswordLength(passwordLength)
    // Reminder prompt to be returned if the user enters a value outside or 8-128
    while (!passwordLengthValid) {
      var reminderPrompt = "Please only choose a value between 8-128.";
      passwordLength = prompt(reminderPrompt);
      passwordLengthValid = checkPasswordLength(passwordLength); 
      // ^^Uses checkPasswordLength funtion again to ensure password length meets requirements.
      // If no, while-loop will restart. If password meets requirments,
    }
  }
  // Code jumps here if the user does not want to specify password length
  else {
    passwordLength = getRandomInt(8,129)
  }
// Filling in an ascii table ranges array
  var rangesArray = [lowercaseRange];
  if (uppercaseEnabled) {
    rangesArray.push(uppercaseRange);
  }
  if (specialEnabled) {
    rangesArray.push(specialRange);
  }
  if (numberEnabled) {
    rangesArray.push(numberRange);
  }
// Creating variable 'passwordArray' carry an array matching the size of passwordLength'
// For each character within the password (who's length was just previously decided), a range is selected from the available character ranges
//    (depending on what prompts the user selected), and a value within that range is selected. 
// Selected value is assigned for that password character, and it will continue to select values until the amount of values
//     is equal to the 'passwordLength'
  var passwordArray = new Array(passwordLength);
  for (var i = 0; i < passwordLength; i++) {
    var rangeIndex = getRandomInt(0, rangesArray.length);
    var rangeMin = rangesArray[rangeIndex].min;
    var rangeMax = rangesArray[rangeIndex].max+1;
    var randomNumber = getRandomInt(rangeMin, rangeMax);
    passwordArray[i] = String.fromCharCode(randomNumber);
    console.log(passwordArray[i]);
  }

// convert passwordArray of characters into a string (without commas) and return it to the 'writePassword' function
  return passwordArray.join("")
}

// Write password to id=password on HTML
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
