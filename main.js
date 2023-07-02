// kwiik
// by walitam & h912 - do anything you want, just credit us please

/* versions:
done 0.1 : technical test
done 0.2 : buildings alpha (ex : press) 
done 0.3 : auto-kiwi generator (extractors), gamble system, golden kiwi, extractors, loading screen
upcoming 0.4 : achievements, press types, new ui, new background, json saving system, js number formatting
*/
//jquery I'm sorry my fellow webdevs


$body = $("body");

const Game= {};

// define variables
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

// utility funcs
Game.updateMakeKiwiButton = function () {
  Game.makeKiwiButton.innerHTML = `make kiwi (${Game.kiwiMakeCount})`;
};
Game.updateKiwiCounter = function () {
  Game.kiwiCounterText.innerHTML = `${formatter.format(Game.kiwis)} kiwis`;
};
Game.updatePressCounter = function () {
  Game.pressCounterText.innerHTML = `${Game.pressCount} presses`;
};
Game.updateExtractorCounter = function () {
  Game.extractorCounterText.innerHTML = `${Game.extractorCount} extractors`;
};
Game.reductDateToSeconds = function (d) {
  let td = d;
  d = Math.floor(td / 1000);
  return d;
};

// start logic
window.onload = () => {
  $(".loader").fadeOut("slow");

  Game.saveMade = Game.lds.get("saveMade");

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

  Game.gambleCheckIfUnlocked = Game.lds.get("gambleCheckIfUnlocked");
  if (Game.gambleCheckIfUnlocked === undefined || isNaN(Game.gambleCheckIfUnlocked)) {
    Game.gambleCheckIfUnlocked = false;
  }

  Game.goldenKiwiCounter = Game.lds.get("goldenKiwiCounter");

  Game.startDate = Date.now();
  Game.startDate = Game.reductDateToSeconds(Game.startDate);
  Game.quitDate = Game.lds.get("quitDate");

  console.log(Game.startDate);
  console.log(Game.quitDate);

  let offlineTime = Game.startDate - Game.quitDate;
  if (Game.extractorCount >= 1) {
    let toGive = Math.floor(
      Game.extractorMakeCount * offlineTime * Game.extractorCount
    );
    console.log(toGive);
    Game.kiwis = Game.kiwis + toGive;
    Game.updateKiwiCounter();
  }

  Game.updateMakeKiwiButton();  
  Game.updateKiwiCounter();
  Game.updatePressCounter();
  Game.updateExtractorCounter();
  Game.goldenTrigger();

  if (Game.saveMade === false) {
    Game.updateKiwiCounter();
    Game.updatePressCounter();
  }
  if (Game.gambleCheckIfUnlocked === false) {
    document.getElementById("gambleKiwiButton").style.display = "none";
  } else {
    document.getElementById("buyGambleButton").style.display = "none";
    document.getElementById("gambleKiwiButton").style.display = "flex";
  }
  //wiki text
  if (Game.pressCount === 0) {
    document.getElementById("the-press").style.display = "none";
    document.getElementById("the-golden-kiwi").style.display = "none";
  }
  if (Game.extractorCount === 0) {
    document.getElementById("the-extractor").style.display = "none";
  }
  if (Game.gambleCheckIfUnlocked === false) {
    document.getElementById("the-gamble").style.display = "none";
  }

  Game.updatePressBuyButton();

  setInterval(function () {
    Game.title = " kiwis - kwiik";
    document.title = formatter.format(Game.kiwis) + Game.title;
  }, 2000);
};

// click kiwi function
Game.makeKiwi = function () {
  formatter.format((Game.kiwis += Game.kiwiMakeCount));
  Game.updateKiwiCounter();
};

//check every second (will probably begin to be extremely laggy in the future)
setInterval(function () {
  //update kiwis every sec
  Game.updateKiwiCounter();
  // click upgrades unlock check
  if (Game.kiwis > Game.gambleButtonPrice - 1) {
    document.getElementById("buyGambleButton").style.border =
      "rgb(202, 52, 165) solid 5px";
    document.getElementById("buyGambleButton").style.color = "rgb(161, 26, 89)";
    document.getElementById("buyGambleButton").style.opacity = "100%";
  } else {
    document.getElementById("buyGambleButton").style.border =
      "rgb(80, 80, 80) solid 5px";
    document.getElementById("buyGambleButton").style.color = "rgb(75, 75, 75)";
    document.getElementById("buyGambleButton").style.opacity = "0.5";
  }
  //press
  if (Game.kiwis > Game.pressPrice - 1) {
    document.getElementById("kiwiPressButton").style.border =
      "rgb(0, 138, 185) solid 5px";
    document.getElementById("kiwiPressButton").style.color = "rgb(43, 150, 87)";
    document.getElementById("kiwiPressButton").style.opacity = "100%";
  } else {
    document.getElementById("kiwiPressButton").style.border =
      "rgb(80, 80, 80) solid 5px";
    document.getElementById("kiwiPressButton").style.color = "rgb(75, 75, 75)";
    document.getElementById("kiwiPressButton").style.opacity = "0.5";
  }
  //extractor
  if (Game.kiwis > Game.extractorPrice - 1) {
    document.getElementById("buyExtractorButton").style.border =
      "rgb(102, 0, 255) solid 5px";
    document.getElementById("buyExtractorButton").style.color =
      "rgb(153, 51, 255)";
    document.getElementById("buyExtractorButton").style.opacity = "100%";
  } else {
    document.getElementById("buyExtractorButton").style.border =
      "rgb(80, 80, 80) solid 5px";
    document.getElementById("buyExtractorButton").style.color =
      "rgb(75, 75, 75)";
    document.getElementById("buyExtractorButton").style.opacity = "0.5";
  }
  if (Game.extractorCount > 0) {
    Game.kiwis = Game.kiwis + Game.extractorMakeCount * Game.extractorCount;
    Game.kiwiCounterText.innerHTML = `${formatter.format(Game.kiwis)} kiwis`;
  }
}, 1000);

