function CreatePlayScene1(gameData) {
    "use strict";

    var game = enchant.Game.instance;

    var scene = new exte.SceneEx('1');

    //------------------------------------------
    var backGroup = new Group();
    backGroup.addChild(new Wallpaper(game.assets[gameData.playAssetName]));
    scene.addChild(backGroup);

    //------------------------------------------
    var sp1, sp2;
    var label2;
    
    function updateCol() {
    	label2.text = 'exte.collision2Sprites=' + exte.collision2Sprites(sp1, sp2);
    }
    
    var mainGroup = new Group();
    (function () {

        // 線
        var line1 = new exte.Figure.Line(10, 10, 60, 60);
        mainGroup.addChild(line1.createSprite(exte.toRGBString(100, 0, 0)));

        var line2 = new exte.Figure.Line(10, 60, 60, 10);
        mainGroup.addChild(line2.createSprite(exte.toRGBString(0, 0, 100)));

        var lLabel = new Label('exte.Figure.Line.isCrossLine=' + line1.isCrossLine(line2).toString());
        lLabel.x = 0;
        lLabel.y = 60;
        mainGroup.addChild(lLabel);

        var xLabel = new Label('Press "left"or"right" key');
        xLabel.x = 150;
        xLabel.y = 25;
        mainGroup.addChild(xLabel);

        var rect1 = new exte.Figure.Rectangle(170, 20, 50, 50);

        sp1 = rect1.createSprite(exte.toRGBString(100, 0, 0, 0.8));
        sp1.rotation = 45;
        mainGroup.addChild(sp1);

        var rect2 = new exte.Figure.Rectangle(240, 25, 20, 50);

        sp2 = rect2.createSprite(exte.toRGBString(0, 0, 100, 0.8));
        sp2.rotation = 0;
        mainGroup.addChild(sp2);

        label2 = new Label();
        label2.x = 150;
        label2.y = 40;
        mainGroup.addChild(label2);

        // 四角形
        var rect = new exte.Figure.Rectangle(10, 100, 100, 50);
        mainGroup.addChild(rect.createSprite(exte.toRGBString(100), false));

        // 四角形内にランダム配置
        for (var i = 0; i < 20; i++) {
            var r = new exte.Figure.Rectangle();
            r.diagonal = 10;
            r.center = rect.getRandomPos();
            mainGroup.addChild(r.createSprite(exte.toRGBString(100), false));
        }

        // 円
        var circle = new exte.Figure.Circle(60, 190, 30);
        mainGroup.addChild(circle.createSprite(exte.toRGBString(100), false));

        // 円内にランダム配置
        for (var i = 0; i < 20; i++) {
            var c = new exte.Figure.Circle();
            c.radius = 5;
            c.center = circle.getRandomPos();
            mainGroup.addChild(c.createSprite(exte.toRGBString(100), false));
        }

        // 楕円
        var ellipse = new exte.Figure.Ellipse(200, 200, 100, 50);
        mainGroup.addChild(ellipse.createSprite(exte.toRGBString(100), false));

        // 円弧
        var arc = new exte.Figure.Arc(160, 130, 50, exte.degToRad(0), exte.degToRad(60));
        mainGroup.addChild(arc.createSprite(exte.toRGBString(100), false));

        var nextLabel = new Label('push"B"→next');
        nextLabel.x = 220;
        nextLabel.y = 240;
        mainGroup.addChild(nextLabel);
    })();
    scene.addChild(mainGroup);

    //------------------------------------------
    var uiGroup = new Group();
    (function () {
        var pad = new Pad();
        pad.x = 0;
        pad.y = 220;
        uiGroup.addChild(pad);

        var margin = 10;

        var buttonASprite = new Sprite(gameData.buttonWidth, gameData.buttonHeight);
        buttonASprite.x = game.width - gameData.buttonWidth * 2 - margin * 2;
        buttonASprite.y = game.height - gameData.buttonHeight - margin;
        buttonASprite.image = game.assets[gameData.buttonAAssetName];
        buttonASprite.buttonMode = "a";
        uiGroup.addChild(buttonASprite);

        var buttonBSprite = new Sprite(gameData.buttonWidth, gameData.buttonHeight);
        buttonBSprite.x = game.width - gameData.buttonWidth - margin;
        buttonBSprite.y = game.height - gameData.buttonHeight - margin;
        buttonBSprite.image = game.assets[gameData.buttonBAssetName];
        buttonBSprite.buttonMode = "b";
        uiGroup.addChild(buttonBSprite);
    })();
    scene.addChild(uiGroup);

    //------------------------------------------

    scene.addEventListener(exte.Event_SceneExStarting, function (e) {
    	updateCol();
    });

    scene.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
        if (scene.fadeProsessing) return;

        // game.end(scoreLabel.score, scoreLabel.score + '点');

        if (game.input.up) {
            ;
        }
        if (game.input.down) {
            ;
        }
        if (game.input.left) {
        	sp2.rotation+=2;
        	updateCol();
        }
        if (game.input.right) {
        	sp2.rotation-=2;
        	updateCol();
        }
        if (game.input.a) {
            ;
        }
        if (game.input.b) {
            scene.moveSceneTo('2');
        }
    });

    return scene;
}

