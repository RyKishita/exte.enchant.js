var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var exte;
(function (exte) {
    function rand(num) {
        if(num <= 1) {
            return 0;
        }
        return Math.floor(Math.random() * num);
    }
    exte.rand = rand;
    function getUserAgent() {
        var ua = navigator.userAgent;
        if((ua.indexOf('iPhone') > 0 && ua.indexOf('iPad') == -1) || ua.indexOf('iPod') > 0) {
            return "iOS";
        } else {
            if(ua.indexOf('Android') > 0) {
                return "Android";
            } else {
                if(ua.indexOf('Chrome') > 0) {
                    return "Chrome";
                } else {
                    if(ua.indexOf('Firefox') > 0) {
                        return "Firefox";
                    } else {
                        if(ua.indexOf('Opera') > 0) {
                            return "Opera";
                        }
                    }
                }
            }
        }
        return "Other";
    }
    exte.getUserAgent = getUserAgent;
    function trace() {
        var argArray = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            argArray[_i] = arguments[_i + 0];
        }
        if(argArray.length == 0) {
            return;
        }
        var args = Array.prototype.slice.call(argArray, 0);
        for(var i = 0; i < args.length; i++) {
            console.log(args[i]);
        }
    }
    exte.trace = trace;
    function makeRepeatString(text, n) {
        var s = text;
        if(n) {
            for(var i = 1; i < n; i++) {
                s += text;
            }
        }
        return s;
    }
    exte.makeRepeatString = makeRepeatString;
    function makeSpace(n) {
        return makeRepeatString('&nbsp;', n);
    }
    exte.makeSpace = makeSpace;
    var AverageRandamizer = (function () {
        function AverageRandamizer(range) {
            this._table = [];
            this.range = range;
        }
        Object.defineProperty(AverageRandamizer.prototype, "next", {
            get: function () {
                var matchs = [];
                this._table.forEach(function (value, index) {
                    if(rand(value) == 0) {
                        matchs.push(index);
                    }
                });
                var result;
                if(0 < matchs.length) {
                    result = matchs[rand(matchs.length)];
                } else {
                    result = rand(this.range);
                }
                this._table[result] += this.range;
                for(var i = 0; i < this.range; i++) {
                    this._table[i]--;
                }
                return result;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AverageRandamizer.prototype, "range", {
            get: function () {
                return this._table.length;
            },
            set: function (r) {
                if(r < this.range) {
                    this._table.length = 0;
                }
                for(var i = this.range; i < r; i++) {
                    this._table.push(r);
                }
            },
            enumerable: true,
            configurable: true
        });
        return AverageRandamizer;
    })();
    exte.AverageRandamizer = AverageRandamizer;    
    function toRGBString() {
        var argArray = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            argArray[_i] = arguments[_i + 0];
        }
        var r, g, b, a;
        if(3 <= argArray.length) {
            r = argArray[0];
            g = argArray[1];
            b = argArray[2];
            if(4 <= argArray.length) {
                a = argArray[3];
            } else {
                a = 1;
            }
        } else {
            if(1 <= argArray.length) {
                r = g = b = argArray[0];
                if(2 <= argArray.length) {
                    a = argArray[1];
                } else {
                    a = 1;
                }
            } else {
                r = g = b = a = 0;
            }
        }
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }
    exte.toRGBString = toRGBString;
    function shuffleArray(src) {
        var dst = [];
        while(0 < src.length) {
            var index = rand(src.length);
            var value = src.splice(index, 1)[0];
            dst.push(value);
        }
        return dst;
    }
    exte.shuffleArray = shuffleArray;
    function makeKanji(value, chars, ketas) {
        value = Math.floor(value);
        if(value == 0) {
            return chars[0];
        }
        var ketaMax = ketas.length;
        var nums = [];
        while(0 < value) {
            nums.push(value % 10);
            if(ketas.length + 1 < nums.length) {
                nums.length = ketas.length;
                for(var i = 0; i < ketas.length; i++) {
                    nums[i] = 9;
                }
                break;
            }
            value = Math.floor(value / 10);
        }
        var result = '';
        while(0 < nums.length) {
            var v = nums.pop();
            var keta = '';
            if(0 < nums.length) {
                keta = ketas[nums.length - 1];
            }
            if(v != 0 && (v != 1 || nums.length == ketaMax || nums.length == 0)) {
                result += chars[v];
            }
            if(0 < v) {
                result += keta;
            }
        }
        return result;
    }
    exte.makeKanji = makeKanji;
    function degToRad(d) {
        return d * Math.PI / 180;
    }
    exte.degToRad = degToRad;
    function radToDeg(r) {
        return r * 180 / Math.PI;
    }
    exte.radToDeg = radToDeg;
    function normalinzeRad(r) {
        if(r < 0) {
            return normalinzeRad(r + Math.PI * 2);
        }
        if(Math.PI * 2 <= r) {
            return normalinzeRad(r - Math.PI * 2);
        }
        return r;
    }
    exte.normalinzeRad = normalinzeRad;
    function normalinzeDeg(d) {
        if(d < 0) {
            return this.normalinzeDeg(d + 360);
        }
        if(360 <= d) {
            return this.normalinzeDeg(d - 360);
        }
        return d;
    }
    exte.normalinzeDeg = normalinzeDeg;
    function angleToDirection(angle) {
        angle = normalinzeRad(angle);
        if(angle < Math.PI * 0.25) {
            return 2;
        } else {
            if(angle < Math.PI * 0.75) {
                return 0;
            } else {
                if(angle < Math.PI * 1.25) {
                    return 1;
                } else {
                    if(angle < Math.PI * 1.75) {
                        return 3;
                    } else {
                        return 2;
                    }
                }
            }
        }
    }
    exte.angleToDirection = angleToDirection;
    function directionToAngle(direction) {
        switch(direction) {
            case 0: {
                return Math.PI * 0.5;

            }
            case 1: {
                return Math.PI * 1;

            }
            case 2: {
                return Math.PI * 0;

            }
            case 3: {
                return Math.PI * 1.5;

            }
        }
    }
    exte.directionToAngle = directionToAngle;
    function getNarrowAngle(angle1, angle2) {
        angle1 = normalinzeRad(angle1);
        angle2 = normalinzeRad(angle2);
        var min = Math.min(angle1, angle2);
        var max = Math.max(angle1, angle2);
        var agl = max - min;
        if(Math.PI < agl) {
            agl = min + Math.PI * 2 - max;
        }
        return agl;
    }
    exte.getNarrowAngle = getNarrowAngle;
    function getDistance(point1, point2) {
        var dx = point1.x - point2.x;
        var dy = point1.y - point2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    exte.getDistance = getDistance;
    function getAngle(from, to) {
        var dx = to.x - from.x;
        var dy = to.y - from.y;
        return Math.atan2(dy, dx);
    }
    exte.getAngle = getAngle;
    function makeValues(value, count) {
        var values = [];
        for(var i = 0; i < count; i++) {
            values.push(value);
        }
        return values;
    }
    exte.makeValues = makeValues;
    function createMaze(rowNum, columnNum, addframe) {
        if(rowNum % 2 == 0 || columnNum % 2 == 0) {
            throw new Error('arguments error');
        }
        var maze = [];
        maze.length = rowNum;
        if(addframe) {
            for(var row = 0; row < rowNum; row++) {
                if(row == 0 || row == (rowNum - 1)) {
                    maze[row] = makeValues(1, columnNum);
                } else {
                    maze[row] = makeValues(0, columnNum);
                    maze[row][0] = maze[row][columnNum - 1] = 1;
                }
            }
        } else {
            for(var row = 0; row < rowNum; row++) {
                maze[row] = makeValues(0, columnNum);
            }
        }
        var rowStart = 1;
        var columnStart = 1;
        var rowLimit = rowNum;
        var columnLimit = columnNum;
        if(addframe) {
            rowStart++;
            columnStart++;
            rowLimit--;
            columnLimit--;
        }
        var range = 4;
        var dx = [
            1, 
            0, 
            -1, 
            0
        ];
        var dy = [
            0, 
            1, 
            0, 
            -1
        ];
        for(var row = rowStart; row < rowLimit; row += 2) {
            for(var column = columnStart; column < columnLimit; column += 2) {
                maze[row][column] = 1;
                var r = rand(range);
                maze[row + dy[r]][column + dx[r]] = 1;
            }
            if(range == 4) {
                range = 3;
            }
        }
        return maze;
    }
    exte.createMaze = createMaze;
    var base = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    function randomString(len, pattern) {
        if(!pattern) {
            pattern = base;
        }
        var result = "";
        len = len || 1;
        for(var i = 0; i < len; i++) {
            result += pattern.charAt(rand(pattern.length));
        }
        return result;
    }
    exte.randomString = randomString;
    function round(num, figure) {
        if(0 < figure) {
            var base = Math.pow(10, figure);
            return Math.round(num * base) / base;
        } else {
            return Math.round(num);
        }
    }
    exte.round = round;
    function ceil(num, figure) {
        if(0 < figure) {
            var base = Math.pow(10, figure);
            return Math.ceil(num * base) / base;
        } else {
            return Math.ceil(num);
        }
    }
    exte.ceil = ceil;
    function floor(num, figure) {
        if(0 < figure) {
            var base = Math.pow(10, figure);
            return Math.floor(num * base) / base;
        } else {
            return Math.floor(num);
        }
    }
    exte.floor = floor;
    function paddingLeft(num, len, ch) {
        ch = ch || '0';
        var str = num.toString();
        len -= str.length;
        while(0 < len--) {
            str = ch + str;
        }
        return str;
    }
    exte.paddingLeft = paddingLeft;
    function paddingRight(num, len, ch) {
        ch = ch || '0';
        var str = num.toString();
        len -= str.length;
        while(0 < len--) {
            str += ch;
        }
        return str;
    }
    exte.paddingRight = paddingRight;
    function formatString(format) {
        var argArray = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            argArray[_i] = arguments[_i + 1];
        }
        var rep_fn = undefined;
        if(argArray.length == 1 && typeof argArray[0] == "object") {
            rep_fn = function (m, k) {
                return argArray[0][k];
            };
        } else {
            rep_fn = function (m, k) {
                return argArray[parseInt(k) + 1];
            };
        }
        return format.replace(/\{(\w+)\}/g, rep_fn);
    }
    exte.formatString = formatString;
    function arrayEraseIf(ary, fn) {
        for(var i = ary.length - 1; i >= 0; i--) {
            if(fn(ary[i], i, ary)) {
                ary.splice(i, 1);
            }
        }
    }
    exte.arrayEraseIf = arrayEraseIf;
    var MapPoint = (function () {
        function MapPoint(row, column) {
            this.row = row;
            this.column = column;
        }
        return MapPoint;
    })();
    exte.MapPoint = MapPoint;    
    var ResultRoute = (function (_super) {
        __extends(ResultRoute, _super);
        function ResultRoute(row, column, rest, routes) {
                _super.call(this, row, column);
            this.valid = true;
            this.row = row;
            this.column = column;
            this.rest = rest;
            this.routes = routes;
        }
        return ResultRoute;
    })(MapPoint);
    exte.ResultRoute = ResultRoute;    
    var ResultMoveCost = (function () {
        function ResultMoveCost() { }
        return ResultMoveCost;
    })();
    exte.ResultMoveCost = ResultMoveCost;    
    var MapPointSeacher = (function () {
        function MapPointSeacher(map) {
            this.map = map;
            this.rowNum = map.length;
            this.columnNum = map[0].length;
            this.limitLeft = 0;
            this.limitRight = this.columnNum - 1;
            this.limitTop = 0;
            this.limitBottom = this.rowNum - 1;
        }
        MapPointSeacher.prototype.getSamePoints = function (baseRowNo, baseColumnNo, matchFunc) {
            var baseValue = this.map[baseRowNo][baseColumnNo];
            if(matchFunc === undefined) {
                matchFunc = function (value1, value2) {
                    return value1 == value2;
                };
            }
            var results = [];
            var points = [];
            function AddPoint(map, row, column) {
                if(points.some(function (value) {
                    return value.row == row && value.column == column;
                })) {
                    return;
                }
                var v = map[row][column];
                var bMatch = matchFunc(baseValue, v);
                if(bMatch) {
                    results.push(new MapPoint(row, column));
                }
                points.push({
                    row: row,
                    column: column,
                    valid: bMatch
                });
            }
            AddPoint(this.map, baseRowNo, baseColumnNo);
            while(true) {
                var point = null;
                for(var i = 0; i < points.length; i++) {
                    if(points[i].valid) {
                        point = points[i];
                        break;
                    }
                }
                if(point == null) {
                    break;
                }
                point.valid = false;
                if(this.limitTop < point.row) {
                    AddPoint(this.map, point.row - 1, point.column);
                }
                if(this.limitLeft < point.column) {
                    AddPoint(this.map, point.row, point.column - 1);
                }
                if((point.row + 1) < this.limitBottom) {
                    AddPoint(this.map, point.row + 1, point.column);
                }
                if((point.column + 1) < this.limitRight) {
                    AddPoint(this.map, point.row, point.column + 1);
                }
            }
            return results;
        };
        MapPointSeacher.prototype.getRoute = function (baseRowNo, baseColumnNo, cost) {
            var route = new ResultRoute(baseRowNo, baseColumnNo, cost, [
                []
            ]);
            var points = [];
            points.push(route);
            function AddPoint(map, row, column, rest, routes) {
                var r = map[row][column];
                if(rest < r) {
                    return;
                }
                rest -= r;
                var newRoutes = [];
                for(var i = 0; i < routes.length; i++) {
                    newRoutes.push(routes[i].concat([
                        new MapPoint(row, column)
                    ]));
                }
                var find = points.filter(function (point) {
                    return point.row == row && point.column == column;
                });
                if(0 < find.length) {
                    var point = find[0];
                    if(point.rest < rest) {
                        point.rest = rest;
                        point.routes = newRoutes;
                        point.valid = true;
                    } else {
                        if(point.rest == rest) {
                            newRoutes.forEach(function (value) {
                                return point.routes.push(value);
                            });
                            point.valid = true;
                        }
                    }
                    return;
                }
                points.push(new ResultRoute(row, column, rest, newRoutes));
            }
            var firstPos = true;
            while(true) {
                var point = null;
                for(var i = 0; i < points.length; i++) {
                    if(points[i].valid) {
                        point = points[i];
                        break;
                    }
                }
                if(point == null) {
                    break;
                }
                point.valid = false;
                if(this.limitTop < point.row) {
                    AddPoint(this.map, point.row - 1, point.column, point.rest, point.routes);
                }
                if(this.limitLeft < point.column) {
                    AddPoint(this.map, point.row, point.column - 1, point.rest, point.routes);
                }
                if((point.row + 1) < this.limitBottom) {
                    AddPoint(this.map, point.row + 1, point.column, point.rest, point.routes);
                }
                if((point.column + 1) < this.limitRight) {
                    AddPoint(this.map, point.row, point.column + 1, point.rest, point.routes);
                }
                if(firstPos) {
                    firstPos = false;
                    point.rest = -1;
                }
            }
            for(var i = points.length - 1; i >= 0; i--) {
                var point = points[i];
                if(point.rest < 0) {
                    points.splice(i, 1);
                }
            }
            return points;
        };
        MapPointSeacher.prototype.calcMoveCost = function (map, fromRowNo, fromColumnNo, toRowNo, toColumnNo) {
            var cost = 0;
            if(fromColumnNo != toColumnNo) {
                var cMin = Math.min(fromColumnNo, toColumnNo);
                var cMax = Math.max(fromColumnNo, toColumnNo);
                for(var c = cMin + 1; c < cMax; c++) {
                    cost += map[fromRowNo][c];
                }
                cost += map[fromRowNo][toColumnNo];
            }
            if(fromRowNo != toRowNo) {
                var rMin = Math.min(fromRowNo, toRowNo);
                var rMax = Math.max(fromRowNo, toRowNo);
                for(var r = rMin + 1; r < rMax; r++) {
                    cost += map[r][toColumnNo];
                }
                cost += map[toRowNo][toColumnNo];
            }
            var routes = this.getRoute(fromRowNo, fromColumnNo, cost);
            var resultRoutes = null;
            routes.forEach(function (value) {
                if(value.row == toRowNo && value.column == toColumnNo) {
                    resultRoutes = value.routes;
                }
            });
            cost = 0;
            for(var i = 0; i < resultRoutes[0].length; i++) {
                var rt = resultRoutes[0][i];
                cost += map[rt.row][rt.column];
            }
            var result = new ResultMoveCost();
            result.cost = cost;
            result.routes = resultRoutes;
            return result;
        };
        return MapPointSeacher;
    })();
    exte.MapPointSeacher = MapPointSeacher;    
    function createIconSurface(index, count, assetName, width, height, columnNum) {
        count = count || 1;
        assetName = assetName || 'icon0.png';
        width = width || 16;
        height = height || 16;
        columnNum = columnNum || 16;
        var x = (index % columnNum) * width;
        var y = Math.floor(index / columnNum) * height;
        var image = new enchant.Surface(width * count, height);
        image.draw(enchant.Core.instance.assets[assetName], x, y, width * count, height, 0, 0, width * count, height);
        return image;
    }
    exte.createIconSurface = createIconSurface;
    function createIconSprite(index, count, assetName, width, height, columnNum) {
        count = count || 1;
        assetName = assetName || 'icon0.png';
        width = width || 16;
        height = height || 16;
        var sprite = new enchant.Sprite(width, height);
        if(count == 1) {
            sprite.image = enchant.Core.instance.assets[assetName];
            sprite.frame = index;
        } else {
            sprite.image = createIconSurface(index, count, assetName, width, height, columnNum);
            sprite.frame = 0;
        }
        return sprite;
    }
    exte.createIconSprite = createIconSprite;
    function isDebug() {
        return enchant.Core.instance._debug;
    }
    exte.isDebug = isDebug;
    function playSound(assetName) {
        enchant.Core.instance.assets[assetName].clone().play();
    }
    exte.playSound = playSound;
    var RepeatSoundPlayer = (function (_super) {
        __extends(RepeatSoundPlayer, _super);
        function RepeatSoundPlayer(assetName, fadeSec, volume) {
                _super.call(this);
            this._sound = enchant.Sound.load(assetName);
            this._fadeSec = fadeSec || 5;
            this._volume = volume || 1;
            this.addEventListener(enchant.Event.ENTER_FRAME, this.enterFrame);
        }
        RepeatSoundPlayer.prototype.play = function () {
            this._sound.volume = this._volume;
            this._sound.play();
        };
        RepeatSoundPlayer.prototype.pause = function () {
            this._sound.pause();
        };
        RepeatSoundPlayer.prototype.stop = function () {
            this._sound.stop();
        };
        RepeatSoundPlayer.prototype.enterFrame = function () {
            if(this._fadeSec < (this._sound.duration - this._sound.currentTime)) {
                return;
            }
            this._sound.volume = this._volume * (this._sound.duration - this._sound.currentTime) / this._fadeSec;
            if(this._sound.volume < 0.01) {
                this._sound.currentTime = 0;
                this.play();
            }
        };
        return RepeatSoundPlayer;
    })(enchant.Node);
    exte.RepeatSoundPlayer = RepeatSoundPlayer;    
    exte.Event_SceneInput = 'exte.enchant.Event_SceneInput';
    var SceneExEvent = (function (_super) {
        __extends(SceneExEvent, _super);
        function SceneExEvent(type) {
                _super.call(this, type);
        }
        return SceneExEvent;
    })(enchant.Event);
    exte.SceneExEvent = SceneExEvent;    
    var InputPatternData = (function () {
        function InputPatternData() {
            this.index = 0;
            this.frame = 0;
            this.active = false;
        }
        return InputPatternData;
    })();
    exte.InputPatternData = InputPatternData;    
    var SceneInput = (function (_super) {
        __extends(SceneInput, _super);
        function SceneInput() {
                _super.call(this);
            this.inputPatterns = [];
            this.addEventListener(enchant.Event.ENTER_FRAME, this.enterFrame);
            var events = [
                enchant.Event.LEFT_BUTTON_DOWN, 
                enchant.Event.LEFT_BUTTON_UP, 
                enchant.Event.RIGHT_BUTTON_DOWN, 
                enchant.Event.RIGHT_BUTTON_UP, 
                enchant.Event.UP_BUTTON_DOWN, 
                enchant.Event.UP_BUTTON_UP, 
                enchant.Event.DOWN_BUTTON_DOWN, 
                enchant.Event.DOWN_BUTTON_UP, 
                enchant.Event.A_BUTTON_DOWN, 
                enchant.Event.A_BUTTON_UP, 
                enchant.Event.B_BUTTON_DOWN, 
                enchant.Event.B_BUTTON_UP
            ];
            events.forEach(function (type) {
                this.addEventListener(type, this.changeInput);
            }, this);
        }
        SceneInput.prototype.makeEvent = function (p) {
            var ev = new SceneExEvent(exte.Event_SceneInput);
            ev.eventID = p.eventID;
            ev.sec = p.frame / enchant.Core.instance.fps;
            enchant.Core.instance.currentScene.dispatchEvent(ev);
        };
        SceneInput.prototype.enterFrame = function (e) {
            this.inputPatterns.forEach(function (p) {
                if(p.active) {
                    p.frame++;
                }
            });
        };
        SceneInput.prototype.changeInput = function (e) {
            for(var i = 0; i < this.inputPatterns.length; i++) {
                var p = this.inputPatterns[i];
                if(p.pattern[p.index] != e.type) {
                    p.index = 0;
                    p.frame = 0;
                    p.active = false;
                    continue;
                }
                if(p.index + 1 < p.pattern.length) {
                    p.index++;
                    p.active = true;
                    continue;
                }
                if(p.loop) {
                    p.active = true;
                    if(p.frame < p.framelimit) {
                        continue;
                    }
                    this.makeEvent(p);
                    p.frame = 0;
                } else {
                    if(p.frame <= p.framelimit) {
                        this.makeEvent(p);
                    }
                    p.index = 0;
                    p.frame = 0;
                    p.active = false;
                }
            }
        };
        SceneInput.prototype.regist = function (eventID, pattern, timelimit, loop) {
            var data = new InputPatternData();
            data.eventID = eventID;
            data.pattern = pattern;
            data.framelimit = Math.floor((timelimit || 1) * enchant.Core.instance.fps);
            data.loop = (loop === true);
            this.inputPatterns.push(data);
        };
        return SceneInput;
    })(enchant.Scene);
    exte.SceneInput = SceneInput;    
    exte.Event_SceneExStarting = 'Event_SceneExStarting';
    var SceneEx = (function (_super) {
        __extends(SceneEx, _super);
        function SceneEx(name, fadeInSec, fadeOutSec) {
                _super.call(this);
            this._opacity = 1;
            this._setFadeIn = false;
            this._setFadeOut = false;
            this._nextSceneName = '';
            this.name = name;
            SceneEx._scenes[name] = this;
            var fps = enchant.Core.instance.fps;
            var s = (fadeInSec == undefined) ? 0.5 : fadeInSec;
            if(0 < s) {
                this._fadeInStep = 1 / (s * fps);
                this.addEventListener(exte.Event_SceneExStarting, function (e) {
                    this._setFadeIn = true;
                    this.opacity = 0;
                });
            }
            s = (fadeOutSec == undefined) ? 0.5 : fadeOutSec;
            this._fadeOutStep = (s == 0) ? 1 : 1 / (s * fps);
            this.addEventListener(enchant.Event.ENTER_FRAME, this.enterFrame);
        }
        SceneEx._scenes = [];
        SceneEx.prototype.enterFrame = function (e) {
            if(this._setFadeIn && this._fadeIn()) {
                this._setFadeIn = false;
            }
            if(this._setFadeOut && this._fadeOut()) {
                this._setFadeOut = false;
                this.sceneNext();
            }
        };
        SceneEx.prototype.sceneNext = function () {
            var scene = SceneEx._scenes[this._nextSceneName];
            scene.dispatchEvent(new enchant.Event(exte.Event_SceneExStarting));
            if(scene === this) {
                scene.dispatchEvent(new enchant.Event(enchant.Event.ENTER));
            } else {
                enchant.Core.instance.replaceScene(scene);
            }
        };
        SceneEx.prototype._fadeIn = function () {
            if((1 - this._fadeInStep) <= this.opacity) {
                this.opacity = 1;
                return true;
            } else {
                this.opacity += this._fadeInStep;
                return false;
            }
        };
        SceneEx.prototype._fadeOut = function () {
            if(this.opacity <= this._fadeOutStep) {
                this.opacity = 0;
                return true;
            } else {
                this.opacity -= this._fadeOutStep;
                return false;
            }
        };
        SceneEx.prototype._setOpacityChilds = function (me, opct) {
            if(me.childNodes === undefined) {
                return;
            }
            for(var i = 0; i < me.childNodes.length; i++) {
                var node = me.childNodes[i];
                if(node.opacity !== undefined) {
                    node.opacity = opct;
                }
                this._setOpacityChilds(node, opct);
            }
        };
        Object.defineProperty(SceneEx.prototype, "fadeProsessing", {
            get: function () {
                return this._setFadeIn || this._setFadeOut;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneEx.prototype, "opacity", {
            get: function () {
                return this._opacity;
            },
            set: function (v) {
                this._opacity = v;
                this._setOpacityChilds(this, v);
            },
            enumerable: true,
            configurable: true
        });
        SceneEx.prototype.moveSceneTo = function (name) {
            this._nextSceneName = name;
            this._setFadeOut = true;
        };
        return SceneEx;
    })(SceneInput);
    exte.SceneEx = SceneEx;    
    function addFadeOutText(group, targetsprite, text, sec) {
        if(enchant.ui.MutableText === undefined) {
            return;
        }
        var mt = new enchant.ui.MutableText(targetsprite.x, targetsprite.y);
        mt.text = text;
        var fedingValue = 1 / (enchant.Core.instance.fps * (sec || 1));
        mt.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
            mt.opacity -= fedingValue;
            if(mt.opacity < fedingValue) {
                group.removeChild(mt);
            }
        });
        group.addChild(mt);
    }
    exte.addFadeOutText = addFadeOutText;
    function keyBind(key, button) {
        var game = enchant.Core.instance;
        game.keybind(key[0].toUpperCase().charCodeAt(0), button);
        game.keybind(key[0].toLowerCase().charCodeAt(0), button);
    }
    exte.keyBind = keyBind;
    exte.Event_TimerTimeOut = 'Event_TimerTimeout';
    var Timer = (function (_super) {
        __extends(Timer, _super);
        function Timer() {
                _super.call(this);
            this._frame = 0;
            this._startFrame = 0;
            this._active = false;
            this._frame = 0;
            this._startFrame = 0;
            this._active = false;
            this.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
                if(!this._active) {
                    return;
                }
                this._frame--;
                if(0 < this._frame) {
                    return;
                }
                enchant.Core.instance.currentScene.dispatchEvent(new enchant.Event(exte.Event_TimerTimeOut));
                this._frame = this._startFrame;
            });
        }
        Timer.prototype.start = function (sec) {
            if(typeof sec == 'number') {
                this._frame = this._startFrame = sec * enchant.Core.instance.fps;
            }
            this._active = (0 < this._startFrame);
        };
        Timer.prototype.stop = function () {
            this._active = false;
        };
        return Timer;
    })(enchant.Node);
    exte.Timer = Timer;    
    function inputToRad() {
        var input = enchant.Core.instance.input;
        if(input.down && input.right) {
            return Math.PI * 0.25;
        }
        if(input.down && input.left) {
            return Math.PI * 0.75;
        }
        if(input.up && input.left) {
            return Math.PI * 1.25;
        }
        if(input.up && input.right) {
            return Math.PI * 1.75;
        }
        if(input.right) {
            return 0;
        }
        if(input.down) {
            return Math.PI * 0.5;
        }
        if(input.up) {
            return Math.PI * 1.5;
        }
        if(input.left) {
            return Math.PI;
        }
        return Number.NaN;
    }
    exte.inputToRad = inputToRad;
    function collision2Sprites(sprite1, sprite2) {
        if(sprite1.rotation == 0 && sprite2.rotation == 0) {
            return sprite1.intersect(sprite2);
        }
        var a = new Array(9);
        var b = new Array(9);
        a[0] = {
            X: sprite1.x,
            Y: sprite1.y
        };
        a[1] = {
            X: sprite1.x + sprite1.width,
            Y: sprite1.y
        };
        a[2] = {
            X: sprite1.x + sprite1.width,
            Y: sprite1.y + sprite1.height
        };
        a[3] = {
            X: sprite1.x,
            Y: sprite1.y + sprite1.height
        };
        a[4] = {
            X: sprite1.x,
            Y: sprite1.y
        };
        a[5] = {
            X: sprite1.x + sprite1.width / 2,
            Y: sprite1.y
        };
        a[6] = {
            X: sprite1.x + sprite1.width / 2,
            Y: sprite1.y + sprite1.height
        };
        a[7] = {
            X: sprite1.x,
            Y: sprite1.y + sprite1.height / 2
        };
        a[8] = {
            X: sprite1.x + sprite1.width,
            Y: sprite1.y + sprite1.height / 2
        };
        b[0] = {
            X: sprite2.x,
            Y: sprite2.y
        };
        b[1] = {
            X: sprite2.x + sprite2.width,
            Y: sprite2.y
        };
        b[2] = {
            X: sprite2.x + sprite2.width,
            Y: sprite2.y + sprite2.height
        };
        b[3] = {
            X: sprite2.x,
            Y: sprite2.y + sprite2.height
        };
        b[4] = {
            X: sprite2.x,
            Y: sprite2.y
        };
        b[5] = {
            X: sprite2.x + sprite2.width / 2,
            Y: sprite2.y
        };
        b[6] = {
            X: sprite2.x + sprite2.width / 2,
            Y: sprite2.y + sprite2.height
        };
        b[7] = {
            X: sprite2.x,
            Y: sprite2.y + sprite2.height / 2
        };
        b[8] = {
            X: sprite2.x + sprite2.width,
            Y: sprite2.y + sprite2.height / 2
        };
        for(var i = 0; i < a.length; i++) {
            a[i].X -= (sprite1.x + sprite1.width / 2);
            a[i].Y -= (sprite1.y + sprite1.height / 2);
        }
        for(var i = 0; i < b.length; i++) {
            b[i].X -= (sprite2.x + sprite2.width / 2);
            b[i].Y -= (sprite2.y + sprite2.height / 2);
        }
        for(var i = 0; i < a.length; i++) {
            var tmpX = a[i].X;
            var tmpY = a[i].Y;
            a[i].X = tmpX * Math.cos(sprite1.rotation * Math.PI / 180) - tmpY * Math.sin(sprite1.rotation * Math.PI / 180);
            a[i].Y = tmpX * Math.sin(sprite1.rotation * Math.PI / 180) + tmpY * Math.cos(sprite1.rotation * Math.PI / 180);
        }
        for(var i = 0; i < b.length; i++) {
            var tmpX = b[i].X;
            var tmpY = b[i].Y;
            b[i].X = tmpX * Math.cos(sprite2.rotation * Math.PI / 180) - tmpY * Math.sin(sprite2.rotation * Math.PI / 180);
            b[i].Y = tmpX * Math.sin(sprite2.rotation * Math.PI / 180) + tmpY * Math.cos(sprite2.rotation * Math.PI / 180);
        }
        for(var i = 0; i < a.length; i++) {
            a[i].X += (sprite1.x + sprite1.width / 2);
            a[i].Y += (sprite1.y + sprite1.height / 2);
        }
        for(var i = 0; i < b.length; i++) {
            b[i].X += (sprite2.x + sprite2.width / 2);
            b[i].Y += (sprite2.y + sprite2.height / 2);
        }
        for(var i = 0; i < a.length - 1; i++) {
            for(var j = 0; j < b.length - 1; j++) {
                var penetrate1 = (a[i + 1].X - a[i].X) * (b[j].Y - a[i].Y) - (a[i + 1].Y - a[i].Y) * (b[j].X - a[i].X);
                var penetrate2 = (a[i + 1].X - a[i].X) * (b[j + 1].Y - a[i].Y) - (a[i + 1].Y - a[i].Y) * (b[j + 1].X - a[i].X);
                var penetrate3 = (b[j + 1].X - b[j].X) * (a[i].Y - b[j].Y) - (b[j + 1].Y - b[j].Y) * (a[i].X - b[j].X);
                var penetrate4 = (b[j + 1].X - b[j].X) * (a[i + 1].Y - b[j].Y) - (b[j + 1].Y - b[j].Y) * (a[i + 1].X - b[j].X);
                if(penetrate1 * penetrate2 < 0 && penetrate3 * penetrate4 < 0) {
                    return true;
                }
            }
        }
        return false;
    }
    exte.collision2Sprites = collision2Sprites;
    function setMazeData(map, rowNum, columnNum, floorNo, wallNo, addframe) {
        var mapData1 = [];
        var mapData2 = [];
        var collisionData = map.collisionData;
        for(var row = 0; row < rowNum; row++) {
            mapData1.push([]);
            mapData2.push([]);
            for(var column = 0; column < columnNum; column++) {
                mapData1[row].push(floorNo);
                mapData2[row].push(collisionData[row][column] ? wallNo : -1);
            }
        }
        map.loadData(mapData1, mapData2);
    }
    exte.setMazeData = setMazeData;
    function stringWidth(surface, str) {
        return surface.context.measureText(str).width;
    }
    exte.stringWidth = stringWidth;
    function isOutOfScreen(obj, padding) {
        var game = enchant.Core.instance;
        padding = padding | 0;
        return obj.x + obj.width < padding || obj.y + obj.height < padding || game.width - padding < obj.x || game.height - padding < obj.y;
    }
    exte.isOutOfScreen = isOutOfScreen;
    function createSimpleMap(assetName, tileSize, rowNum, columnNum, no, tlNo, tNo, trNo, lNo, rNo, blNo, bNo, brNo) {
        tlNo = tlNo || no;
        tNo = tNo || no;
        trNo = trNo || no;
        lNo = lNo || no;
        rNo = rNo || no;
        blNo = blNo || no;
        bNo = bNo || no;
        brNo = brNo || no;
        var data = [];
        for(var row = 0; row < rowNum; row++) {
            var rowData;
            if(row == 0) {
                rowData = makeValues(tNo, columnNum);
                rowData[0] = tlNo;
                rowData[columnNum - 1] = trNo;
            } else {
                if(row + 1 < rowNum) {
                    rowData = makeValues(no, columnNum);
                    rowData[0] = lNo;
                    rowData[columnNum - 1] = rNo;
                } else {
                    rowData = makeValues(bNo, columnNum);
                    rowData[0] = blNo;
                    rowData[columnNum - 1] = brNo;
                }
            }
            data.push(rowData);
        }
        var map = new enchant.Map(tileSize, tileSize);
        map.image = enchant.Core.instance.assets[assetName];
        map.loadData(data);
        return map;
    }
    exte.createSimpleMap = createSimpleMap;
    function createSampleMap(typeNo, rowNum, columnNum, assetName) {
        if(assetName === undefined) {
            assetName = 'map1.png';
        }
        switch(typeNo) {
            case 0: {
                return createSimpleMap(assetName, 16, rowNum, columnNum, 33);

            }
            case 1: {
                return createSimpleMap(assetName, 16, rowNum, columnNum, 36);

            }
            case 2: {
                return createSimpleMap(assetName, 16, rowNum, columnNum, 6);

            }
            case 3: {
                return createSimpleMap(assetName, 16, rowNum, columnNum, 7);

            }
            case 4: {
                return createSimpleMap(assetName, 16, rowNum, columnNum, 97);

            }
            case 5: {
                return createSimpleMap(assetName, 16, rowNum, columnNum, 100);

            }
            case 6: {
                return createSimpleMap(assetName, 16, rowNum, columnNum, 161);

            }
            case 7: {
                return createSimpleMap(assetName, 16, rowNum, columnNum, 164);

            }
            case 8: {
                return createSimpleMap(assetName, 16, rowNum, columnNum, 225);

            }
            case 9: {
                return createSimpleMap(assetName, 16, rowNum, columnNum, 228);

            }
            case 10: {
                return createSimpleMap(assetName, 16, rowNum, columnNum, 33, 16, 17, 18, 32, 34, 48, 49, 50);

            }
            case 11: {
                return createSimpleMap(assetName, 16, rowNum, columnNum, 100, 83, 84, 85, 99, 101, 115, 116, 117);

            }
            case 12: {
                return createSimpleMap(assetName, 16, rowNum, columnNum, 161, 144, 145, 146, 160, 162, 176, 177, 178);

            }
            case 13: {
                return createSimpleMap(assetName, 16, rowNum, columnNum, 164, 147, 148, 149, 163, 165, 179, 180, 181);

            }
            case 14: {
                return createSimpleMap(assetName, 16, rowNum, columnNum, 228, 211, 212, 213, 227, 229, 243, 244, 245);

            }
        }
        return createSimpleMap(assetName, 16, rowNum, columnNum, 0);
    }
    exte.createSampleMap = createSampleMap;
    var LogList = (function (_super) {
        __extends(LogList, _super);
        function LogList(x, y, width, height, backgroundColor) {
                _super.call(this);
            this.fadeIn = 0.1;
            this.fadeOut = 0.1;
            this.scrollPx = 2;
            this.lineHeight = 10;
            this.color = null;
            this.backgroundColor = null;
            this.font = null;
            this.textAlign = null;
            this.adjustWidth = true;
            this.stackLimit = 0;
            this._labels = [];
            this._texts = [];
            this._currentWork = 0;
            this._fadeInLabel = null;
            this._fadeOutLabel = null;
            this._scrollNum = 0;
            this._outAllLog = false;
            this._visible = true;
            this.x = x;
            this.y = y;
            this._width = width;
            this._height = height;
            if(backgroundColor) {
                var back = createRectangleSprite(width, height, backgroundColor, true);
                this.addChild(back);
            }
            this.addEventListener(enchant.Event.ENTER_FRAME, this.enterFrame);
        }
        Object.defineProperty(LogList.prototype, "width", {
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LogList.prototype, "height", {
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        LogList.prototype.createLabel = function () {
            var labelData = new LogLabelData();
            labelData.label = new enchant.Label('');
            if(this.adjustWidth) {
                labelData.label.width = this.width;
            }
            labelData.label.visible = false;
            if(this.font) {
                labelData.label.font = this.font;
            }
            this.addChild(labelData.label);
            this._labels.push(labelData);
            return labelData;
        };
        LogList.prototype.enterFrame0 = function () {
            if(this._texts.length == 0) {
                return;
            }
            this._outAllLog = this._outAllLog ? 0 < this._texts.length : 0 < this.stackLimit && this.stackLimit <= this._texts.length;
            var t = this._texts.shift();
            var labelData = null;
            for(var i = 0; i < this._labels.length; i++) {
                if(!this._labels[i].valid) {
                    labelData = this._labels[i];
                    break;
                }
            }
            if(labelData === null) {
                labelData = this.createLabel();
                labelData.valid = false;
            }
            var label = labelData.label;
            label.x = 0;
            label.y = 0;
            label.text = t.text;
            if(t.font) {
                label.font = t.font;
            }
            if(t.color) {
                label.color = t.color;
            }
            if(t.backgroundColor) {
                label.backgroundColor = t.backgroundColor;
            }
            label.height = t.lineHeight || 10;
            label.opacity = 0;
            label.textAlign = t.textAlign || 'left';
            this._fadeInLabel = labelData;
            this._scrollNum = label.height;
            var bottom = 0;
            for(var i = 0; i < this._labels.length; i++) {
                var l = this._labels[i];
                if(!l.valid) {
                    continue;
                }
                var b = l.label.y + l.label.height;
                if(bottom < b) {
                    bottom = b;
                    this._fadeOutLabel = l;
                }
            }
            if(this.height < (bottom + label.height)) {
                this._currentWork = 1;
            } else {
                this._currentWork = 2;
            }
        };
        LogList.prototype.enterFrame1 = function () {
            if(this._outAllLog || this._fadeOutLabel.label.opacity < this.fadeOut) {
                this._fadeOutLabel.label.opacity = 0;
                this._fadeOutLabel.label.visible = false;
                this._fadeOutLabel.valid = false;
                this._currentWork = 2;
            } else {
                this._fadeOutLabel.label.opacity -= this.fadeOut;
            }
        };
        LogList.prototype.enterFrame2 = function () {
            if(0 < this._scrollNum) {
                var px = (this._outAllLog || this._scrollNum <= this.scrollPx) ? this._scrollNum : this.scrollPx;
                for(var i = 0; i < this._labels.length; i++) {
                    var l = this._labels[i];
                    if(l.label.visible) {
                        l.label.y += px;
                    }
                }
                this._scrollNum -= px;
            }
            if(this._scrollNum <= 0) {
                this._currentWork = 3;
                this._fadeInLabel.label.visible = true;
                this._fadeInLabel.valid = true;
            }
        };
        LogList.prototype.enterFrame3 = function () {
            if(this._outAllLog || (1 - this.fadeIn) < this._fadeInLabel.label.opacity) {
                this._fadeInLabel.label.opacity = 1;
                this._currentWork = 0;
            } else {
                this._fadeInLabel.label.opacity += this.fadeIn;
            }
        };
        LogList.prototype.enterFrame = function (e) {
            switch(this._currentWork) {
                case 0: {
                    this.enterFrame0();
                    break;

                }
                case 1: {
                    this.enterFrame1();
                    break;

                }
                case 2: {
                    this.enterFrame2();
                    break;

                }
                case 3: {
                    this.enterFrame3();
                    break;

                }
            }
        };
        Object.defineProperty(LogList.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (v) {
                if(this._visible == v) {
                    return;
                }
                this._visible = v;
                for(var i = 0; i < this._labels.length; i++) {
                    var l = this._labels[i];
                    l.label.visible = v && l.valid;
                }
            },
            enumerable: true,
            configurable: true
        });
        LogList.prototype.regist = function (text, color, font, lineHeight, textAlign, backgroundColor) {
            this._texts.push(new LogTextData(text, color || this.color, font || this.font, lineHeight || this.lineHeight, textAlign || this.textAlign, backgroundColor || this.backgroundColor));
        };
        LogList.prototype.outAllLog = function () {
            this._outAllLog = true;
        };
        LogList.prototype.clear = function () {
            this._texts.length = 0;
            for(var i = 0; i < this._labels.length; i++) {
                var l = this._labels[i];
                l.label.visible = l.valid = false;
            }
            this._currentWork = 0;
        };
        return LogList;
    })(enchant.Group);
    exte.LogList = LogList;    
    var LogTextData = (function () {
        function LogTextData(text, color, font, lineHeight, textAlign, backgroundColor) {
            this.text = text;
            this.color = color;
            this.font = font;
            this.lineHeight = lineHeight;
            this.textAlign = textAlign;
            this.backgroundColor = backgroundColor;
        }
        return LogTextData;
    })();    
    var LogLabelData = (function () {
        function LogLabelData() {
            this.valid = false;
        }
        return LogLabelData;
    })();    
    function createRectangleSurface(width, height, color, fill) {
        var s = new enchant.Surface(width, height);
        var c = s.context;
        if(fill) {
            c.fillStyle = color;
            c.fillRect(0, 0, width, height);
        } else {
            c.strokeStyle = color;
            c.strokeRect(0, 0, width, height);
        }
        return s;
    }
    exte.createRectangleSurface = createRectangleSurface;
    function createRectangleSprite(width, height, color, fill) {
        var sprite = new enchant.Sprite(width, height);
        sprite.image = createRectangleSurface(width, height, color, fill);
        return sprite;
    }
    exte.createRectangleSprite = createRectangleSprite;
    function createCircleSurface(radius, color, fill) {
        var s = new enchant.Surface(radius * 2, radius * 2);
        var c = s.context;
        var padding = c.lineWidth;
        if(fill) {
            c.fillStyle = color;
        } else {
            c.strokeStyle = color;
        }
        c.beginPath();
        c.arc(radius, radius, radius - padding, 0, Math.PI * 2, true);
        if(fill) {
            c.fill();
        } else {
            c.stroke();
        }
        return s;
    }
    exte.createCircleSurface = createCircleSurface;
    function createCircleSprite(radius, color, fill) {
        var sprite = new enchant.Sprite(radius * 2, radius * 2);
        sprite.image = createCircleSurface(radius, color, fill);
        return sprite;
    }
    exte.createCircleSprite = createCircleSprite;
    function createEllipseSurface(width, height, color, fill) {
        var s = new enchant.Surface(width, height);
        var c = s.context;
        if(fill) {
            c.fillStyle = color;
        } else {
            c.strokeStyle = color;
        }
        var halfW = width / 2;
        var halfH = height / 2;
        var padding = c.lineWidth;
        c.beginPath();
        var cw = 4 * (Math.sqrt(2) - 1) * halfW / 3;
        var ch = 4 * (Math.sqrt(2) - 1) * halfH / 3;
        c.moveTo(halfW, padding);
        c.bezierCurveTo(halfW + cw, padding, width - padding, halfH - ch, width - padding, halfH);
        c.bezierCurveTo(width - padding, halfH + ch, halfW + cw, height - padding, halfW, height - padding);
        c.bezierCurveTo(halfW - cw, height - padding, padding, halfH + ch, padding, halfH);
        c.bezierCurveTo(padding, halfH - ch, halfW - cw, padding, halfW, padding);
        if(fill) {
            c.fill();
        } else {
            c.stroke();
        }
        return s;
    }
    exte.createEllipseSurface = createEllipseSurface;
    function createEllipseSprite(width, height, color, fill) {
        var sprite = new enchant.Sprite(width, height);
        sprite.image = createEllipseSurface(width, height, color, fill);
        return sprite;
    }
    exte.createEllipseSprite = createEllipseSprite;
    function createArcSurface(radius, angle, range, color, fill) {
        var s = new enchant.Surface(radius * 2, radius * 2);
        var c = s.context;
        var padding = c.lineWidth;
        var startAngle = angle - range * 0.5;
        var endAngle = angle + range * 0.5;
        if(fill) {
            c.fillStyle = color;
        } else {
            c.strokeStyle = color;
        }
        c.beginPath();
        c.moveTo(radius, radius);
        c.arc(radius, radius, radius - padding, startAngle, endAngle, false);
        c.lineTo(radius, radius);
        if(fill) {
            c.fill();
        } else {
            c.stroke();
        }
        return s;
    }
    exte.createArcSurface = createArcSurface;
    function createArcSprite(radius, angle, range, color, fill) {
        var sprite = new enchant.Sprite(radius * 2, radius * 2);
        sprite.image = createArcSurface(radius, angle, range, color, fill);
        return sprite;
    }
    exte.createArcSprite = createArcSprite;
    var Point = (function () {
        function Point(x, y) {
            this.x = 0;
            this.y = 0;
            this.x = x || 0;
            this.y = y || 0;
        }
        Point.prototype.getDistance = function (point) {
            var dx = point.x - this.x;
            var dy = point.y - this.y;
            return Math.sqrt(dx * dx + dy * dy);
        };
        Point.prototype.isEqual = function (point) {
            return point.x == this.x && point.y == this.y;
        };
        Point.prototype.clone = function () {
            return new Point(this.x, this.y);
        };
        return Point;
    })();
    exte.Point = Point;    
    var Line = (function () {
        function Line(x1, y1, x2, y2) {
            this.posS = new Point(x1, y1);
            this.posE = new Point(x2, y2);
        }
        Object.defineProperty(Line.prototype, "dx", {
            get: function () {
                return this.posE.x - this.posS.x;
            },
            set: function (v) {
                this.posE.x = this.posS.x + v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Line.prototype, "dy", {
            get: function () {
                return this.posE.y - this.posS.y;
            },
            set: function (v) {
                this.posE.y = this.posS.y + v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Line.prototype, "length", {
            get: function () {
                return this.posS.getDistance(this.posE);
            },
            set: function (dstL) {
                var srcL = this.length;
                this.posE.x = this.posS.x + Math.floor(this.dx * dstL / srcL);
                this.posE.y = this.posS.y + Math.floor(this.dy * dstL / srcL);
            },
            enumerable: true,
            configurable: true
        });
        Line.prototype.isCross = function (line) {
            var vax = this.dx;
            var vay = this.dy;
            var nx = -vay;
            var ny = vax;
            var length = this.length;
            if(0 < length) {
                length = 1 / length;
            }
            nx *= length;
            ny *= length;
            var vbx = line.dx;
            var vby = line.dy;
            var d = -(this.posS.x * nx + this.posS.y * ny);
            var bunbo = (nx * vbx + ny * vby);
            if(bunbo == 0) {
                return false;
            }
            var t = -(nx * line.posS.x + ny * line.posS.y + d) / bunbo;
            if(t <= 0 || 1 < t) {
                return false;
            }
            var hitX = line.posS.x + vbx * t;
            var hitY = line.posS.y + vby * t;
            var doc = ((this.posS.x - hitX) * (this.posE.x - hitX)) + ((this.posS.y - hitY) * (this.posE.y - hitY));
            return (doc < 0);
        };
        Line.prototype.createSurface = function (color, width) {
            var x1 = 0, y1, x2, y2;
            if((this.posS.x < this.posE.x) == (this.posS.y < this.posE.y)) {
                y1 = 0;
                x2 = Math.abs(this.dx);
                y2 = Math.abs(this.dy);
            } else {
                y1 = Math.abs(this.dy);
                x2 = Math.abs(this.dx);
                y2 = 0;
            }
            var s = new enchant.Surface(Math.abs(this.dx), Math.abs(this.dy));
            var c = s.context;
            c.strokeStyle = color;
            c.lineWidth = width || 1;
            c.beginPath();
            c.moveTo(x1, y1);
            c.lineTo(x2, y2);
            c.stroke();
            return s;
        };
        Line.prototype.createSprite = function (color, width) {
            var s = this.createSurface(color, width);
            var sprite = new enchant.Sprite(s.width, s.height);
            sprite.x = Math.min(this.posS.x, this.posE.x);
            sprite.y = Math.min(this.posS.y, this.posE.y);
            sprite.image = s;
            return sprite;
        };
        Line.prototype.clone = function () {
            return new Line(this.posS.x, this.posS.y, this.posE.x, this.posE.y);
        };
        return Line;
    })();
    exte.Line = Line;    
    var Area = (function (_super) {
        __extends(Area, _super);
        function Area(x, y, width, height) {
                _super.call(this, x, y);
            this.width = width || 0;
            this.height = height || 0;
        }
        Object.defineProperty(Area.prototype, "top", {
            get: function () {
                return this.y;
            },
            set: function (t) {
                this.y = t;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Area.prototype, "bottom", {
            get: function () {
                return this.y + this.height;
            },
            set: function (b) {
                this.height = Math.abs(b - this.y);
                if(b < this.y) {
                    this.y = b;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Area.prototype, "left", {
            get: function () {
                return this.x;
            },
            set: function (l) {
                this.x = l;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Area.prototype, "right", {
            get: function () {
                return this.x + this.width;
            },
            set: function (r) {
                this.width = Math.abs(r - this.x);
                if(r < this.x) {
                    this.x = r;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Area.prototype, "center", {
            get: function () {
                return new Point(this.x + this.width / 2, this.y + this.height / 2);
            },
            set: function (c) {
                this.x = c.x - this.width / 2;
                this.y = c.y - this.height / 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Area.prototype, "diagonal", {
            get: function () {
                return Math.sqrt(this.width * this.width + this.height * this.height);
            },
            set: function (l) {
                var d = this.diagonal;
                if(d == 0) {
                    l *= Math.sqrt(2);
                    this.x -= Math.floor(l * 0.5);
                    this.y -= Math.floor(l * 0.5);
                    this.width = this.height = Math.floor(l);
                } else {
                    this.scale(l / d);
                }
            },
            enumerable: true,
            configurable: true
        });
        Area.prototype.scale = function (sx, sy) {
            if(typeof sy != 'number') {
                sy = sx;
            }
            var w = this.width * sx;
            var h = this.height * sy;
            this.x += Math.floor((this.width - w) * 0.5);
            this.y += Math.floor((this.height - h) * 0.5);
            this.width = Math.floor(w);
            this.height = Math.floor(h);
        };
        Area.prototype.updateFrom = function (sprite) {
            this.x = sprite.x;
            this.y = sprite.y;
            this.height = sprite.height * sprite.scaleX;
            this.width = sprite.width * sprite.scaleY;
        };
        Area.prototype.setTo = function (sprite, updateSize) {
            sprite.x = this.x;
            sprite.y = this.y;
            if(updateSize) {
                sprite.scaleX = sprite.scaleY = 1;
                sprite.height = this.height;
                sprite.width = this.width;
            } else {
                sprite.scaleX = this.width / sprite.width;
                sprite.scaleY = this.height / sprite.height;
            }
        };
        Area.prototype.getPixels = function (surface) {
            var data = surface.context.getImageData(this.left, this.top, this.width, this.height).data;
            var result = [];
            result.length = this.height;
            for(var row = 0; row < this.height; row++) {
                result[row] = [];
                result[row].length = this.width;
                for(var column = 0; column < this.width; column++) {
                    var baseIndex = (row * this.width + column) * 4;
                    result[row][column] = {
                        r: data[baseIndex],
                        g: data[baseIndex + 1],
                        b: data[baseIndex + 2],
                        a: data[baseIndex + 3]
                    };
                }
            }
            return result;
        };
        Area.prototype.clone = function () {
            return new Area(this.x, this.y, this.width, this.height);
        };
        return Area;
    })(Point);
    exte.Area = Area;    
    var Rectangle = (function (_super) {
        __extends(Rectangle, _super);
        function Rectangle(x, y, width, height) {
                _super.call(this, x, y, width, height);
        }
        Rectangle.prototype._calcWidth = function (key) {
            return Math.floor(this.width * ((key - 1) % 3) * 0.5);
        };
        Rectangle.prototype._calcHeight = function (key) {
            return Math.floor(this.height * (2 - Math.floor((key - 1) / 3)) * 0.5);
        };
        Rectangle.prototype.hitTest = function (point) {
            return this.x < point.x && point.x < this.right && this.y < point.y && point.y < this.bottom;
        };
        Rectangle.prototype.intersectRect = function (rect) {
            return this.x < (rect.x + rect.width) && rect.x < this.right && this.y < (rect.y + rect.height) && rect.y < this.bottom;
        };
        Rectangle.prototype.intersectLine = function (line) {
            if(this.hitTest(line.posS) || this.hitTest(line.posE)) {
                return true;
            }
            return this.getSideLine(0).isCross(line) || this.getSideLine(1).isCross(line) || this.getSideLine(2).isCross(line) || this.getSideLine(3).isCross(line);
        };
        Rectangle.prototype.getPos = function (key) {
            return new Point(this.x + this._calcWidth(key), this.y + this._calcHeight(key));
        };
        Rectangle.prototype.setPos = function (key, pos) {
            this.x = pos.x - this._calcWidth(key);
            this.y = pos.y - this._calcHeight(key);
        };
        Rectangle.prototype.adjustPos = function (pos) {
            if(pos.x < this.left) {
                pos.x = this.left;
            } else {
                if(this.right < pos.x) {
                    pos.x = this.right;
                }
            }
            if(pos.y < this.top) {
                pos.y = this.top;
            } else {
                if(this.bottom < pos.y) {
                    pos.y = this.bottom;
                }
            }
        };
        Rectangle.prototype.getRandomPos = function () {
            return new Point(this.x + rand(this.width), this.y + rand(this.height));
        };
        Rectangle.prototype.getSideLine = function (no) {
            var key1, key2;
            switch(no) {
                case 0: {
                    key1 = 7;
                    key2 = 9;
                    break;

                }
                case 1: {
                    key1 = 1;
                    key2 = 3;
                    break;

                }
                case 2: {
                    key1 = 7;
                    key2 = 1;
                    break;

                }
                case 3: {
                    key1 = 9;
                    key2 = 3;
                    break;

                }
            }
            var line = new Line();
            line.posS = this.getPos(key1);
            line.posE = this.getPos(key2);
            return line;
        };
        Rectangle.prototype.getDiagonalLine = function (key) {
            var key2;
            switch(key) {
                case 1: {
                    key2 = 9;
                    break;

                }
                case 3: {
                    key2 = 7;
                    break;

                }
                case 7: {
                    key2 = 3;
                    break;

                }
                case 9: {
                    key2 = 1;
                    break;

                }
            }
            var line = new Line();
            line.posS = this.getPos(key);
            line.posE = this.getPos(key2);
            return line;
        };
        Rectangle.prototype.createSurface = function (color, fill) {
            return createRectangleSurface(this.width, this.height, color, fill);
        };
        Rectangle.prototype.createSprite = function (color, fill) {
            var s = this.createSurface(color, fill);
            var sprite = new enchant.Sprite(s.width, s.height);
            sprite.image = s;
            sprite.x = this.x;
            sprite.y = this.y;
            return sprite;
        };
        Rectangle.prototype.clone = function () {
            return new Rectangle(this.x, this.y, this.width, this.height);
        };
        return Rectangle;
    })(Area);
    exte.Rectangle = Rectangle;    
    var Circle = (function (_super) {
        __extends(Circle, _super);
        function Circle(centerX, centerY, radius) {
                _super.call(this, centerX - radius, centerY - radius, radius * 2, radius * 2);
        }
        Object.defineProperty(Circle.prototype, "radius", {
            get: function () {
                return this.width / 2;
            },
            set: function (r) {
                var v = Math.floor((r - this.radius) * 0.5);
                this.x -= v;
                this.y -= v;
                this.width = r * 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Circle.prototype, "diameter", {
            get: function () {
                return this.width;
            },
            enumerable: true,
            configurable: true
        });
        Circle.prototype.set = function (d) {
            var v = Math.floor((d - this.diameter) * 0.5);
            this.x -= v;
            this.y -= v;
            this.width = d;
        };
        Circle.prototype.hitTest = function (point) {
            return getDistance(this.center, point) < this.radius;
        };
        Circle.prototype.intersectRect = function (rect) {
            throw new Error('Circle.intersectRect is not implemented');
        };
        Circle.prototype.intersectLine = function (line) {
            throw new Error('Circle.intersectLine is not implemented');
        };
        Circle.prototype.intersectCircle = function (circle) {
            var distance = (this.diameter + circle.diameter) / 2;
            var _;
            return (_ = this.x - circle.x + (this.width - circle.width) / 2) * _ + (_ = this.y - circle.y + (this.height - circle.height) / 2) * _ < distance * distance;
        };
        Circle.prototype.adjustPos = function (pos) {
            var distance = getDistance(this.center, pos);
            if(distance < this.radius) {
                return;
            }
            var center = this.center;
            pos.x = center.x + Math.floor(this.radius * (pos.x - center.x) / distance);
            pos.y = center.y + Math.floor(this.radius * (pos.y - center.y) / distance);
        };
        Circle.prototype.getRandomPos = function () {
            var r = Math.random() * this.radius;
            var angle = Math.random() * Math.PI * 2;
            var x = this.center.x + Math.floor(Math.cos(angle) * r);
            var y = this.center.y + Math.floor(Math.sin(angle) * r);
            return new Point(x, y);
        };
        Circle.prototype.createSurface = function (color, fill) {
            return createCircleSurface(this.radius, color, fill);
        };
        Circle.prototype.createSprite = function (color, fill) {
            var s = this.createSurface(color, fill);
            var sprite = new enchant.Sprite(s.width, s.height);
            sprite.image = s;
            sprite.x = this.x;
            sprite.y = this.y;
            return sprite;
        };
        Circle.prototype.clone = function () {
            var center = this.center;
            return new Circle(center.x, center.y, this.radius);
        };
        return Circle;
    })(Area);
    exte.Circle = Circle;    
    var Ellipse = (function (_super) {
        __extends(Ellipse, _super);
        function Ellipse(centerX, centerY, width, height) {
                _super.call(this, centerX - width / 2, centerY - height / 2, width, height);
        }
        Ellipse.prototype.hitTest = function (point) {
            throw new Error('Ellipse.hitTest is not implemented');
        };
        Ellipse.prototype.intersectRect = function (rect) {
            throw new Error('Ellipse.intersectRect is not implemented');
        };
        Ellipse.prototype.intersectLine = function (line) {
            throw new Error('Ellipse.intersectLine is not implemented');
        };
        Ellipse.prototype.adjustPos = function (pos) {
            throw new Error('Ellipse.adjustPos is not implemented');
        };
        Ellipse.prototype.getRandomPos = function () {
            throw new Error('Ellipse.getRandomPos is not implemented');
        };
        Ellipse.prototype.createSurface = function (color, fill) {
            return createEllipseSurface(this.width, this.height, color, fill);
        };
        Ellipse.prototype.createSprite = function (color, fill) {
            var s = this.createSurface(color, fill);
            var sprite = new enchant.Sprite(s.width, s.height);
            sprite.image = s;
            sprite.x = this.x;
            sprite.y = this.y;
            return sprite;
        };
        Ellipse.prototype.clone = function () {
            var center = this.center;
            return new Ellipse(center.x, center.y, this.width, this.height);
        };
        return Ellipse;
    })(Area);
    exte.Ellipse = Ellipse;    
    var Arc = (function (_super) {
        __extends(Arc, _super);
        function Arc(centerX, centerY, radius, angle, range) {
                _super.call(this, centerX, centerY, radius);
            this.angle = normalinzeRad(angle | 0);
            this.range = normalinzeRad(range | 0);
        }
        Object.defineProperty(Arc.prototype, "angleStart", {
            get: function () {
                return normalinzeRad(this.angle - this.range * 0.5);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Arc.prototype, "angleEnd", {
            get: function () {
                return normalinzeRad(this.angle + this.range * 0.5);
            },
            enumerable: true,
            configurable: true
        });
        Arc.prototype.hitTest = function (point) {
            throw new Error('Arc.hitTest is not implemented');
        };
        Arc.prototype.intersectRect = function (rect) {
            throw new Error('Arc.intersectRect is not implemented');
        };
        Arc.prototype.intersectLine = function (line) {
            throw new Error('Arc.intersectLine is not implemented');
        };
        Arc.prototype.intersectCircle = function (circle) {
            throw new Error('Arc.intersectCircle is not implemented');
        };
        Arc.prototype.adjustPos = function (pos) {
            throw new Error('Arc.adjustPos is not implemented');
        };
        Arc.prototype.getRandomPos = function () {
            var r = Math.random() * this.radius;
            var angle = this.angle + Math.random() * this.range - this.range * 0.5;
            var x = this.center.x + Math.floor(Math.cos(angle) * r);
            var y = this.center.y + Math.floor(Math.sin(angle) * r);
            return new Point(x, y);
        };
        Arc.prototype.createSurface = function (color, fill) {
            return createArcSurface(this.radius, this.angle, this.range, color, fill);
        };
        Arc.prototype.createSprite = function (color, fill) {
            var s = this.createSurface(color, fill);
            var sprite = new enchant.Sprite(s.width, s.height);
            sprite.image = s;
            sprite.x = this.x;
            sprite.y = this.y;
            return sprite;
        };
        Arc.prototype.clone = function () {
            var center = this.center;
            return new Arc(center.x, center.y, this.radius, this.angle, this.range);
        };
        return Arc;
    })(Circle);
    exte.Arc = Arc;    
    var Ripple = (function (_super) {
        __extends(Ripple, _super);
        function Ripple(width, height) {
                _super.call(this, width, height);
            this._active = false;
            this._radius = 0;
            this._radiusMax = 0;
            this._radiusLimit = 0;
            this._speed = 1;
            this.image = new enchant.Surface(width, height);
            this.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
                if(!this._active) {
                    return;
                }
                this._radius += this._speed;
                if(this._radius < this._radiusMax) {
                    this._draw();
                } else {
                    this.stop();
                }
            });
        }
        Ripple.prototype._draw = function () {
            var c = this.image.context;
            c.fillStyle = 'transparent';
            this.image.clear();
            c.beginPath();
            c.arc(this._center.x, this._center.y, this._radius, 0, Math.PI * 2, false);
            c.closePath();
            c.stroke();
        };
        Object.defineProperty(Ripple.prototype, "lineColor", {
            get: function () {
                return this.image.context.strokeStyle;
            },
            enumerable: true,
            configurable: true
        });
        Ripple.prototype.set = function (c) {
            this.image.context.strokeStyle = c;
        };
        Object.defineProperty(Ripple.prototype, "lineWidth", {
            get: function () {
                return this.image.context.lineWidth;
            },
            set: function (l) {
                this.image.context.lineWidth = l;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ripple.prototype, "speed", {
            get: function () {
                return this._speed;
            },
            set: function (s) {
                this._speed = s;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ripple.prototype, "radius", {
            get: function () {
                return this._radius;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ripple.prototype, "radiusMax", {
            get: function () {
                return this._radiusMax;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ripple.prototype, "radiusLimit", {
            get: function () {
                return this._radiusLimit;
            },
            set: function (r) {
                this._radiusLimit = r;
            },
            enumerable: true,
            configurable: true
        });
        Ripple.prototype.start = function (x, y) {
            this._center = new Point(x, y);
            this._active = true;
            this._radius = 0;
            if(0 < this._radiusLimit) {
                this._radiusMax = this._radiusLimit;
            } else {
                this._radiusMax = this._center.getDistance(new Point(this.width / 2 < x ? 0 : this.width, this.height / 2 < y ? 0 : this.height));
            }
            this.image.clear();
        };
        Object.defineProperty(Ripple.prototype, "active", {
            get: function () {
                return this._active;
            },
            set: function (a) {
                if(this._active == a) {
                    return;
                }
                if(a && this._radiusMax == 0) {
                    return;
                }
                this._active = a;
            },
            enumerable: true,
            configurable: true
        });
        Ripple.prototype.stop = function () {
            this._active = false;
            this._radiusMax = 0;
            this.image.clear();
        };
        return Ripple;
    })(enchant.Sprite);
    exte.Ripple = Ripple;    
    function pushWaitScene(eventEnterFrame, image) {
        var game = enchant.Core.instance;
        var scene = new enchant.Scene();
        if(image) {
            var backSprite = new enchant.Sprite(image.width, image.height);
            backSprite.x = (game.width - image.width) / 2;
            backSprite.y = (game.height - image.height) / 2;
            backSprite.image = image;
            scene.addChild(backSprite);
        }
        scene.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
            if(eventEnterFrame()) {
                game.popScene();
            }
        });
        game.pushScene(scene);
    }
    exte.pushWaitScene = pushWaitScene;
    function http2str(url) {
        try  {
            var request = new XMLHttpRequest();
            request.open("GET", url, false);
            request.send(null);
            if(request.status == 200 || request.status == 0) {
                return request.responseText;
            }
        } catch (e) {
        }
        return null;
    }
    exte.http2str = http2str;
})(exte || (exte = {}));
var exte;
(function (exte) {
    var Card = (function () {
        function Card() { }
        Card.CARD = 'card.png';
        Card.ICON = 'icon0.png';
        Card.FONT = 'font1.png';
        Card.BACK = 'enchant_normal.png';
        Card.WIDTH = 32;
        Card.HEIGHT = 48;
        Card.SUIT_SIZE = 4;
        Card.NUME_SIZE = 13;
        Card.CARD_SIZE = 52;
        Card.SPADE = 1;
        Card.HEART = 2;
        Card.DIAMOND = 3;
        Card.CLUB = 4;
        Card.ACE = 1;
        Card.JACK = 11;
        Card.QUEEN = 12;
        Card.KING = 13;
        Card.ERROR = -1;
        Card.JOKER = 0;
        Card.S01 = 1;
        Card.S02 = 2;
        Card.S03 = 3;
        Card.S04 = 4;
        Card.S05 = 5;
        Card.S06 = 6;
        Card.S07 = 7;
        Card.S08 = 8;
        Card.S09 = 9;
        Card.S10 = 10;
        Card.S11 = 11;
        Card.S12 = 12;
        Card.S13 = 13;
        Card.H01 = 14;
        Card.H02 = 15;
        Card.H03 = 16;
        Card.H04 = 17;
        Card.H05 = 18;
        Card.H06 = 19;
        Card.H07 = 20;
        Card.H08 = 21;
        Card.H09 = 22;
        Card.H10 = 23;
        Card.H11 = 24;
        Card.H12 = 25;
        Card.H13 = 26;
        Card.D01 = 27;
        Card.D02 = 28;
        Card.D03 = 29;
        Card.D04 = 30;
        Card.D05 = 31;
        Card.D06 = 32;
        Card.D07 = 33;
        Card.D08 = 34;
        Card.D09 = 35;
        Card.D10 = 36;
        Card.D11 = 37;
        Card.D12 = 38;
        Card.D13 = 39;
        Card.C01 = 40;
        Card.C02 = 41;
        Card.C03 = 42;
        Card.C04 = 43;
        Card.C05 = 44;
        Card.C06 = 45;
        Card.C07 = 46;
        Card.C08 = 47;
        Card.C09 = 48;
        Card.C10 = 49;
        Card.C11 = 50;
        Card.C12 = 51;
        Card.C13 = 52;
        Card.SA = Card.S01;
        Card.SJ = Card.S11;
        Card.SQ = Card.S12;
        Card.SK = Card.S13;
        Card.HA = Card.H01;
        Card.HJ = Card.H11;
        Card.HQ = Card.H12;
        Card.HK = Card.H13;
        Card.DA = Card.D01;
        Card.DJ = Card.D11;
        Card.DQ = Card.D12;
        Card.DK = Card.D13;
        Card.CA = Card.C01;
        Card.CJ = Card.C11;
        Card.CQ = Card.C12;
        Card.CK = Card.C13;
        Card.getSuit = function getSuit(card) {
            if(card == Card.JOKER) {
                return Card.JOKER;
            }
            if(card <= Card.ERROR || Card.CARD_SIZE < card) {
                return Card.ERROR;
            }
            return Math.floor((card + Card.NUME_SIZE - 1) / Card.NUME_SIZE);
        }
        Card.getNumber = function getNumber(card) {
            if(card == Card.JOKER) {
                return Card.JOKER;
            }
            if(card <= Card.ERROR || Card.CARD_SIZE < card) {
                return Card.ERROR;
            }
            return (card - 1) % Card.NUME_SIZE + 1;
        }
        Card.getData = function getData(suit, no) {
            if(suit == Card.JOKER || no == Card.JOKER) {
                return Card.JOKER;
            }
            if(suit <= Card.ERROR || Card.SUIT_SIZE < suit || no <= Card.ERROR || Card.NUME_SIZE < no) {
                return Card.ERROR;
            }
            return (suit - 1) * Card.NUME_SIZE + no;
        }
        Card.getCard = function getCard(data) {
            if(data <= Card.ERROR || Card.CARD_SIZE < data) {
                return null;
            }
            var image = new enchant.Surface(Card.WIDTH * 2, Card.HEIGHT);
            var assetName = enchant.Core.instance.assets[Card.CARD];
            var x = (Card.getNumber(data) - 1) * Card.WIDTH;
            var y = (Card.getSuit(data) - 1) * Card.HEIGHT;
            image.draw(assetName, x, y, Card.WIDTH, Card.HEIGHT, 0, 0, Card.WIDTH, Card.HEIGHT);
            image.draw(assetName, Card.WIDTH, Card.HEIGHT * 4, Card.WIDTH, Card.HEIGHT, Card.WIDTH, 0, Card.WIDTH, Card.HEIGHT);
            var card = new TCardSprite(Card.WIDTH, Card.HEIGHT);
            card.image = image;
            card.data = data;
            return card;
        }
        Card.setImage = function setImage() {
            var cards = new enchant.Surface(Card.WIDTH * Card.NUME_SIZE, Card.HEIGHT * (Card.SUIT_SIZE + 1));
            for(var card = Card.S01; card <= Card.CARD_SIZE; card++) {
                var x = (Card.getNumber(card) - 1) * Card.WIDTH;
                var y = (Card.getSuit(card) - 1) * Card.HEIGHT;
                cards.draw(Card.drawCard(card), 0, 0, Card.WIDTH, Card.HEIGHT, x, y, Card.WIDTH, Card.HEIGHT);
            }
            ; ;
            cards.draw(Card.drawCard(Card.JOKER), 0, 0, Card.WIDTH, Card.HEIGHT, 0, Card.SUIT_SIZE * Card.HEIGHT, Card.WIDTH, Card.HEIGHT);
            cards.draw(Card.drawCard(Card.ERROR), 0, 0, Card.WIDTH, Card.HEIGHT, Card.WIDTH, Card.SUIT_SIZE * Card.HEIGHT, Card.WIDTH, Card.HEIGHT);
            enchant.Core.instance.assets[Card.CARD] = cards;
        }
        Card.drawCard = function drawCard(card) {
            var face = new enchant.Surface(Card.WIDTH, Card.HEIGHT);
            var c = face.context;
            c.fillStyle = 'white';
            c.strokeStyle = 'black';
            c.beginPath();
            c.moveTo(0, 8);
            c.quadraticCurveTo(0, 0, 8, 0);
            c.lineTo(22, 0);
            c.quadraticCurveTo(32, 0, 32, 8);
            c.lineTo(32, 40);
            c.quadraticCurveTo(32, 48, 22, 48);
            c.lineTo(8, 48);
            c.quadraticCurveTo(0, 48, 0, 40);
            c.closePath();
            c.fill();
            c.stroke();
            switch(Card.getSuit(card)) {
                case Card.JOKER: {
                    face.draw(enchant.Core.instance.assets[Card.ICON], 16 * 11, 0, 16, 16, 4, 12, 24, 24);
                    break;

                }
                case Card.ERROR: {
                    face.draw(enchant.Core.instance.assets[Card.BACK], 0, 0, 48, 48, 0, 8, 32, 32);
                    break;

                }
                default: {
                    var sx = Card.getSuit(card) == Card.SPADE ? 48 : Card.getSuit(card) == Card.HEART ? 96 : Card.getSuit(card) == Card.DIAMOND ? 80 : Card.getSuit(card) == Card.CLUB ? 64 : 0;
                    face.draw(enchant.Core.instance.assets[Card.ICON], sx, 64, 16, 16, 8, 4, 16, 16);
                    var fontAssetName = enchant.Core.instance.assets[Card.FONT];
                    if(Card.getNumber(card) == 10) {
                        face.draw(fontAssetName, 16, 16, 16, 16, 1, 26, 16, 16);
                        face.draw(fontAssetName, 0, 16, 16, 16, 13, 26, 16, 16);
                    } else {
                        var nm = Card.getNumber(card) == Card.ACE ? [
                            16, 
                            32
                        ] : Card.getNumber(card) == 2 ? [
                            32, 
                            16
                        ] : Card.getNumber(card) == 3 ? [
                            48, 
                            16
                        ] : Card.getNumber(card) == 4 ? [
                            64, 
                            16
                        ] : Card.getNumber(card) == 5 ? [
                            80, 
                            16
                        ] : Card.getNumber(card) == 6 ? [
                            96, 
                            16
                        ] : Card.getNumber(card) == 7 ? [
                            112, 
                            16
                        ] : Card.getNumber(card) == 8 ? [
                            128, 
                            16
                        ] : Card.getNumber(card) == 9 ? [
                            144, 
                            16
                        ] : Card.getNumber(card) == Card.JACK ? [
                            160, 
                            32
                        ] : Card.getNumber(card) == Card.QUEEN ? [
                            16, 
                            48
                        ] : Card.getNumber(card) == Card.KING ? [
                            176, 
                            32
                        ] : [
                            0, 
                            0
                        ];
                        face.draw(fontAssetName, nm[0], nm[1], 16, 16, 10, 26, 16, 16);
                    }
                    break;

                }
            }
            return face;
        }
        return Card;
    })();
    exte.Card = Card;    
    var TCardSprite = (function (_super) {
        __extends(TCardSprite, _super);
        function TCardSprite(width, height) {
                _super.call(this, width, height);
        }
        return TCardSprite;
    })(enchant.Sprite);
    exte.TCardSprite = TCardSprite;    
})(exte || (exte = {}));
var exte;
(function (exte) {
    var Dice = (function (_super) {
        __extends(Dice, _super);
        function Dice() {
                _super.call(this, Dice.WIDTH, Dice.HEIGHT);
            this.image = new enchant.Surface(Dice.WIDTH * Dice.MAXNUM, Dice.HEIGHT);
            for(var i = 0; i < Dice.MAXNUM; i++) {
                this.image.draw(this.drawFace(i + 1), i * Dice.WIDTH, 0);
            }
        }
        Dice.IMAGE = 'icon0.png';
        Dice.WIDTH = 24;
        Dice.HEIGHT = 34;
        Dice.MAXNUM = 6;
        Object.defineProperty(Dice.prototype, "value", {
            get: function () {
                return this.frame;
            },
            set: function (num) {
                if(0 < num && num <= Dice.MAXNUM) {
                    this.frame = num - 1;
                }
            },
            enumerable: true,
            configurable: true
        });
        Dice.prototype.drawFace = function (top) {
            var num = [];
            top == 1 ? num.push(64, 80, 96) : top == 2 ? num.push(80, 96, 144) : top == 3 ? num.push(96, 144, 128) : top == 4 ? num.push(112, 128, 64) : top == 5 ? num.push(128, 64, 112) : top == 6 ? num.push(144, 112, 80) : num.push(0, 0, 0);
            var face = new enchant.Surface(Dice.WIDTH, Dice.HEIGHT);
            var c = face.context;
            c.moveTo(12, 0);
            c.lineTo(24, 12);
            c.lineTo(24, 24);
            c.lineTo(12, 34);
            c.lineTo(0, 24);
            c.lineTo(0, 12);
            c.closePath();
            c.fill();
            var rad = 45 * Math.PI / 180;
            face.context.setTransform(1, 1, -1, 1, 12, -5);
            face.draw(enchant.Core.instance.assets[Dice.IMAGE], num[0], 32, 16, 16, 0, 0, 16, 16);
            face.context.setTransform(1, 1, 0, 1, -2, 7);
            face.draw(enchant.Core.instance.assets[Dice.IMAGE], num[1], 32, 16, 16, 0, 0, 16, 16);
            face.context.setTransform(1, -1, 0, 1, 10, 23);
            face.draw(enchant.Core.instance.assets[Dice.IMAGE], num[2], 32, 16, 16, 0, 0, 16, 16);
            return face;
        };
        return Dice;
    })(enchant.Sprite);
    exte.Dice = Dice;    
})(exte || (exte = {}));
