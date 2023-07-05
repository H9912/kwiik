//Kwiik's settings
Game.openSettings = function () {
};
// reset kiwi function
Game.resetSave = function () {
    Game.lds.clear();
    Game.saveMade = false;
    Game.kiwis = 0;
    Game.kiwiMakeCount = 1;
    Game.rootCount = 1;
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
};