function CreatePlayScene2(gameData) {
    "use strict";

    var game = enchant.Game.instance;

    var scene = new exte.SceneEx('2');

    //------------------------------------------
    var backGroup = new Group();
    backGroup.addChild(new Wallpaper(game.assets[gameData.playAssetName]));
    scene.addChild(backGroup);

    //------------------------------------------
    var aRand = new exte.AverageRandamizer(10);
    var label;
    var rLabel;
    var tLabel;
    var lLabel;
    var kLabel;
    var kLabel2;
    var hadouSprite;

    var mainGroup = new Group();
    (function () {
        var label2 = new Label('toKanji1(push"left")');
        label2.x = 10;
        label2.y = 10;
        mainGroup.addChild(label2);

        kLabel = new Label('');
        kLabel.x = 120;
        kLabel.y = 10;
        mainGroup.addChild(kLabel);

        var label3 = new Label('toKanji2(push"left")');
        label3.x = 10;
        label3.y = 25;
        mainGroup.addChild(label3);

        kLabel2 = new Label('');
        kLabel2.x = 120;
        kLabel2.y = 25;
        mainGroup.addChild(kLabel2);

        // 空白を途中に入れる
        label = new Label('│＼─A' + exte.makeSpace() + 'ハドーケン' + exte.makeSpace() + '!');
        label.x = 10;
        label.y = 60;
        mainGroup.addChild(label);
        
        hadouSprite = gameData.createIconSprite(54);
        hadouSprite.visible = false;
        hadouSprite.x = 120;
        hadouSprite.y = 60;
        hadouSprite.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
        	if (this.visible){
        		this.x += 5;
        		if (exte.isOutOfScreen(this)) {        			
			        this.x = 120;
					this.visible = false;
        		}
        	}
        });
        mainGroup.addChild(hadouSprite);

        var rLabelT = new Label('AverageRandamizer(push"UP")');
        rLabelT.x = 10;
        rLabelT.y = 80;
        mainGroup.addChild(rLabelT);

        rLabel = new Label('');
        rLabel.x = 10;
        rLabel.y = 100;
        mainGroup.addChild(rLabel);

        var str = 'ABCDE';

        var rect = new exte.Figure.Rectangle(10, 120, 50, 20);
        var rp = rect.createSprite(exte.toRGBString(200), true);
        mainGroup.addChild(rp);

        var label13 = new Label(str);
        label13.x = rect.left;
        label13.y = rect.top;
        mainGroup.addChild(label13);

        var label14 = new Label('exte.stringWidth:"' + str + '"=' + exte.stringWidth(rp.image, str));
        label14.x = rect.right;
        label14.y = rect.top;
        mainGroup.addChild(label14);


        tLabel = new Label('timer');
        tLabel.x = 10;
        tLabel.y = 150;
        mainGroup.addChild(tLabel);

        var nextLabel = new Label('push"B"→next');
        nextLabel.x = 220;
        nextLabel.y = 240;
        mainGroup.addChild(nextLabel);
    })();
    scene.addChild(mainGroup);


    //------------------------------------------
    var rsp = new exte.RepeatSoundPlayer(gameData.soundBGM);
    var timer = new exte.Timer();

    var uiGroup = new Group();
    (function () {
        var pad = new Pad();
        pad.x = 0;
        pad.y = 220;
        uiGroup.addChild(pad);

        uiGroup.addChild(rsp);
        uiGroup.addChild(timer);
        

        var margin = 10;

        var buttonASprite = new Sprite(gameData.buttonWidth, gameData.buttonHeight);
        buttonASprite.x = game.width - gameData.buttonWidth * 2 - margin * 2;
        buttonASprite.y = game.height - gameData.buttonHeight - margin;
        buttonASprite.image = game.assets[gameData.buttonAAssetName];
        buttonASprite.buttonMode = "a";
        uiGroup.addChild(buttonASprite);

        var buttonBSprite = new Sprite(gameData.buttonWidth, gameData.buttonHeight);
        buttonBSprite.x = game.width - gameData.buttonWidth - margin;
        buttonBSprite.y = game.height - gameData.buttonHeight - margin;
        buttonBSprite.image = game.assets[gameData.buttonBAssetName];
        buttonBSprite.buttonMode = "b";
        uiGroup.addChild(buttonBSprite);
    })();
    scene.addChild(uiGroup);

    //------------------------------------------

    scene.registInputPattern(0,
        [enchant.Event.DOWN_BUTTON_DOWN,
         enchant.Event.RIGHT_BUTTON_DOWN,
         enchant.Event.DOWN_BUTTON_UP,
         enchant.Event.A_BUTTON_DOWN]);
    scene.registInputPattern(1, [enchant.Event.A_BUTTON_DOWN], 1.0, true);
    scene.registInputPattern(2, [enchant.Event.UP_BUTTON_DOWN]);
    scene.registInputPattern(3, [enchant.Event.LEFT_BUTTON_DOWN]);
    scene.addEventListener(exte.Event_SceneExInput, function (e) {
        switch (e.eventID) {
            case 0:
                hadouSprite.x = 120;
                hadouSprite.visible = true;
                exte.addFadeOutText(mainGroup, hadouSprite, 'SUCCESS');
                break;
            case 1:
                exte.playSound(gameData.soundOK);
                break;
            case 2:
                rLabel.text += aRand.next.toString() + exte.makeSpace();
                break;
            case 3:
                var value = rand(100000);
                kLabel.text = value.toString() + '→' + exte.toKanji1(value);
                kLabel2.text = value.toString() + '→' + exte.toKanji2(value);
                break;
        }
    });

    scene.addEventListener(exte.Event_SceneExStarting, function (e) {
        rsp.play();
        timer.start(1);
    });

    scene.addEventListener(exte.Event_TimerTimeOut, function (e) {
        tLabel.text += '●';
        if (14 < tLabel.text.length) {
            tLabel.text = 'timer';
        }
    });

    scene.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
        if (scene.fadeProsessing) return;

        // game.end(scoreLabel.score, scoreLabel.score + '点');

        if (game.input.up) {
            ;
        }
        if (game.input.down) {
            ;
        }
        if (game.input.left) {
            ;
        }
        if (game.input.right) {
            ;
        }
        if (game.input.a) {
            ;
        }
        if (game.input.b) {
            rsp.stop();
            scene.moveSceneTo('3');
        }
    });

    return scene;
}

