let scoreAndLevel = function () {

    if (seaStarNum===5){
      lives++;
      seaStarNum=0;
    }

    if (score - ((level - 1) * 30) === 0) {
        playedBefore1 = false;
        playedBefore2 = false;
        fishPlayer.height = 60;
        fishPlayer.width = 100;
    }
    else if (score - ((level - 1) * 30) === 10) {

        fishPlayer.height = 60 * 1.3;
        fishPlayer.width = 100 * 1.3;
        sizeSound1();
    }
    else if (score - ((level - 1) * 30) === 20) {

        fishPlayer.height = 60 * 1.5;
        fishPlayer.width = 100 * 1.5;

        sizeSound2();
    }
    else if (score - ((level - 1) * 30) === 30) {
        adjustCurrentPlayerTime();
        level++;
        updateLocalStorage();
        backgroundWebm.src = "videos/background-" + level + ".webm";
        backgroundVideo.load();

        for (let i = 0; i < fishEnemiesList.length; i++)
              container.removeChild(fishEnemiesList[i].element);
        fishEnemiesList = [];
        randomMotionTimer=[];
        randomMotionCompletion=[];
        randomMotionTimerY=[];
        randomMotionCompletionY=[];
        showLevelUpNotificationImage();
        //addNewEnemyFish();
        playLevelUpSound();
    }

};

/**********************************
** this function to add a new type of fishes to the game at every level
**
** Author (@ Mohamed Gomaa)
**
************************************/

let addNewEnemyFish = function () {

    if (level === 2)
        fishImages.push({ src: "blueFish.gif", weight: 1.5 });
    else if (level === 3)
        fishImages.push({ src: "BOOMFish.gif", weight: 1.5 });
};

let showLevelUpNotificationImage = function () {

    let levelSign = document.createElement("img");

    levelSign.src = "./images/Levels/level" + level + ".png";
    levelSign.height = 150;
    levelSign.width = 250;
    levelSign.style.position = "absolute";
    levelSign.style.left = window.innerWidth/2 - 125 + "px";
    levelSign.style.top = window.innerHeight/2 - 75 + "px";

    container.appendChild(levelSign);

    setTimeout(() => container.removeChild(levelSign), 2000);

};

let showBadgeImage = function (badgeType) {

    let badge = document.createElement("img");


if (badgeType==="Time1"){
    badge.src = "./images/Badges/TimeBadge1.png";
    badgrArr[0].src='images/Badges/TimeBadge1.png';
}
else if (badgeType==="Time2") {
  badge.src = "./images/Badges/TimeBadge2.png";
  badgrArr[1].src='images/Badges/TimeBadge2.png';
}
else if (badgeType==="Time3") {
  badge.src = "./images/Badges/TimeBadge3.png";
  badgrArr[2].src='images/Badges/TimeBadge3.png';
}
else if(badgeType==="scoreBadge"){
  badge.src = "./images/Badges/HighScore.png";
  badgrArr[3].src='images/Badges/HighScore.png';
}
else if(badgeType==="livesBadge"){
  badge.src = "./images/Badges/Champion.png";
  badgrArr[4].src='images/Badges/Champion.png';
}


    badge.height = 200;
    badge.width = 180;
    badge.style.position = "absolute";
    badge.style.left = window.innerWidth/4 - 90 + "px";
    badge.style.top = window.innerHeight/4 - 100 + "px";
    badge.style.border="medium solid black"


    container.appendChild(badge);
    setTimeout(() => container.removeChild(badge), 4000);

};




let adjustCurrentPlayerTime=function(){

switch (level) {
  case 1:
     {
       currentPlayerLevel1Time=globalTimeInSeconds;
     }
    break;
  case 2:
     {
       currentPlayerLevel2Time=globalTimeInSeconds-currentPlayerLevel1Time;
     }
     break;
  case 3:
     {
       currentPlayerLevel3Time=globalTimeInSeconds-currentPlayerLevel2Time;
     }
    break;
}
checkForTimeBadges();
}




let checkForTimeBadges=function(){
 let deserveTime1Badge=false;
 let deserveTime2Badge=false;
 let deserveTime3Badge=false;

switch (level) {
  case 1:
     if (currentPlayerLevel1Time<localStorage.getObj(playerNa.value).level1time)
         deserveTime1Badge=true;
  break;

    case 2:
    if (currentPlayerLevel2Time<localStorage.getObj(playerNa.value).level2time)
        deserveTime2Badge=true;
      break;

    case 3:
    if (currentPlayerLevel3Time<localStorage.getObj(playerNa.value).level3time)
        deserveTime3Badge=true;
      break;
}
if (deserveTime1Badge)
   showBadgeImage("Time1");

if (deserveTime2Badge)
    showBadgeImage("Time2");

if (deserveTime3Badge)
  showBadgeImage("Time3");
}



let checkForFinalBadges=function(){


//let deserveHighScoreBadge=true;
//let deserveHighFinishLives=false;

// Getting all players high scores
let highScores=[];
for(let key in localStorage){
  if (localStorage.hasOwnProperty(key))
      highScores.push(localStorage.getObj(key).scoreing);
}

// Getting all players finsish case number of numberOfLives
let playersFinishNumberOfLives=[];
for(let key2 in localStorage){
  if (localStorage.hasOwnProperty(key2))
      playersFinishNumberOfLives.push(localStorage.getObj(key2).numberOfLives);
}


function checkScore(playersScores) {
  console.log("Checking score");
  return playersScores < score;
}

function checkLives(playersLives) {
  return playersLives < lives;
}


if(lives===0 && highScores.every(checkScore))  // Gmae over case check only for score
{
  showBadgeImage("scoreBadge");
}


if(gameCompleteFlag &&  playersFinishNumberOfLives.every(checkLives))
{
  showBadgeImage("livesBadge");
}






}
