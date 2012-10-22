var ExteGame;
(function (ExteGame) {
    var GameData = (function () {
        function GameData() {
            this.mapAssetName = 'map1.gif';
            this.waitAssetName = 'img/wait.png';
            this.buttonWidth = 60;
            this.buttonHeight = 40;
            this.buttonAAssetName = "img/buttonA.png";
            this.buttonBAssetName = "img/buttonB.png";
            this.soundStart = 'sounds/se6.wav';
            this.soundOK = 'sounds/lock4.wav';
            this.soundBGM = 'sounds/bgm08.wav';
        }
        GameData.prototype.getAssetList = function () {
            return [
                this.mapAssetName, 
                this.buttonAAssetName, 
                this.buttonBAssetName, 
                this.soundStart, 
                this.soundOK, 
                this.soundBGM, 
                this.waitAssetName, 
                
            ];
        };
        return GameData;
    })();
    ExteGame.GameData = GameData;    
})(ExteGame || (ExteGame = {}));

var ExteGame;
(function (ExteGame) {
    function CreatePlayScene1(gameData) {
        var game = enchant.Game.instance;
        var scene = new exte.SceneEx('1');
        var backGroup = new enchant.Group();
        scene.addChild(backGroup);
        var sp1;
        var sp2;

        var label2;
        function updateCol() {
            label2.text = 'exte.collision2Sprites=' + exte.collision2Sprites(sp1, sp2);
        }
        var mainGroup = new enchant.Group();
        (function () {
            var line1 = new exte.Line(10, 10, 60, 60);
            mainGroup.addChild(line1.createSprite(exte.toRGBString(100, 0, 0)));
            var line2 = new exte.Line(10, 60, 60, 10);
            mainGroup.addChild(line2.createSprite(exte.toRGBString(0, 0, 100)));
            var lLabel = new enchant.Label('exte.Line.isCrossLine=' + (line1.isCross(line2) ? 'true' : 'false'));
            lLabel.x = 0;
            lLabel.y = 60;
            mainGroup.addChild(lLabel);
            var xLabel = new enchant.Label('Press "left"or"right" key');
            xLabel.x = 150;
            xLabel.y = 25;
            mainGroup.addChild(xLabel);
            var rect1 = new exte.Rectangle(170, 20, 50, 50);
            sp1 = rect1.createSprite(exte.toRGBString(100, 0, 0, 0.8));
            sp1.rotation = 45;
            mainGroup.addChild(sp1);
            var rect2 = new exte.Rectangle(240, 25, 20, 50);
            sp2 = rect2.createSprite(exte.toRGBString(0, 0, 100, 0.8));
            sp2.rotation = 0;
            mainGroup.addChild(sp2);
            label2 = new enchant.Label('');
            label2.x = 150;
            label2.y = 40;
            mainGroup.addChild(label2);
            var rect = new exte.Rectangle(10, 100, 100, 50);
            mainGroup.addChild(rect.createSprite(exte.toRGBString(100), false));
            for(var i = 0; i < 20; i++) {
                var r = new exte.Rectangle(0, 0, 0, 0);
                r.diagonal = 10;
                r.center = rect.getRandomPos();
                mainGroup.addChild(r.createSprite(exte.toRGBString(100), false));
            }
            var circle = new exte.Circle(60, 190, 30);
            mainGroup.addChild(circle.createSprite(exte.toRGBString(100), false));
            for(var i = 0; i < 20; i++) {
                var c = new exte.Circle(0, 0, 5);
                c.center = circle.getRandomPos();
                mainGroup.addChild(c.createSprite(exte.toRGBString(100), false));
            }
            var ellipse = new exte.Ellipse(200, 200, 100, 50);
            mainGroup.addChild(ellipse.createSprite(exte.toRGBString(100), false));
            var arc = new exte.Arc(160, 130, 50, exte.degToRad(0), exte.degToRad(60));
            mainGroup.addChild(arc.createSprite(exte.toRGBString(100), false));
        })();
        scene.addChild(mainGroup);
        var uiGroup = new enchant.Group();
        (function () {
            var pad = new enchant.ui.Pad();
            pad.x = 0;
            pad.y = 220;
            uiGroup.addChild(pad);
            var margin = 10;
            var buttonASprite = new enchant.Sprite(gameData.buttonWidth, gameData.buttonHeight);
            buttonASprite.x = game.width - gameData.buttonWidth * 2 - margin * 2;
            buttonASprite.y = game.height - gameData.buttonHeight - margin;
            buttonASprite.image = game.assets[gameData.buttonAAssetName];
            buttonASprite.buttonMode = "a";
            uiGroup.addChild(buttonASprite);
            var buttonBSprite = new enchant.Sprite(gameData.buttonWidth, gameData.buttonHeight);
            buttonBSprite.x = game.width - gameData.buttonWidth - margin;
            buttonBSprite.y = game.height - gameData.buttonHeight - margin;
            buttonBSprite.image = game.assets[gameData.buttonBAssetName];
            buttonBSprite.buttonMode = "b";
            uiGroup.addChild(buttonBSprite);
            var nextLabel = new enchant.Label('push"B"→next');
            nextLabel.x = 220;
            nextLabel.y = 240;
            uiGroup.addChild(nextLabel);
        })();
        scene.addChild(uiGroup);
        scene.addEventListener(exte.Event_SceneExStarting, function (e) {
            updateCol();
        });
        scene.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
            if(scene.fadeProsessing) {
                return;
            }
            if(game.input.up) {
                ; ;
            }
            if(game.input.down) {
                ; ;
            }
            if(game.input.left) {
                sp2.rotation += 2;
                updateCol();
            }
            if(game.input.right) {
                sp2.rotation -= 2;
                updateCol();
            }
            if(game.input.a) {
                ; ;
            }
            if(game.input.b) {
                scene.moveSceneTo('2');
            }
        });
        return scene;
    }
    function CreatePlayScene2(gameData) {
        var game = enchant.Game.instance;
        var scene = new exte.SceneEx('2');
        var backGroup = new enchant.Group();
        scene.addChild(backGroup);
        var aRand = new exte.AverageRandamizer(10);
        var label;
        var rLabel;
        var tLabel;
        var lLabel;
        var kLabel;
        var kLabel2;
        var hadouSprite;
        var mainGroup = new enchant.Group();
        (function () {
            var label2 = new enchant.Label('toKanji1(push"left")');
            label2.x = 10;
            label2.y = 10;
            mainGroup.addChild(label2);
            kLabel = new enchant.Label('');
            kLabel.x = 140;
            kLabel.y = 10;
            mainGroup.addChild(kLabel);
            var label3 = new enchant.Label('toKanji2(push"left")');
            label3.x = 10;
            label3.y = 25;
            mainGroup.addChild(label3);
            kLabel2 = new enchant.Label('');
            kLabel2.x = 140;
            kLabel2.y = 25;
            mainGroup.addChild(kLabel2);
            label = new enchant.Label('│＼─A' + exte.makeSpace() + 'ハドーケン' + exte.makeSpace() + '!');
            label.x = 10;
            label.y = 60;
            mainGroup.addChild(label);
            hadouSprite = exte.createIconSprite(54);
            hadouSprite.visible = false;
            hadouSprite.x = 120;
            hadouSprite.y = 60;
            hadouSprite.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
                if(this.visible) {
                    this.x += 5;
                    if(exte.isOutOfScreen(this)) {
                        this.x = 120;
                        this.visible = false;
                    }
                }
            });
            mainGroup.addChild(hadouSprite);
            var rLabelT = new enchant.Label('AverageRandamizer(push"UP")');
            rLabelT.x = 10;
            rLabelT.y = 80;
            mainGroup.addChild(rLabelT);
            rLabel = new enchant.Label('');
            rLabel.x = 10;
            rLabel.y = 100;
            mainGroup.addChild(rLabel);
            var str = 'ABCDE';
            var rect = new exte.Rectangle(10, 120, 50, 20);
            var rp = rect.createSprite(exte.toRGBString(200), true);
            mainGroup.addChild(rp);
            var label13 = new enchant.Label(str);
            label13.x = rect.left;
            label13.y = rect.top;
            mainGroup.addChild(label13);
            var label14 = new enchant.Label('exte.stringWidth:"' + str + '"=' + exte.stringWidth(rp.image, str));
            label14.x = rect.right;
            label14.y = rect.top;
            mainGroup.addChild(label14);
            tLabel = new enchant.Label('timer');
            tLabel.x = 10;
            tLabel.y = 150;
            mainGroup.addChild(tLabel);
        })();
        scene.addChild(mainGroup);
        var rsp = new exte.RepeatSoundPlayer(gameData.soundBGM);
        var timer = new exte.Timer();
        var uiGroup = new enchant.Group();
        (function () {
            var pad = new enchant.ui.Pad();
            pad.x = 0;
            pad.y = 220;
            uiGroup.addChild(pad);
            uiGroup.addChild(rsp);
            uiGroup.addChild(timer);
            var margin = 10;
            var buttonASprite = new enchant.Sprite(gameData.buttonWidth, gameData.buttonHeight);
            buttonASprite.x = game.width - gameData.buttonWidth * 2 - margin * 2;
            buttonASprite.y = game.height - gameData.buttonHeight - margin;
            buttonASprite.image = game.assets[gameData.buttonAAssetName];
            buttonASprite.buttonMode = "a";
            uiGroup.addChild(buttonASprite);
            var buttonBSprite = new enchant.Sprite(gameData.buttonWidth, gameData.buttonHeight);
            buttonBSprite.x = game.width - gameData.buttonWidth - margin;
            buttonBSprite.y = game.height - gameData.buttonHeight - margin;
            buttonBSprite.image = game.assets[gameData.buttonBAssetName];
            buttonBSprite.buttonMode = "b";
            uiGroup.addChild(buttonBSprite);
            var nextLabel = new enchant.Label('push"B"→next');
            nextLabel.x = 220;
            nextLabel.y = 240;
            uiGroup.addChild(nextLabel);
        })();
        scene.addChild(uiGroup);
        scene.regist(0, [
            enchant.Event.DOWN_BUTTON_DOWN, 
            enchant.Event.RIGHT_BUTTON_DOWN, 
            enchant.Event.DOWN_BUTTON_UP, 
            enchant.Event.A_BUTTON_DOWN
        ]);
        scene.regist(1, [
            enchant.Event.A_BUTTON_DOWN
        ], 1, true);
        scene.regist(2, [
            enchant.Event.UP_BUTTON_DOWN
        ]);
        scene.regist(3, [
            enchant.Event.LEFT_BUTTON_DOWN
        ]);
        scene.addEventListener(exte.Event_SceneInput, function (e) {
            switch(e.eventID) {
                case 0: {
                    hadouSprite.x = 120;
                    hadouSprite.visible = true;
                    exte.addFadeOutText(mainGroup, hadouSprite, 'SUCCESS');
                    break;

                }
                case 1: {
                    exte.playSound(gameData.soundOK);
                    break;

                }
                case 2: {
                    rLabel.text += aRand.next.toString() + exte.makeSpace();
                    break;

                }
                case 3: {
                    var value = exte.rand(100000);
                    kLabel.text = value.toString() + '→' + exte.toKanji1(value);
                    kLabel2.text = value.toString() + '→' + exte.toKanji2(value);
                    break;

                }
            }
        });
        scene.addEventListener(exte.Event_SceneExStarting, function (e) {
            rsp.play();
            timer.start(1);
        });
        scene.addEventListener(exte.Event_TimerTimeOut, function (e) {
            tLabel.text += '●';
            if(14 < tLabel.text.length) {
                tLabel.text = 'timer';
            }
        });
        scene.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
            if(scene.fadeProsessing) {
                return;
            }
            if(game.input.up) {
                ; ;
            }
            if(game.input.down) {
                ; ;
            }
            if(game.input.left) {
                ; ;
            }
            if(game.input.right) {
                ; ;
            }
            if(game.input.a) {
                ; ;
            }
            if(game.input.b) {
                rsp.stop();
                scene.moveSceneTo('3');
            }
        });
        return scene;
    }
    function CreatePlayScene3(gameData) {
        var game = enchant.Game.instance;
        var scene = new exte.SceneEx('3');
        var backGroup = new enchant.Group();
        scene.addChild(backGroup);
        var mainGroup = new enchant.Group();
        (function () {
            var label2 = new enchant.Label('exte.setMazeData');
            label2.x = 10;
            label2.y = 10;
            mainGroup.addChild(label2);
            var map = new enchant.Map(16, 16);
            map.image = game.assets[gameData.mapAssetName];
            map.x = 10;
            map.y = 30;
            map.collisionData = exte.createMaze(7, 7);
            exte.setMazeData(map, 7, 7, 322, 520);
            mainGroup.addChild(map);
            var targetRow = exte.rand(7);
            var targetColumn = exte.rand(7);
            var mapPointSeacher = new exte.MapPointSeacher(map.collisionData);
            var samepoints = mapPointSeacher.getSamePoints(targetRow, targetColumn);
            var samepointTexts = [];
            samepoints.forEach(function (value) {
                samepointTexts.push('(' + value.row + ',' + value.column + ')');
            }, this);
            var label20_ = new enchant.Label('exte.MapPointSeacher.getSamePoints');
            label20_.x = 130;
            label20_.y = 10;
            mainGroup.addChild(label20_);
            var label20 = new enchant.Label('basePoint=(' + targetRow + ',' + targetColumn + ')');
            label20.x = 130;
            label20.y = 30;
            mainGroup.addChild(label20);
            var label21 = new enchant.Label('' + samepointTexts);
            label21.x = 160;
            label21.y = 50;
            label21.width = 160;
            mainGroup.addChild(label21);
        })();
        scene.addChild(mainGroup);
        var uiGroup = new enchant.Group();
        (function () {
            var pad = new enchant.ui.Pad();
            pad.x = 0;
            pad.y = 220;
            uiGroup.addChild(pad);
            var margin = 10;
            var buttonASprite = new enchant.Sprite(gameData.buttonWidth, gameData.buttonHeight);
            buttonASprite.x = game.width - gameData.buttonWidth * 2 - margin * 2;
            buttonASprite.y = game.height - gameData.buttonHeight - margin;
            buttonASprite.image = game.assets[gameData.buttonAAssetName];
            buttonASprite.buttonMode = "a";
            uiGroup.addChild(buttonASprite);
            var buttonBSprite = new enchant.Sprite(gameData.buttonWidth, gameData.buttonHeight);
            buttonBSprite.x = game.width - gameData.buttonWidth - margin;
            buttonBSprite.y = game.height - gameData.buttonHeight - margin;
            buttonBSprite.image = game.assets[gameData.buttonBAssetName];
            buttonBSprite.buttonMode = "b";
            uiGroup.addChild(buttonBSprite);
            var nextLabel = new enchant.Label('push"B"→next');
            nextLabel.x = 220;
            nextLabel.y = 240;
            uiGroup.addChild(nextLabel);
        })();
        scene.addChild(uiGroup);
        scene.addEventListener(exte.Event_SceneExStarting, function (e) {
            ; ;
        });
        scene.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
            if(scene.fadeProsessing) {
                return;
            }
            if(game.input.up) {
            }
            if(game.input.down) {
            }
            if(game.input.left) {
            }
            if(game.input.right) {
            }
            if(game.input.a) {
            }
            if(game.input.b) {
                scene.moveSceneTo('4');
            }
        });
        return scene;
    }
    function CreatePlayScene4(gameData) {
        var game = enchant.Game.instance;
        var scene = new exte.SceneEx('4');
        var backGroup = new enchant.Group();
        scene.addChild(backGroup);
        var clabel = [];
        function update_calc() {
            var r = Math.random() * Math.PI;
            clabel[0].text = 'Math.random=' + r.toString();
            clabel[1].text = 'exte.round=' + exte.round(r, 3);
            clabel[2].text = 'exte.ceil=' + exte.ceil(r, 3);
            clabel[3].text = 'exte.floor=' + exte.floor(r, 3);
            clabel[4].text = 'exte.radToDeg=' + exte.radToDeg(r);
        }
        var mainGroup = new enchant.Group();
        (function () {
            var label1 = new enchant.Label('push"A"');
            label1.x = 10;
            label1.y = 20;
            mainGroup.addChild(label1);
            clabel[0] = new enchant.Label('');
            clabel[0].x = 10;
            clabel[0].y = 35;
            mainGroup.addChild(clabel[0]);
            clabel[1] = new enchant.Label('');
            clabel[1].x = 10;
            clabel[1].y = 60;
            mainGroup.addChild(clabel[1]);
            clabel[2] = new enchant.Label('');
            clabel[2].x = 10;
            clabel[2].y = 75;
            mainGroup.addChild(clabel[2]);
            clabel[3] = new enchant.Label('');
            clabel[3].x = 10;
            clabel[3].y = 90;
            mainGroup.addChild(clabel[3]);
            clabel[4] = new enchant.Label('');
            clabel[4].x = 10;
            clabel[4].y = 105;
            mainGroup.addChild(clabel[4]);
            var label2 = new enchant.Label('exte.paddingLeft');
            label2.x = 10;
            label2.y = 150;
            mainGroup.addChild(label2);
            var label3 = new enchant.Label(exte.paddingLeft(999, 5));
            label3.x = 140;
            label3.y = 150;
            mainGroup.addChild(label3);
            var label4 = new enchant.Label('exte.paddingRight');
            label4.x = 10;
            label4.y = 170;
            mainGroup.addChild(label4);
            var label5 = new enchant.Label(exte.paddingRight(999, 5));
            label5.x = 140;
            label5.y = 170;
            mainGroup.addChild(label5);
        })();
        scene.addChild(mainGroup);
        var uiGroup = new enchant.Group();
        (function () {
            var pad = new enchant.ui.Pad();
            pad.x = 0;
            pad.y = 220;
            uiGroup.addChild(pad);
            var margin = 10;
            var buttonASprite = new enchant.Sprite(gameData.buttonWidth, gameData.buttonHeight);
            buttonASprite.x = game.width - gameData.buttonWidth * 2 - margin * 2;
            buttonASprite.y = game.height - gameData.buttonHeight - margin;
            buttonASprite.image = game.assets[gameData.buttonAAssetName];
            buttonASprite.buttonMode = "a";
            uiGroup.addChild(buttonASprite);
            var buttonBSprite = new enchant.Sprite(gameData.buttonWidth, gameData.buttonHeight);
            buttonBSprite.x = game.width - gameData.buttonWidth - margin;
            buttonBSprite.y = game.height - gameData.buttonHeight - margin;
            buttonBSprite.image = game.assets[gameData.buttonBAssetName];
            buttonBSprite.buttonMode = "b";
            uiGroup.addChild(buttonBSprite);
            var nextLabel = new enchant.Label('push"B"→next');
            nextLabel.x = 220;
            nextLabel.y = 240;
            uiGroup.addChild(nextLabel);
        })();
        scene.addChild(uiGroup);
        scene.addEventListener(exte.Event_SceneExStarting, function (e) {
            update_calc();
        });
        scene.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
            if(scene.fadeProsessing) {
                return;
            }
            if(game.input.up) {
            }
            if(game.input.down) {
            }
            if(game.input.left) {
            }
            if(game.input.right) {
            }
            if(game.input.a) {
                update_calc();
            }
            if(game.input.b) {
                scene.moveSceneTo('5');
            }
        });
        return scene;
    }
    function CreatePlayScene5(gameData) {
        var game = enchant.Game.instance;
        var scene = new exte.SceneEx('5');
        var backGroup = new enchant.Group();
        scene.addChild(backGroup);
        var mainGroup = new enchant.Group();
        (function () {
            var label = new enchant.Label('exte.MapPointSeacher.getRoute(row5 column5 cost10) push"a"→update');
            label.x = 0;
            label.y = 10;
            label.width = game.width;
            mainGroup.addChild(label);
        })();
        scene.addChild(mainGroup);
        var uiGroup = new enchant.Group();
        (function () {
            var pad = new enchant.ui.Pad();
            pad.x = 0;
            pad.y = 220;
            uiGroup.addChild(pad);
            var margin = 10;
            var buttonASprite = new enchant.Sprite(gameData.buttonWidth, gameData.buttonHeight);
            buttonASprite.x = game.width - gameData.buttonWidth * 2 - margin * 2;
            buttonASprite.y = game.height - gameData.buttonHeight - margin;
            buttonASprite.image = game.assets[gameData.buttonAAssetName];
            buttonASprite.buttonMode = "a";
            uiGroup.addChild(buttonASprite);
            var buttonBSprite = new enchant.Sprite(gameData.buttonWidth, gameData.buttonHeight);
            buttonBSprite.x = game.width - gameData.buttonWidth - margin;
            buttonBSprite.y = game.height - gameData.buttonHeight - margin;
            buttonBSprite.image = game.assets[gameData.buttonBAssetName];
            buttonBSprite.buttonMode = "b";
            uiGroup.addChild(buttonBSprite);
            var nextLabel = new enchant.Label('push"B"→next');
            nextLabel.x = 220;
            nextLabel.y = 240;
            uiGroup.addChild(nextLabel);
        })();
        scene.addChild(uiGroup);
        var rowNum = 10;
        var columnNum = 10;
        var costMap = [];
        var labelMap = [];
        for(var row = 0; row < rowNum; row++) {
            var rows = [];
            var labels = [];
            for(var column = 0; column < columnNum; column++) {
                rows.push(0);
                var label = new enchant.Label('0');
                label.x = column * 15 + 10;
                label.y = row * 15 + 50;
                mainGroup.addChild(label);
                labels.push(label);
            }
            costMap.push(rows);
            labelMap.push(labels);
        }
        var rs = exte.createRectangleSprite(15, 15, 'black');
        mainGroup.addChild(rs);
        var routesLabel = new enchant.Label('routes');
        routesLabel.x = 200;
        routesLabel.y = 50;
        routesLabel.width = 120;
        mainGroup.addChild(routesLabel);
        var cursorRow = 5;
        var cursorColumn = 5;
        function updateCursorPos() {
            if(cursorRow < 0) {
                cursorRow = 0;
            }
            if(rowNum <= cursorRow) {
                cursorRow = rowNum - 1;
            }
            if(cursorColumn < 0) {
                cursorColumn = 0;
            }
            if(columnNum <= cursorColumn) {
                cursorColumn = columnNum - 1;
            }
            var l = labelMap[cursorRow][cursorColumn];
            rs.x = l.x - 5;
            rs.y = l.y;
            routesLabel.text = l.routesText;
        }
        function makeMap() {
            for(var row = 0; row < rowNum; row++) {
                for(var column = 0; column < columnNum; column++) {
                    var cost = exte.rand(5) + 1;
                    costMap[row][column] = cost;
                    labelMap[row][column].text = cost.toString();
                    labelMap[row][column].color = 'black';
                }
            }
            var mapPointSeacher = new exte.MapPointSeacher(costMap);
            var routes = mapPointSeacher.getRoute(5, 5, 10);
            routes.forEach(function (data) {
                var l = labelMap[data.row][data.column];
                l.color = 'red';
                var routesText = 'rest=' + data.rest + '<br />routes=';
                for(var i in data.routes) {
                    routesText += '[<br />';
                    for(var j in data.routes[i]) {
                        routesText += '{ ' + data.routes[i][j].row + ' , ' + data.routes[i][j].column + ' }<br />';
                    }
                    routesText += ' ]';
                }
                l.routesText = routesText;
            }, this);
        }
        scene.addEventListener(exte.Event_SceneExStarting, function (e) {
            makeMap();
            updateCursorPos();
        });
        scene.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
            if(scene.fadeProsessing) {
                return;
            }
            if(game.input.up) {
                cursorRow--;
                updateCursorPos();
            }
            if(game.input.down) {
                cursorRow++;
                updateCursorPos();
            }
            if(game.input.left) {
                cursorColumn--;
                updateCursorPos();
            }
            if(game.input.right) {
                cursorColumn++;
                updateCursorPos();
            }
            if(game.input.a) {
                makeMap();
            }
            if(game.input.b) {
                scene.moveSceneTo('6');
            }
        });
        return scene;
    }
    function CreatePlayScene6(gameData) {
        var game = enchant.Game.instance;
        var scene = new exte.SceneEx('6');
        var backGroup = new enchant.Group();
        scene.addChild(backGroup);
        var mainGroup = new enchant.Group();
        (function () {
            var label1 = new enchant.Label('exte.createSimpleMap');
            label1.x = 10;
            label1.y = 0;
            mainGroup.addChild(label1);
            var backMap = exte.createSimpleMap(gameData.mapAssetName, 16, 8, 6, 135, 114, 115, 116, 134, 136, 154, 155, 156);
            backMap.x = 15;
            backMap.y = 50;
            mainGroup.addChild(backMap);
            var label = new enchant.Label('exte.LogList push"a"→regist');
            label.x = 10;
            label.y = 30;
            mainGroup.addChild(label);
        })();
        scene.addChild(mainGroup);
        var logList = new exte.LogList(30, 50, 96, 128);
        logList.color = 'white';
        scene.addChild(logList);
        var uiGroup = new enchant.Group();
        (function () {
            var pad = new enchant.ui.Pad();
            pad.x = 0;
            pad.y = 220;
            uiGroup.addChild(pad);
            var margin = 10;
            var buttonASprite = new enchant.Sprite(gameData.buttonWidth, gameData.buttonHeight);
            buttonASprite.x = game.width - gameData.buttonWidth * 2 - margin * 2;
            buttonASprite.y = game.height - gameData.buttonHeight - margin;
            buttonASprite.image = game.assets[gameData.buttonAAssetName];
            buttonASprite.buttonMode = "a";
            uiGroup.addChild(buttonASprite);
            var buttonBSprite = new enchant.Sprite(gameData.buttonWidth, gameData.buttonHeight);
            buttonBSprite.x = game.width - gameData.buttonWidth - margin;
            buttonBSprite.y = game.height - gameData.buttonHeight - margin;
            buttonBSprite.image = game.assets[gameData.buttonBAssetName];
            buttonBSprite.buttonMode = "b";
            uiGroup.addChild(buttonBSprite);
            var nextLabel = new enchant.Label('push"B"→next');
            nextLabel.x = 220;
            nextLabel.y = 240;
            uiGroup.addChild(nextLabel);
        })();
        scene.addChild(uiGroup);
        scene.addEventListener(exte.Event_SceneExStarting, function (e) {
            ; ;
        });
        scene.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
            if(scene.fadeProsessing) {
                return;
            }
            if(game.input.up) {
            }
            if(game.input.down) {
            }
            if(game.input.left) {
            }
            if(game.input.right) {
            }
            if(game.input.a) {
                var size = 10 + exte.rand(10);
                var fontSize = size + 'px';
                logList.regist(fontSize, null, fontSize, size);
            }
            if(game.input.b) {
                scene.moveSceneTo('7');
            }
        });
        return scene;
    }
    function CreatePlayScene7(gameData) {
        var game = enchant.Game.instance;
        var scene = new exte.SceneEx('7');
        var backGroup = new enchant.Group();
        scene.addChild(backGroup);
        var rlabel;
        var moveSprite;
        var alabel;
        function update_isOutOfScreen() {
            alabel.text = 'exte.isOutOfScreen=' + exte.isOutOfScreen(moveSprite);
        }
        var mainGroup = new enchant.Group();
        (function () {
            var ary = [
                0, 
                1, 
                2, 
                3, 
                4, 
                5, 
                6, 
                7, 
                8, 
                9
            ];
            var label0 = new enchant.Label('ary = [' + ary.join(',') + ']');
            label0.x = 10;
            label0.y = 10;
            mainGroup.addChild(label0);
            var suffles = exte.shuffleArray(ary);
            var label1 = new enchant.Label('exte.shuffleArray → [' + suffles.join(',') + ']');
            label1.x = 10;
            label1.y = 25;
            mainGroup.addChild(label1);
            rlabel = new enchant.Label('exte.randomString' + exte.makeSpace() + 'push"A"');
            rlabel.x = 10;
            rlabel.y = 50;
            mainGroup.addChild(rlabel);
            var label7 = new enchant.Label('↓Press arrow key.Try out screen');
            label7.x = 10;
            label7.y = 80;
            mainGroup.addChild(label7);
            moveSprite = exte.createIconSprite(44);
            moveSprite.x = 10;
            moveSprite.y = 95;
            mainGroup.addChild(moveSprite);
            alabel = new enchant.Label('');
            alabel.x = 10;
            alabel.y = 135;
            mainGroup.addChild(alabel);
            var str5 = 'あいうえお';
            var label5 = new enchant.Label(str5 + '→' + exte.toKatakanaCase(str5));
            label5.x = 10;
            label5.y = 160;
            mainGroup.addChild(label5);
            var str6 = 'ガギグゲゴ';
            var label6 = new enchant.Label(str6 + '→' + exte.toHirakanaCase(str6));
            label6.x = 10;
            label6.y = 180;
            mainGroup.addChild(label6);
        })();
        scene.addChild(mainGroup);
        var uiGroup = new enchant.Group();
        (function () {
            var pad = new enchant.ui.Pad();
            pad.x = 0;
            pad.y = 220;
            uiGroup.addChild(pad);
            var margin = 10;
            var buttonASprite = new enchant.Sprite(gameData.buttonWidth, gameData.buttonHeight);
            buttonASprite.x = game.width - gameData.buttonWidth * 2 - margin * 2;
            buttonASprite.y = game.height - gameData.buttonHeight - margin;
            buttonASprite.image = game.assets[gameData.buttonAAssetName];
            buttonASprite.buttonMode = "a";
            uiGroup.addChild(buttonASprite);
            var buttonBSprite = new enchant.Sprite(gameData.buttonWidth, gameData.buttonHeight);
            buttonBSprite.x = game.width - gameData.buttonWidth - margin;
            buttonBSprite.y = game.height - gameData.buttonHeight - margin;
            buttonBSprite.image = game.assets[gameData.buttonBAssetName];
            buttonBSprite.buttonMode = "b";
            uiGroup.addChild(buttonBSprite);
            var nextLabel = new enchant.Label('push"B"→next');
            nextLabel.x = 220;
            nextLabel.y = 240;
            uiGroup.addChild(nextLabel);
        })();
        scene.addChild(uiGroup);
        scene.addEventListener(exte.Event_SceneExStarting, function (e) {
            update_isOutOfScreen();
        });
        scene.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
            if(scene.fadeProsessing) {
                return;
            }
            if(game.input.up) {
                moveSprite.y -= 3;
                update_isOutOfScreen();
            }
            if(game.input.down) {
                moveSprite.y += 3;
                update_isOutOfScreen();
            }
            if(game.input.left) {
                moveSprite.x -= 3;
                update_isOutOfScreen();
            }
            if(game.input.right) {
                moveSprite.x += 3;
                update_isOutOfScreen();
            }
            if(game.input.a) {
                rlabel.text = exte.randomString(10);
            }
            if(game.input.b) {
                scene.moveSceneTo('8');
            }
        });
        return scene;
    }
    function CreatePlayScene8(gameData) {
        var game = enchant.Game.instance;
        var scene = new exte.SceneEx('8');
        var backGroup = new enchant.Group();
        scene.addChild(backGroup);
        var mainGroup = new enchant.Group();
        (function () {
            var label6 = new enchant.Label('var' + exte.makeSpace() + 'color={r:128, g:0, b:255}');
            label6.x = 10;
            label6.y = 10;
            mainGroup.addChild(label6);
            var color = {
                r: 128,
                g: 0,
                b: 255
            };
            var label7 = new enchant.Label('exte.formatString("rgb({r}, {g}, {b})", color)<br />→' + exte.formatString('rgb({r}, {g}, {b})', color));
            label7.x = 10;
            label7.y = 30;
            mainGroup.addChild(label7);
            var ary = [
                1, 
                2, 
                3, 
                4, 
                5, 
                6, 
                7, 
                8, 
                9
            ];
            exte.arrayEraseIf(ary, function (elm, index, ar) {
                return elm % 3 == 0;
            });
            var label8 = new enchant.Label('exte.arrayEraseIf _ [1,2,3,4,5,6,7,8,9] fn(n%3==0)→' + ary);
            label8.x = 10;
            label8.y = 130;
            mainGroup.addChild(label8);
        })();
        scene.addChild(mainGroup);
        var uiGroup = new enchant.Group();
        (function () {
            var pad = new enchant.ui.Pad();
            pad.x = 0;
            pad.y = 220;
            uiGroup.addChild(pad);
            var margin = 10;
            var buttonASprite = new enchant.Sprite(gameData.buttonWidth, gameData.buttonHeight);
            buttonASprite.x = game.width - gameData.buttonWidth * 2 - margin * 2;
            buttonASprite.y = game.height - gameData.buttonHeight - margin;
            buttonASprite.image = game.assets[gameData.buttonAAssetName];
            buttonASprite.buttonMode = "a";
            uiGroup.addChild(buttonASprite);
            var buttonBSprite = new enchant.Sprite(gameData.buttonWidth, gameData.buttonHeight);
            buttonBSprite.x = game.width - gameData.buttonWidth - margin;
            buttonBSprite.y = game.height - gameData.buttonHeight - margin;
            buttonBSprite.image = game.assets[gameData.buttonBAssetName];
            buttonBSprite.buttonMode = "b";
            uiGroup.addChild(buttonBSprite);
            var nextLabel = new enchant.Label('push"B"→next');
            nextLabel.x = 220;
            nextLabel.y = 240;
            uiGroup.addChild(nextLabel);
        })();
        scene.addChild(uiGroup);
        scene.addEventListener(exte.Event_SceneExStarting, function (e) {
        });
        scene.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
            if(scene.fadeProsessing) {
                return;
            }
            if(game.input.up) {
            }
            if(game.input.down) {
            }
            if(game.input.left) {
            }
            if(game.input.right) {
            }
            if(game.input.a) {
            }
            if(game.input.b) {
                scene.moveSceneTo('9');
            }
        });
        return scene;
    }
    function CreatePlayScene9(gameData) {
        var game = enchant.Game.instance;
        var scene = new exte.SceneEx('9');
        var backGroup = new enchant.Group();
        scene.addChild(backGroup);
        var mainGroup = new enchant.Group();
        (function () {
            var label = new enchant.Label('getUserAgent=' + exte.getUserAgent());
            label.x = 10;
            label.y = 10;
            mainGroup.addChild(label);
            var label2 = new enchant.Label('Push A key, Show waitScene');
            label2.x = 10;
            label2.y = 40;
            mainGroup.addChild(label2);
            var label3 = new enchant.Label("http2str('Text.txt')→" + exte.http2str('Text.txt'));
            label3.x = 10;
            label3.y = 70;
            mainGroup.addChild(label3);
        })();
        scene.addChild(mainGroup);
        var uiGroup = new enchant.Group();
        (function () {
            var pad = new enchant.ui.Pad();
            pad.x = 0;
            pad.y = 220;
            uiGroup.addChild(pad);
            var margin = 10;
            var buttonASprite = new enchant.Sprite(gameData.buttonWidth, gameData.buttonHeight);
            buttonASprite.x = game.width - gameData.buttonWidth * 2 - margin * 2;
            buttonASprite.y = game.height - gameData.buttonHeight - margin;
            buttonASprite.image = game.assets[gameData.buttonAAssetName];
            buttonASprite.buttonMode = "a";
            uiGroup.addChild(buttonASprite);
            var buttonBSprite = new enchant.Sprite(gameData.buttonWidth, gameData.buttonHeight);
            buttonBSprite.x = game.width - gameData.buttonWidth - margin;
            buttonBSprite.y = game.height - gameData.buttonHeight - margin;
            buttonBSprite.image = game.assets[gameData.buttonBAssetName];
            buttonBSprite.buttonMode = "b";
            uiGroup.addChild(buttonBSprite);
            var nextLabel = new enchant.Label('push"B"→next');
            nextLabel.x = 220;
            nextLabel.y = 240;
            uiGroup.addChild(nextLabel);
        })();
        scene.addChild(uiGroup);
        scene.addEventListener(exte.Event_SceneExStarting, function (e) {
            ; ;
        });
        var waitFrame = 0;
        scene.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
            if(scene.fadeProsessing) {
                return;
            }
            if(game.input.up) {
            }
            if(game.input.down) {
            }
            if(game.input.left) {
            }
            if(game.input.right) {
            }
            if(game.input.a) {
                waitFrame = game.fps * 3;
                exte.pushWaitScene(function () {
                    return waitFrame-- <= 0;
                }, game.assets[gameData.waitAssetName]);
            }
            if(game.input.b) {
                scene.moveSceneTo('1');
            }
        });
        return scene;
    }
    function CreatePlaySceneTemplate(gameData) {
        var game = enchant.Game.instance;
        var scene = new exte.SceneEx('');
        var backGroup = new enchant.Group();
        scene.addChild(backGroup);
        var mainGroup = new enchant.Group();
        (function () {
            var label = new enchant.Label('');
            label.x = 10;
            label.y = 10;
            mainGroup.addChild(label);
        })();
        scene.addChild(mainGroup);
        var uiGroup = new enchant.Group();
        (function () {
            var pad = new enchant.ui.Pad();
            pad.x = 0;
            pad.y = 220;
            uiGroup.addChild(pad);
            var margin = 10;
            var buttonASprite = new enchant.Sprite(gameData.buttonWidth, gameData.buttonHeight);
            buttonASprite.x = game.width - gameData.buttonWidth * 2 - margin * 2;
            buttonASprite.y = game.height - gameData.buttonHeight - margin;
            buttonASprite.image = game.assets[gameData.buttonAAssetName];
            buttonASprite.buttonMode = "a";
            uiGroup.addChild(buttonASprite);
            var buttonBSprite = new enchant.Sprite(gameData.buttonWidth, gameData.buttonHeight);
            buttonBSprite.x = game.width - gameData.buttonWidth - margin;
            buttonBSprite.y = game.height - gameData.buttonHeight - margin;
            buttonBSprite.image = game.assets[gameData.buttonBAssetName];
            buttonBSprite.buttonMode = "b";
            uiGroup.addChild(buttonBSprite);
            var nextLabel = new enchant.Label('push"B"→next');
            nextLabel.x = 220;
            nextLabel.y = 240;
            uiGroup.addChild(nextLabel);
        })();
        scene.addChild(uiGroup);
        scene.addEventListener(exte.Event_SceneExStarting, function (e) {
            ; ;
        });
        scene.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
            if(scene.fadeProsessing) {
                return;
            }
            if(game.input.up) {
            }
            if(game.input.down) {
            }
            if(game.input.left) {
            }
            if(game.input.right) {
            }
            if(game.input.a) {
            }
            if(game.input.b) {
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
        CreatePlayScene6(gameData);
        CreatePlayScene7(gameData);
        CreatePlayScene8(gameData);
        CreatePlayScene9(gameData);
    }
    ExteGame.CreatePlayScene = CreatePlayScene;
})(ExteGame || (ExteGame = {}));

var ExteGame;
(function (ExteGame) {
    window.onload = function () {
        var gameData = new ExteGame.GameData();
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
                    if(firstStep) {
                        firstStep = false;
                        exte.playSound(gameData.soundStart);
                    }
                });
                return scene;
            })();
            ExteGame.CreatePlayScene(gameData);
            game.pushScene(titleoutScene);
        };
        game.start();
    };
})(ExteGame || (ExteGame = {}));

