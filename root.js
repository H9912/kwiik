//Everything about presses
Game.rootCount = 1;
Game.rootPrice = 10;
Game.rootCounterText = document.getElementById("rootCounterText");
Game.buyRootButton = document.getElementById("buyRootButton");

Game.updateRootBuyButton = function () {
    document.getElementById("buyRootButton").innerHTML = `<img id=Icons src="iconsSVG/roots.svg"> buy root (${formatter.format(Game.rootPrice)})`;
}
Game.updateRootCounter = function () {
  Game.rootCounterText.innerHTML = `${Game.rootCount} roots`;
};

// runs when you buy a root
Game.buyRoot = function () {
    if (Game.kiwis - Game.rootPrice >= 0) {
        // remove and update kiwis
        Game.kiwis -= Game.rootPrice;
        Game.updateKiwiCounter();
        // update root count
        Game.rootCount += 1;
        Game.updateRootCounter();
        // some console msgs cause why not
        console.log("root bought");
        console.log(Game.rootCount + "root(s)");
        //
        Game.rootRun();
        // calculate new rootPrice and flatten it
        Game.rootPrice = Math.floor(Game.rootPrice * 1.7);
        Game.updateRootBuyButton();
    } else {
        let missingKiwis = Game.rootPrice - Game.kiwis;
        alert(`You don't have enough kiwis (missing ${formatter.format(missingKiwis)} kiwis)`);
    }
};

Game.rootRun = function () {
    if (Game.rootCount > 0) {
        Game.kiwiMakeCount = Game.kiwiMakeCount + 1;
    }
};
