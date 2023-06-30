//Everything about presses


Game.pressCount = 0;
Game.pressPrice = 10;
Game.pressCounterText = document.getElementById("pressCounterText");
Game.kiwiPressButton = document.getElementById("kiwiPressButton");

Game.updatePressBuyButton = function () {
    document.getElementById("kiwiPressButton").innerHTML = `buy press (${Game.pressPrice})`;
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

Game.pressRun = function () {
    if (Game.pressCount > 0) {
        let press = document.createElement("button");
        press.innerHTML = "Press" + " " + Game.pressCount;
        press.className = "PressStyleNormie";
        press.id = "press" + Game.pressCount;
        press.name = "press" + Game.pressCount;
        // add press to html doc
        document.getElementById("pressDiv").appendChild(press);
        Game.kiwiMakeCount = Game.defaultKiwiMakeCount + Game.pressCount;
        document.getElementById("makeKiwiButton").innerHTML = `make kiwi (${Game.kiwiMakeCount})`;
    }
};
