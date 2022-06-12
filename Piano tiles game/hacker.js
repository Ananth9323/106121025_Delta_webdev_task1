alert("Game instructions:1. Follow which tile blinks and press that tile accordingly.2.Press any button to start the game initially. After finishing the game refresh the page to start a new game ");

var buttonNumbers = ["key1", "key2", "key3", "key4", "key5", "key6", "key7", "key8", "key9", "key10", "key11", "key12", "key13", "key14", "key15", "key16", "key17", "key18", "key19", "key20", "key21", "key22", "key23", "key24", "key25", "key26", "key27", "key28", "key29", "key30", "key31", "key32", "key33", "key34", "key35", "key36"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;
var k = 1000;

var j = 30;

document.querySelector("body").addEventListener("keydown", function() {
  if (!started) {
    if (j >= 0) {
      let myVar = setInterval(function() {
        document.querySelector("#level-title").innerHTML = ("Game started. Time left: " + j--);
      }, 1000);


      nextSequence();
      setTimeout(function() {
        nextSequence();
      }, 200);
      setTimeout(function() {
        nextSequence();
      }, 400);
      started = true;
    }
  }
})


for (var i = 0; i < (document.querySelectorAll(".btn").length); i++) {
  document.querySelectorAll(".btn")[i].addEventListener("click", function() {
    var userChosenKey = this.getAttribute("id");
    userClickedPattern.push(userChosenKey);
    console.log(userClickedPattern);
    playSound(userChosenKey);
    animatePress(userChosenKey);
    checkAnswer(userClickedPattern.length - 1);
    level++;
  });
}


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      setTimeout(function() {
        nextSequence();
      }, 1200);
      setTimeout(function() {
        nextSequence();
      }, 1400);

    }

  } else {

    console.log("wrong");

    playSound("wrong");
    clearInterval(myVar);
    document.querySelector("#level-title").innerHTML = ("Game Over, your score is " + level);
    document.querySelector("body").ClassList.add("game-over");
    setTimeout(function() {
      document.querySelector("body").ClassList.remove("game-over");
    }, 200);
    document.querySelector("#level-title").innerHTML = ("Game Over, press any key to restart");


    // startOver();
  }

}


function nextSequence() {
  // userClickedPattern = [];
  // document.querySelector("#level-title").innerHTML = ("level" + level);
  var randomNumber = Math.floor(Math.random() * 36);
  var randomChosenKey = buttonNumbers[randomNumber];
  gamePattern.push(randomChosenKey);
  animatePress(randomChosenKey);
  // playSound(randomChosenKey);
  // setTimeout(function(){
  //   for (var j = 1, k = 50; j < gamePattern[j].length; j++, k = k + 50) {
  //     setTimeout(function() {
  //       animatePress(gamePattern[j]);
  //       playSound(gamePattern[j]);
  //     }, k);
  //   }
  // },100);

}


function playSound(bruh) {
  var audio = new Audio('sounds/' + bruh + '.mp3');
  audio.play();
}

function animatePress(k) {
  var activeButton = document.querySelector("." + k);
  activeButton.classList.add("pressed");
  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
