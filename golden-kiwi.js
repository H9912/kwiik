//Everything about golden kiwi
Game.goldenKiwiCounter = 0;

Game.getRandomInt(min, max) = function() {
    min = Math.ceil(min);
    max = Math.floor(max);
    Math.random() * (max - min) + min;
}

Game.goldenTrigger = function () {
    if (Game.pressCount > 1) {
        setTimeout(function () {
            Game.createGoldenKiwi();
            console.log('golden kiwi summoned');
        }, Game.getRandomInt(1, 5) * 25000); 
    }
}, 

Game.createGoldenKiwi = function () {
    //create the button, assign to the html document, set his properties
    goldenbtn.innerHTML =
        "<img src='https://cdn.discordapp.com/attachments/468526089153544212/1030787434264416306/unknown.png' class='goldenkiwi'/>";
    document.body.appendChild(golden);
    let goldenbtn = document.createElement("button");
    goldenbtn.name = "GOLDEN";
    goldenbtn.id = "goldenKiwi";

    const golden = document.getElementById("goldenKiwi");
    golden.addEventListener("click", goldenOnClick, false);
    //choosing a random place to pop
    let rand = Math.floor(Math.random() * 10);
    goldenbtn.style.position = "absolute";
    goldenbtn.style.top = Math.floor(rand * 80) + "px";
    goldenbtn.style.left = Math.floor(rand * 80) + "px";
};

Game.goldenOnClick = function () {
    let addkiwi = Math.floor(Game.kiwis + 500);
    Game.kiwis += addkiwi;
    Game.updateKiwiCounter();
    Game.goldenKiwiCounter += 1;
    goldenbtn.remove();
    Game.i = 1;
    Game.goldenTrigger();
}