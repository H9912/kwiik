//Everything about extractors

Game.extractorCount = 0;
Game.extractorMakeCount = 5;
Game.extractorPrice = 15000;
Game.extractorCounterText = document.getElementById("extractorCounterText");

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

setInterval(function () {
if (Game.extractorCount > 0) {
    Game.kiwis = Game.kiwis + Game.extractorMakeCount * Game.extractorCount;
    Game.kiwiCounterText.innerHTML = `${formatter.format(Game.kiwis)} kiwis`;
  }
}, 1000);