function CreatePlayScene3(gameData) {
    "use strict";

    var game = enchant.Game.instance;

    var scene = new exte.SceneEx('3');

    //------------------------------------------
    var backGroup = new Group();
    backGroup.addChild(new Wallpaper(game.assets[gameData.playAssetName]));
    scene.addChild(backGroup);

    //------------------------------------------
    var rlabel;
    var moveSprite;
    var alabel;

    function update_isOutOfScreen() {
        alabel.text = 'exte.isOutOfScreen=' + exte.isOutOfScreen(moveSprite);
    }

    var mainGroup = new Group();
    (function () {
        var suffles = exte.shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

        var label1 = new Label('exte.shuffleArray[' + suffles.join(',') + ']');
        label1.x = 10;
        label1.y = 10;
        mainGroup.addChild(label1);

        var map = new Map(16, 16);
        map.image = game.assets[gameData.mapAssetName];
        map.x = 10;
        map.y = 30;
        exte.setMazeData(map, 7, 7, 322, 520);
        mainGroup.addChild(map);

        var label2 = new Label('exte.setMazeData');
        label2.x = 10;
        label2.y = 150;
        mainGroup.addChild(label2);

        var targetRow = rand(7);
        var targetColumn = rand(7);
        var samepoints = [];
        exte.samePartsForEach(map.collisionData, targetRow, targetColumn, function(row, column){
        	samepoints.push('('+row+','+column+')');
        });

        var label20 = new Label('exte.samePartsForEach(' + targetRow + ','+targetColumn+ ')');
        label20.x = 10;
        label20.y = 170;
        mainGroup.addChild(label20);

        var label21 = new Label(''+samepoints);
        label21.x = 10;
        label21.y = 185;
        mainGroup.addChild(label21);

        rlabel = new Label('exte.randomString' + exte.makeSpace() + 'push"A"');
        rlabel.x = 140;
        rlabel.y = 40;
        mainGroup.addChild(rlabel);

        var label7 = new Label('↓Press arrow key.Try out screen');
        label7.x = 140;
        label7.y = 75;
        mainGroup.addChild(label7);

        moveSprite = gameData.createIconSprite(44);
        moveSprite.x = 140;
        moveSprite.y = 90;
        mainGroup.addChild(moveSprite);

        alabel = new Label('');
        alabel.x = 140;
        alabel.y = 120;
        mainGroup.addChild(alabel);

        var str5 = 'あいうえお';
        var label5 = new Label(str5 + '→' + exte.toKatakanaCase(str5));
        label5.x = 140;
        label5.y = 140;
        mainGroup.addChild(label5);

        var str6 = 'ガギグゲゴ';
        var label6 = new Label(str6 + '→' + exte.toHirakanaCase(str6));
        label6.x = 140;
        label6.y = 155;
        mainGroup.addChild(label6);


        var nextLabel = new Label('push"B"→next');
        nextLabel.x = 220;
        nextLabel.y = 240;
        mainGroup.addChild(nextLabel);
    })();
    scene.addChild(mainGroup);


    //------------------------------------------
    var uiGroup = new Group();
    (function () {
        var pad = new Pad();
        pad.x = 0;
        pad.y = 220;
        uiGroup.addChild(pad);
        

        var margin = 10;

        var buttonASprite = new Sprite(gameData.buttonWidth, gameData.buttonHeight);
        buttonASprite.x = game.width - gameData.buttonWidth * 2 - margin * 2;
        buttonASprite.y = game.height - gameData.buttonHeight - margin;
        buttonASprite.image = game.assets[gameData.buttonAAssetName];
        buttonASprite.buttonMode = "a";
        uiGroup.addChild(buttonASprite);

        var buttonBSprite = new Sprite(gameData.buttonWidth, gameData.buttonHeight);
        buttonBSprite.x = game.width - gameData.buttonWidth - margin;
        buttonBSprite.y = game.height - gameData.buttonHeight - margin;
        buttonBSprite.image = game.assets[gameData.buttonBAssetName];
        buttonBSprite.buttonMode = "b";
        uiGroup.addChild(buttonBSprite);
    })();
    scene.addChild(uiGroup);

    //------------------------------------------

    scene.addEventListener(exte.Event_SceneExStarting, function (e) {
        update_isOutOfScreen();
    });

    scene.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
        if (scene.fadeProsessing) return;

        // game.end(scoreLabel.score, scoreLabel.score + '点');

        if (game.input.up) {
            moveSprite.y-=3;
            update_isOutOfScreen();
        }
        if (game.input.down) {
            moveSprite.y+=3;
            update_isOutOfScreen();
        }
        if (game.input.left) {
            moveSprite.x-=3;
            update_isOutOfScreen();
        }
        if (game.input.right) {
            moveSprite.x+=3;
            update_isOutOfScreen();
        }
        if (game.input.a) {
            rlabel.text = exte.randomString(10);
        }
        if (game.input.b) {
            scene.moveSceneTo('4');
        }
    });

    return scene;
}

