// enchant.js拡張ライブラリ
// The MIT License
// Copyright (c) 2012 Ryuuma Kishita
if (exte === undefined) throw new Error('not load "exte.enchant.js"');

(function (exte) {
    "use strict";

    // 数値を漢字にする
    // @param {整数} [value] 数値
    // @return {String} 結果
    exte.toKanji1 = function (value) {
        return exte.makeKanji(value, '〇一二三四五六七八九', '十百千万');
    };

    // 数値を漢字にする
    // @param {整数} [value] 数値
    // @return {String} 結果
    exte.toKanji2 = function (value) {
        return exte.makeKanji(value, '零壱弐参肆伍陸漆捌玖', '拾佰阡萬');
    };

    // カタカナ変換
    // @param {String} [str] 文字列
    // @return {String} 結果
    exte.toKatakanaCase = function (str) {
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
    exte.toHirakanaCase = function (str) {
        var result = "";
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            result += String.fromCharCode((0x30A1 <= c && c <= 0x30F6) ? c - 0x0060 : c);
        };
        return result;
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
    exte.Geolocation = enchant.Class.create({
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
})(exte || (exte = {}));