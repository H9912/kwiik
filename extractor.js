//Everything about extractors
Game.extractorCounterText = document.getElementById("extractorCounterText");
Game.extractorCount = 0;
Game.extractorMakeCount = 5;
Game.extractorPrice = 15000;

Game.updateExtractorBuyButton = function () {
    document.getElementById("buyExtractorButton").innerHTML = `<img id=Icons src="iconsSVG/extractor.svg"> buy extractor (${formatter.format(Game.extractorPrice)})`;
}
Game.updateExtractorCounter = function () {
    Game.extractorCounterText.innerHTML = `${formatter.format(Game.extractorCount)} extractors`;
};
Game.buyExtractor = function () {
    if (Game.kiwis - Game.extractorPrice >= 0) {
        // remove and update kiwis
        Game.kiwis -= Game.extractorPrice;
        Game.updateKiwiCounter();
        // update extractor count
        Game.extractorCount += 1;
        Game.updateExtractorCounter();
        // some console msgs cause why not
        console.log("extractor bought");
        console.log(Game.extractorCount + "extractor");
        // calculate new extractorPrice and flat it
        Game.extractorPrice = Math.floor(Game.extractorPrice * 1.8);
        Game.updateExtractorBuyButton();
    } else {
        // let the player know how many kiwis left
        let missingKiwis = Game.extractorPrice - Game.kiwis;
        alert(`You don't have enough kiwis (missing ${formatter.format(missingKiwis)} kiwis)`);
    }
};

setInterval(function () {
if (Game.extractorCount > 0) {
    Game.kiwis = Game.kiwis + Game.extractorMakeCount * Game.extractorCount;
    Game.kiwiCounterText.innerHTML = `${formatter.format(Game.kiwis)} kiwis`;
  }
}, 1000);