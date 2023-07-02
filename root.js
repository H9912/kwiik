//Everything about presses
Game.rootCount = 0;
Game.rootPrice = 10;
Game.rootCounterText = document.getElementById("rootCounterText");
Game.buyRootButton = document.getElementById("buyRootButton");

Game.updateRootBuyButton = function () {
    document.getElementById("buyRootButton").innerHTML = `buy root (${Game.rootPrice})`;
}

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
        Game.rootPrice = Math.floor(Game.rootPrice * 1.9);
        document.getElementById("buyRootButton").innerHTML = `buy root (${Game.rootPrice})`;
    } else {
        let missingKiwis = Game.rootPrice - Game.kiwis;
        alert(`You don't have enough kiwis (missing ${missingKiwis} kiwis)`);
    }
};

Game.rootRun = function () {
    if (Game.rootCount > 0) {
        Game.kiwiMakeCount = Game.defaultKiwiMakeCount + Game.rootCount;
        document.getElementById("makeKiwiButton").innerHTML = `make kiwi (${Game.kiwiMakeCount})`;
    }
};
