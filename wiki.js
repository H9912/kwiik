//Kwiik's wiki


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

//for press, extractor and gamble button : if unlocked then shows in the wiki
setInterval(function () {
    if (Game.pressCount > 0) {
        document.getElementById("the-press").style.display = "inline block";
        document.getElementById("the-golden-kiwi").style.display = "inline block";
    }
    if (Game.extractorCount > 0) {
        document.getElementById("the-extractor").style.display = "inline block";
    }
    if (Game.gambleCheckIfUnlocked === true) {
        document.getElementById("the-gamble").style.display = "inline block";
    }
}, 10000);
