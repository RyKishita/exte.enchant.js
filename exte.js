// enchant.js拡張ライブラリ
// The MIT License
// Copyright (c) 2012 Ryuuma Kishita

if (exte) throw new Error('"exte" is used.');
var exte =

(function () {
    "use strict";

    // 実行端末取得
    var getUserAgent = function () {
        var ua = navigator.userAgent;
        if ((ua.indexOf('iPhone') > 0 && ua.indexOf('iPad') == -1) ||
            ua.indexOf('iPod') > 0) {
            return "iOS";
        } else if (ua.indexOf('Android') > 0) {
            return "Android";
        } else if (ua.indexOf('Chrome') > 0) {
            return "Chrome";
        } else if (ua.indexOf('Firefox') > 0) {
            return "Firefox";
        } else if (ua.indexOf('Opera') > 0) {
            return "Opera";
        }
        return "Other";//IE?
    };

    // アイコンSurface作成
    // @param {整数} [index] アイコンイメージ内のインデックス
    // @param {整数} [count] index~index+count-1をイメージに含める(同じ行内)。初期値は1
    // @param {String} [assetName] アイコンイメージファイル(アセット名)。初期値は'icon0.gif'
    // @param {整数} [width] アイコン1つ分の幅。初期値は16
    // @param {整数} [height] アイコン1つ分の高さ。初期値は16 
    // @param {整数} [columnNum] assetName内の一行にあるアイコン数。初期値は16('icon0.gif'を想定)
    // @return {Surface} 結果
    var createIconSurface = function (index, count, assetName, width, height, columnNum) {
        count = count || 1;
        assetName = assetName || 'icon0.gif';
        width = width || 16;
        height = height || 16;
        columnNum = columnNum || 16;

        var x = (index % columnNum) * width;
        var y = Math.floor(index / columnNum) * height;

        var image = new Surface(width * count, height);
        image.draw(
            enchant.Game.instance.assets[assetName],
            x, y, width * count, height,
            0, 0, width * count, height);
        return image;
    };

    // アイコンSprite作成
    // @param {整数} [index] アイコンイメージ内のインデックス
    // @param {整数} [count] index~index+count-1をイメージに含める(同じ行内)。初期値は1
    // @param {String} [assetName] アイコンイメージファイル(アセット名)。初期値は'icon0.gif'
    // @param {整数} [width] アイコン1つ分の幅。初期値は16
    // @param {整数} [height] アイコン1つ分の高さ。初期値は16 
    // @param {整数} [columnNum] assetName内の一行にあるアイコン数。初期値は16('icon0.gif'を想定)
    // @return {Sprite} 結果
    var createIconSprite = function (index, count, assetName, width, height, columnNum) {
        var image = createIconSurface(index, count, assetName, width, height, columnNum);

        width = width || image.width;
        height = height || image.height;

        var sprite = new Sprite(width, height);
        sprite.image = image;
        return sprite
    };

    // 現在デバッグモードかどうか
    var isDebug = function () {
        return enchant.Game.instance._debug;
    };

    // デバッグ用。引数の内容をコンソールに出力
    var trace = function () {
        if (arguments.length == 0) return;
        var args = Array.prototype.slice.call(arguments, 0);
        for (var i in args) {
            console.log(args[i]);
        }
    };

    // 繰り返し文字列の作成
    // @param {String} [text] 文字列
    // @param {整数} [n] 空白文字数 省略時は一回(=textのまま)
    // @return {String} 結果
    var makeRepeatString = function (text, n) {
        var s = text;
        if (n) {
            for (var i = 1; i < n; i++) {
                s += text;
            }
        }
        return s;
    };

    // 空白の作成
    // @param {整数} [n] 空白文字数 省略時は１文字
    // @return {String} 結果
    var makeSpace = function (n) {
        return makeRepeatString('&nbsp;', n);
    };

    // 音の再生
    // @param {文字列} [assetName] アセット名
    var playSound = function (assetName) {
        enchant.Game.instance.assets[assetName].clone().play();
    };

    // 主にBGM用。曲の終わりをフェードアウトして曲の頭につなげる
    var RepeatSoundPlayer = enchant.Class.create(enchant.Node, {
        // @param {文字列} [assetName] アセット名
        // @param {実数} [fadeSec] 残り何秒からフェードアウトを開始するか。省略時は5秒
        // @param {実数} [volume] フェードアウト後に戻す音量。省略時は1.0(最大)
        initialize: function (assetName, fadeSec, volume) {
            enchant.Node.call(this);

            this._sound = enchant.Game.instance.assets[assetName];
            this._fadeSec = fadeSec || 5.0;
            this._volume = volume || 1.0;

            this.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
                if (this._fadeSec < (this._sound.duration - this._sound.currentTime)) {
                    return;
                }

                this._sound.volume = (this._sound.duration - this._sound.currentTime) / this._fadeSec;
                if (this._sound.volume < 0.01) {
                    this._sound.currentTime = 0;
                    this.play();
                }
            });
        },
        // 再生開始
        play: function () {
            this._sound.volume = this._volume;
            this._sound.play();
        },
        // 中断
        pause: function () {
            this._sound.pause();
        },
        // 停止
        stop: function () {
            this._sound.stop();
        }
    });

    // 整数の乱数を生成
    // Math.randomと比べて、発生した値が次の発生以降に出にくくなります。
    // 値の偏りが防がれることで運に左右されづらくなりますが、
    // 事故が起きないので面白くない乱数とも言えます。
    var AverageRandamizer = enchant.Class.create({
        // @param {整数} [range] 0～range-1を発生させる
        initialize: function (range) {
            this._table = [];
            this.range = range;
        },
        // 乱数の取得
        // @return {整数} 乱数
        next: {
            get: function () {
                var matchs = [];
                for (var i = 0; i < this.range; i++) {
                    if (this.rand(this._table[i]) == 0) {
                        matchs.push(i);
                    }
                }

                var result;
                if (matchs.length == 0) {
                    result = this.rand(this.range);
                } else {
                    result = matchs[this.rand(matchs.length)];
                }

                for (var j = 0; j < this.range; j++) {
                    this._table[j]--;
                    if (j == result) {
                        this._table[j] += this.range;
                    }
                }
                return result;
            }
        },
        // 乱数範囲の取得/設定
        range: {
            get: function () {
                return this._table.length;
            },
            set: function (r) {
                if (r < this.range) {
                    // サイズが減る場合はリセット
                    this._table.length = 0;
                }
                for (var i = this.range; i < r; i++) {
                    this._table.push(r);
                }
            }
        },
        // 普通の乱数
        // @param {整数} [num] 0～num-1を発生させる
        // @return {整数} 乱数
        rand: function (num) {
            if (num <= 0) return 0;
            return Math.floor(Math.random() * num);
        }
    });

    // SceneEx用。シーンがフェードインを開始する直前に来る
    var Event_SceneExStarting = 'Event_SceneExStarting';

    // SceneEx用。登録した入力パターンが完了した時のイベント
    // e.eventID イベントID
    // e.sec     入力完了までの秒数
    var Event_SceneExInput = 'Event_SceneExInput';

    // Sceneの拡張
    // ・シーン切り替えと、フェードイン/アウト処理
    // ・シーン全体の透過率変更
    // ・キー入力補助。指定した順番で入力した時にイベント発行
    var SceneEx = enchant.Class.create(enchant.Scene,
    (function () {
        var _scenes = [];
        return {
            // @param {string} [name] シーン名。これを使って切り替える
            // @param {実数} [fadeInSec] フェードインするのにかかる時間(単位は秒)。省略時は0.5秒
            // @param {実数} [fadeOutSec] フェードアウトするのにかかる時間(単位は秒)。省略時は0.5秒
            initialize: function (name, fadeInSec, fadeOutSec) {
                enchant.Scene.call(this);
                this.name = name;
                _scenes[name] = this;

                this.inputPatterns = [];
                this._opacity = 1;
                this._setFadeIn = false;
                this._setFadeOut = false;
                this._nextSceneName = '';

                var fps = enchant.Game.instance.fps;

                var s = (fadeInSec == undefined) ? 0.5 : fadeInSec;
                if (0 < s) {
                    this._fadeInStep = 1.0 / (s * fps);
                    this.addEventListener(Event_SceneExStarting, function (e) {
                        this._setFadeIn = true;
                        this.opacity = 0;
                    });
                }

                s = (fadeOutSec == undefined) ? 0.5 : fadeOutSec;
                this._fadeOutStep = (s == 0) ? 1 : 1.0 / (s * fps);

                this.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
                    if (this._setFadeIn && this._fadeIn()) {
                        this._setFadeIn = false;
                    }
                    if (this._setFadeOut && this._fadeOut()) {
                        this._setFadeOut = false;

                        var nextScene = _scenes[this._nextSceneName];
                        nextScene.dispatchEvent(new enchant.Event(Event_SceneExStarting));
                        if (nextScene == this) {
                            nextScene.dispatchEvent(new enchant.Event(enchant.Event.ENTER));
                        } else {
                            enchant.Game.instance.replaceScene(nextScene);
                        }
                    }
                    for (var i in this.inputPatterns) {
                        var p = this.inputPatterns[i];
                        if (p.active) {
                            p.frame++;
                        }
                    }
                });

                function makeEvent(p) {
                    var ev = new enchant.Event(Event_SceneExInput);
                    ev.eventID = p.eventID;
                    ev.sec = p.frame / enchant.Game.instance.fps;
                    enchant.Game.instance.currentScene.dispatchEvent(ev);
                };

                [enchant.Event.LEFT_BUTTON_DOWN,
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
                 enchant.Event.B_BUTTON_UP].forEach(function (type) {
                     this.addEventListener(type, function (e) {
                         for (var i in this.inputPatterns) {
                             var p = this.inputPatterns[i];

                             if (p.pattern[p.index] != e.type) {
                                 p.index = 0;
                                 p.frame = 0;
                                 p.active = false;
                                 continue;
                             }

                             if (p.index + 1 < p.pattern.length) {
                                 p.index++;
                                 p.active = true;
                                 continue;
                             }

                             if (p.loop) {
                                 p.active = true;
                                 if (p.frame < p.framelimit) continue;
                                 makeEvent(p);
                                 p.frame = 0;
                             } else {
                                 if (p.frame <= p.framelimit) {
                                     makeEvent(p);
                                 }
                                 p.index = 0;
                                 p.frame = 0;
                                 p.active = false;
                             }
                         }
                     });
                 }, this);

                // 内部用 フェードイン1回分
                this._fadeIn = function () {
                    if ((1 - this._fadeInStep) <= this.opacity) {
                        this.opacity = 1;
                        return true;
                    } else {
                        this.opacity += this._fadeInStep;
                        return false;
                    }
                };

                // 内部用 フェードアウト1回分
                this._fadeOut = function () {
                    if (this.opacity <= this._fadeOutStep) {
                        this.opacity = 0;
                        return true;
                    } else {
                        this.opacity -= this._fadeOutStep;
                        return false;
                    }
                };

                // 内部用 透過率設定再帰
                this._setOpacityChilds = function (me, opct) {
                    if (me.childNodes === undefined) return;
                    for (var i in me.childNodes) {
                        var node = me.childNodes[i];
                        if (node.opacity !== undefined) node.opacity = opct;
                        this._setOpacityChilds(node, opct);
                    }
                }
            },
            // フェードインまたはフェードアウト中
            fadeProsessing: {
                get: function () {
                    return this._setFadeIn || this._setFadeOut;
                }
            },
            // シーン全体の透過率取得/設定
            opacity: {
                get: function () {
                    return this._opacity;
                },
                set: function (v) {
                    this._opacity = v;
                    this._setOpacityChilds(this, v);
                }
            },
            // シーン切り替え。現在のシーンを指定した場合リスタート
            // @param {string} [name] 切り替えるシーンの名前
            moveSceneTo: function (name) {
                this._nextSceneName = name;
                this._setFadeOut = true;
            },
            // 入力パターンの登録。パターンに一致するとEvent_SceneExInputイベントを発行
            // @param {整数}  [eventID] イベント番号
            // @param {Array} [pattern] enchant.Event.?_BUTTON_UP/DOWN の組み合わせを指定
            //     -----------------------------------------------------------------------------
            //      [A_BUTTON_DOWN]              Aボタンを押した
            //      [A_BUTTON_DOWN, A_BUTTON_UP] Aボタンを押して離した
            //      [DOWN_BUTTON_DOWN, RIGHT_BUTTON_DOWN, DOWN_BUTTON_UP, A_BUTTON_DOWN] 波動拳
            //     -----------------------------------------------------------------------------
            // @param {実数} [timelimit] この秒数までに入力を完了したらイベント発行。省略時は1.0
            // @param {Bool} [loop] trueにするとtimelimitの意味が逆になる。さらに押し続けると連続して発行。省略時はfalse
            registInputPattern: function (eventID, pattern, timelimit, loop) {
                this.inputPatterns.push({
                    eventID: eventID,
                    pattern: pattern,
                    index: 0,
                    frame: 0,
                    framelimit: Math.floor((timelimit || 1.0) * enchant.Game.instance.fps),
                    loop: loop == true,
                    active: false
                });
            }
        };
    })());

    // 自動でフェードアウトして消滅する文字
    // @param {enchant.Group} [group] 装飾スプライト登録先
    // @param {enchant.Sprite} [targetsprite] 文字を出す基準となる要素
    // @param {文字列} [text] 文字。半角英数記号のみ
    // @param {実数} [sec] 表示している時間(省略時は1秒)
    var addFadeOutText = function (group, targetsprite, text, sec) {
        if (MutableText == undefined) return;

        var mt = new MutableText(targetsprite.x, targetsprite.y);
        mt.text = text.toString();
        mt.fedingValue = 1.0 / (enchant.Game.instance.fps * (sec || 1.0));
        mt.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
            this.opacity -= this.fedingValue;
            if (this.opacity < this.fedingValue) {
                this.parentNode.removeChild(this);
            }
        });
        group.addChild(mt);
    };

    // キーバインド。文字コードを調べるのが面倒なので
    // @param {文字列} [key] 割り当てる文字
    // @param {文字列} [button] 'left', 'right', 'up', 'down', 'a', 'b' など
    var keyBind = function (key, button) {
        var game = enchant.Game.instance;
        game.keybind(key[0].toUpperCase().charCodeAt(0), button);
        game.keybind(key[0].toLowerCase().charCodeAt(0), button);
    };

    // 色文字列の作成
    // 引数なし:透明
    // 引数1つ:RGB同値
    // 引数2つ:RGB同値, alpha
    // 引数3つ:red, green, blue
    // 引数4つ:red, green, blue, alpha
    // @return {String} 色
    function toRGBString() {

        var r, g, b, a;
        if (3 <= arguments.length) {
            r = arguments[0];
            g = arguments[1];
            b = arguments[2];
            if (4 <= arguments.length) {
                a = arguments[3];
            } else {
                a = 1.0;
            }
        } else if (1 <= arguments.length) {
            r = g = b = arguments[0];
            if (2 <= arguments.length) {
                a = arguments[1];
            } else {
                a = 1.0;
            }
        } else {
            r = g = b = a = 0;
        }

        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

        /* 別案
        var str = '#';
        if (r < 16) str += '0';
        str += r.toString(16);
        if (g < 16) str += '0';
        str += g.toString(16);
        if (b < 16) str += '0';
        str += b.toString(16);
        return str;
        */
    }

    // 配列のランダム並べ替え
    // @return {Array} 結果
    var shuffleArray = function (ary) {
        var result = [];
        while (0 < ary.length) {
            var index = Math.floor(Math.random() * ary.length);
            result.push(ary.splice(index, 1)[0]);
        }
        return result;
    }

    // Timer用。指定した時間が来た時のイベント
    var Event_TimerTimeOut = 'Event_TimerTimeout';

    //指定した時間が来たらイベント発行
    // ※game.frameをベースにしているので正確ではない。
    var Timer = enchant.Class.create(enchant.Node, {
        initialize: function () {
            enchant.Node.call(this);
            this._frame = 0;
            this._startFrame = 0;
            this._active = false;
            this.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
                if (!this._active) return;

                this._frame--;
                if (0 < this._frame) return;

                enchant.Game.instance.currentScene.dispatchEvent(new enchant.Event(Event_TimerTimeOut));
                this._frame = this._startFrame;
            });
        },
        // タイマーを開始
        // @param {実数} [sec] 秒。指定しない場合は前回と同じ
        start: function (sec) {
            if (typeof sec == 'number') {
                this._frame =
                this._startFrame = sec * enchant.Game.instance.fps;
            }
            this._active = (0 < this._startFrame);
        },
        // タイマーを停止
        stop: function () {
            this._active = false;
        }
    });

    function makeKanji(value, chars, ketas) {
        value = Math.floor(value); // 念のため
        if (value == 0) return chars[0];

        var nums = [];
        while (0 < value) {
            nums.push(value % 10);
            if (ketas.length + 1 < nums.length) {
                //オーバーしたので最大値で止める
                nums.length = ketas.length;
                for (var i = 0; i < ketas.length; i++) {
                    nums[i] = 9;
                }
                break;
            }
            value = Math.floor(value / 10);
        }

        var result = '';
        while (true) {
            var v = nums.pop();

            // 0は追加しない
            // 1の時、一万と最後の1はOK。（一千と呼ぶ時もあるような）
            // それ以外はOK
            if (v != 0 && (v != 1 || nums.length == 4 || nums.length == 0)) {
                result += chars[v];
            }
            if (nums.length == 0) break;
            if (v != 0) {
                result += ketas[nums.length - 1];
            }
        }
        return result;
    }

    // 数値を漢字にする
    // @param {整数} [value] 数値
    // @return {String} 結果
    var toKanji1 = function (value) {
        return makeKanji(value, '〇一二三四五六七八九', '十百千万');
    };

    // 数値を漢字にする
    // @param {整数} [value] 数値
    // @return {String} 結果
    var toKanji2 = function (value) {
        return makeKanji(value, '零壱弐参肆伍陸漆捌玖', '拾佰阡萬');
    };

    // 度 → ラジアン
    // @param {実数} [d] 度
    // @return {実数} ラジアン
    var degToRad = function (d) {
        return d * Math.PI / 180.0;
    };

    // ラジアン → 度
    // @param {実数} [r] ラジアン
    // @return {実数} 度
    var radToDeg = function (r) {
        return r * 180.0 / Math.PI;
    };

    // ラジアンを0～Math.PI * 2.0未満の範囲に補正
    // @param {実数} [r] ラジアン
    // @return {実数} 結果
    var normalinzeRad = function (r) {
        if (r < 0.0) {
            return this.normalinzeRad(r + Math.PI * 2.0); //再帰
        }
        if (Math.PI * 2.0 <= r) {
            return this.normalinzeRad(r - Math.PI * 2.0); //再帰
        }
        return r;
    };

    // 度を0～360未満の範囲に補正
    // @param {実数} [d] 度
    // @return {実数} 結果
    var normalinzeDeg = function (d) {
        if (d < 0.0) {
            return this.normalinzeDeg(d + 360.0); //再帰
        }
        if (360.0 <= d) {
            return this.normalinzeDeg(d - 360.0); //再帰
        }
        return d;
    };

    // 例えば全て1をセットしたArrayなどを作る
    // @param {なんでも} [value] 値
    // @param {整数} [count] 個数 省略時は1
    // @return {Array} 結果
    var makeValues = function (value, count) {
        var values = [];
        for (var i = 0; i < count; i++) {
            values.push(value);
        }
        return values;
    };

    // 加速度センサー値取得
    // 機器依存なので採用するつもりはないがメモっておく
    // var devicemotion = {};
    //window.addEventListener('devicemotion', function (e) {
    //    var gravity = e.accelerationIncludingGravity;
    //    devicemotion.gx = gravity.x;
    //    devicemotion.gy = gravity.y;
    //    devicemotion.gz = gravity.z;
    //}, true);

    // 方向値取得
    // 機器依存なので採用するつもりはないがメモっておく
    //var dirtable = [
    //        "北", "北北東", "北東", "東北東",
    //        "東", "東南東", "南東", "南南東",
    //        "南", "南南西", "南西", "西南西",
    //        "西", "西北西", "北西", "北北西", "北"];
    //var heading, accuracy, dirname;
    //window.addEventListener('deviceorientation', function (e) {
    //    heading = Math.floor(e.webkitCompassHeading);
    //    if (heading < 0) heading += 360;
    //    heading += window.orientation;
    //    accuracy = e.webkitCompassAccuracy;
    //    dirname = dirtable[Math.floor((heading + (360 / 32)) * 16 / 360)];
    //}, false);

    // 位置情報
    //if (window.navigator.geolocation) {
    //    // 現在位置情報を取得 
    //    //window.navigator.geolocation.getCurrentPosition(show_location);
    //    geolocation.getCurrentPosition(function (latitude, longitude) {
    //
    //        currentLatitude = latitude; // 緯度                     
    //        currentLongitude = longitude; // 経度 
    //    });
    //}

    // 位置情報
    // スマフォとか持っていないので未検証
    var Geolocation = enchant.Class.create({
        initialize: function () {
            this.point1 = [46, 127];
            this.point2 = [46, 147];
            this.point3 = [31, 127];
            this.point4 = [31, 147];

            //都道府県
            //画素は北海道がGreen255で1つずつ減っていく
            this.todohuken = [
                '北海道', '青森県', '岩手県', '宮城県', '秋田県',
                '山形県', '福島県', '茨城県', '栃木県', '群馬県',
                '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県',
                '富山県', '石川県', '福井県', '山梨県', '長野県',
                '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県',
                '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
                '鳥取県', '島根県', '岡山県', '広島県', '山口県',
                '徳島県', '香川県', '愛媛県', '高知県', '福岡県',
                '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県',
                '鹿児島県', '沖縄県'
            ];
        },
        // 現在位置情報を取得(引数:取得した際の処理)
        getCurrentPosition: function (func) {
            // 現在位置情報を取得 
            window.navigator.geolocation.getCurrentPosition(function (event) {
                func(event.coords.latitude, event.coords.longitude);
            });
        },
        getXFromLong: function (currentLongitude) {
            if (currentLongitude == 0) return 0;
            return 320 * (currentLongitude - this.point1[1]) / (this.point4[1] - this.point1[1]);
        },
        getYFromLat: function (currentLatitude) {
            if (currentLatitude == 0) return 0;
            return 320 * (1 - (currentLatitude - this.point4[0]) / (this.point1[0] - this.point4[0]));
        },
        getLongFromX: function (x) {
            if (x == 0) return 0;
            return this.point1[1] + (x * (this.point4[1] - this.point1[1]) / 320);
        },
        getLatFromY: function (y) {
            if (y == 0) return 0;
            return this.point1[0] - (y * (this.point1[0] - this.point4[0]) / 320);
        },
        // 位置情報取得完了時の処理 
        show_location: function (event) {
            // 緯度 
            this.currentLatitude = event.coords.latitude;
            // 経度 
            this.currentLongitude = event.coords.longitude;
        },
        // 距離の取得
        // x : 経度（東西）, y : 緯度（北南）
        // (x1,y1)-(x2,y2)
        getDistance: function (pre, now) {
            var x1 = pre.longitude * Math.PI / 180.0;
            var y1 = pre.latitude * Math.PI / 180.0;
            var x2 = now.longitude * Math.PI / 180.0;
            var y2 = now.latitude * Math.PI / 180.0;

            //var A = 6378137; // 地球の赤道半径(6378137m)
            var A = 6378137 / 1000; // 地球の赤道半径(6378137m)

            var x = A * (x2 - x1) * Math.cos(y1);
            var y = A * (y2 - y1);

            var L = Math.sqrt(x * x + y * y); // メートル単位の距離
            //c = Math.atan(y / x) *180.0/ Math.PI;	// 方角　東：0(0度)，北：1/2π(90度)，西：π(180度)，南：3/2π(270度)
            return L;
        }
    });

    // 回転を考慮した衝突判定
    // ※参考 http://smallomega.com/?p=397
    // @param {enchant.Sprite} [sprite1] 要素1
    // @param {enchant.Sprite} [sprite2] 要素2
    // @return {Boolen} 衝突しているならtrue
    var collision2Sprites = function (sprite1, sprite2) {
        if (sprite1.rotation == 0 && sprite2.rotation == 0) return sprite1.intersect(sprite2);

        //aはthis,bはother
        var a = new Array(9);
        var b = new Array(9);

        //回転してないときの４点を格納+各辺の中点4点([0]=[4],[5][6][7][8]はすり抜けがひどいので追加)
        a[0] = { X: sprite1.x, Y: sprite1.y };
        a[1] = { X: sprite1.x + sprite1.width, Y: sprite1.y };
        a[2] = { X: sprite1.x + sprite1.width, Y: sprite1.y + sprite1.height };
        a[3] = { X: sprite1.x, Y: sprite1.y + sprite1.height };
        a[4] = { X: sprite1.x, Y: sprite1.y };
        a[5] = { X: sprite1.x + sprite1.width / 2, Y: sprite1.y };
        a[6] = { X: sprite1.x + sprite1.width / 2, Y: sprite1.y + sprite1.height };
        a[7] = { X: sprite1.x, Y: sprite1.y + sprite1.height / 2 };
        a[8] = { X: sprite1.x + sprite1.width, Y: sprite1.y + sprite1.height / 2 };
        b[0] = { X: sprite2.x, Y: sprite2.y };
        b[1] = { X: sprite2.x + sprite2.width, Y: sprite2.y };
        b[2] = { X: sprite2.x + sprite2.width, Y: sprite2.y + sprite2.height };
        b[3] = { X: sprite2.x, Y: sprite2.y + sprite2.height };
        b[4] = { X: sprite2.x, Y: sprite2.y };
        b[5] = { X: sprite2.x + sprite2.width / 2, Y: sprite2.y };
        b[6] = { X: sprite2.x + sprite2.width / 2, Y: sprite2.y + sprite2.height };
        b[7] = { X: sprite2.x, Y: sprite2.y + sprite2.height / 2 };
        b[8] = { X: sprite2.x + sprite2.width, Y: sprite2.y + sprite2.height / 2 };

        //スプライトの中心を原点に平行移動
        for (var i in a) {
            a[i].X -= (sprite1.x + sprite1.width / 2);
            a[i].Y -= (sprite1.y + sprite1.height / 2);
        }
        for (var i in b) {
            b[i].X -= (sprite2.x + sprite2.width / 2);
            b[i].Y -= (sprite2.y + sprite2.height / 2);
        }

        //スプライトを回転させる
        for (var i in a) {
            var tmpX = a[i].X;
            var tmpY = a[i].Y;
            a[i].X = tmpX * Math.cos(sprite1.rotation * Math.PI / 180) - tmpY * Math.sin(sprite1.rotation * Math.PI / 180);
            a[i].Y = tmpX * Math.sin(sprite1.rotation * Math.PI / 180) + tmpY * Math.cos(sprite1.rotation * Math.PI / 180);
        }
        for (var i in b) {
            var tmpX = b[i].X;
            var tmpY = b[i].Y;
            b[i].X = tmpX * Math.cos(sprite2.rotation * Math.PI / 180) - tmpY * Math.sin(sprite2.rotation * Math.PI / 180);
            b[i].Y = tmpX * Math.sin(sprite2.rotation * Math.PI / 180) + tmpY * Math.cos(sprite2.rotation * Math.PI / 180);
        }

        //元の位置に平行移動
        for (var i in a) {
            a[i].X += (sprite1.x + sprite1.width / 2);
            a[i].Y += (sprite1.y + sprite1.height / 2);
        }
        for (var i in b) {
            b[i].X += (sprite2.x + sprite2.width / 2);
            b[i].Y += (sprite2.y + sprite2.height / 2);
        }

        //それぞれの線分で交差判定
        for (var i = 0; i < a.length - 1; i++) for (var j = 0; j < b.length - 1; j++) {
            var penetrate1 = (a[i + 1].X - a[i].X) * (b[j].Y - a[i].Y) - (a[i + 1].Y - a[i].Y) * (b[j].X - a[i].X);
            var penetrate2 = (a[i + 1].X - a[i].X) * (b[j + 1].Y - a[i].Y) - (a[i + 1].Y - a[i].Y) * (b[j + 1].X - a[i].X);
            var penetrate3 = (b[j + 1].X - b[j].X) * (a[i].Y - b[j].Y) - (b[j + 1].Y - b[j].Y) * (a[i].X - b[j].X);
            var penetrate4 = (b[j + 1].X - b[j].X) * (a[i + 1].Y - b[j].Y) - (b[j + 1].Y - b[j].Y) * (a[i + 1].X - b[j].X);
            if (penetrate1 * penetrate2 < 0 && penetrate3 * penetrate4 < 0)
                return true;
        }
        return false;
    };

    // 迷路作成(棒倒し法) enchant.MapのcollisionDataと同じ形式で返す（壁は1、通路は0）
    // @param {整数} [rowNum] 行数。必ず奇数にすること
    // @param {整数} [columnNum] 列数。必ず奇数にすること
    // @param {Boolen} [addframe] 外枠を壁にするかどうか。省略時はfalse(壁にしない)
    // @return {Array.<Array.<Number>>} 結果
    var createMaze = function (rowNum, columnNum, addframe) {
        if (rowNum % 2 == 0 || columnNum % 2 == 0) throw new Error('arguments error');

        var maze = [];
        maze.length = rowNum;

        if (addframe) {
            for (var row = 0; row < rowNum; row++) {
                if (row == 0 || row == (rowNum - 1)) {
                    maze[row] = makeValues(1, columnNum);
                } else {
                    maze[row] = makeValues(0, columnNum);
                    maze[row][0] =
                    maze[row][columnNum - 1] = 1;
                }
            }
        } else {
            for (var row = 0; row < rowNum; row++) {
                maze[row] = makeValues(0, columnNum);
            }
        }

        var rowStart = 1;
        var columnStart = 1;
        var rowLimit = rowNum;
        var columnLimit = columnNum;
        if (addframe) {
            rowStart++;
            columnStart++;
            rowLimit--;
            columnLimit--;
        }

        var range = 4;
        var dx = [1, 0, -1, 0];
        var dy = [0, 1, 0, -1];
        for (var row = rowStart; row < rowLimit; row += 2) {
            for (var column = columnStart; column < columnLimit; column += 2) {
                maze[row][column] = 1;

                //指定した方向の通路を壁で埋める
                var r = Math.floor(Math.random() * range);
                maze[row + dy[r]][column + dx[r]] = 1;
            }
            //上方向は一番最初の行のみ
            if (range == 4) range = 3;
        }

        return maze;
    }

    // 迷路作成(棒倒し法)
    // @param {enchant.Map} [map] 作成したデータの設定先
    // @param {整数} [rowNum] 行数。必ず奇数にすること
    // @param {整数} [columnNum] 列数。必ず奇数にすること
    // @param {整数} [floorNo] 床にするイメージNo。背景に使用
    // @param {整数} [wallNo] 壁にするイメージNo。
    // @param {Boolen} [addframe] 外枠を壁にするかどうか。省略時はfalse(壁にしない)
    var setMazeData = function (map, rowNum, columnNum, floorNo, wallNo, addframe) {
        var mapData1 = [];
        var mapData2 = [];
        var collisionData = createMaze(rowNum, columnNum, addframe);

        for (var row = 0; row < rowNum; row++) {
            mapData1.push([]);
            mapData2.push([]);
            for (var column = 0; column < columnNum; column++) {
                mapData1[row].push(floorNo);
                mapData2[row].push(collisionData[row][column] ? wallNo : -1);
            }
        }

        map.loadData(mapData1, mapData2);
        map.collisionData = collisionData;
    };

    // 文字列の幅(全角だと正確ではない)
    // @param {enchant.Surface} [surface] 描画先
    // @param {String} [str] 文字列
    // @return {Number} 幅
    var stringWidth = function (surface, str) {
        return surface.context.measureText(str).width;
    };

    // カタカナ変換
    // @param {String} [str] 文字列
    // @return {String} 結果
    var toKatakanaCase = function (str) {
        var result = "";
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            result += String.fromCharCode((0x3041 <= c && c <= 0x3096) ? c + 0x0060 : c);
        };
        return result;
    };

    // ひらがな変換
    // @param {String} [str] 文字列
    // @return {String} 結果
    var toHirakanaCase = function (str) {
        var result = "";
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            result += String.fromCharCode((0x30A1 <= c && c <= 0x30F6) ? c - 0x0060 : c);
        };
        return result;
    };

    var base = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

    // ランダム文字列
    // @param {String} [len] 文字数。省略時は1文字
    // @return {String} 結果
    var randomString = function (len) {
        var result = "";
        len = len || 1;
        for (var i = 0; i < len; i++) {
            result += base.charAt(Math.floor(Math.random() * base.length));
        }
        return result;
    };

    // スクリーン外に出たかどうか
    // @param {Object} [obj] 対象の要素{x,y,width,height}。例えばenchant.Sprite,Figure.Rectangle
    // @return {Boolen} 出たならtrue
    var isOutOfScreen = function (obj) {
        var game = enchant.Game.instance;
        return obj.x + obj.width < 0 ||
                obj.y + obj.height < 0 ||
                game.width < obj.x ||
                game.height < obj.y;
    }

    // 四捨五入
    // @param {実数} [num] 数値
    // @param {整数} [figure] 小数点以下桁。省略時は0(Math.roundと同じ)
    // @return {実数} 結果
    var round = function (num, figure) {
        if (typeof figure == "number") {
            var base = Math.pow(10, figure);
            return Math.round(num * base) / base;
        } else {
            return Math.round(num);
        }
    };

    // 切り上げ
    // @param {実数} [num] 数値
    // @param {整数} [figure] 小数点以下桁。省略時は0(Math.ceilと同じ)
    // @return {実数} 結果
    var ceil = function (num, figure) {
        if (typeof figure == "number") {
            var base = Math.pow(10, figure);
            return Math.ceil(num * base) / base;
        } else {
            return Math.ceil(num);
        }
    };

    // 切り捨て
    // @param {実数} [num] 数値
    // @param {整数} [figure] 小数点以下桁。省略時は0(Math.floorと同じ)
    // @return {実数} 結果
    var floor = function (num, figure) {
        if (typeof figure == "number") {
            var base = Math.pow(10, figure);
            return Math.floor(num * base) / base;
        } else {
            return Math.floor(num);
        }
    };

    // 指定した桁に達していない数値の先頭に文字を埋めて返す。右寄せ
    // @param {整数} [num] 数値
    // @param {整数} [len] 桁数
    // @param {整数} [ch] 文字。省略時は'0'。空白を入れるときは'&nbsp;'(Label)か' '(MutableText)
    // @return {String} 文字列
    var paddingLeft = function (num, len, ch) {
        ch = ch || '0';

        var str = num.toString();
        len -= str.length;
        while (0 < len--) { str = ch + str; }

        return str;
    };

    // 指定した桁に達していない数値の末尾に文字を埋めて返す。左寄せ
    // @param {整数} [num] 数値
    // @param {整数} [len] 桁数
    // @param {整数} [ch] 文字。省略時は'0'。空白を入れるときは'&nbsp;'(Label)か' '(MutableText)
    // @return {String} 文字列
    var paddingRight = function (num, len, ch) {
        ch = ch || '0';

        var str = num.toString();
        len -= str.length;
        while (0 < len--) { str += ch; }

        return str;
    };

    // 文字列フォーマット
    // 例1：formatString("rgb({r}, {g}, {b})", color)
    //      → colorが{r:128, g:0, b:255}であるとき、"rgb(128, 0, 255)"
    // 例2：formatString("{0} + {1} = {2}", 5, 10, 5+10)
    //      → "5 + 10 = 15"
    // @param {文字列} [format] フォーマット
    // @param {object or arguments} [arg] 値
    // @return {String} 文字列
    var formatString = function (format, arg) {
        // 置換ファンク
        var rep_fn = undefined;

        // オブジェクトの場合
        if (typeof arg == "object") {
            /** @ignore */
            rep_fn = function (m, k) { return arg[k]; }
        }
        // 複数引数だった場合
        else {
            var args = arguments;
            /** @ignore */
            rep_fn = function (m, k) { return args[parseInt(k) + 1]; }
        }

        return format.replace(/\{(\w+)\}/g, rep_fn);
    };

    // 配列内にある、条件に合う要素の取得
    // @param {Array} [ary] 配列
    // @param {Function} [fn] 条件判定関数。function(配列内の要素、配列内の順番、配列自体)。取得するならtrueを返す
    // @return {Array} 結果
    var arrayQueryIf = function (ary, fn) {
        return ary.filter(fn); //既にあった
    };

    // 配列内にある、条件に合う要素の削除
    // @param {Array} [ary] 配列
    // @param {Function} [fn] 条件判定関数。function(配列内の要素、配列内の順番、配列自体)。削除するならtrueを返す
    var arrayEraseIf = function (ary, fn) {
        for (var i = ary.length - 1; i >= 0; i--) {// 逆順
            if (fn(ary[i], i, ary)) { ary.splice(i, 1); }
        }
    };

    // 指定した地点と同じ値が続く地点毎にfuncを呼ぶ
    // お絵かきソフトの塗りつぶしのイメージ
    // @param {Array<Array>} [map] 2次元配列。各行の列数は全て同じであることを期待します
    // @param {整数} [baseRowNo] 基準地点の行番号
    // @param {整数} [baseColumnNo] 基準地点の列番号
    // @param {Function} [func] 処理関数。func(row,column)。基準地点も呼ばれます。
    // @param {Function} [matchFunc] 値比較関数。matchFunc(value1, value2)戻り値Boolen 省略時は'=='で比較 
    var samePartsForEach = function (map, baseRowNo, baseColumnNo, func, matchFunc) {
        var rowNum = map.length;
        var columnNum = map[0].length;
        var baseValue = map[baseRowNo][baseColumnNo];

        var points = [];
        function AddPoint(row, column) {
            for (var i in points) {
                var point = points[i];
                if (point.row == row && point.column == column) return;
            }

            var v = map[row][column];

            var bMatch;
            if (matchFunc) {
                bMatch = matchFunc(baseValue, v);
            } else {
                bMatch = (baseValue == v);
            }

            if (bMatch) {
                func(row, column);
            }

            points.push({ row: row, column: column, valid: bMatch });
        }
        AddPoint(baseRowNo, baseColumnNo);

        while (true) {
            var point = null;
            for (var i in points) {
                if (points[i].valid) {
                    point = points[i];
                    break;
                }
            }
            if (point == null) break;
            point.valid = false;

            if (0 < point.row) {
                AddPoint(point.row - 1, point.column);
            }
            if (0 < point.column) {
                AddPoint(point.row, point.column - 1);
            }
            if ((point.row + 1) < rowNum) {
                AddPoint(point.row + 1, point.column);
            }
            if ((point.column + 1) < columnNum) {
                AddPoint(point.row, point.column + 1);
            }
        }
    };

    // シミュレーションゲームなどのユニット移動判定。移動可能マス毎にfuncを呼ぶ
    // @param {Array<Array<整数>>} [map] 2次元配列。
    //      各マスの移動コスト(0やマイナスも可)を設定します。
    //      移動できないマスには大きな数字を入れてください。
    //      各行の列数は全て同じであることを期待します。
    // @param {整数} [baseRowNo] ユニットの現在位置の行番号
    // @param {整数} [baseColumnNo] ユニットの現在位置の列番号
    // @param {整数} [cost] ユニットの移動力
    // @param {Function} [func] 処理関数。
    //      func(row, column, rest, routes)
    //      restは残り移動力です。
    //      routesは、このマスへ行くための道順です。
    //      型はArray<Array<{row,column}>>で、複数のルートになることがあるので配列の配列になっています。
    //      コストが足りれば開始地点も呼ばれます。
    var findRoutesForEach = function (map, baseRowNo, baseColumnNo, cost, func) {
        var rowNum = map.length;
        var columnNum = map[0].length;

        var points = [];
        points.push({
            row: baseRowNo,
            column: baseColumnNo,
            rest: cost,
            valid: true,
            routes: [[]]
        });
        var firstPos = true;

        function AddPoint(row, column, rest, routes) {
            var r = map[row][column];
            if (rest < r) return;
            rest -= r;

            var newRoutes = [];
            for (var i in routes) {
                newRoutes.push(routes[i].concat([{ row: row, column: column}]));
            }

            for (var i in points) {
                var point = points[i];
                if (point.row != row || point.column != column) continue;

                if (point.rest < rest) {
                    point.rest = rest;
                    point.routes = newRoutes;
                    point.valid = true;
                } else if (point.rest == rest) {
                    for (var j in newRoutes) {
                        point.routes.push(newRoutes[j]);
                    }
                    point.valid = true;
                }
                return;
            }

            points.push({ row: row, column: column, rest: rest, valid: true, routes: newRoutes });
        }

        while (true) {
            var point = null;
            for (var i in points) {
                if (points[i].valid) {
                    point = points[i];
                    break;
                }
            }
            if (point == null) break;
            point.valid = false;

            if (0 < point.row) {
                AddPoint(point.row - 1, point.column, point.rest, point.routes);
            }
            if (0 < point.column) {
                AddPoint(point.row, point.column - 1, point.rest, point.routes);
            }
            if ((point.row + 1) < rowNum) {
                AddPoint(point.row + 1, point.column, point.rest, point.routes);
            }
            if ((point.column + 1) < columnNum) {
                AddPoint(point.row, point.column + 1, point.rest, point.routes);
            }

            if (firstPos) {
                firstPos = false;
                point.rest = -1;
            }
        }

        for (var i in points) {
            var point = points[i];
            if (0 <= point.rest) {
                func(point.row, point.column, point.rest, point.routes);
            }
        }
    };

    // 指定した位置に行くのに必要な最小コストとその道順を計算(上記 findRoutesForEach の逆)
    // @param {Array<Array<整数>>} [map] 2次元配列。
    //      各マスの移動コスト(0やマイナスも可)を設定します。
    //      移動できないマスには大きな数字を入れてください。
    //      各行の列数は全て同じであることを期待します。
    // @param {整数} [fromRowNo] 現在位置の行番号
    // @param {整数} [fromColumnNo] 現在位置の列番号
    // @param {整数} [toRowNo] 目的の地点の行番号
    // @param {整数} [toColumnNo] 目的の地点の列番号
    // @return {{[cost:整数],[routes:Array<Array<{row,column}>>]}} 結果
    //      複数の道順が見つかることがあるので配列の配列になっています。
    var calcMoveCost = function (map, fromRowNo, fromColumnNo, toRowNo, toColumnNo) {
        // まっすぐ目的地に行った時のコストを計算
        var cost = 0;

        if (fromColumnNo != toColumnNo) {
            var cMin = Math.min(fromColumnNo, toColumnNo);
            var cMax = Math.max(fromColumnNo, toColumnNo);
            for (var c = cMin + 1; c < cMax; c++) {
                cost += map[fromRowNo][c];
            }
            cost += map[fromRowNo][toColumnNo];
        }

        if (fromRowNo != toRowNo) {
            var rMin = Math.min(fromRowNo, toRowNo);
            var rMax = Math.max(fromRowNo, toRowNo);
            for (var r = rMin + 1; r < rMax; r++) {
                cost += map[r][toColumnNo];
            }
            cost += map[toRowNo][toColumnNo];
        }

        // そのコストで行ける所全てを取得して、目的の位置が来たら記録
        var resultRoutes;
        findRoutesForEach(map, fromRowNo, fromColumnNo, cost, function (row, column, rest, routes) {
            if (row == toRowNo && column == toColumnNo) {
                resultRoutes = routes;
            }
        });

        // 見つけた道順でコストを再計算
        cost = 0;
        for (var i in resultRoutes[0]) {
            var rt = resultRoutes[0][i];
            cost += map[rt.row][rt.column];
        }

        return { cost: cost, routes: resultRoutes };
    };

    // 単純なenchant.Mapの作成
    // @param {String} [assetName] アセット名
    // @param {整数} [tileSize] 1マスの縦横幅
    // @param {整数} [rowNum] 行数
    // @param {整数} [columnNum] 列数
    // @param {整数} [no] 中央マップチップNo
    // @param {整数} [tlNo] 左上マップチップNo 省略時はnoと同じ
    // @param {整数} [tNo] 上マップチップNo 省略時はnoと同じ
    // @param {整数} [trNo] 右上マップチップNo 省略時はnoと同じ
    // @param {整数} [lNo] 左マップチップNo 省略時はnoと同じ
    // @param {整数} [rNo] 右マップチップNo 省略時はnoと同じ
    // @param {整数} [blNo] 左下マップチップNo 省略時はnoと同じ
    // @param {整数} [bNo] 下マップチップNo 省略時はnoと同じ
    // @param {整数} [brNo] 右下マップチップNo 省略時はnoと同じ
    var createSimpleMap = function (assetName, tileSize, rowNum, columnNum, no, tlNo, tNo, trNo, lNo, rNo, blNo, bNo, brNo) {
        tlNo = tlNo || no;
        tNo = tNo || no;
        trNo = trNo || no;
        lNo = lNo || no;
        rNo = rNo || no;
        blNo = blNo || no;
        bNo = bNo || no;
        brNo = brNo || no;

        var data = [];
        for (var row = 0; row < rowNum; row++) {
            var rowData;
            if (row == 0) {
                rowData = makeValues(tNo, columnNum);
                rowData[0] = tlNo;
                rowData[columnNum - 1] = trNo;
            } else if (row + 1 < rowNum) {
                rowData = makeValues(no, columnNum);
                rowData[0] = lNo;
                rowData[columnNum - 1] = rNo;
            } else {
                rowData = makeValues(bNo, columnNum);
                rowData[0] = blNo;
                rowData[columnNum - 1] = brNo;
            }
            data.push(rowData);
        }

        var map = new Map(tileSize, tileSize);
        map.image = enchant.Game.instance.assets[assetName];
        map.loadData(data);
        return map;

    };

    // "enchant.js/images/map1.gif"を使った、単純なenchant.Mapを作成
    // @param {整数} [typeNo] タイプ 0～
    // @param {整数} [rowNum] 行数
    // @param {整数} [columnNum] 列数
    var createSampleMap = function (typeNo, rowNum, columnNum) {
        var assetName = 'map1.gif';
        switch (typeNo) {
            case 0: return createSimpleMap(assetName, 16, rowNum, columnNum, 33);
            case 1: return createSimpleMap(assetName, 16, rowNum, columnNum, 36);
            case 2: return createSimpleMap(assetName, 16, rowNum, columnNum, 6);
            case 3: return createSimpleMap(assetName, 16, rowNum, columnNum, 7);
            case 4: return createSimpleMap(assetName, 16, rowNum, columnNum, 97);
            case 5: return createSimpleMap(assetName, 16, rowNum, columnNum, 100);
            case 6: return createSimpleMap(assetName, 16, rowNum, columnNum, 161);
            case 7: return createSimpleMap(assetName, 16, rowNum, columnNum, 164);
            case 8: return createSimpleMap(assetName, 16, rowNum, columnNum, 225);
            case 9: return createSimpleMap(assetName, 16, rowNum, columnNum, 228);
            case 10: return createSimpleMap(assetName, 16, rowNum, columnNum, 33, 16, 17, 18, 32, 34, 48, 49, 50);
            case 11: return createSimpleMap(assetName, 16, rowNum, columnNum, 100, 83, 84, 85, 99, 101, 115, 116, 117);
            case 12: return createSimpleMap(assetName, 16, rowNum, columnNum, 161, 144, 145, 146, 160, 162, 176, 177, 178);
            case 13: return createSimpleMap(assetName, 16, rowNum, columnNum, 164, 147, 148, 149, 163, 165, 179, 180, 181);
            case 14: return createSimpleMap(assetName, 16, rowNum, columnNum, 228, 211, 212, 213, 227, 229, 243, 244, 245);
        }
        return createSimpleMap(assetName, 16, rowNum, columnNum, 0);
    };

    // ログのように流れるメッセージを表示
    var LogList = enchant.Class.create(enchant.Group, {
        // @param {整数} [x] X座標
        // @param {整数} [y] Y座標
        // @param {整数} [width] 幅
        // @param {整数} [height] 高さ
        initialize: function (x, y, width, height) {
            enchant.Group.call(this);

            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;

            // 文字列追加時の透過率変化量/フレーム
            this.fadeIn = 0.1;

            // 文字列削除時の透過率変化量/フレーム
            this.fadeOut = 0.1;

            // 流れるメッセージのスクロール量/フレーム
            this.scrollPx = 2;

            // 行高さ
            this.lineHeight = 10;

            // デフォルトカラー
            this.color = null;

            // デフォルトフォント
            this.font = null;

            // デフォルトフォントサイズ
            this.fontSize = null;

            // 折り返し。「normal」「break-all」「keep-all」のどれか
            this.wordBreak = null;

            // 文字位置。「left」「center」「right」など
            this.textAlign = null;

            // この数までログが溜まった時は、アニメーションを無効化して一気に表示
            // 0の時は制限しない
            this.stackLimit = 0;

            //--------------------------------------------------------

            this._labels = [];
            this._texts = [];
            this._currentWork = 0; //0:check, 1:textout, 2:scroll, 3:textin
            this._fadeInIndex = -1;
            this._fadeOutIndex = -1;
            this._scrollNum = 0;
            this._outAllLog = false;
            this._visible = true;

            this.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
                switch (this._currentWork) {
                    case 0:
                        if (0 < this._texts.length) {
                            this._outAllLog = this._outAllLog
                                            ? 0 < this._texts.length
                                            : 0 < this.stackLimit && this.stackLimit <= this._texts.length;

                            var t = this._texts.shift();

                            this._fadeInIndex = null;
                            for (var i = 0; i < this._labels.length; i++) {
                                if (!this._labels[i].valid) {
                                    this._fadeInIndex = i;
                                    break;
                                }
                            }
                            var label;
                            if (this._fadeInIndex) {
                                label = this._labels[this._fadeInIndex];
                                label.x = 0;
                                label.y = 0;
                                label.text = t.text;
                            } else {
                                label = new enchant.Label(t.text);
                                label.width = this.width;
                                label.visible = false;
                                label.valid = false;
                                if (this.font) {
                                    label.font = this.font;
                                }
                                if (this.wordBreak) {
                                    label._style.wordBreak = this.wordBreak;
                                }
                                this.addChild(label);

                                this._fadeInIndex = this._labels.length;
                                this._labels.push(label);
                            }
                            label._style.fontSize = t.fontSize || "";
                            label.color = t.color || "";
                            label.height = t.lineHeight || 10;
                            label.opacity = 0;
                            label.textAlign = t.textAlign || 'left';

                            this._scrollNum = label.height;

                            var bottom = 0;
                            for (var i in this._labels) {
                                var l = this._labels[i];
                                if (!l.valid) continue;
                                var b = l.y + l.height;
                                if (bottom < b) {
                                    bottom = b;
                                    this._fadeOutIndex = i;
                                }
                            }
                            if (this.height < (bottom + label.height)) {
                                this._currentWork = 1;
                            } else {
                                this._currentWork = 2;
                            }
                        }
                        break;
                    case 1:
                        var fadeOutLabel = this._labels[this._fadeOutIndex];
                        if (this._outAllLog || fadeOutLabel.opacity < this.fadeOut) {
                            fadeOutLabel.opacity = 0;
                            fadeOutLabel.visible = false;
                            fadeOutLabel.valid = false;
                            this._currentWork = 2;
                        } else {
                            fadeOutLabel.opacity -= this.fadeOut;
                        }
                        break;
                    case 2:
                        if (0 < this._scrollNum) {
                            var px = (this._outAllLog || this._scrollNum <= this.scrollPx)
                                        ? this._scrollNum
                                        : this.scrollPx;
                            for (var i in this._labels) {
                                var l = this._labels[i];
                                if (l.visible) {
                                    l.y += px;
                                }
                            }
                            this._scrollNum -= px;
                        }
                        if (this._scrollNum <= 0) {
                            this._currentWork = 3;
                            var l = this._labels[this._fadeInIndex];
                            l.visible = true;
                            l.valid = true;
                        }
                        break;
                    case 3:
                        var fadeInLabel = this._labels[this._fadeInIndex];
                        if (this._outAllLog || (1.0 - this.fadeIn) < fadeInLabel.opacity) {
                            fadeInLabel.opacity = 1;
                            this._currentWork = 0;
                        } else {
                            fadeInLabel.opacity += this.fadeIn;
                        }
                        break;
                }
            });
        },
        // 表示/非表示
        visible: {
            get: function () { return this._visible; },
            set: function (v) {
                if (this._visible == v) return;
                this._visible = v;
                for (var i in this._labels) {
                    var l = this._labels[i];
                    l.visible = v && l.valid;
                }
            }
        },
        // ログ追加
        // @param {文字列} [text] 表示するテキスト
        // @param {文字列} [color] このテキストのみの文字色。省略時はデフォルト
        // @param {文字列} [fontSize] このテキストのみのフォントサイズ。省略時はデフォルト
        // @param {数値} [lineWidth] このテキストのみの行高さ。省略時はデフォルト
        // @param {数値} [textAlign] このテキストのみの文字位置。省略時はデフォルト
        addLog: function (text, color, fontSize, lineHeight, textAlign) {
            this._texts.push({
                text: text,
                color: color || this.color,
                fontSize: fontSize || this.fontSize,
                lineHeight: lineHeight || this.lineHeight,
                textAlign: textAlign || this.textAlign
            });
        },
        // 溜まっているログを、アニメーションを無効化して一気に出力
        outAllLog: function () {
            this._outAllLog = true;
        },
        // 全削除
        clear: function () {
            this._texts.length = 0;
            for (var i in this._labels) {
                this._labels[i].visible = false;
            }
            this._currentWork = 0;
        }
    });

    // 超多数オブジェクト管理
    //var ManySpritesManager = enchant.Class.create({
    //    initialize: function () {
    //        this._sprites = [];
    //    },
    //    regist: function () {
    //    }
    //});

    // 図形に関する機能群
    var Figure = (function () {

        // 単純な四角形のSurface作成
        // @param {実数} [width] 幅
        // @param {実数} [height] 高さ
        // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
        // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
        // @return {enchant.Surface} 結果
        var createRectangleSurface = function (width, height, color, fill) {
            var s = new Surface(width, height);
            var c = s.context;
            if (fill) {
                c.fillStyle = color;
                c.fillRect(0, 0, width, height);
            } else {
                c.strokeStyle = color;
                c.strokeRect(0, 0, width, height);
            }
            return s;
        };

        // 単純な四角形のSprite作成
        // @param {実数} [width] 幅
        // @param {実数} [height] 高さ
        // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
        // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
        // @return {enchant.Sprite} 結果
        var createRectangleSprite = function (width, height, color, fill) {
            var sprite = new Sprite(width, height);
            sprite.image = createRectangleSurface(width, height, color, fill);
            return sprite;
        };

        // 単純な円のSurface作成
        // @param {整数} [radius] 半径
        // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
        // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
        // @return {enchant.Surface} 結果
        var createCircleSurface = function (radius, color, fill) {
            var s = new Surface(radius * 2, radius * 2);
            var c = s.context;

            // 線幅分内側に書く
            var padding = c.lineWidth;

            if (fill) {
                c.fillStyle = color;
            } else {
                c.strokeStyle = color;
            }
            c.beginPath();
            c.arc(radius, radius, radius - padding, 0, Math.PI * 2, true);
            if (fill) {
                c.fill();
            } else {
                c.stroke();
            }
            return s;
        };

        // 単純な円のSprite作成
        // @param {整数} [radius] 半径
        // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
        // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
        // @return {enchant.Sprite} 結果
        var createCircleSprite = function (radius, color, fill) {
            var sprite = new Sprite(radius * 2, radius * 2);
            sprite.image = createCircleSurface(radius, color, fill);
            return sprite;
        };

        // 単純な楕円のSurface作成
        // @param {整数} [width] 省略時は0
        // @param {整数} [height] 省略時は0
        // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
        // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
        // @return {enchant.Surface} 結果
        var createEllipseSurface = function (width, height, color, fill) {
            var s = new Surface(width, height);
            var c = s.context;

            if (fill) {
                c.fillStyle = color;
            } else {
                c.strokeStyle = color;
            }
            var halfW = width / 2;
            var halfH = height / 2;
            // 線幅分内側に書く
            var padding = c.lineWidth;

            // 近いうちにcanvasにellipseが付くらしいけど、ここでは近似
            c.beginPath();
            var cw = 4.0 * (Math.sqrt(2.0) - 1.0) * halfW / 3.0;
            var ch = 4.0 * (Math.sqrt(2.0) - 1.0) * halfH / 3.0;
            c.moveTo(halfW, padding);
            c.bezierCurveTo(halfW + cw, padding, width - padding, halfH - ch, width - padding, halfH);
            c.bezierCurveTo(width - padding, halfH + ch, halfW + cw, height - padding, halfW, height - padding);
            c.bezierCurveTo(halfW - cw, height - padding, padding, halfH + ch, padding, halfH);
            c.bezierCurveTo(padding, halfH - ch, halfW - cw, padding, halfW, padding);
            if (fill) {
                c.fill();
            } else {
                c.stroke();
            }
            return s;
        };

        // 単純な楕円のSprite作成
        // @param {整数} [width] 省略時は0
        // @param {整数} [height] 省略時は0
        // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
        // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
        // @return {enchant.Sprite} 結果
        var createEllipseSprite = function (width, height, color, fill) {
            var sprite = new Sprite(width, height);
            sprite.image = createEllipseSurface(width, height, color, fill);
            return sprite;
        };

        // 単純な円のSurface作成
        // @param {整数} [radius] 半径
        // @param {ラジアン} [angle] 方向角(弧の中央)
        // @param {ラジアン} [range] 弧の範囲。angle±(range/2)が描画される
        // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
        // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
        // @return {enchant.Surface} 結果
        var createArcSurface = function (radius, angle, range, color, fill) {
            var s = new Surface(radius * 2, radius * 2);
            var c = s.context;

            // 線幅分内側に書く
            var padding = c.lineWidth;

            var startAngle = angle - range * 0.5;
            var endAngle = angle + range * 0.5;

            if (fill) {
                c.fillStyle = color;
            } else {
                c.strokeStyle = color;
            }
            c.beginPath();
            c.moveTo(radius, radius);
            c.arc(radius, radius, radius - padding, startAngle, endAngle, false);
            c.lineTo(radius, radius);
            if (fill) {
                c.fill();
            } else {
                c.stroke();
            }
            return s;
        };

        // 単純な円弧のSprite作成
        // @param {整数} [radius] 半径
        // @param {ラジアン} [angle] 方向角(弧の中央)
        // @param {ラジアン} [range] 弧の範囲。angle±(range/2)が描画される
        // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
        // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
        // @return {enchant.Sprite} 結果
        var createArcSprite = function (radius, angle, range, color, fill) {
            var sprite = new Sprite(radius * 2, radius * 2);
            sprite.image = createArcSurface(radius, color, fill);
            return sprite;
        };

        // 点
        var Point = enchant.Class.create({
            // @param {整数} [x] 省略時は0
            // @param {整数} [y] 省略時は0
            initialize: function (x, y) {
                // X座標値
                this.x = x || 0;

                // Y座標値
                this.y = y || 0;
            },
            // 指定した点と自分との距離
            // @param {object} [point] 点{x,y}
            // @return {実数} 距離
            getDistance: function (point) {
                var dx = point.x - this.x;
                var dy = point.y - this.y;
                return Math.sqrt(dx * dx + dy * dy);
            },
            // 指定した点と自分が同じ位置かどうか
            // @param {object} [point] 点{x,y}
            // @return {boolen} 同じならtrue
            isEqual: function (point) {
                return point.x == this.x && point.y == this.y;
            },
            // 複製
            // @return {Point} 新しいインスタンス
            clone: function () {
                return new Point(this.x, this.y);
            }
        });

        // 線
        var Line = enchant.Class.create({
            // @param {整数} [x1] 始点X 省略時は0
            // @param {整数} [y1] 始点Y 省略時は0
            // @param {整数} [x2] 終点X 省略時は0
            // @param {整数} [y2] 終点Y 省略時は0
            initialize: function (x1, y1, x2, y2) {
                // 始点
                this.posS = new Point(x1, y1);

                // 終点
                this.posE = new Point(x2, y2);
            },
            // 始終点間のX量。終点が始点より左にあったらマイナスになる
            dx: {
                get: function () {
                    return this.posE.x - this.posS.x;
                },
                set: function (d) {
                    this.posE.x = this.posS.x + d;
                }
            },
            // 始終点間のY量。終点が始点より上にあったらマイナスになる
            dy: {
                get: function () {
                    return this.posE.y - this.posS.y;
                },
                set: function (d) {
                    this.posE.y = this.posS.y + d;
                }
            },
            // 長さ。set時、終点の位置が変わる。始点から遠くor近くなる
            length: {
                get: function () {
                    return this.posS.getDistance(this.posE);
                },
                set: function (dstL) {
                    var srcL = this.Length;
                    this.posE.x = this.posS.x + Math.floor(this.dx * dstL / srcL);
                    this.posE.y = this.posS.y + Math.floor(this.dy * dstL / srcL);
                }
            },
            // 指定した線と交差しているかどうか
            // @param {Line} [line] 線
            // @return {Boolen} 交差しているならtrue
            isCrossLine: function (line) {
                // 線分Aのベクトル。
                var vax = this.dx;
                var vay = this.dy;
                // vax, vay を時計回りに90度回転。
                var nx = -vay;
                var ny = vax;
                // 法線を正規化。
                var length = this.length;
                if (0 < length) {
                    length = 1 / length;
                }
                nx *= length;
                ny *= length;

                // 線分Bのベクトル。
                var vbx = line.dx;
                var vby = line.dy;
                //
                var d = -(this.posS.x * nx + this.posS.y * ny);
                var bunbo = (nx * vbx + ny * vby);
                if (bunbo == 0) {
                    return false;
                }
                var t = -(nx * line.posS.x + ny * line.posS.y + d) / bunbo;
                if (t <= 0 || 1 < t) {
                    // 当たってない。
                    return false;
                }
                // 線との交差点。
                var hitX = line.posS.x + vbx * t;
                var hitY = line.posS.y + vby * t;
                //
                var doc = ((this.posS.x - hitX) * (this.posE.x - hitX)) + ((this.posS.y - hitY) * (this.posE.y - hitY));
                return (doc < 0);
            },
            // Surface作成
            // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
            // @param {整数} [width] 線幅。省略時は1
            // @return {enchant.Surface} 結果
            createSurface: function (color, width) {
                var x1 = 0, y1, x2, y2;
                if ((this.posS.x < this.posE.x) == (this.posS.y < this.posE.y)) {
                    y1 = 0;
                    x2 = Math.abs(this.dx);
                    y2 = Math.abs(this.dy);
                } else {
                    y1 = Math.abs(this.dy);
                    x2 = Math.abs(this.dx);
                    y2 = 0;
                }

                var s = new Surface(Math.abs(this.dx), Math.abs(this.dy));
                var c = s.context;
                c.strokeStyle = color;
                c.lineWidth = width || 1;

                c.beginPath();
                c.moveTo(x1, y1);
                c.lineTo(x2, y2);
                c.stroke();

                return s;
            },
            // Sprite作成
            // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
            // @param {整数} [width] 線幅。省略時は1
            // @return {enchant.Sprite} 結果
            createSprite: function (color, width) {
                var s = this.createSurface(color, width);

                var sprite = new Sprite(s.width, s.height);
                sprite.x = Math.min(this.posS.x, this.posE.x);
                sprite.y = Math.min(this.posS.y, this.posE.y);
                sprite.image = s;
                return sprite;
            },
            // 複製
            // @return {Line} 新しいインスタンス
            clone: function () {
                return new Line(this.posS.x, this.posS.y, this.posE.x, this.posE.y);
            }
        });

        // 範囲のある図形の基本クラス
        var Area = enchant.Class.create({
            // @param {整数} [x] 図形の左上座標X 省略時は0
            // @param {整数} [y] 図形の左上座標Y 省略時は0
            // @param {整数} [width] 省略時は0
            // @param {整数} [height] 省略時は0
            initialize: function (x, y, width, height) {
                this.x = x || 0;
                this.y = y || 0;
                this.width = width || 0;
                this.height = height || 0;
            },
            // 上
            top: {
                get: function () {
                    return this.y;
                },
                set: function (t) {
                    this.y = t;
                }
            },
            // 下
            bottom: {
                get: function () {
                    return this.y + this.height;
                },
                set: function (b) {
                    // 位置維持を優先
                    this.height = Math.abs(b - this.y);
                    if (b < this.y) {
                        this.y = b;
                    }

                    // サイズ維持を優先
                    //this.y = b - this.height;
                }
            },
            // 左
            left: {
                get: function () {
                    return this.x;
                },
                set: function (l) {
                    this.x = l;
                }
            },
            // 右
            right: {
                get: function () {
                    return this.x + this.width;
                },
                set: function (r) {
                    // 位置維持を優先
                    this.width = Math.abs(r - this.x);
                    if (r < this.x) {
                        this.x = r;
                    }

                    // サイズ維持を優先
                    //this.x = r - this.width;
                }
            },
            // 中心 {x,y} 
            center: {
                get: function () {
                    return new Point(this.x + this.width / 2, this.y + this.height / 2);
                },
                set: function (c) {
                    this.x = c.x - this.width / 2;
                    this.y = c.y - this.height / 2;
                }
            },
            // 対角線の長さ。setは中心基準で変更
            diagonal: {
                get: function () {
                    return Math.sqrt(this.width * this.width + this.height * this.height);
                },
                set: function (l) {
                    var d = this.diagonal;
                    if (d == 0) {
                        l *= Math.sqrt(2);
                        this.x -= Math.floor(l * 0.5);
                        this.y -= Math.floor(l * 0.5);
                        this.width = this.height = Math.floor(l);
                    } else {
                        this.scale(l / d);
                    }
                }
            },
            // 拡大縮小。基準は中心
            // ※enchant.Spriteのような一時的な変化ではなく、値は上書きされる
            // @param {実数} [sx] 横方向の拡大率
            // @param {実数} [sy] 縦方向の拡大率。省略時はsxと同じ
            scale: function (sx, sy) {
                if (typeof sy != 'number') sy = sx;
                var w = this.width * sx;
                var h = this.height * sy;
                this.x += Math.floor((this.width - w) * 0.5);
                this.y += Math.floor((this.height - h) * 0.5);
                this.width = Math.floor(w);
                this.height = Math.floor(h);
            },
            // enchant.Sprieteの位置・大きさを取り込む
            // @param {enchant.Sprite} [sprite] 対象
            updateFrom: function (sprite) {
                this.x = sprite.x;
                this.y = sprite.y;
                this.height = sprite.height * sprite.scaleX;
                this.width = sprite.width;
            },
            // enchant.Spriete等に位置・大きさを設定
            // @param {enchant.Sprite} [sprite] 対象
            // @param {Boolen} [updateSize] サイズの取り込みにおいて、幅/高さを更新するならtrue。scaleX/scaleYを更新するなら false。省略時はfalse
            setTo: function (sprite, updateSize) {
                sprite.x = this.x;
                sprite.y = this.y;
                if (updateSize) {
                    sprite.scaleX =
	                sprite.scaleY = 1.0;
                    sprite.height = this.height;
                    sprite.width = this.width;
                } else {
                    sprite.scaleX = this.width / sprite.width;
                    sprite.scaleY = this.height / sprite.height;
                }
            },
            // 色情報の一括取得
            // ※enchant.Surface.getPixelが遅いらしいので
            // @param {enchant.Surface} [surface] 取得元Surface
            // @return {Array.<Array.<{r,g,b,a}>>} 例えば data[y][x].r は、座標x,yの赤色の値
            getPixels: function (surface) {
                var data = surface.context.getImageData(this.left, this.top, this.width, this.height).data;

                var result = [];
                result.length = this.height;
                for (var row = 0; row < this.height; row++) {
                    result[row] = [];
                    result[row].length = this.width;
                    for (var column = 0; column < this.width; column++) {
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
            },
            // 複製
            // @return {Area} 新しいインスタンス
            clone: function () {
                return new Area(this.x, this.y, this.width, this.height);
            }
        });

        // 四角形
        var Rectangle = enchant.Class.create(Area, {
            // @param {整数} [x] 四角形の左上座標X 省略時は0
            // @param {整数} [y] 四角形の左上座標Y 省略時は0
            // @param {整数} [width] 省略時は0
            // @param {整数} [height] 省略時は0
            initialize: function (x, y, width, height) {
                Area.call(this, x, y, width, height);

                // 内部用
                this._calcWidth = function (key) {
                    return Math.floor(this.width * ((key - 1) % 3) * 0.5);
                };
                this._calcHeight = function (key) {
                    return Math.floor(this.height * (2 - Math.floor((key - 1) / 3)) * 0.5);
                };
            },
            // 指定した座標が四角形内に入っているかどうか
            // @param {object} [point] 位置{x,y}
            // @return {Boolen} 入っているならtrue
            hitTest: function (point) {
                return this.x < point.x && point.x < this.right &&
                    this.y < point.y && point.y < this.bottom;
            },
            // 指定した四角形と重なっているならtrue
            // @param {Rectangle} [rect] 四角形
            // @return {Boolen} 重なっているならtrue
            intersectRect: function (rect) {
                return this.x < rect.right && rect.x < this.right &&
                    this.y < rect.bottom && rect.y < this.bottom;
            },
            // 指定した線と重なっているならtrue
            // @param {Line} [line] 線
            // @return {Boolen} 重なっているならtrue
            intersectLine: function (line) {
                // 線の端部が四角形内にあるかどうか
                if (this.hitTest(line.posS) || this.hitTest(line.posE)) {
                    return true;
                }

                // 線が四角形の各辺と交差しているか
                return this.getSideLine(0).isCross(line) ||
				    this.getSideLine(1).isCross(line) ||
				    this.getSideLine(2).isCross(line) ||
				    this.getSideLine(3).isCross(line);
            },
            // テンキー1～9の位置を四角形の各点に見立て、その座標を返す
            // 例えば1だと四角形の左下の座標値を返す
            // @param {整数} [key] 1～9
            // @return {Point} 結果
            getPos: function (key) {
                return new Point(
                this.x + this._calcWidth(key),
                this.y + this._calcHeight(key));
            },
            // テンキー1～9の位置を四角形の各点に見立て、指定した座標がその位置になるように変更
            // 例えば1なら、四角形の左下の座標値を指定値に合わせる
            // @param {整数} [key] 1～9
            // @param {object} [pos] 位置{x,y}
            setPos: function (key, pos) {
                this.x = pos.x - this._calcWidth(key);
                this.y = pos.y - this._calcHeight(key);
            },
            // 指定した座標を四角形内に収める
            // @param {object} [pos] 位置{x,y}
            adjustPos: function (pos) {
                if (pos.x < this.left) pos.x = this.left;
                else if (this.right < pos.x) pos.x = this.right;
                if (pos.y < this.top) pos.y = this.top;
                else if (this.bottom < pos.y) pos.y = this.bottom;
            },
            // 四角形内のランダムな座標を返す
            // @return {Point} 結果
            getRandomPos: function () {
                return new Point(
                this.x + Math.floor(Math.random() * this.width),
                this.y + Math.floor(Math.random() * this.height));
            },
            // 四角形の各辺をLineオブジェクトで返す
            // @param {整数} [no] 0=上辺, 1=下辺, 2=左辺,3=右辺
            // @return {Line} 結果
            getSideLine: function (no) {
                var key1, key2;
                switch (no) {
                    case 0: key1 = 7; key2 = 9; break;
                    case 1: key1 = 1; key2 = 3; break;
                    case 2: key1 = 7; key2 = 1; break;
                    case 3: key1 = 9; key2 = 3; break;
                }
                var line = new Line();
                line.posS = this.getPos(key1);
                line.posE = this.getPos(key2);
                return line;
            },
            // 対角線をLineオブジェクトとして返す
            // @param {整数} [key] テンキー1,3,7,9のどれか。それを始点になる
            // @return {Line} 結果
            getDiagonalLine: function (key) {
                var key2;
                switch (key) {
                    case 1: key2 = 9; break;
                    case 3: key2 = 7; break;
                    case 7: key2 = 3; break;
                    case 9: key2 = 1; break;
                }
                var line = new Line();
                line.posS = this.getPos(key);
                line.posE = this.getPos(key2);
                return line;
            },
            // Surface作成
            // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
            // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
            // @return {enchant.Surface} 結果
            createSurface: function (color, fill) {
                return createRectangleSurface(this.width, this.height, color, fill);
            },
            // Sprite作成
            // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
            // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
            // @return {enchant.Sprite} 結果
            createSprite: function (color, fill) {
                var s = this.createSurface(color, fill);
                var sprite = new Sprite(s.width, s.height);
                sprite.image = s;
                sprite.x = this.x;
                sprite.y = this.y;
                return sprite;
            },
            // 複製
            // @return {Rectangle} 新しいインスタンス
            clone: function () {
                return new Rectangle(this.x, this.y, this.width, this.height);
            }
        });

        // 円
        var Circle = enchant.Class.create(Area, {
            // @param {整数} [centerX] 中心座標X 省略時は0
            // @param {整数} [centerY] 中心座標Y 省略時は0
            // @param {整数} [radius] 半径 省略時は0
            initialize: function (centerX, centerY, radius) {
                Area.call(this, centerX - radius, centerY - radius, radius * 2, radius * 2);
            },
            // 半径
            radius: {
                get: function () {
                    return this.width / 2;
                },
                set: function (r) {
                    var v = Math.floor((r - this.radius) * 0.5);
                    this.x -= v;
                    this.y -= v;
                    this.width = r * 2;
                }
            },
            // 直径
            diameter: {
                get: function () {
                    return this.width;
                },
                set: function (d) {
                    var v = Math.floor((d - this.diameter) * 0.5);
                    this.x -= v;
                    this.y -= v;
                    this.width = d;
                }
            },
            // 指定した座標が円内に入っているかどうか
            // @param {object} [point] 位置{x,y}
            // @return {Boolen} 入っているならtrue
            hitTest: function (point) {
                var pos = (typeof sec == 'Point') ? point : new Point(point.x, point.y);
                return this.center.getDistance(pos) < this.radius;
            },
            // 指定した四角形と重なっているならtrue
            // @param {Rectangle} [rect] 四角形
            // @return {Boolen} 重なっているならtrue
            intersectRect: function (rect) {
                //return this.x < rect.right && rect.x < this.right &&
                //        this.y < rect.bottom && rect.y < this.bottom;

                // 未実装
                throw new Error('Circle.intersectRect is not implemented');
            },
            // 指定した線と重なっているならtrue
            // @param {Line} [line] 線
            // @return {Boolen} 重なっているならtrue
            intersectLine: function (line) {
                //// 線の端部が円内にあるかどうか
                //if (this.hitTest(line.posS) || this.hitTest(line.posE)) {
                //    return true;
                //}

                // 未実装
                throw new Error('Circle.intersectLine is not implemented');
            },
            // 指定した円と重なっているならtrue
            // @param {Circle} [circle] 円
            // @return {Boolen} 重なっているならtrue
            intersectCircle: function (circle) {
                var distance = (this.diameter + circle.diameter) / 2;

                var _;
                return (_ = this.x - rect.x + (this.width - rect.width) / 2) * _ +
                        (_ = this.y - circle.y + (this.height - circle.height) / 2) * _ < distance * distance;
            },
            // 指定した座標を円内に収める
            // @param {object} [pos] 位置{x,y}
            adjustPos: function (pos) {
                var distance = this.center.getDistance(pos);
                if (distance < this.radius) return;

                var center = this.center;
                pos.x = center.x + Math.floor(this.radius * (pos.x - center.x) / distance);
                pos.y = center.y + Math.floor(this.radius * (pos.y - center.y) / distance);
            },
            // 円内のランダムな座標{x,y}を返す
            // @return {Point} 結果
            getRandomPos: function () {
                var r = Math.random() * this.radius;
                var angle = Math.random() * Math.PI * 2;
                var point = this.center;
                point.x += Math.floor(Math.cos(angle) * r);
                point.y += Math.floor(Math.sin(angle) * r);
                return point;
            },
            // 単純な円のSurface作成
            // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
            // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
            // @return {enchant.Surface} 結果
            createSurface: function (color, fill) {
                return createCircleSurface(this.radius, color, fill);
            },
            // Sprite作成
            // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
            // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
            // @return {enchant.Sprite} 結果
            createSprite: function (color, fill) {
                var s = this.createSurface(color, fill);
                var sprite = new Sprite(s.width, s.height);
                sprite.image = s;
                sprite.x = this.x;
                sprite.y = this.y;
                return sprite;
            },
            // 複製
            // @return {Circle} 新しいインスタンス
            clone: function () {
                var center = this.center;
                return new Circle(center.x, center.y, this.radius);
            }
        });

        // 楕円
        var Ellipse = enchant.Class.create(Area, {
            // @param {整数} [centerX] 中心座標X 省略時は0
            // @param {整数} [centerY] 中心座標Y 省略時は0
            // @param {整数} [width] 省略時は0
            // @param {整数} [height] 省略時は0
            initialize: function (centerX, centerY, width, height) {
                Area.call(this, centerX - width / 2, centerY - height / 2, width, height);
            },
            // 指定した座標が楕円内に入っているかどうか
            // @param {object} [point] 位置{x,y}
            // @return {Boolen} 入っているならtrue
            hitTest: function (point) {
                //var pos = (typeof sec == 'Point') ? point : new Point(point.x, point.y);
                //return this.center.getDistance(pos) < radius;

                // 未実装
                throw new Error('Ellipse.hitTest is not implemented');
            },
            // 指定した四角形と重なっているならtrue
            // @param {Rectangle} [rect] 四角形
            // @return {Boolen} 重なっているならtrue
            intersectRect: function (rect) {
                //return this.x < rect.right && rect.x < this.right &&
                //        this.y < rect.bottom && rect.y < this.bottom;

                // 未実装
                throw new Error('Ellipse.intersectRect is not implemented');
            },
            // 指定した線と重なっているならtrue
            // @param {Line} [line] 線
            // @return {Boolen} 重なっているならtrue
            intersectLine: function (line) {
                // 線の端部が楕円内にあるかどうか
                //if (this.hitTest(line.posS) || this.hitTest(line.posE)) {
                //    return true;
                //}

                // 未実装
                throw new Error('Ellipse.intersectLine is not implemented');
            },
            // 指定した座標を楕円内に収める
            // @param {object} [pos] 位置{x,y}
            adjustPos: function (pos) {
                // 未完成(円として判定)
                //var radius = Math.min(this.width, this.height) / 2;

                //var distance = this.center.getDistance(pos);
                //if (distance < radius) return;

                //var center = this.center;
                //pos.x = center.x + Math.floor(radius * (pos.x - center.x) / distance);
                //pos.y = center.y + Math.floor(radius * (pos.y - center.y) / distance);

                // 未実装
                throw new Error('Ellipse.adjustPos is not implemented');
            },
            // 楕円内のランダムな座標{x,y}を返す
            // @return {Point} 結果
            getRandomPos: function () {
                // 未完成(円として判定)
                //var r = Math.random() * Math.min(this.width, this.height) * 0.5;
                //var angle = Math.random() * Math.PI * 2;
                //var point = this.center;
                //point.x += Math.floor(Math.cos(angle) * r);
                //point.y += Math.floor(Math.sin(angle) * r);
                //return point;

                // 未実装
                throw new Error('Ellipse.getRandomPos is not implemented');
            },
            // Surface作成
            // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
            // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
            // @return {enchant.Surface} 結果
            createSurface: function (color, fill) {
                return createEllipseSurface(this.width, this.height, color, fill);
            },
            // Sprite作成
            // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
            // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
            // @return {enchant.Sprite} 結果
            createSprite: function (color, fill) {
                var s = this.createSurface(color, fill);
                var sprite = new Sprite(s.width, s.height);
                sprite.image = s;
                sprite.x = this.x;
                sprite.y = this.y;
                return sprite;
            },
            // 複製
            // @return {Ellipse} 新しいインスタンス
            clone: function () {
                var center = this.center;
                return new Ellipse(center.x, center.y, this.width, this.height);
            }
        });

        // 円弧
        var Arc = enchant.Class.create(Circle, {
            // @param {整数} [centerX] 中心座標X 省略時は0
            // @param {整数} [centerY] 中心座標Y 省略時は0
            // @param {整数} [radius] 半径 省略時は0
            // @param {ラジアン} [angle] 方向角(弧の中央) 省略時は0
            // @param {ラジアン} [range] 弧の範囲。angle±(range/2)が描画される 省略時は0
            initialize: function (centerX, centerY, radius, angle, range) {
                Circle.call(this, centerX, centerY, radius);

                // 方向角(弧の中央)
                this.angle = normalinzeRad(angle | 0);

                // 弧の範囲。angle±(range/2)が描画される
                this.range = normalinzeRad(range | 0);
            },
            // 開始角度(ラジアン)
            angleStart: {
                get: function () {
                    return normalinzeRad(this.angle - this.range * 0.5);
                }
            },
            // 終了角度(ラジアン)
            angleEnd: {
                get: function () {
                    return normalinzeRad(this.angle + this.range * 0.5);
                }
            },
            // 指定した座標が円弧内に入っているかどうか
            // @param {object} [point] 位置{x,y}
            // @return {Boolen} 入っているならtrue
            hitTest: function (point) {
                //var pos = (typeof sec == 'Point') ? point : new Point(point.x, point.y);
                //if (this.radius < this.center.getDistance(pos)) return false;

                // 未実装
                throw new Error('Arc.hitTest is not implemented');
            },
            // 指定した四角形と重なっているならtrue
            // @param {Rectangle} [rect] 四角形
            // @return {Boolen} 重なっているならtrue
            intersectRect: function (rect) {
                //var distance = (this.width + this.height + rect.width + rect.height) / 4;

                //var center1 = this.center;
                //var center2 = rect.center;
                //if (distance < center1.getDistance(center2)) return false;

                //var direction = normalinzeRad(Math.atan((center1.y - center2.y) / (center1.x - center2.x)) - Math.PI * 0.5);
                //if (this.angleStart < this.angleEnd) {
                //    return this.angleStart < direction && direction < this.angleEnd;
                //} else {
                //    return this.angleStart < direction || direction < this.angleEnd;
                //}

                // 未実装。arc_within.jsを使うならそちらをどうぞ
                throw new Error('Arc.intersectRect is not implemented');
            },
            // 指定した線と重なっているならtrue
            // @param {Line} [line] 線
            // @return {Boolen} 重なっているならtrue
            intersectLine: function (line) {
                // 線の端部が円内にあるかどうか
                //if (this.hitTest(line.posS) || this.hitTest(line.posE)) {
                //    return true;
                //}

                // 未実装
                throw new Error('Arc.intersectLine is not implemented');
            },
            // 指定した円と重なっているならtrue
            // @param {Circle} [circle] 円
            // @return {Boolen} 重なっているならtrue
            intersectCircle: function (circle) {
                // 未実装(円として判定)
                //var distance = (this.diameter + circle.diameter) / 2;

                //var _;
                //return (_ = this.x - rect.x + (this.width - rect.width) / 2) * _ +
                //(_ = this.y - circle.y + (this.height - circle.height) / 2) * _ < distance * distance;

                // 未実装
                throw new Error('Arc.intersectCircle is not implemented');
            },
            // 指定した座標を円弧内に収める
            // @param {object} [pos] 位置{x,y}
            adjustPos: function (pos) {
                // 未実装
                /*
                var distance = this.center.getDistance(pos);
                if (distance < this.radius) return;

                var center = this.center;
                pos.x = center.x + Math.floor(this.radius * (pos.x - center.x) / distance);
                pos.y = center.y + Math.floor(this.radius * (pos.y - center.y) / distance);
                */

                // 未実装
                throw new Error('Arc.adjustPos is not implemented');
            },
            // 円弧内のランダムな座標{x,y}を返す
            // @return {Point} 結果
            getRandomPos: function () {
                var r = Math.random() * this.radius;
                var angle = this.angle + Math.random() * this.range - this.range * 0.5;
                var point = this.center;
                point.x += Math.floor(Math.cos(angle) * r);
                point.y += Math.floor(Math.sin(angle) * r);
                return point;
            },
            // Surface作成
            // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
            // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
            // @return {enchant.Surface} 結果
            createSurface: function (color, fill) {
                return createArcSurface(this.radius, this.angle, this.range, color, fill);
            },
            // Sprite作成
            // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
            // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
            // @return {enchant.Sprite} 結果
            createSprite: function (color, fill) {
                var s = this.createSurface(color, fill);
                var sprite = new Sprite(s.width, s.height);
                sprite.image = s;
                sprite.x = this.x;
                sprite.y = this.y;
                return sprite;
            },
            // 複製
            // @return {Arc} 新しいインスタンス
            clone: function () {
                var center = this.center;
                return new Arc(center.x, center.y, this.radius, this.angle, this.range);
            }
        });

        // ベクトル
        // 分析はまだ
        var Vector2 = enchant.Class.create({
            initialize: function (x, y) {
                this.set(x, y);
            },
            set: function (x, y) {
                this.x = x;
                this.y = y;
            },
            add: function (v) {
                this.x += v.x;
                this.y += v.y;
                return this;
            },
            sub: function (v) {
                this.x -= v.x;
                this.y -= v.y;
                return this;
            },
            scale: function (n) {
                this.x *= n;
                this.y *= n;
                return this;
            },
            div: function (n) {
                if (n) {
                    this.x /= n;
                    this.y /= n;
                }
                return this;
            },
            inner_product: function (v) {
                return this.x * v.x + this.y * v.y;
            },
            length: function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            },
            resize: function (n) {
                if (this.length()) {
                    this.scale(n / this.length());
                }
                return this;
            },
            normalize: function () {
                return this.resize(1);
            },
            angle: function () {
                return (180 * Math.atan2(this.y, this.x)) / Math.PI;
            },
            rotate: function (deg) {
                var rad = (deg * Math.PI) / 180;
                var size = this.length();
                this.x = Math.sin(rad) * this.y + Math.cos(rad) * this.x;
                this.y = Math.cos(rad) * this.y - Math.sin(rad) * this.x;
                this.resize(size);
                return this;
            },
            clone: function () {
                return new Vector(this.x, this.y);
            },
            reverse: function () {
                this.x *= -1;
                this.y *= -1;
            }
        });

        // 3Dで使うようだけど
        // 分析はまだ
        var Vector = enchant.Class.create({
            initialize: function (x, y, z, w) {
                this.x = 0;
                this.y = 0;
                this.z = 0;
                this.w = 1;

                if (arguments.length > 1) {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                    if (arguments.length > 3)
                        this.w = w;
                }
                if (arguments.length == 1) {
                    this.x = x.x;
                    this.y = x.y;
                    this.z = x.z;
                    this.w = x.w;
                }

            },
            distance: function () {
                var xx = Math.pow(this.x, 2);
                var yy = Math.pow(this.y, 2);
                var zz = Math.pow(this.z, 2);
                return Math.sqrt(xx + yy + zz);
            },
            normalize: function () {
                var dist = this.distance();
                this.x /= len;
                this.y /= len;
                this.z /= len;
            },
            dotProduct: function (src) {
                var x = this.x * src.x;
                var y = this.y * src.y;
                var z = this.z * src.z;
                return x + y + z;
            },
            add: function (src) {
                this.x += src.x;
                this.y += src.y;
                this.z += src.z;
                this.w += src.w;
            },
            sub: function (src) {
                this.x -= src.x;
                this.y -= src.y;
                this.z -= src.z;
                this.w -= src.w;
            },
            scale: function (src) {
                this.x *= src;
                this.y *= src;
                this.z *= src;
                this.w *= src;
            },
            copy: function () {
                return new Vector(this.x, this.y, this.z, this.w);
            },
            toString: function () {
                return '(' + this.x + ',' + this.y + ',' + this.z + ',' + this.w + ')';
            }
        });

        // 3Dで使うようだけど
        // 分析はまだ
        var Matrix = enchant.Class.create({
            initialize: function (m) {
                this.matrix = [[1, 0, 0, 0],
                        [0, 1, 0, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 1]];
                this.tmpMat = [[1, 0, 0, 0],
                        [0, 1, 0, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 1]];


                if (arguments.length == 1) {
                    if (m.matrix != undefined) {
                        for (var i = 0; i < 4; i++)
                            for (var j = 0; j < 4; j++)
                                this.matrix[i][j] = m.matrix[i][j];
                    } else {
                        this.matrix = m;
                    }
                }
            },
            apply: function (vector) {
                var m = this.matrix;
                return new Vector(m[0][0] * vector.x + m[0][1] * vector.y + m[0][2] * vector.z + m[0][3] * vector.w,
                            m[1][0] * vector.x + m[1][1] * vector.y + m[1][2] * vector.z + m[1][3] * vector.w,
                            m[2][0] * vector.x + m[2][1] * vector.y + m[2][2] * vector.z + m[2][3] * vector.w,
                            m[3][0] * vector.x + m[3][1] * vector.y + m[3][2] * vector.z + m[3][3] * vector.w);
            },
            composition: function (mat) {
                var m = this.matrix;
                var r = new Array();
                for (var i = 0; i < 4; i++) {
                    r[i] = new Array();
                    for (var j = 0; j < 4; j++) {
                        r[i][j] = 0;
                        for (var k = 0; k < 4; k++) {
                            r[i][j] += m[i][k] * mat.matrix[k][j];
                        }
                    }
                }
                return new Matrix(r);
            },
            compositionMe: function (mat) {
                var m = this.matrix;
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 4; j++) {
                        var r = 0;
                        for (var k = 0; k < 4; k++) {
                            r += m[k][j] * mat.matrix[i][k];
                        }
                        this.tmpMat[i][j] = r;
                    }
                }
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 4; j++) {
                        this.matrix[i][j] = this.tmpMat[i][j];
                    }
                }
            },
            rotateX: function (T) {
                var cosT = Math.cos(T);
                var sinT = Math.sin(T);
                this.matrix = [[1, 0, 0, 0],
                        [0, cosT, -sinT, 0],
                        [0, sinT, cosT, 0],
                        [0, 0, 0, 1]];
            },
            rotateY: function (T) {
                var cosT = Math.cos(T);
                var sinT = Math.sin(T);
                this.matrix = [[cosT, 0, sinT, 0],
                        [0, 1, 0, 0],
                        [-sinT, 0, cosT, 0],
                        [0, 0, 0, 1]];
            },
            rotateZ: function (T) {
                var cosT = Math.cos(T);
                var sinT = Math.sin(T);
                this.matrix = [[cosT, -sinT, 0, 0],
                        [sinT, cosT, 0, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 1]];
            },
            rotateWithVector: function (T, V) {
                var cosT = Math.cos(T);
                var cosTr = 1 - cosT;
                var sinT = Math.sin(T);
                var x = V.x;
                var y = V.y;
                var z = V.z;
                this.matrix = [[x * x * cosTr + cosT, x * y * cosTr - z * sinT, z * x * cosTr + y * sinT, 0],
                        [x * y * cosTr + z * sinT, y * y * cosTr + cosT, y * z * cosTr + x * sinT, 0],
                        [z * x * cosTr - y * sinT, y * z * cosTr + x * sinT, z * z * cosTr + cosT, 0],
                        [0, 0, 0, 1]];
            },
            toString: function () {
                var m = this.matrix;
                var str = '';
                for (var i = 0; i < 4; i++) {
                    str += '|';
                    for (var j = 0; j < 4; j++) {
                        str += ' ' + m[i][j] + ' ';
                    }
                    str += '|\n';
                }
                return str;
            },
            print: function () {
                alert(this.toString());
            }
        });


        // 3Dで使うようだけど
        // 分析はまだ
        var VertexTable = enchant.Class.create(Array, {
            initialize: function (vt) {
                Array.call(this);
                if (vt != undefined) {
                    for (var i = 0; i < vt.length; i++)
                        this.push(new Vector(vt[i]));
                    //              this[i] = vt[i];
                }
            },
            apply: function (m) {
                var result = new VertexTable();
                for (var i = 0; i < this.length; i++) {
                    result.push(m.apply(this[i]));
                }
                return result;
            },
            applyFast: function (src, m) {
                for (var i = 0; i < this.length; i++) {
                    this[i].x = m.matrix[0][0] * src[i].x +
                        m.matrix[0][1] * src[i].y +
                        m.matrix[0][2] * src[i].z +
                        m.matrix[0][3] * src[i].w;
                    this[i].y = m.matrix[1][0] * src[i].x +
                        m.matrix[1][1] * src[i].y +
                        m.matrix[1][2] * src[i].z +
                        m.matrix[1][3] * src[i].w;
                    this[i].z = m.matrix[2][0] * src[i].x +
                        m.matrix[2][1] * src[i].y +
                        m.matrix[2][2] * src[i].z +
                        m.matrix[2][3] * src[i].w;
                    this[i].w = m.matrix[3][0] * src[i].x +
                        m.matrix[3][1] * src[i].y +
                        m.matrix[3][2] * src[i].z +
                        m.matrix[3][3] * src[i].w;
                }
                return this;
            },
            scale: function (fact) {
                var result = new VertexTable();
                for (var i = 0; i < this.length; i++) {
                    result.push(fact * this[i]);
                }
                return result;
            },
            toString: function () {
                var str = '';
                for (var i = 0; i < this.length; i++) {
                    str += this[i] + ',';
                }
                return str;
            }
        });

        // 3Dで使うようだけど
        // 分析はまだ
        var Coord3D = enchant.Class.create(enchant.EventTarget, {
            initialize: function (x, y, z) {
                enchant.EventTarget.call(this);
                if (arguments.length == 1) {
                    this.dv = x;
                } else if (arguments.length == 0) {
                    this.dv = new Vector(0, 0, 0);
                } else {
                    this.dv = new Vector(x, y, z);
                }
                this.up = new Vector(0, 1, 0);
                this.r = new Vector(1, 0, 0);
                this.u = new Vector(0, 1, 0);
                this.f = new Vector(0, 0, 1);
                this.rotMat = new Matrix();
                this.movMat = new Matrix();
                this.rm = new Matrix();
            },
            rotateY: function (T) {
                this.rm.rotateY(T);
                this.r = this.rm.apply(this.r);
                this.u = this.rm.apply(this.u);
                this.f = this.rm.apply(this.f);
            },
            moveR: function (scalar) {
                this.dv.x += scalar * this.r.x;
                this.dv.y += scalar * this.r.y;
                this.dv.z += scalar * this.r.z;
            },
            moveU: function (scalar) {
                this.dv.x += scalar * this.u.x;
                this.dv.y += scalar * this.u.y;
                this.dv.z += scalar * this.u.z;
            },
            moveF: function (scalar) {
                this.dv.x += scalar * this.f.x;
                this.dv.y += scalar * this.f.y;
                this.dv.z += scalar * this.f.z;
            },
            movePosition: function (x, y, z) {
                if (arguments.length == 1) {
                    this.dv.x += x.x;
                    this.dv.y += x.y;
                    this.dv.z += x.z;
                } else {
                    this.dv.x += x;
                    this.dv.y += y;
                    this.dv.z += z;
                }
            },
            setPosition: function (x, y, z) {
                if (arguments.length == 1) {
                    this.dv.x = x.x;
                    this.dv.y = x.y;
                    this.dv.z = x.z;
                } else {
                    this.dv.x = x;
                    this.dv.y = y;
                    this.dv.z = z;
                }
            },
            setAttitude: function (r, u, f) {
                this.r.x = r.x;
                this.r.y = r.y;
                this.r.z = r.z;
                this.u.x = u.x;
                this.u.y = u.y;
                this.u.z = u.z;
                this.f.x = f.x;
                this.f.y = f.y;
                this.f.z = f.z;
            },
            updateMat: function () {
                this.movMat.initialize();
                this.movMat.matrix[0][3] = this.dv.x;
                this.movMat.matrix[1][3] = this.dv.y;
                this.movMat.matrix[2][3] = this.dv.z;
                this.rotMat.initialize();
                this.rotMat.matrix[0][0] = this.r.x;
                this.rotMat.matrix[0][1] = this.u.x;
                this.rotMat.matrix[0][2] = this.f.x;
                this.rotMat.matrix[1][0] = this.r.y;
                this.rotMat.matrix[1][1] = this.u.y;
                this.rotMat.matrix[1][2] = this.f.y;
                this.rotMat.matrix[2][0] = this.r.z;
                this.rotMat.matrix[2][1] = this.u.z;
                this.rotMat.matrix[2][2] = this.f.z;
            },
            toString: function () {
                return 'dv: ' + this.dv.toString() + ', f: ' + this.f.toString();
            }
        });

        // 3Dで使うようだけど
        // 分析はまだ
        var Shape = enchant.Class.create(Coord3D, {
            initialize: function (x, y, z) {
                Coord3D.call(this, x, y, z);
                this.color = '#000000';
                this.sphereR = 0;
                this.sphereOrigin = new Vector();
                this.vt = new VertexTable();
                this.rvt = new VertexTable();
                this.updateMat();
            },
            setVT: function (vt) {
                this.vt = new VertexTable(vt);
                this.rvt = new VertexTable(vt);
            },
            draw: function (context, camMat, convMat) {
                var r = this.rvt;
                this.updateMat();
                this.rm = this.movMat.composition(this.rotMat);
                this.rm.compositionMe(camMat);
                this.rm.compositionMe(convMat);
                r.applyFast(this.vt, this.rm);

                context.beginPath();
                context.strokeStyle = this.color;
                context.lineWidth = 1;
                if (r[0].w >= 0) {
                    //context.moveTo(r[0].x/r[0].w, r[0].y/r[0].w);
                    context.moveTo(Math.round(r[0].x / r[0].w), Math.round(r[0].y / r[0].w));
                }
                for (var i = 1, l = r.length; i < l; i++) {
                    if (r[i].w >= 0) {
                        //context.lineTo(r[i].x/r[i].w, r[i].y/r[i].w);
                        context.lineTo(Math.round(r[i].x / r[i].w), Math.round(r[i].y / r[i].w));
                    }
                }
                context.stroke();
            },
            shapeSphereHit: function (shape) {

                var dv = this.dv;
                var so = this.sphereOrigin;
                var origin = new Vector(dv.x + so.x, dv.y + so.y, dv.z + so.z);
                dv = shape.dv;
                so = shape.sphereOrigin;
                var aOrigin = new Vector(dv.x + so.x, dv.y + so.y, dv.z + so.z);
                origin.sub(aOrigin);
                if (origin.distance() <= shape.sphereR + this.sphereR) {
                    return true;
                } else {
                    return false;
                }
            }
        });

        // 3Dで使うようだけど
        // 分析はまだ
        var Camera = enchant.Class.create(Coord3D, {
            initialize: function (x, y, z) {
                Coord3D.call(this, x, y, z);
                this.sphereR = 0;
                this.sphereOrigin = new Vector();
                this.front = new Vector(0, 0, -1);
                this.cv = new Vector();
                this.updateMat();
            },
            updateMat: function () {
                this.front = this.f.copy();
                this.front.scale(-1);
                this.cv.x = this.dv.dotProduct(this.r);
                this.cv.y = this.dv.dotProduct(this.u);
                this.cv.z = this.dv.dotProduct(this.front);
                this.rotMat.matrix[0][3] = -this.cv.x;
                this.rotMat.matrix[1][3] = -this.cv.y;
                this.rotMat.matrix[2][3] = -this.cv.z;
                this.rotMat.matrix[0][0] = this.r.x;
                this.rotMat.matrix[0][1] = this.r.y;
                this.rotMat.matrix[0][2] = this.r.z;
                this.rotMat.matrix[1][0] = this.u.x;
                this.rotMat.matrix[1][1] = this.u.y;
                this.rotMat.matrix[1][2] = this.u.z;
                this.rotMat.matrix[2][0] = this.front.x;
                this.rotMat.matrix[2][1] = this.front.y;
                this.rotMat.matrix[2][2] = this.front.z;
            }
        });

        // 波紋
        // ※Chromeでうまくいかない。Firefoxでは大丈夫
        var Ripple = enchant.Class.create(enchant.Sprite, {
            // @param {整数} [width] 幅 省略時はゲーム画面幅
            // @param {整数} [height] 高さ 省略時はゲーム画面高さ
            initialize: function (width, height) {
                var game = enchant.Game.instance;
                width = width || game.width;
                height = height || game.height;

                enchant.Sprite.call(this, width, height);

                //-----------------------------

                this._active = false;
                //this._lineColor = 'black';
                this._radius = 0;
                this._radiusMax = 0;
                this._radiusLimit = 0;
                this._speed = 1;

                this.image = new enchant.Surface(width, height);

                var c = this.image.context;
                c.fillStyle = 'transparent';

                this._draw = function () {
                    this.image.clear();
                    //c.strokeStyle = this._radiusLimit == 0 || this._radius < this._radiusLimit
                    //    ? this._lineColor
                    //    : c.fillStyle;

                    c.beginPath();
                    c.arc(this._center.x, this._center.y, this._radius, 0, Math.PI * 2, false);
                    c.closePath();

                    //c.fill();
                    c.stroke();
                };

                this.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
                    if (!this._active) return;

                    this._radius += this._speed;
                    if (this._radius < this._radiusMax) {
                        this._draw();
                    } else {
                        this.stop();
                    }
                });
            },
            // 線色
            lineColor: {
                get: function () {
                    return this.image.context.strokeStyle; // this._lineColor;
                },
                set: function (c) {
                    //this._lineColor = c;
                    this.image.context.strokeStyle = c;
                }
            },
            // 線幅
            lineWidth: {
                get: function () {
                    return this.image.context.lineWidth;
                },
                set: function (l) {
                    this.image.context.lineWidth = l;
                }
            },
            // 波紋の速度(フレーム毎の半径増加量)
            speed: {
                get: function () {
                    return this._speed;
                },
                set: function (s) {
                    this._speed = s;
                }
            },
            // 現在表示している波紋の半径
            radius: {
                get: function () {
                    return this._radius;
                }
            },
            // 波紋の最大半径。startで指定した位置から、一番遠い四隅までの距離
            radiusMax: {
                get: function () {
                    return this._radiusMax;
                }
            },
            // 半径の制限。0だと描画範囲を越えるまで実行
            radiusLimit: {
                get: function () {
                    return this._radiusLimit;
                },
                set: function (r) {
                    this._radiusLimit = r;
                }
            },
            // 表示開始
            // @param {整数} [x] 開始地点 X座標
            // @param {整数} [y] 開始地点 X座標
            start: function (x, y) {
                this._center = new Point(x, y);
                this._active = true;
                this._radius = 0;

                if (0 < this._radiusLimit) {
                    this._radiusMax = this._radiusLimit;
                } else {
                    this._radiusMax = this._center.getDistance(
                                new Point(
                                    this.width / 2 < x ? 0 : this.width,
                                    this.height / 2 < y ? 0 : this.height
                                ));
                }

                this.image.clear();
            },
            // 停止/再開
            active: {
                get: function () {
                    return this._active;
                },
                set: function (a) {
                    if (this._active == a) return;
                    if (a && this._radiusMax == 0) return;
                    this._active = a;
                }
            },
            // 表示終了
            stop: function () {
                this._active = false;
                this._radiusMax = 0;
                this.image.clear();
            }
        });

        //-----------------------------

        return {
            createRectangleSurface: createRectangleSurface,
            createRectangleSprite: createRectangleSprite,
            createCircleSurface: createCircleSurface,
            createCircleSprite: createCircleSprite,
            createEllipseSurface: createEllipseSurface,
            createEllipseSprite: createEllipseSprite,
            Point: Point,
            Line: Line,
            Area: Area,
            Rectangle: Rectangle,
            Circle: Circle,
            Ellipse: Ellipse,
            Arc: Arc,
            Ripple: Ripple
        };
    })();

    //-----------------------------

    return {
        getUserAgent: getUserAgent,
        createIconSurface: createIconSurface,
        createIconSprite: createIconSprite,
        isDebug: isDebug,
        trace: trace,
        makeRepeatString: makeRepeatString,
        makeSpace: makeSpace,
        playSound: playSound,
        RepeatSoundPlayer: RepeatSoundPlayer,
        AverageRandamizer: AverageRandamizer,
        Event_SceneExStarting: Event_SceneExStarting,
        Event_SceneExInput: Event_SceneExInput,
        SceneEx: SceneEx,
        addFadeOutText: addFadeOutText,
        keyBind: keyBind,
        toRGBString: toRGBString,
        shuffleArray: shuffleArray,
        Event_TimerTimeOut: Event_TimerTimeOut,
        Timer: Timer,
        toKanji1: toKanji1,
        toKanji2: toKanji2,
        degToRad: degToRad,
        radToDeg: radToDeg,
        normalinzeRad: normalinzeRad,
        normalinzeDeg: normalinzeDeg,
        makeValues: makeValues,
        Geolocation: Geolocation,
        collision2Sprites: collision2Sprites,
        createMaze: createMaze,
        setMazeData: setMazeData,
        stringWidth: stringWidth,
        toKatakanaCase: toKatakanaCase,
        toHirakanaCase: toHirakanaCase,
        randomString: randomString,
        isOutOfScreen: isOutOfScreen,
        round: round,
        ceil: ceil,
        floor: floor,
        paddingLeft: paddingLeft,
        paddingRight: paddingRight,
        formatString: formatString,
        arrayQueryIf: arrayQueryIf,
        arrayEraseIf: arrayEraseIf,
        samePartsForEach: samePartsForEach,
        findRoutesForEach: findRoutesForEach,
        calcMoveCost: calcMoveCost,
        createSimpleMap: createSimpleMap,
        createSampleMap: createSampleMap,
        LogList: LogList,
        Figure: Figure
    };
})();