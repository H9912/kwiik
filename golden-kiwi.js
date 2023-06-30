//Everything about golden kiwi
let goldenbtn = document.createElement("button");
goldenbtn.name = "GOLDEN";
goldenbtn.id = "goldenKiwi";

Game.goldenTrigger = function () {
    if (Game.pressCount > 1) {
        let rand = Math.floor(Math.random() * 50);
        function goldenLoop() {
            setTimeout(function () {
                console.log("Golden kiwi summoned");
                Game.i = 3;
                Game.goldenKiwi();
                if (Game.i < 2) {
                    goldenLoop();
                }
            }, rand * 25000);
        }
        goldenLoop();
    }
};

Game.goldenKiwi = function () {
    //create the button, assign to the html document, set his properties
    goldenbtn.innerHTML =
        "<img src='https://cdn.discordapp.com/attachments/468526089153544212/1030787434264416306/unknown.png' alt='goldenKiwi' class='golden'/>";
    document.body.appendChild(goldenbtn);
    //choosing a random place to pop
    let rand = Math.floor(Math.random() * 10);
    goldenbtn.style.position = "absolute";
    goldenbtn.style.top = Math.floor(rand * 70) + "px";
    goldenbtn.style.left = Math.floor(rand * 70) + "px";
    //onclick event
    const golden = document.getElementById("goldenKiwi");
    golden.addEventListener("click", goldenonclick);
    function goldenonclick() {
        let addkiwi = Math.floor(Game.kiwis + 500);
        Game.kiwis += addkiwi;
        Game.updateKiwiCounter();
        Game.goldenKiwiCounter += 1;
        goldenbtn.remove();
        Game.i = 1;
        Game.goldenTrigger();
    }
};