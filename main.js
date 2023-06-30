// kwiik
// by walitam & h912 - do anything you want, just credit us please
/* versions:
done 0.1 : technical test
done 0.2 : buildings alpha (ex : press) 
done 0.3 : auto-kiwi generator (extractors), gamble system, golden kiwi, extractors, loading screen
upcoming 0.4 : achievements, press types, new ui, new background, json saving system, js number formatting
*/

//Test

//jquery I'm sorry my fellow webdevs

$body = $("body");

let Game = {};

// define variables
const formatter = Intl.NumberFormat("en", {
  notation: "compact",
  maximumSignificantDigits: 3,
});

Game.saveMade = false;
Game.kiwis = 0;
Game.defaultKiwiMakeCount = 1;
Game.kiwiMakeCount = 1;
Game.pressCount = 0;
Game.pressPrice = 10;
Game.extractorCount = 0;
Game.extractorMakeCount = 5;
Game.extractorPrice = 15000;
Game.lds = localDataStorage("kwiikStorage");
Game.kiwiCounterText = document.getElementById("kiwiCounterText");
Game.pressCounterText = document.getElementById("pressCounterText");
Game.extractorCounterText = document.getElementById("extractorCounterText");
Game.makeKiwiButton = document.getElementById("makeKiwiButton");
Game.kiwiPressButton = document.getElementById("kiwiPressButton");
Game.gamblePrice = 100000;
Game.startDate = 0;
Game.quitDate = 0;
Game.goldenKiwiCounter = 0;
Game.i = 1;

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
  if (Game.kiwis == undefined || isNaN(Game.kiwis)) {
    Game.kiwis = 0;
  }

  Game.kiwiMakeCount = Game.lds.get("kiwiMakeCount");
  if (Game.kiwiMakeCount == undefined || isNaN(Game.kiwiMakeCount)) {
    Game.kiwiMakeCount = 1;
  }

  Game.pressCount = Game.lds.get("pressCount");
  if (Game.pressCount == undefined || isNaN(Game.pressCount)) {
    Game.pressCount = 0;
  }

  Game.pressPrice = Game.lds.get("pressPrice");
  if (Game.pressPrice == undefined || isNaN(Game.pressPrice)) {
    Game.pressPrice = 10;
  }

  Game.extractorCount = Game.lds.get("extractorCount");
  if (Game.extractorCount == undefined || isNaN(Game.extractorCount)) {
    Game.extractorCount = 0;
  }

  Game.extractorMakeCount = Game.lds.get("extractorMakeCount");
  if (Game.extractorMakeCount == undefined || isNaN(Game.extractorMakeCount)) {
    Game.extractorMakeCount = 5;
  }

  Game.extractorPrice = Game.lds.get("extractorPrice");
  if (Game.extractorPrice == undefined || isNaN(Game.extractorPrice)) {
    Game.extractorPrice = 15000;
  }

  Game.gambleAvailable = Game.lds.get("gambleAvailable");
  if (Game.gambleAvailable == undefined || isNaN(Game.gambleAvailable)) {
    Game.gambleAvailable = 15000;
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
  if (Game.gambleAvailable === false) {
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
  if (Game.gambleAvailable === false) {
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

Game.updatePressBuyButton = function () {
    document.getElementById(
        "kiwiPressButton"
      ).innerHTML = `buy press (${Game.pressPrice})`;
}

// runs when you buy a press
Game.buyPress = function () {
  if (Game.kiwis - Game.pressPrice >= 0) {
    Game.kiwis -= Game.pressPrice;
    Game.pressCount += 1;
    console.log("press bought");
    console.log(Game.pressCount + "press");
    Game.updateKiwiCounter();
    Game.updatePressCounter();
    // random number to decide the press type
    Game.Rdn = Math.floor(Math.random() * 4);
    Game.pressRun();
    // calculate new pressPrice and flatten it
    Game.pressPrice = Math.floor(Game.pressPrice * 1.9);
    document.getElementById(
      "kiwiPressButton"
    ).innerHTML = `buy press (${Game.pressPrice})`;
  } else {
    let missingKiwis = Game.pressPrice - Game.kiwis;
    alert(`You don't have enough kiwis (missing ${missingKiwis} kiwis)`);
  }
};
Game.Rdn = Math.round(Math.random * 3);

Game.pressRun = function () {
  if (Game.pressCount > 0) {
    if (Game.Rdn === 0) {
      // create the button when buyPress clicked
      let press = document.createElement("button");
      press.innerHTML = "Press" + " " + Game.pressCount;
      press.className = "PressStyleNormie";
      press.id = "press" + Game.pressCount;
      press.name = "press" + Game.pressCount;
      // add press to html doc
      document.getElementById("pressDiv").appendChild(press);
      Game.kiwiMakeCount = Game.defaultKiwiMakeCount + Game.pressCount;
      document.getElementById(
        "makeKiwiButton"
      ).innerHTML = `make kiwi (${Game.kiwiMakeCount})`;
    }
    if (Game.Rdn === 1) {
      // create the button when buyPress clicked
      let press = document.createElement("button");
      press.innerHTML = "Press" + " " + Game.pressCount;
      press.className = "PressStyleGnarly";
      press.id = "press" + Game.pressCount;
      press.name = "press" + Game.pressCount;
      // add press to html doc
      document.getElementById("pressDiv").appendChild(press);
      Game.kiwiMakeCount = Game.defaultKiwiMakeCount + Game.pressCount;
      document.getElementById(
        "makeKiwiButton"
      ).innerHTML = `make kiwi (${Game.kiwiMakeCount})`;
    }
    if (Game.Rdn === 2) {
      // create the button when buyPress clicked
      let press = document.createElement("button");
      press.innerHTML = "Press" + " " + Game.pressCount;
      press.className = "PressStyleBeastly";
      press.id = "press" + Game.pressCount;
      press.name = "press" + Game.pressCount;
      // add press to html doc
      document.getElementById("pressDiv").appendChild(press);
      Game.kiwiMakeCount = Game.defaultKiwiMakeCount + Game.pressCount;
      document.getElementById(
        "makeKiwiButton"
      ).innerHTML = `make kiwi (${Game.kiwiMakeCount})`;
    }
    if (Game.Rdn === 3) {
      // create the button when buyPress clicked
      let press = document.createElement("button");
      press.innerHTML = "Press" + " " + Game.pressCount;
      press.className = "PressStyleLazy";
      press.id = "press" + Game.pressCount;
      press.name = "press" + Game.pressCount;
      // add press to html doc
      document.getElementById("pressDiv").appendChild(press);
      Game.kiwiMakeCount = Game.defaultKiwiMakeCount + Game.pressCount;
      document.getElementById(
        "makeKiwiButton"
      ).innerHTML = `make kiwi (${Game.kiwiMakeCount})`;
    }
  }
};

Game.buyExtractor = function () {
  if (Game.kiwis - Game.extractorPrice >= 0) {
    Game.kiwis -= Game.extractorPrice;
    Game.extractorCount += 1;
    console.log("extractor bought");
    console.log(Game.extractorCount + "extractor");
    Game.updateKiwiCounter();
    Game.updateExtractorCounter();
  } else {
    let missingKiwis = Game.extractorPrice - Game.kiwis;
    alert(`You don't have enough kiwis (missing ${missingKiwis} kiwis)`);
  }
};

Game.buyGambleMachine = function () {
  if (Game.kiwis - Game.gamblePrice >= 0) {
    Game.kiwis -= Game.gamblePrice;
    console.log("gamble machine bought");
    Game.updateKiwiCounter();
    Game.gambleAvailable = true;
    document.getElementById("buyGambleButton").style.display = "none";
    document.getElementById("gambleKiwiButton").style.display = "grid";
  } else {
    let missingKiwis = Game.gamblePrice - Game.kiwis;
    alert(`You don't have enough kiwis (missing ${missingKiwis} kiwis)`);
  }
};

Game.gambleKiwis = function () {
  document.getElementById("gamblewaiting").style.animation = "fadeIn 1.5s";
  document.getElementById("gamblewaiting").style.display = "flex";
  Game.waitingGamble();
  let proba = Math.random();
  if (proba > 0.5) {
    setTimeout(() => {
      let multi = Math.floor(Game.kiwis * 2);
      Game.kiwis = multi;
      Game.updateKiwiCounter();
      console.log(multi);
      alert(`JACKPOT! You have now ${Game.kiwis} kiwis !`);
    }, 2000);
  } else {
    setTimeout(() => {
      Game.kiwis = Math.floor(Game.kiwis / 2);
      Game.updateKiwiCounter();
      alert(`YOU LOOSER! You have now ${Game.kiwis} kiwis !`);
    }, 2000);
  }
};

Game.waitingGamble = function () {
  setTimeout(() => {
    document.getElementById("gamblewaiting").style.animation = "fadeOut 1.5s";
    setTimeout(() => {
      document.getElementById("gamblewaiting").style.display = "none";
    }, 2200);
  }, 2000);
};

Game.goldenTrigger = function () {
  if (Game.pressCount > 1) {
    let rand = Math.floor(Math.random() * 50);
    function goldenLoop() {
      setTimeout(function () {
        console.log("Golden kiwi summoned");
        Game.i = 3;
        Game.goldenKiwi();
        if (Game.i < 2) {
          goldenLoop();
        }
      }, rand * 25000);
    }
    goldenLoop();
  }
};

let goldenbtn = document.createElement("button");
goldenbtn.name = "GOLDEN";
goldenbtn.id = "goldenKiwi";

Game.goldenKiwi = function () {
  //create the button, assign to the html document, set his properties
  goldenbtn.innerHTML =
    "<img src='https://cdn.discordapp.com/attachments/468526089153544212/1030787434264416306/unknown.png' alt='goldenKiwi' class='golden'/>";
  document.body.appendChild(goldenbtn);
  //choosing a random place to pop
  let rand = Math.floor(Math.random() * 10);
  goldenbtn.style.position = "absolute";
  goldenbtn.style.top = Math.floor(rand * 70) + "px";
  goldenbtn.style.left = Math.floor(rand * 70) + "px";
  //onclick event
  const golden = document.getElementById("goldenKiwi");
  golden.addEventListener("click", goldenonclick);
  function goldenonclick() {
    let addkiwi = Math.floor(Game.kiwis + 500);
    Game.kiwis += addkiwi;
    Game.updateKiwiCounter();
    Game.goldenKiwiCounter += 1;
    goldenbtn.remove();
    Game.i = 1;
    Game.goldenTrigger();
  }
};

Game.openWiki = function () {
  document.getElementById("overlayWiki").style.display = "flex";
  document.getElementById("overlayWiki").style.animation = "fadeIn 0.5s";
};

Game.closeWiki = function () {
  document.getElementById("overlayWiki").style.animation = "fadeOut 0.5s";
  setTimeout(function () {
    document.getElementById("overlayWiki").style.display = "none";
  }, 500);
};

Game.openSettings = function () {
  document.getElementById("overlaySettings").style.display = "flex";
  document.getElementById("overlaySettings").style.animation = "fadeIn 0.5s";
};
Game.closeSettings = function () {
  document.getElementById("overlaySettings").style.animation = "fadeOut 0.5s";
  setTimeout(function () {
    document.getElementById("overlaySettings").style.display = "none";
  }, 500);
};

// reset kiwi function
Game.resetSave = function () {
  Game.lds.clear();
  Game.saveMade = false;
  Game.kiwis = 0;
  Game.pressCount = 0;
  Game.pressPrice = 10;
  Game.kiwiMakeCount = 1;
  Game.extractorPrice = 15000;
  Game.extractorCount = 0;
  Game.extractorMakeCount = 5;
  Game.goldenKiwiCounter = 0;
  Game.updateKiwiCounter();
  Game.pressCounterText.innerHTML = `${Game.pressCount} press`;
  Game.updateExtractorCounter();
  Game.updateMakeKiwiButton();
  Game.gambleAvailable = false;
  document.getElementById("buyGambleButton").style.display = "grid";
  document.getElementById("gambleKiwiButton").style.display = "none";
  Game.kiwiPressButton.innerHTML = `buy press (${Game.pressPrice})`;
  $(".PressStyle").remove();
};

//check every second (will probably begin to be extremely laggy in the future sorry)
setInterval(function () {
  //update kiwis every sec
  Game.updateKiwiCounter();
  // click upgrades unlock check
  if (Game.kiwis > Game.gamblePrice - 1) {
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
  //pedia text
  if (Game.pressCount > 0) {
    document.getElementById("the-press").style.display = "inline block";
    document.getElementById("the-golden-kiwi").style.display = "inline block";
  }
  if (Game.extractorCount > 0) {
    document.getElementById("the-extractor").style.display = "inline block";
  }
  if (Game.gambleAvailable === true) {
    document.getElementById("the-gamble").style.display = "inline block";
  }
}, 1000);

// before quitting
window.onbeforeunload = () => {
  Game.saveMade = true;
  let d = Date.now();
  Game.quitDate = Game.reductDateToSeconds(d);
  console.log(Game.quitDate);
  Game.lds.set("saveMade", Game.saveMade);
  Game.lds.set("kiwis", Game.kiwis);
  Game.lds.set("kiwiMakeCount", Game.kiwiMakeCount);
  Game.lds.set("pressCount", Game.pressCount);
  Game.lds.set("pressPrice", Game.pressPrice);
  Game.lds.set("extractorCount", Game.extractorCount);
  Game.lds.set("extractorMakeCount", Game.extractorMakeCount);
  Game.lds.set("extractorPrice", Game.extractorPrice);
  Game.lds.set("gambleAvailable", Game.gambleAvailable);
  Game.lds.set("quitDate", Game.quitDate);
  Game.lds.set("goldenKiwiCounter", Game.goldenKiwiCounter);
};
