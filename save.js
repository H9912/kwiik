//Kwiik's save system

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
    Game.lds.set("gambleCheckIfUnlocked", Game.gambleCheckIfUnlocked);
    Game.lds.set("quitDate", Game.quitDate);
    Game.lds.set("goldenKiwiCounter", Game.goldenKiwiCounter);
};