//Everything about presses
Game.pressCount = 0;
Game.pressPrice = 500;
Game.pressMakeCount = 1;
Game.pressCounterText = document.getElementById("pressCounterText");
Game.buyPressButton = document.getElementById("buyPressButton");

Game.updatePressBuyButton = function () {
    document.getElementById("buyPressButton").innerHTML = `<img id=Icons src="iconsSVG/press.svg"> buy press (${formatter.format(Game.pressPrice)})`;
}

Game.updatePressCounter = function () {
    Game.pressCounterText.innerHTML = `${formatter.format(Game.pressCount)} presses`;
};
// runs when you buy a press
Game.buyPress = function () {
    if (Game.kiwis - Game.pressPrice >= 0) {
        // remove and update kiwis
        Game.kiwis -= Game.pressPrice;
        Game.updateKiwiCounter();
        // update press count
        Game.pressCount += 1;
        Game.updatePressCounter();
        // some console msgs cause why not
        console.log("press bought");
        console.log(Game.pressCount + "press");
        // calculate new pressPrice and flatten it
        Game.pressPrice = Math.floor(Game.pressPrice * 1.8);
        Game.updatePressBuyButton();
    } else {
        // let the player know how many kiwis left
        let missingKiwis = Game.pressPrice - Game.kiwis;
        alert(`You don't have enough kiwis (missing ${formatter.format(missingKiwis)} kiwis)`);
    }
};

setInterval(function () {
    if (Game.pressCount > 0) {
        Game.kiwis = Game.kiwis + Game.pressMakeCount * Game.pressCount;
        Game.kiwiCounterText.innerHTML = `${formatter.format(Game.kiwis)} kiwis`;
      }
    }, 1000);
