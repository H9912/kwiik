// kwiik
// by walitam, h912 and Liberty - do anything you want, just credit us please

/* versions:
done 0.1 : technical test
done 0.2 : buildings alpha (ex : press) 
done 0.3 : auto-kiwi generator (extractors), gamble system, golden kiwi, extractors, loading screen
upcoming 0.4 : achievements, press types, new ui, new background, json saving system, js number formatting
*/
//jquery I'm sorry my fellow webdevs


$body = $("body");

const Game= {};

const formatter = Intl.NumberFormat("en", {
  notation: "compact",
  maximumSignificantDigits: 3,
});

Game.saveMade = false;
Game.kiwis = 0;
Game.defaultKiwiMakeCount = 1;
Game.kiwiMakeCount = 1;
Game.lds = localDataStorage("kwiikStorage");
Game.kiwiCounterText = document.getElementById("kiwiCounterText");
Game.makeKiwiButton = document.getElementById("makeKiwiButton");
Game.startDate = 0;
Game.quitDate = 0;

Game.reductDateToSeconds = function (d) {
  let td = d;
  d = Math.floor(td / 100);
  return d;
};

// start logic
window.onload = () => {
  // Loading screen
  $(".loader").fadeOut("slow");
  // Load Save
  Game.saveMade = Game.lds.get("saveMade");
  // Replace undefined by 0
  Game.kiwis = Game.lds.get("kiwis");
  if (Game.kiwis === undefined || isNaN(Game.kiwis)) {
    Game.kiwis = 0;
  }
  Game.kiwiMakeCount = Game.lds.get("kiwiMakeCount");
  if (Game.kiwiMakeCount === undefined || isNaN(Game.kiwiMakeCount)) {
    Game.kiwiMakeCount = 1;
  }
  Game.pressCount = Game.lds.get("pressCount");
  if (Game.pressCount === undefined || isNaN(Game.pressCount)) {
    Game.pressCount = 0;
  }
  Game.pressPrice = Game.lds.get("pressPrice");
  if (Game.pressPrice === undefined || isNaN(Game.pressPrice)) {
    Game.pressPrice = 10;
  }
  Game.rootCount = Game.lds.get("rootCount");
  if (Game.rootCount === undefined || isNaN(Game.rootCount)) {
    Game.rootCount = 1;
  }
  Game.rootPrice = Game.lds.get("rootPrice");
  if (Game.rootPrice === undefined || isNaN(Game.rootPrice)) {
    Game.rootPrice = 10;
  }
  Game.extractorCount = Game.lds.get("extractorCount");
  if (Game.extractorCount === undefined || isNaN(Game.extractorCount)) {
    Game.extractorCount = 0;
  }
  Game.extractorMakeCount = Game.lds.get("extractorMakeCount");
  if (Game.extractorMakeCount === undefined || isNaN(Game.extractorMakeCount)) {
    Game.extractorMakeCount = 5;
  }
  Game.extractorPrice = Game.lds.get("extractorPrice");
  if (Game.extractorPrice === undefined || isNaN(Game.extractorPrice)) {
    Game.extractorPrice = 15000;
  }

  Game.startDate = Date.now();
  Game.startDate = Game.reductDateToSeconds(Game.startDate);
  Game.quitDate = Game.lds.get("quitDate");

  // Offline kiwis
  let offlineTime = Game.startDate - Game.quitDate;
  if (Game.pressCount >= 1) {
    let toGivePress = Math.floor(Game.pressMakeCount * offlineTime * Game.extractorCount);
    console.log(toGivePress);
    Game.kiwis = Game.kiwis + toGivePress;
    Game.updateKiwiCounter();
  }
  if (Game.extractorCount >= 1) {
    let toGiveExtractor = Math.floor(Game.extractorMakeCount * offlineTime * Game.extractorCount);
    console.log(toGiveExtractor);
    Game.kiwis = Game.kiwis + toGiveExtractor;
    Game.updateKiwiCounter();
  }
  if (Game.saveMade === false) {
    Game.updateExtractorCounter();
    Game.updateRootCounter();
    Game.updatePressCounter();
  }
  Game.updateExtractorCounter();
  Game.updateRootCounter();
  Game.updatePressCounter();
  Game.updateRootBuyButton();
  Game.updatePressBuyButton();
  Game.updateExtractorBuyButton();
};



// click kiwi function
Game.makeKiwi = function () {
  
  formatter.format((Game.kiwis += Game.kiwiMakeCount));
  Game.updateKiwiCounter();
};
// update kiwis function
Game.updateKiwiCounter = function () {
  Game.kiwiCounterText.innerHTML = `${formatter.format(Game.kiwis)} kiwis`;
};
//check every second (will probably begin to be extremely laggy in the future)
setInterval(function () {
  //update kiwis every sec
  Game.updateKiwiCounter();
  //root
  if (Game.kiwis > Game.rootPrice - 1) {
    document.getElementById("buyRootButton").style.border ="rgb(0, 138, 185) solid 2px";
    document.getElementById("buyRootButton").style.color = "black";
    document.getElementById("buyRootButton").style.backgroundColor = "beige";
  } else {
    document.getElementById("buyRootButton").style.border ="rgb(80, 80, 80) solid 2px";
    document.getElementById("buyRootButton").style.color = "rgb(75, 75, 75)";
    document.getElementById("buyRootButton").style.backgroundColor = "gray";
  }
  //press
  if (Game.kiwis > Game.pressPrice - 1) {
    document.getElementById("buyPressButton").style.border ="rgb(0, 138, 185) solid 2px";
    document.getElementById("buyPressButton").style.color = "black";
    document.getElementById("buyPressButton").style.backgroundColor = "beige";
  } else {
    document.getElementById("buyPressButton").style.border ="rgb(80, 80, 80) solid 2px";
    document.getElementById("buyPressButton").style.color = "rgb(75, 75, 75)";
    document.getElementById("buyPressButton").style.backgroundColor = "gray";
  }
  //extractor
  if (Game.kiwis > Game.extractorPrice - 1) {
    document.getElementById("buyExtractorButton").style.border ="rgb(102, 0, 255) solid 2px";
    document.getElementById("buyExtractorButton").style.color ="black";
    document.getElementById("buyExtractorButton").style.backgroundColor = "beige";
  } else {
    document.getElementById("buyExtractorButton").style.border ="rgb(80, 80, 80) solid 2px";
    document.getElementById("buyExtractorButton").style.color ="rgb(75, 75, 75)";
    document.getElementById("buyExtractorButton").style.backgroundColor = "gray";
  } 
}, 1000);

// Tab display
setInterval(function () {
  Game.title = " kiwis - kwiik";
  document.title = formatter.format(Game.kiwis) + Game.title;

  //Kiwi per click + Kiwi per second stats
  document.getElementById("kiwiMakeCountText").innerHTML = `${formatter.format(Game.kiwiMakeCount)} kiwis / click`;
  document.getElementById("kiwiAutoMakeCountText").innerHTML = `${formatter.format(Game.extractorMakeCount * Game.extractorCount + Game.pressMakeCount * Game.pressCount)} kiwis / second`;
}, 2000);