function CreatePlayScene4(gameData) {
    "use strict";

    var game = enchant.Game.instance;

    var scene = new exte.SceneEx('4');

    //------------------------------------------
    var backGroup = new Group();
    backGroup.addChild(new Wallpaper(game.assets[gameData.playAssetName]));
    scene.addChild(backGroup);

    //------------------------------------------
    var clabel = [];

    function update_calc() {
        var r = Math.random() * Math.PI;
        clabel[0].text = 'Math.random=' + r.toString();
        clabel[1].text = 'exte.round=' + exte.round(r, 3);
        clabel[2].text = 'exte.ceil=' + exte.ceil(r, 3);
        clabel[3].text = 'exte.floor=' + exte.floor(r, 3);
        clabel[4].text = 'exte.radToDeg=' + exte.radToDeg(r);
    }

    var mainGroup = new Group();
    (function () {
        var label1 = new Label('push"A"');
        label1.x = 10;
        label1.y = 20;
        mainGroup.addChild(label1);

        clabel[0] = new Label('');
        clabel[0].x = 10;
        clabel[0].y = 35;
        mainGroup.addChild(clabel[0]);

        clabel[1] = new Label('');
        clabel[1].x = 10;
        clabel[1].y = 60;
        mainGroup.addChild(clabel[1]);

        clabel[2] = new Label('');
        clabel[2].x = 10;
        clabel[2].y = 75;
        mainGroup.addChild(clabel[2]);

        clabel[3] = new Label('');
        clabel[3].x = 10;
        clabel[3].y = 90;
        mainGroup.addChild(clabel[3]);

        clabel[4] = new Label('');
        clabel[4].x = 100;
        clabel[4].y = 60;
        mainGroup.addChild(clabel[4]);

        var label2 = new Label('exte.paddingLeft');
        label2.x = 10;
        label2.y = 115;
        mainGroup.addChild(label2);

        var label3 = new Label(exte.paddingLeft(999, 5));
        label3.x = 100;
        label3.y = 115;
        mainGroup.addChild(label3);

        var label4 = new Label('exte.paddingRight');
        label4.x = 10;
        label4.y = 130;
        mainGroup.addChild(label4);

        var label5 = new Label(exte.paddingRight(999, 5));
        label5.x = 100;
        label5.y = 130;
        mainGroup.addChild(label5);

        var label6 = new Label('var' + exte.makeSpace() + 'color={r:128, g:0, b:255}');
        label6.x = 10;
        label6.y = 150;
        mainGroup.addChild(label6);

        var color = { r: 128, g: 0, b: 255 };
        var label7 = new Label('exte.formatString("rgb({r}, {g}, {b})", color)→' + exte.formatString('rgb({r}, {g}, {b})', color));
        label7.x = 10;
        label7.y = 165;
        mainGroup.addChild(label7);

        var ary = [1,2,3,4,5,6,7,8,9];

        var label8 = new Label('exte.arrayQueryIf _ [1,2,3,4,5,6,7,8,9] fn(n%3==0)→' + exte.arrayQueryIf(ary, function(elm, index, ar) { return elm %3 == 0}));
        label8.x = 10;
        label8.y = 185;
        mainGroup.addChild(label8);

        exte.arrayEraseIf(ary, function (elm, index, ar) { return elm % 3 == 0 });
        var label8 = new Label('exte.arrayEraseIf _ [1,2,3,4,5,6,7,8,9] fn(n%3==0)→' + ary);
        label8.x = 10;
        label8.y = 200;
        mainGroup.addChild(label8);

        var nextLabel = new Label('push"B"→next');
        nextLabel.x = 220;
        nextLabel.y = 240;
        mainGroup.addChild(nextLabel);
    })();
    scene.addChild(mainGroup);


    //------------------------------------------
    var uiGroup = new Group();
    (function () {
        var pad = new Pad();
        pad.x = 0;
        pad.y = 220;
        uiGroup.addChild(pad);


        var margin = 10;

        var buttonASprite = new Sprite(gameData.buttonWidth, gameData.buttonHeight);
        buttonASprite.x = game.width - gameData.buttonWidth * 2 - margin * 2;
        buttonASprite.y = game.height - gameData.buttonHeight - margin;
        buttonASprite.image = game.assets[gameData.buttonAAssetName];
        buttonASprite.buttonMode = "a";
        uiGroup.addChild(buttonASprite);

        var buttonBSprite = new Sprite(gameData.buttonWidth, gameData.buttonHeight);
        buttonBSprite.x = game.width - gameData.buttonWidth - margin;
        buttonBSprite.y = game.height - gameData.buttonHeight - margin;
        buttonBSprite.image = game.assets[gameData.buttonBAssetName];
        buttonBSprite.buttonMode = "b";
        uiGroup.addChild(buttonBSprite);
    })();
    scene.addChild(uiGroup);

    //------------------------------------------

    scene.addEventListener(exte.Event_SceneExStarting, function (e) {
        update_calc();
    });

    scene.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
        if (scene.fadeProsessing) return;

        // game.end(scoreLabel.score, scoreLabel.score + '点');

        if (game.input.up) {
        }
        if (game.input.down) {
        }
        if (game.input.left) {
        }
        if (game.input.right) {
        }
        if (game.input.a) {
            update_calc();
        }
        if (game.input.b) {
            scene.moveSceneTo('5');
        }
    });

    return scene;
}

