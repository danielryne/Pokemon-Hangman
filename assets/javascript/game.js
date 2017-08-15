
    //array of pokemon captured, starts off empty
    var captured = [];

    //array to keep track of guesses
    var guesses = [];

    //array of words to be used for the game (orginal 151 pokemon)
    var wordbank = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle", "Wartortle","Blastoise",'Caterpie','Metapod','Butterfree','Weedle','Kakuna','Beedrill','Pidgey','Pidgeotto','Pidgeot','Rattata','Raticate','Spearow','Fearow','Ekans','Arbok','Pikachu','Raichu','Sandshrew','Sandslash','Nidorina','Nidoqueen','Nidorino','Nidoking','Clefairy','Clefable','Vulpix','Ninetales','Jigglypuff','Wigglytuff','Zubat','Golbat','Oddish','Gloom','Vileplume','Paras','Parasect','Venonat','Venomoth','Diglett','Dugtrio','Meowth','Persian','Psyduck','Golduck','Mankey','Primeape','Growlithe','Arcanine','Poliwag','Poliwhirl','Poliwrath','Abra','Kadabra','Alakazam','Machop','Machoke','Machamp','Bellsprout','Weepinbell','Victreebel','Tentacool','Tentacruel','Geodude','Graveler','Golem','Ponyta','Rapidash','Slowpoke','Slowbro','Magnemite','Magneton','Farfetchd','Doduo','Dodrio','Seel','Dewgong','Grimer','Muk','Shellder','Cloyster','Gastly','Haunter','Gengar','Onix','Drowzee','Hypno','Krabby','Kindler','Voltorb','Electrode','Exeggcute','Exeggutor','Cubone','Marowak','Hitmonlee','Hitmonchan','Lickitung','Koffing','Weezing','Rhyhorn','Rhydon','Chansey','Tangela','Kangaskhan','Horsea','Seadra','Goldeen','Seaking','Staryu','Starmie','MrMime','Scyther','Jynx','Electabuzz','Magmar','Pinsir','Tauros','Magikarp','Gyarados','Lapras','Ditto','Eevee','Vaporeon','Jolteon','Flareon','Porygon','Omanyte','Omastar','Kabuto','Kabutops','Aerodactyl','Snorlax','Articuno','Zapdos','Moltres','Dratini','Dragonair','Dragonite','Mewtwo','Mew'];
    
    //chooses a random word from the word bank 
    var word = wordbank[Math.floor(Math.random() * wordbank.length)];
    word = word.toLowerCase(); //changes all choises to lower case
    console.log(word); //hint - sends word to console

    //variable for the length of the word
    var wordlength = word.length; 

    //array that will house the letters of the word, this is our "work bench"
    var wordletters = word.split();

    //loop that converts each character into an underscore 
    for (i = 0; i < wordlength; i++) {
      wordletters[i] = "_";
    }

    //prints the current word 
    document.getElementById("word").innerHTML = wordletters.join(' ');

    //variable to keep track of the number of bad guesses
    var badguess = 5;
    document.getElementById("badguess").innerHTML = badguess;

    //variable to keep track of mismatches
    var mismatch = 0;

    //variable to indicate if a good guess was made 
    var goodguess = false; 

    //variable to keep track of pokemon caught
    var caught = 0;

    //variable to play sound when pokemon is captured
    var capturesound = new Audio('./assets/audio/capturesound.mp3');

  //game starts when user types into the text field     
  document.onkeyup = function(event) {

    // Determines which key was pressed.
    var userguess = event.key; 
    useguess = userguess.toLowerCase(); //converts user choice to lower case letters
    guesses.push(" " + userguess); //adds to list of letters guessed
    document.getElementById("letterguess").innerHTML = guesses;

    //loop to check the user selection against all letters  
    for (i = 0; i < wordlength; i++){
      //compares the letter to the user guess
      if (word.charAt(i) == userguess){

        //changes status of goodguess to true
        goodguess = true; 

        //code to replace the blankletter with user guess  
        wordletters[i] = userguess;
      }
    }

    //if the goodguess variable was not changed to true, this adds to the badguess total
    if (goodguess == false){
      badguess--;
        document.getElementById("badguess").innerHTML = badguess;
    }
    
    //prints the word with the letter now replaced!
    document.getElementById("word").innerHTML = wordletters.join(' ');

    //resets good guess indicator
    goodguess = false; 

    //checks to see if you lost the game
    if (badguess === 0){
      document.getElementById("gamestatus").innerHTML = "Pokemon ran away! Try again.";
      
      //resets the game with new word, all variable reset
      word = wordbank[Math.floor(Math.random() * wordbank.length)]; //gets new word
      word = word.toLowerCase(); //changes all letters to lower case
      console.log(word); //hint - sends word to console
      wordletters.length = word.length; //reset array for word
      wordlength = word.length; //resets word length
      wordletters = word.split(); //splits word into array
      guesses = []; //resets array for guesses
      document.getElementById("letterguess").innerHTML = guesses; //prints new array

      for (i = 0; i < wordlength; i++) { //resets letters in array to blanks
        wordletters[i] = "_";
      }
      document.getElementById("word").innerHTML = wordletters.join(' '); //prints blanks
      
      badguess = 5; //reset variable 
      document.getElementById("badguess").innerHTML = badguess;

      goodguess = false; //reset variable 
      mismatch = 0; //reset variable 
    }    

    //checks to see if there are any missing letters 
    for (i = 0; i < wordlength; i++){
      if (word.charAt(i) != wordletters[i]){
        mismatch++;
      }
    }

    //checks to see if you won the game (ie. if there are no missing letters)
    if (mismatch === 0) {
      document.getElementById("gamestatus").innerHTML = "You caught a pokemon! <br> Can you catch the next one?";
      capturesound.play(); //plays sound

      //increments the number of pokemon caught
      caught++;
      document.getElementById("caught").innerHTML = caught;

      //add pokemon to captured list
      captured.push(" " + word);

      //print the list of pokemon captured
      document.getElementById("captured").innerHTML = captured;

      //resets the game with new word, all variable reset
      word = wordbank[Math.floor(Math.random() * wordbank.length)]; //gets new word
      word = word.toLowerCase(); //changes all letters to lower case
      console.log(word); //hint - sends word to console
      wordletters.length = word.length; //reset array for word
      wordlength = word.length; //resets word length
      wordletters = word.split(); //splits word into array
      guesses = []; //resets array for guesses
      document.getElementById("letterguess").innerHTML = guesses; //prints new array

      for (i = 0; i < wordlength; i++) { //resets letters in array to blanks
        wordletters[i] = "_";
      }
      document.getElementById("word").innerHTML = wordletters.join(' '); //prints blanks
      
      badguess = 5; //reset variable 
      document.getElementById("badguess").innerHTML = badguess;

      goodguess = false; //reset variable 
      mismatch = 0; //reset variable 

      //Adds badges for Pokemon caught!
      if (caught >= 40){
        document.getElementById("badges").innerHTML = 
          '<img alt="boulderbadge" src="./assets/images/badges/Boulderbadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Cascadebadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Thunderbadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Rainbowbadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Soulbadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Marshbadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Volcanobadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Earthbadge.png" />';
        document.getElementById("message").innerHTML = "You've caught 40 pokemon. You've earned the Rainbow Badge. You are truly the very best, like no one ever was!";
      }
      else if (caught >= 35){
        document.getElementById("badges").innerHTML = 
          '<img alt="boulderbadge" src="./assets/images/badges/Boulderbadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Cascadebadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Thunderbadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Rainbowbadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Soulbadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Marshbadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Volcanobadge.png" />';
        document.getElementById("message").innerHTML = "You've caught 35 pokemon. You've earned the Volcano Badge. You are almost there!";
      }
      else if (caught >= 30){
        document.getElementById("badges").innerHTML = 
          '<img alt="boulderbadge" src="./assets/images/badges/Boulderbadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Cascadebadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Thunderbadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Rainbowbadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Soulbadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Marshbadge.png" />';
        document.getElementById("message").innerHTML = "You've caught 30 pokemon. You've earned the Marsh Badge. Wow, what skill!";
      }
      else if (caught >= 25){
        document.getElementById("badges").innerHTML = 
          '<img alt="boulderbadge" src="./assets/images/badges/Boulderbadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Cascadebadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Thunderbadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Rainbowbadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Soulbadge.png" />';
        document.getElementById("message").innerHTML = "You've caught 25 pokemon. You've earned the Soul Badge. Impressive!";
      }
      else if (caught >= 20){
        document.getElementById("badges").innerHTML = 
          '<img alt="boulderbadge" src="./assets/images/badges/Boulderbadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Cascadebadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Thunderbadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Rainbowbadge.png" />';
        document.getElementById("message").innerHTML = "You've caught 20 pokemon. You've earned the Rainbow Badge. You could be a gym leader!";
      }
      else if (caught >= 15){
        document.getElementById("badges").innerHTML = 
          '<img alt="boulderbadge" src="./assets/images/badges/Boulderbadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Cascadebadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Thunderbadge.png" />';
        document.getElementById("message").innerHTML = "You've caught 15 pokemon. You've earned the Thunder Badge. Your skill shows promise!";
      }
      else if (caught >= 10){
        document.getElementById("badges").innerHTML = 
          '<img alt="boulderbadge" src="./assets/images/badges/Boulderbadge.png" /><img alt="boulderbadge" src="./assets/images/badges/Cascadebadge.png" />';
        document.getElementById("message").innerHTML = "You've caught 10 pokemon. You've earned the Cascade Badge. Fantastic!";
      }
      else if (caught >= 5){
        document.getElementById("badges").innerHTML = 
          '<img alt="boulderbadge" src="./assets/images/badges/Boulderbadge.png" />';
        document.getElementById("message").innerHTML = "You've caught 5 pokemon. You've earned the Boulder Badge. Way to go trainer!";
      }
    }
    else{
      mismatch = 0;  //resets the number of mismatched characters to zero
    }

}
