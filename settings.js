//Kwiik's settings


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
    Game.kiwiMakeCount = 1;
    Game.rootCount = 0;
    Game.rootPrice = 10;
    Game.pressCount = 0;
    Game.pressMakeCount = 1;
    Game.pressPrice = 500;
    Game.extractorPrice = 15000;
    Game.extractorCount = 0;
    Game.extractorMakeCount = 5;
    Game.goldenKiwiCounter = 0;
    Game.updateKiwiCounter();
    Game.updatePressCounter();
    Game.updateExtractorCounter();
    Game.updateMakeKiwiButton();
    Game.gambleCheckIfUnlocked = false;
    document.getElementById("buyGambleButton").style.display = "grid";
    document.getElementById("gambleKiwiButton").style.display = "none";
};