function CreatePlayScene5(gameData) {
    "use strict";

    var game = enchant.Game.instance;

    var scene = new exte.SceneEx('5');

    //------------------------------------------
    var backGroup = new Group();
    backGroup.addChild(new Wallpaper(game.assets[gameData.playAssetName]));
    scene.addChild(backGroup);

    //------------------------------------------
    var mainGroup = new Group();
    (function () {
        var label = new Label('exte.findWalkForEach(row5column5cost10) push"a"→update');
        label.x = 0;
        label.y = 10;
        mainGroup.addChild(label);

        var nextLabel = new Label('push"B"→top');
        nextLabel.x = 220;
        nextLabel.y = 240;
        mainGroup.addChild(nextLabel);
    })();
    scene.addChild(mainGroup);

    //------------------------------------------
    var uiGroup = new Group();
    (function () {
        var pad = new Pad();
        pad.x = 0;
        pad.y = 220;
        uiGroup.addChild(pad);


        var margin = 10;

        var buttonASprite = new Sprite(gameData.buttonWidth, gameData.buttonHeight);
        buttonASprite.x = game.width - gameData.buttonWidth * 2 - margin * 2;
        buttonASprite.y = game.height - gameData.buttonHeight - margin;
        buttonASprite.image = game.assets[gameData.buttonAAssetName];
        buttonASprite.buttonMode = "a";
        uiGroup.addChild(buttonASprite);

        var buttonBSprite = new Sprite(gameData.buttonWidth, gameData.buttonHeight);
        buttonBSprite.x = game.width - gameData.buttonWidth - margin;
        buttonBSprite.y = game.height - gameData.buttonHeight - margin;
        buttonBSprite.image = game.assets[gameData.buttonBAssetName];
        buttonBSprite.buttonMode = "b";
        uiGroup.addChild(buttonBSprite);
    })();
    scene.addChild(uiGroup);

    //------------------------------------------

    var rowNum = 10;
    var columnNum = 10;
    var costMap = [];
    var labelMap = [];
    for (var row = 0; row < rowNum; row++) {
        var rows = [];
        var labels = [];
        for (var column = 0; column < columnNum; column++) {
            rows.push(0);

            var label = new Label('0');
            label.x = column * 15 + 10;
            label.y = row * 15 + 40;
            mainGroup.addChild(label);
            labels.push(label);

            if (row == 5 && column == 5) {
                var rs = exte.Figure.createRectangleSprite(15, 15, 'black');
                rs.x = label.x-5;
                rs.y = label.y;
                mainGroup.addChild(rs);
            }
        }
        costMap.push(rows);
        labelMap.push(labels);
    }
    function makeMap() {
        for (var row = 0; row < rowNum; row++) {
            for (var column = 0; column < columnNum; column++) {
                var cost = rand(5) + 1;
                costMap[row][column] = cost;
                labelMap[row][column].text = cost.toString();
                labelMap[row][column].color = 'black';
            }
        }

        exte.findWalkForEach(costMap, 5, 5, 10, function (row, column, rest) {
            labelMap[row][column].color = 'red';
        });
    }

    scene.addEventListener(exte.Event_SceneExStarting, function (e) {
        makeMap();
    });

    scene.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
        if (scene.fadeProsessing) return;

        // game.end(scoreLabel.score, scoreLabel.score + '点');

        if (game.input.up) {
        }
        if (game.input.down) {
        }
        if (game.input.left) {
        }
        if (game.input.right) {
        }
        if (game.input.a) {
            makeMap();
        }
        if (game.input.b) {
            scene.moveSceneTo('1');
        }
    });

    return scene;
}

function CreatePlayScene(gameData) {
    CreatePlayScene1(gameData);
    CreatePlayScene2(gameData);
    CreatePlayScene3(gameData);
    CreatePlayScene4(gameData);
    CreatePlayScene5(gameData);
}
