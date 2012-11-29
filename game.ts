/// <reference path="enchant.d.ts"/>
/// <reference path="exte.enchant.d.ts"/>
/// <reference path="manager.ts"/>
/// <reference path="play.ts"/>

//enchant();

module ExteGame {
    window.onload = function () {
        var gameData = new GameData();

        var game = new enchant.Game(320, 320);
        game.fps = 15;
        game.preload(gameData.getAssetList());
        game.onload = function () {
            exte.keyBind(" ", "a");
            exte.keyBind("a", "a");
            exte.keyBind("x", "a");
            exte.keyBind("b", "b");
            exte.keyBind("z", "b");

            var titleoutScene = (function () {
                var scene = new exte.SceneEx("TitleOut", 0);

                var sprite = new enchant.Sprite(320, 320);
                sprite.image = game.assets["start.png"];
                sprite.x = 0;
                sprite.y = 0;
                scene.addChild(sprite);

                var firstStep = true;

                scene.moveSceneTo("1");
                scene.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
                    if (firstStep) {
                        firstStep = false;
                        exte.playSound(gameData.soundStart);
                    }
                });
                return scene;
            })();

            CreatePlayScene(gameData);

            game.pushScene(titleoutScene);
        };
        //game.debug();
        game.start();
    }
}
