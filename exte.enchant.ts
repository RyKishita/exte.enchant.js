// enchant.js拡張ライブラリ
// The MIT License
// Copyright (c) 2012 Ryuuma Kishita

/// <reference path="enchant.d.ts"/>
/// <reference path="util.enchant.d.ts"/>

module exte {
    // 色
    export interface IColor {
        r: number;
        g: number;
        b: number;
        a: number;
    }

    // 正数の乱数
    // @param {number} [num] 0～num-1を発生させる
    // @return {number} 乱数
    export function rand(num: number): number {
        if (num <= 1) return 0;
        return Math.floor(Math.random() * num);
    }

    // 実行端末取得
    export function getUserAgent(): string {
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
    }

    // デバッグ用。引数の内容をコンソールに出力
    export function trace(...argArray: any[]): void {
        if (argArray.length == 0) return;
        var args = Array.prototype.slice.call(argArray, 0);
        for (var i = 0; i < args.length; i++) {
            console.log(args[i]);
        }
    }

    // 繰り返し文字列の作成
    // @param {String} [text] 文字列
    // @param {整数} [n] 空白文字数 省略時は一回(=textのまま)
    // @return {String} 結果
    export function makeRepeatString(text: string, n?: number): string {
        var s = text;
        if (n) {
            for (var i = 1; i < n; i++) {
                s += text;
            }
        }
        return s;
    }

    // 空白の作成
    // @param {整数} [n] 空白文字数 省略時は１文字
    // @return {String} 結果
    export function makeSpace(n?: number): string {
        return makeRepeatString('&nbsp;', n);
    }

    // 正数の乱数を生成
    // Math.randomと比べて、発生した値が次の発生以降に出にくくなります。
    // 値の偏りが防がれることで運に左右されづらくなりますが、
    // 事故が起きないので面白くない乱数とも言えます。
    export class AverageRandamizer {
        // @param {整数} [range] 0～range-1を発生させる
        constructor (range: number) {
            this.range = range;
        }

        private _table = [];

        // 乱数の取得
        // @return {整数} 乱数
        public get next(): number {
            var matchs = [];
            this._table.forEach((value, index) =>{
                if (rand(value) == 0) matchs.push(index);
            });

            var result;
            if (0 < matchs.length) {
                result = matchs[rand(matchs.length)];
            } else {
                result = rand(this.range);
            }
            
            this._table[result] += this.range;
            for (var i = 0; i < this.range; i++) {
                this._table[i]--;
            }

            return result;
        }

        // 乱数範囲の取得
        public get range(): number {
            return this._table.length;
        }

        // 乱数範囲の設定
        public set range(r: number) {
            if (r < this.range) {
                // サイズが減る場合はリセット
                this._table.length = 0;
            }
            for (var i = this.range; i < r; i++) {
                this._table.push(r);
            }
        }
    }

    // 色文字列の作成
    // 引数なし:透明
    // 引数1つ:RGB同値
    // 引数2つ:RGB同値, alpha
    // 引数3つ:red, green, blue
    // 引数4つ:red, green, blue, alpha
    // @return {String} 色
    export function toRGBString(...argArray: number[]): string {

        var r, g, b, a;
        if (3 <= argArray.length) {
            r = argArray[0];
            g = argArray[1];
            b = argArray[2];
            if (4 <= argArray.length) {
                a = argArray[3];
            } else {
                a = 1.0;
            }
        } else if (1 <= argArray.length) {
            r = g = b = argArray[0];
            if (2 <= argArray.length) {
                a = argArray[1];
            } else {
                a = 1.0;
            }
        } else {
            r = g = b = a = 0;
        }

        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }

    // 配列のランダム並べ替え
    // @param {Array}[src] 元データ
    // @return {Array} 結果
    export function shuffleArray(src: any[]): any[] {
        var dst = [];
        while (0 < src.length) {
            var index = rand(src.length);
            var value = src.splice(index, 1)[0];
            dst.push(value);
        }
        return dst;
    }

    // 数値の文字列化
    // @param {number}[value] 数値
    // @param {string}[chars]変換テーブル
    // @param {string}[ketas]桁の変換テーブル
    // @return {Array} 結果
    export function makeKanji(value: number, chars: string, ketas: string): string {
        value = Math.floor(value);
        if (value == 0) return chars[0];
        var ketaMax = ketas.length;

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
        while (0 < nums.length) {
            var v = nums.pop();

            var keta = '';
            if (0 < nums.length) {
                keta = ketas[nums.length - 1];
            }

            // 0は追加しない
            // 1は先頭と最後の1の場合は追加（一千と呼ぶ時もあるような）
            // それ以外は追加
            if (v != 0 && (v != 1 || nums.length == ketaMax || nums.length == 0)) {
                result += chars[v];
            }

            // 桁追加
            if (0 < v) {
                result += keta;
            }
        }
        return result;
    }

    // 度 → ラジアン
    // @param {number} [d] 度
    // @return {number} ラジアン
    export function degToRad(d: number): number {
        return d * Math.PI / 180.0;
    }

    // ラジアン → 度
    // @param {number} [r] ラジアン
    // @return {number} 度
    export function radToDeg(r: number): number {
        return r * 180.0 / Math.PI;
    }

    // ラジアンを0～Math.PI * 2.0未満の範囲に補正
    // @param {number} [r] ラジアン
    // @return {number} 結果
    export function normalinzeRad(r: number): number {
        if (r < 0.0) {
            return normalinzeRad(r + Math.PI * 2.0); //再帰
        }
        if (Math.PI * 2.0 <= r) {
            return normalinzeRad(r - Math.PI * 2.0); //再帰
        }
        return r;
    }

    // 度を0～360未満の範囲に補正
    // @param {number} [d] 度
    // @return {number} 結果
    export function normalinzeDeg(d: number): number {
        if (d < 0.0) {
            return this.normalinzeDeg(d + 360.0); //再帰
        }
        if (360.0 <= d) {
            return this.normalinzeDeg(d - 360.0); //再帰
        }
        return d;
    }

    // 角度(ラジアン)をキャラクタ方向値に変換
    export function angleToDirection(angle: number): number {
        angle = normalinzeRad(angle);
        if (angle < Math.PI * 0.25) {
            return 2;
        } else if (angle < Math.PI * 0.75) {
            return 0;
        } else if (angle < Math.PI * 1.25) {
            return 1;
        } else if (angle < Math.PI * 1.75) {
            return 3;
        } else {
            return 2;
        }
    }

    // キャラクタ方向値を角度(ラジアン)に変換
    export function directionToAngle(direction: number): number {
        switch (direction) {
            case 0: return Math.PI * 0.5;
            case 1: return Math.PI * 1.0;
            case 2: return Math.PI * 0.0;
            case 3: return Math.PI * 1.5;
        }
    }

    // 2つの角度の狭角。例えばキャラクタの向いている方向と敵の方向が同じであるほど0.0に近くなる
    // @param {number} [angle1] 角度1(ラジアン)
    // @param {number} [angle2] 角度2(ラジアン)
    // @return {number} 結果
    export function getNarrowAngle(angle1: number, angle2: number): number {
        angle1 = normalinzeRad(angle1);
        angle2 = normalinzeRad(angle2);
        var min = Math.min(angle1, angle2);
        var max = Math.max(angle1, angle2);

        var agl = max - min;
        if (Math.PI < agl) {
            agl = min + Math.PI * 2 - max;
        }
        return agl;
    }

    // 2点間の距離
    export function getDistance(point1: enchant.IPoint, point2: enchant.IPoint): number {
        var dx = point1.x - point2.x;
        var dy = point1.y - point2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // 角度の計算。右が0で、時計回り方向が+、逆が-。つまり-π～0～πの値を取る
    export function getAngle(from: enchant.IPoint, to: enchant.IPoint): number {
        var dx = to.x - from.x;
        var dy = to.y - from.y;
        return Math.atan2(dy, dx);
    }

    // 例えば全て1をセットしたArrayなどを作る
    // @param {なんでも} [value] 値
    // @param {整数} [count] 個数 省略時は1
    // @return {Array} 結果
    export function makeValues(value: any, count: number): any[] {
        var values = [];
        for (var i = 0; i < count; i++) {
            values.push(value);
        }
        return values;
    }

    // 迷路作成(棒倒し法) enchant.MapのcollisionDataと同じ形式で返す（壁は1、通路は0）
    // @param {整数} [rowNum] 行数。必ず奇数にすること
    // @param {整数} [columnNum] 列数。必ず奇数にすること
    // @param {Boolen} [addframe] 外枠を壁にするかどうか。省略時はfalse(壁にしない)
    // @return {Array.<Array.<Number>>} 結果
    export function createMaze(rowNum: number, columnNum: number, addframe?: bool): number[][] {
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
                var r = rand(range);
                maze[row + dy[r]][column + dx[r]] = 1;
            }
            //上方向は一番最初の行のみ
            if (range == 4) range = 3;
        }

        return maze;
    }

    var base = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

    // ランダム文字列
    // @param {Number} [len] 文字数。省略時は1文字
    // @param {string} [pattern] 使う文字。省略時はアルファベット大小文字
    // @return {String} 結果
    export function randomString(len: number, pattern?: string): string {
        if (!pattern) pattern = base;

        var result = "";
        len = len || 1;
        for (var i = 0; i < len; i++) {
            result += pattern.charAt(rand(pattern.length));
        }
        return result;
    }

    // 四捨五入
    // @param {実数} [num] 数値
    // @param {整数} [figure] 小数点以下桁。省略時は0(Math.roundと同じ)
    // @return {実数} 結果
    export function round(num: number, figure?: number): number {
        if (figure) {
            var base = Math.pow(10, figure);
            return Math.round(num * base) / base;
        } else {
            return Math.round(num);
        }
    }

    // 切り上げ
    // @param {実数} [num] 数値
    // @param {整数} [figure] 小数点以下桁。省略時は0(Math.ceilと同じ)
    // @return {実数} 結果
    export function ceil(num: number, figure?: number): number {
        if (figure) {
            var base = Math.pow(10, figure);
            return Math.ceil(num * base) / base;
        } else {
            return Math.ceil(num);
        }
    }

    // 切り捨て
    // @param {実数} [num] 数値
    // @param {整数} [figure] 小数点以下桁。省略時は0(Math.floorと同じ)
    // @return {実数} 結果
    export function floor(num: number, figure?: number): number {
        if (figure) {
            var base = Math.pow(10, figure);
            return Math.floor(num * base) / base;
        } else {
            return Math.floor(num);
        }
    }

    // 指定した桁に達していない数値の先頭に文字を埋めて返す。右寄せ
    // @param {整数} [num] 数値
    // @param {整数} [len] 桁数
    // @param {String} [ch] 文字。省略時は'0'。空白を入れるときは'&nbsp;'(Label)か' '(MutableText)
    // @return {String} 文字列
    export function paddingLeft(num: number, len: number, ch?: string): string {
        ch = ch || '0';

        var str = num.toString();
        len -= str.length;
        while (0 < len--) { str = ch + str; }

        return str;
    }

    // 指定した桁に達していない数値の末尾に文字を埋めて返す。左寄せ
    // @param {整数} [num] 数値
    // @param {整数} [len] 桁数
    // @param {整数} [ch] 文字。省略時は'0'。空白を入れるときは'&nbsp;'(Label)か' '(MutableText)
    // @return {String} 文字列
    export function paddingRight(num: number, len: number, ch?: string): string {
        ch = ch || '0';

        var str = num.toString();
        len -= str.length;
        while (0 < len--) { str += ch; }

        return str;
    }

    // 文字列フォーマット
    // 例1：formatString("rgb({r}, {g}, {b})", color)
    //      → colorが{r:128, g:0, b:255}であるとき、"rgb(128, 0, 255)"
    // 例2：formatString("{0} + {1} = {2}", 5, 10, 5+10)
    //      → "5 + 10 = 15"
    // @param {文字列} [format] フォーマット
    // @param {object or arguments} [arg] 値
    // @return {String} 文字列
    export function formatString(format: string, ...argArray: any[]): string {
        // 置換ファンク
        var rep_fn = undefined;

        // オブジェクトの場合
        if (argArray.length == 1 && typeof argArray[0] == "object") {
            /** @ignore */
            rep_fn = function (m, k) { return argArray[0][k]; }
        }
            // 複数引数だった場合
        else {
            /** @ignore */
            rep_fn = function (m, k) { return argArray[parseInt(k) + 1]; }
        }

        return format.replace(/\{(\w+)\}/g, rep_fn);
    }

    // 配列内にある、条件に合う要素の削除
    // @param {Array} [ary] 配列
    // @param {Function} [fn] 条件判定関数。function(配列内の要素、配列内の順番、配列自体)。削除するならtrueを返す
    export function arrayEraseIf(ary: any[], fn: (element: any, index: number, array: any[]) =>bool) {
        for (var i = ary.length - 1; i >= 0; i--) {// 逆順
            if (fn(ary[i], i, ary)) { ary.splice(i, 1); }
        }
    }

    export class MapPoint {
        constructor (row: number, column: number) {
            this.row = row;
            this.column = column;
        }
        row: number;
        column: number;
    }

    // MapPointSeacher.getRoute の結果データ
    export class ResultRoute extends MapPoint {
        constructor (row: number, column: number, rest: number, route: MapPoint[][]) {
            super(row, column);
            this.row = row;
            this.column = column;
            this.rest = rest;
            this.routes = route;
        }

        //残り移動力
        rest: number;

        //このマスへ行くための道順
        //複数のルートになることがあるので配列の配列になっている
        routes: MapPoint[][];

        //作業用
        valid: bool = true;
    }

    // calcMoveCost の結果データ
    export class ResultMoveCost {
        cost: number;
        routes: number[][];
    }

    // マップ上の地点検索
    export class MapPointSeacher {
        // @param {number[][]} [map] 各地点の移動コスト。またはマップ種類別の値
        constructor (map: number[][]) {
            this.map = map;
            this.rowNum = map.length;
            this.columnNum = map[0].length;
            this.limitLeft = 0;
            this.limitRight = this.columnNum-1;
            this.limitTop = 0;
            this.limitBottom = this.rowNum-1;
        }

        private map: number[][];
        private rowNum: number;
        private columnNum: number;

        // マップ内の特定の範囲に限定して検索する時に指定
        public limitLeft: number;
        public limitRight: number;
        public limitTop: number;
        public limitBottom: number;

        // 指定した地点と同じ値が続く地点を返す。お絵かきソフトの塗りつぶしのイメージ
        // @param {整数} [baseRowNo] 基準地点の行番号
        // @param {整数} [baseColumnNo] 基準地点の列番号
        // @param {Function} [matchFunc] 値比較関数。matchFunc(value1, value2)戻り値Boolen 省略時は'=='で比較 
        // @return {MapPoint[]} 結果。基準地点も含む
        public getSamePoints(baseRowNo: number, baseColumnNo: number, matchFunc?: (value1: number, value2: number) =>bool): MapPoint[] {
            var baseValue = this.map[baseRowNo][baseColumnNo];

            if (matchFunc === undefined) {
                matchFunc = (value1, value2) =>value1 == value2;
            }

            var results: MapPoint[] = [];

            var points = [];
            function AddPoint(map, row, column) {
                if (points.some(value=>value.row == row && value.column == column)) {
                    return;
                }

                var v = map[row][column];

                var bMatch = matchFunc(baseValue, v);
                if (bMatch) {
                    results.push(new MapPoint(row, column));
                }

                points.push({ row: row, column: column, valid: bMatch });
            }
            AddPoint(this.map, baseRowNo, baseColumnNo);

            while (true) {
                var point = null;
                for (var i = 0; i < points.length; i++) {
                    if (points[i].valid) {
                        point = points[i];
                        break;
                    }
                }
                if (point == null) break;
                point.valid = false;

                if (this.limitTop < point.row) {
                    AddPoint(this.map, point.row - 1, point.column);
                }
                if (this.limitLeft < point.column) {
                    AddPoint(this.map, point.row, point.column - 1);
                }
                if ((point.row + 1) < this.limitBottom) {
                    AddPoint(this.map, point.row + 1, point.column);
                }
                if ((point.column + 1) < this.limitRight) {
                    AddPoint(this.map, point.row, point.column + 1);
                }
            }

            return results;
        }

        // シミュレーションゲームなどのユニット移動判定
        // @param {Array<Array<整数>>} [map] 2次元配列。
        //      各マスの移動コスト(0やマイナスも可)を設定します。
        //      移動できないマスには大きな数字を入れてください。
        //      各行の列数は全て同じであることを期待します。
        // @param {整数} [baseRowNo] ユニットの現在位置の行番号
        // @param {整数} [baseColumnNo] ユニットの現在位置の列番号
        // @param {整数} [cost] ユニットの移動力
        // @return {MapPoint[]} 結果。コストが足りれば開始地点が踏む魔れることもあります
        public getRoute(baseRowNo: number, baseColumnNo: number, cost: number): ResultRoute[]{

            var route = new ResultRoute(baseRowNo, baseColumnNo, cost, [[]]);

            var points: ResultRoute[] = [];
            points.push(route);

            function AddPoint(map, row, column, rest, routes) {
                var r = map[row][column];
                if (rest < r) return;
                rest -= r;

                var newRoutes = [];
                for (var i = 0; i < routes.length; i++) {
                    newRoutes.push(routes[i].concat([new MapPoint(row, column)]));
                }

                var find = points.filter(point=>point.row == row && point.column == column);
                if (0 < find.length) {
                    var point = find[0];

                    if (point.rest < rest) {
                        point.rest = rest;
                        point.routes = newRoutes;
                        point.valid = true;
                    } else if (point.rest == rest) {
                        newRoutes.forEach(value=>point.routes.push(value));
                        point.valid = true;
                    }
                    return;
                }

                points.push(new ResultRoute(row, column, rest, newRoutes));
            }

            var firstPos = true;
            while (true) {
                var point = null;
                for (var i = 0; i < points.length; i++) {
                    if (points[i].valid) {
                        point = points[i];
                        break;
                    }
                }
                if (point == null) break;
                point.valid = false;

                if (this.limitTop < point.row) {
                    AddPoint(this.map, point.row - 1, point.column, point.rest, point.routes);
                }
                if (this.limitLeft < point.column) {
                    AddPoint(this.map, point.row, point.column - 1, point.rest, point.routes);
                }
                if ((point.row + 1) < this.limitBottom) {
                    AddPoint(this.map, point.row + 1, point.column, point.rest, point.routes);
                }
                if ((point.column + 1) < this.limitRight) {
                    AddPoint(this.map, point.row, point.column + 1, point.rest, point.routes);
                }

                if (firstPos) {
                    firstPos = false;
                    point.rest = -1;
                }
            }

            for (var i = points.length -1; i >= 0; i--) {
                var point = points[i];
                if (point.rest < 0) {
                    points.splice(i, 1);
                }
            }

            return points;
        }

        // 指定した位置に行くのに必要な最小コストとその道順を計算(上記 getRoute の逆)
        // @param {整数} [fromRowNo] 現在位置の行番号
        // @param {整数} [fromColumnNo] 現在位置の列番号
        // @param {整数} [toRowNo] 目的の地点の行番号
        // @param {整数} [toColumnNo] 目的の地点の列番号
        // @return {ResultMoveCost} 結果
        public calcMoveCost(map: number[][], fromRowNo: number, fromColumnNo: number, toRowNo: number, toColumnNo: number): ResultMoveCost {
            // 基準としてまっすぐ目的地に行った時のコストを計算
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
            var routes = this.getRoute(fromRowNo, fromColumnNo, cost);

            var resultRoutes
            routes.forEach(value => {
                if (value.row == toRowNo && value.column == toColumnNo) {
                    resultRoutes = routes;
                }
            });

            // 見つけた道順でコストを再計算
            cost = 0;
            for (var i = 0; i < resultRoutes[0].length; i++) {
                var rt = resultRoutes[0][i];
                cost += map[rt.row][rt.column];
            }

            var result = new ResultMoveCost();
            result.cost = cost;
            result.routes = resultRoutes;
            return result;
        }
    }

    // アイコンSurface作成
    // @param {整数} [index] アイコンイメージ内のインデックス
    // @param {整数} [count] index~index+count-1をイメージに含める(同じ行内)。初期値は1
    // @param {String} [assetName] アイコンイメージファイル(アセット名)。初期値は'icon0.png'
    // @param {整数} [width] アイコン1つ分の幅。初期値は16
    // @param {整数} [height] アイコン1つ分の高さ。初期値は16 
    // @param {整数} [columnNum] assetName内の一行にあるアイコン数。初期値は16('icon0.png'を想定)
    // @return {Surface} 結果
    export function createIconSurface(index: number, count: number, assetName: string, width: number, height: number, columnNum: number) {
        count = count || 1;
        assetName = assetName || 'icon0.png';
        width = width || 16;
        height = height || 16;
        columnNum = columnNum || 16;

        var x = (index % columnNum) * width;
        var y = Math.floor(index / columnNum) * height;

        var image = new enchant.Surface(width * count, height);
        image.draw(
            enchant.Game.instance.assets[assetName],
            x, y, width * count, height,
            0, 0, width * count, height);
        return image;
    }

    // アイコンSprite作成
    // @param {整数} [index] アイコンイメージ内のインデックス
    // @param {整数} [count] index~index+count-1をイメージに含める(同じ行内)。初期値は1
    // @param {String} [assetName] アイコンイメージファイル(アセット名)。初期値は'icon0.png'
    // @param {整数} [width] アイコン1つ分の幅。初期値は16
    // @param {整数} [height] アイコン1つ分の高さ。初期値は16 
    // @param {整数} [columnNum] assetName内の一行にあるアイコン数。初期値は16('icon0.png'を想定)
    // @return {Sprite} 結果
    export function createIconSprite(index: number, count?: number, assetName?: string, width?: number, height?: number, columnNum?: number) {
        count = count || 1;
        assetName = assetName || 'icon0.png';
        width = width || 16;
        height = height || 16;

        var sprite = new enchant.Sprite(width, height);
        if (count == 1) {
            sprite.image = enchant.Game.instance.assets[assetName];
            sprite.frame = index;
        } else {
            sprite.image = createIconSurface(index, count, assetName, width, height, columnNum);
            sprite.frame = 0;
        }
        return sprite
    }

    // 現在デバッグモードかどうか
    export function isDebug(): bool {
        return enchant.Game.instance._debug;
    }

    // 音の再生
    // @param {文字列} [assetName] アセット名
    export function playSound(assetName: string): void {
        enchant.Game.instance.assets[assetName].clone().play();
    }

    // 主にBGM用。曲の終わりをフェードアウトして曲の頭につなげる
    // ※enchant.SceneのEvent.ENTER_FRAMEでenterFrameを呼ぶ
    // ※特定のenchant.Sceneで流すなら、addChildでも良い
    export class RepeatSoundPlayer extends enchant.Node {
        // @param {文字列} [assetName] アセット名
        // @param {実数} [fadeSec] 残り何秒からフェードアウトを開始するか。省略時は5秒
        // @param {実数} [volume] 音量。省略時は1.0(最大)
        constructor (assetName: string, fadeSec?: number, volume?: number) {
            super();

            this._sound = enchant.Sound.load(assetName);
            this._fadeSec = fadeSec || 5.0;
            this._volume = volume || 1.0;

            this.addEventListener(enchant.Event.ENTER_FRAME, this.enterFrame);
        }
        private _sound;
        private _fadeSec;
        private _volume;

        // 再生開始
        public play() {
            this._sound.volume = this._volume;
            this._sound.play();
        }

        // 中断
        public pause() {
            this._sound.pause();
        }

        // 停止
        stop() {
            this._sound.stop();
        }

        // enchant.Event.ENTER_FRAMEで実行
        enterFrame() {
            if (this._fadeSec < (this._sound.duration - this._sound.currentTime)) {
                return;
            }

            this._sound.volume = this._volume * (this._sound.duration - this._sound.currentTime) / this._fadeSec;
            if (this._sound.volume < 0.01) {
                this._sound.currentTime = 0;
                this.play();
            }
        }
    }

    // SceneInput用。登録した入力パターンが完了した時のイベント
    // e.eventID イベントID
    // e.sec     入力完了までの秒数
    export var Event_SceneInput = 'exte.enchant.Event_SceneInput';

    // SceneInput用イベント
    export class SceneExEvent extends enchant.Event {
        constructor (type: string) {
            super(type);
        }

        eventID: number;
        sec: number;
    }

    // SceneInput用入力パターンデータ
    export class InputPatternData {
        // イベントID
        eventID: number;

        // 入力内容
        pattern: Array;

        // このフレーム数までに入力を完了したらイベント発行
        framelimit: number;

        // trueにするとframelimitの意味が逆になる。さらに押し続けると連続して発行
        loop: bool;

        // 作業用
        index: number = 0;
        frame: number = 0;
        active: bool = false;
    }


    // Sceneの拡張
    // ・キー入力補助。指定した順番で入力するとイベント発行
    export class SceneInput extends enchant.Scene {
        constructor () {
            super();

            this.addEventListener(enchant.Event.ENTER_FRAME, this.enterFrame);

            var events = [enchant.Event.LEFT_BUTTON_DOWN,
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
                enchant.Event.B_BUTTON_UP];
            events.forEach(function(type) {
                    this.addEventListener(type, this.changeInput);
                }, this);
        }

        private inputPatterns = [];

        private makeEvent(p) {
            var ev = new SceneExEvent(Event_SceneInput);
            ev.eventID = p.eventID;
            ev.sec = p.frame / enchant.Game.instance.fps;
            enchant.Game.instance.currentScene.dispatchEvent(ev);
        }

        private enterFrame(e){
            this.inputPatterns.forEach(p=>{
                if (p.active) {
                    p.frame++;
                }
            });
        }

        private changeInput(e) {
            for (var i = 0; i < this.inputPatterns.length; i++) {
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
                    this.makeEvent(p);
                    p.frame = 0;
                } else {
                    if (p.frame <= p.framelimit) {
                        this.makeEvent(p);
                    }
                    p.index = 0;
                    p.frame = 0;
                    p.active = false;
                }
            }
        }

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
        public regist(eventID: number, pattern: Array, timelimit?: number, loop?: bool): void {
            var data = new InputPatternData();
            data.eventID = eventID;
            data.pattern = pattern;
            data.framelimit = Math.floor((timelimit || 1.0) * enchant.Game.instance.fps);
            data.loop = (loop === true);

            this.inputPatterns.push(data);
        }
    }

    // SceneEx用。シーンがフェードインを開始する直前に来る
    export var Event_SceneExStarting = 'Event_SceneExStarting';

    // Sceneの拡張
    // ・シーン切り替えと、フェードイン/アウト処理
    // ・シーン全体の透過率変更
    export class SceneEx extends SceneInput {
        public name: string;

        private _opacity = 1;
        private _setFadeIn = false;
        private _setFadeOut = false;
        private _nextSceneName = '';
        private _fadeInStep: number;
        private _fadeOutStep: number;
        private static _scenes: enchant.Scene[] = [];

        constructor (name: string, fadeInSec?: number, fadeOutSec?: number) {
            super();

            this.name = name;
            SceneEx._scenes[name] = this;

            var fps = enchant.Game.instance.fps;

            var s = (fadeInSec == undefined) ? 0.5 : fadeInSec;
            if (0 < s) {
                this._fadeInStep = 1.0 / (s * fps);
                this.addEventListener(Event_SceneExStarting, function(e){
                    this._setFadeIn = true;
                    this.opacity = 0;
                });
            }

            s = (fadeOutSec == undefined) ? 0.5 : fadeOutSec;
            this._fadeOutStep = (s == 0) ? 1 : 1.0 / (s * fps);

            this.addEventListener(enchant.Event.ENTER_FRAME, this.enterFrame);
        }

        private enterFrame(e){
            if (this._setFadeIn && this._fadeIn()) {
                this._setFadeIn = false;
            }
            if (this._setFadeOut && this._fadeOut()) {
                this._setFadeOut = false;

                this.sceneNext();
            }
        }

        private sceneNext() {
            var scene = SceneEx._scenes[this._nextSceneName];
            scene.dispatchEvent(new enchant.Event(Event_SceneExStarting));
            if (scene === this) {
                scene.dispatchEvent(new enchant.Event(enchant.Event.ENTER));
            } else {
                enchant.Game.instance.replaceScene(scene);
            }
        }

        private _fadeIn(): bool {
            if ((1 - this._fadeInStep) <= this.opacity) {
                this.opacity = 1;
                return true;
            } else {
                this.opacity += this._fadeInStep;
                return false;
            }
        }

        private _fadeOut(): bool {
            if (this.opacity <= this._fadeOutStep) {
                this.opacity = 0;
                return true;
            } else {
                this.opacity -= this._fadeOutStep;
                return false;
            }
        }

        private _setOpacityChilds(me, opct): void {
            if (me.childNodes === undefined) return;
            for (var i = 0; i < me.childNodes.length; i++) {
                var node = me.childNodes[i];
                if (node.opacity !== undefined) node.opacity = opct;
                this._setOpacityChilds(node, opct);
            }
        }

        // フェードインまたはフェードアウト中
        public get fadeProsessing(): bool {
            return this._setFadeIn || this._setFadeOut;
        }

        // 透過率取得
        public get opacity(): number {
            return this._opacity;
        }

        // 透過率設定
        public set opacity(v: number) {
            this._opacity = v;
            this._setOpacityChilds(this, v);
        }

        // シーン切り替え。現在のシーンを指定した場合リスタート
        // @param {string} [name] 切り替えるシーンの名前
        public moveSceneTo(name: string): void {
            this._nextSceneName = name;
            this._setFadeOut = true;
        }
    }

    // 自動でフェードアウトして消滅する文字
    // @param {enchant.Group} [group] 装飾スプライト登録先
    // @param {enchant.Sprite} [targetsprite] 文字を出す基準となる要素
    // @param {文字列} [text] 文字。半角英数記号のみ
    // @param {実数} [sec] 表示している時間(省略時は1秒)
    export function addFadeOutText(group: enchant.Group, targetsprite: enchant.IPoint, text: string, sec?: number) {
        if (enchant.util.MutableText === undefined) return;

        var mt = new enchant.util.MutableText(targetsprite.x, targetsprite.y);
        mt.text = text;
        mt.fedingValue = 1.0 / (enchant.Game.instance.fps * (sec || 1.0));
        mt.addEventListener(enchant.Event.ENTER_FRAME, function(e){
            this.opacity -= this.fedingValue;
            if (this.opacity < this.fedingValue) {
                this.parentNode.removeChild(this);
            }
        });
        group.addChild(mt);
    }

    // キーバインド。文字コードを調べるのが面倒なので
    // @param {文字列} [key] 割り当てる1文字
    // @param {文字列} [button] 'left', 'right', 'up', 'down', 'a', 'b' など
    export function keyBind(key, button) {
        var game = enchant.Game.instance;
        game.keybind(key[0].toUpperCase().charCodeAt(0), button);
        game.keybind(key[0].toLowerCase().charCodeAt(0), button);
    }

    // Timer用。指定した時間が来た時のイベント
    export var Event_TimerTimeOut = 'Event_TimerTimeout';

    //指定した時間が来たらイベント発行
    // ※game.frameをベースにしているので正確ではない。
    export class Timer extends enchant.Node {
        constructor () {
            super();

            this._frame = 0;
            this._startFrame = 0;
            this._active = false;
            this.addEventListener(enchant.Event.ENTER_FRAME, function(e) {
                if (!this._active) return;

                this._frame--;
                if (0 < this._frame) return;

                enchant.Game.instance.currentScene.dispatchEvent(new enchant.Event(Event_TimerTimeOut));
                this._frame = this._startFrame;
            });
        }

        _frame = 0;
        _startFrame = 0;
        _active = false;

        // タイマーを開始
        // @param {実数} [sec] 秒。指定しない場合は前回と同じ
        start(sec: number) {
            if (typeof sec == 'number') {
                this._frame =
                this._startFrame = sec * enchant.Game.instance.fps;
            }
            this._active = (0 < this._startFrame);
        }

        // タイマーを停止
        stop() {
            this._active = false;
        }
    }

    // 方向キー入力(またはui.Padの入力)をラジアンに変換
    // @return {実数} 結果。0～Math.PI*2(右が0)。入力していないときはNumber.NaN
    export function inputToRad() {
        var input = enchant.Game.instance.input;

        if (input.down && input.right) return Math.PI * 0.25;
        if (input.down && input.left) return Math.PI * 0.75;
        if (input.up && input.left) return Math.PI * 1.25;
        if (input.up && input.right) return Math.PI * 1.75;
        if (input.right) return 0.0;
        if (input.down) return Math.PI * 0.5;
        if (input.up) return Math.PI * 1.5;
        if (input.left) return Math.PI;

        return Number.NaN;
    }

    // 回転を考慮した衝突判定
    // ※参考 http://smallomega.com/?p=397
    // @param {enchant.Sprite} [sprite1] 要素1
    // @param {enchant.Sprite} [sprite2] 要素2
    // @return {Boolen} 衝突しているならtrue
    export function collision2Sprites(sprite1: enchant.Sprite, sprite2: enchant.Sprite): bool {
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
        for (var i = 0; i < a.length; i++) {
            a[i].X -= (sprite1.x + sprite1.width / 2);
            a[i].Y -= (sprite1.y + sprite1.height / 2);
        }
        for (var i = 0; i < b.length; i++) {
            b[i].X -= (sprite2.x + sprite2.width / 2);
            b[i].Y -= (sprite2.y + sprite2.height / 2);
        }

        //スプライトを回転させる
        for (var i = 0; i < a.length; i++) {
            var tmpX = a[i].X;
            var tmpY = a[i].Y;
            a[i].X = tmpX * Math.cos(sprite1.rotation * Math.PI / 180) - tmpY * Math.sin(sprite1.rotation * Math.PI / 180);
            a[i].Y = tmpX * Math.sin(sprite1.rotation * Math.PI / 180) + tmpY * Math.cos(sprite1.rotation * Math.PI / 180);
        }
        for (var i = 0; i < b.length; i++) {
            var tmpX = b[i].X;
            var tmpY = b[i].Y;
            b[i].X = tmpX * Math.cos(sprite2.rotation * Math.PI / 180) - tmpY * Math.sin(sprite2.rotation * Math.PI / 180);
            b[i].Y = tmpX * Math.sin(sprite2.rotation * Math.PI / 180) + tmpY * Math.cos(sprite2.rotation * Math.PI / 180);
        }

        //元の位置に平行移動
        for (var i = 0; i < a.length; i++) {
            a[i].X += (sprite1.x + sprite1.width / 2);
            a[i].Y += (sprite1.y + sprite1.height / 2);
        }
        for (var i = 0; i < b.length; i++) {
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
    }

    // 迷路作成(棒倒し法)
    // @param {enchant.Map} [map] 作成したデータの設定先。map.collisionDataにexte.createMazeの値をセットしておく
    // @param {整数} [rowNum] 行数。必ず奇数にすること
    // @param {整数} [columnNum] 列数。必ず奇数にすること
    // @param {整数} [floorNo] 床にするイメージNo。背景に使用
    // @param {整数} [wallNo] 壁にするイメージNo。
    // @param {Boolen} [addframe] 外枠を壁にするかどうか。省略時はfalse(壁にしない)
    export function setMazeData(map: enchant.Map, rowNum: number, columnNum: number, floorNo: number, wallNo: number, addframe?: bool) {
        var mapData1 = [];
        var mapData2 = [];
        var collisionData = map.collisionData;

        for (var row = 0; row < rowNum; row++) {
            mapData1.push([]);
            mapData2.push([]);
            for (var column = 0; column < columnNum; column++) {
                mapData1[row].push(floorNo);
                mapData2[row].push(collisionData[row][column] ? wallNo : -1);
            }
        }

        map.loadData(mapData1, mapData2);
    }

    // 文字列の幅(全角だと正確ではない)
    // @param {enchant.Surface} [surface] 描画先
    // @param {String} [str] 文字列
    // @return {Number} 幅
    export function stringWidth(surface: enchant.Surface, str: string) {
        return surface.context.measureText(str).width;
    }

    // スクリーン外に出たかどうか
    // @param {Object} [obj] 対象の要素{x,y,width,height}。例えばenchant.Sprite
    // @param {整数} [padding] 内側への余白。指定しない場合は0(要素が見えなくなった時に戻り値がtrueになる)
    // @return {Boolen} 出たならtrue
    export function isOutOfScreen(obj: enchant.IArea, padding?: number) {
        var game = enchant.Game.instance;
        padding = padding | 0;
        return obj.x + obj.width < padding ||
                obj.y + obj.height < padding ||
                game.width - padding < obj.x ||
                game.height - padding < obj.y;
    }

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
    export function createSimpleMap(assetName: string, tileSize: number, rowNum: number, columnNum: number, no: number, tlNo?: number, tNo?: number, trNo?: number, lNo?: number, rNo?: number, blNo?: number, bNo?: number, brNo?: number): enchant.Map {
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

        var map = new enchant.Map(tileSize, tileSize);
        map.image = enchant.Game.instance.assets[assetName];
        map.loadData(data);
        return map;
    }

    // "enchant.js/images/map1.gif"を使った、単純なenchant.Mapを作成
    // @param {整数} [typeNo] タイプ 0～
    // @param {整数} [rowNum] 行数
    // @param {整数} [columnNum] 列数
    export function createSampleMap(typeNo: number, rowNum: number, columnNum: number) {
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
    }

    // ログのように流れるメッセージを表示
    export class LogList extends enchant.Group {//enchant.CanvasGroupだと文字大きさが反映しない(2012/10/7時点)
        // 文字列追加時の透過率変化量/フレーム
        public fadeIn = 0.1;

        // 文字列削除時の透過率変化量/フレーム
        public fadeOut = 0.1;

        // 流れるメッセージのスクロール量/フレーム
        public scrollPx = 2;

        // 行高さ
        public lineHeight = 10;

        // デフォルトカラー
        public color = null;

        // デフォルトフォント
        public font = null;

        // デフォルトフォントサイズ
        public fontSize = null;

        // 折り返し。「normal」「break-all」「keep-all」のどれか
        public wordBreak = null;

        // 文字位置。「left」「center」「right」など
        public textAlign = null;

        // この数までログが溜まった時は、アニメーションを無効化して一気に表示
        // 0の時は制限しない
        public stackLimit = 0;

        // @param {整数} [x] X座標
        // @param {整数} [y] Y座標
        // @param {整数} [width] 幅
        // @param {整数} [height] 高さ
        constructor (x: number, y: number, width: number, height: number) {
            super();

            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;

            this.addEventListener(enchant.Event.ENTER_FRAME, this.enterFrame);
        }

        public width: number;
        public height: number;

        private _labels = [];
        private _texts = [];
        private _currentWork = 0; //0:check, 1:textout, 2:scroll, 3:textin
        private _fadeInLabel = null;
        private _fadeOutLabel = null;
        private _scrollNum = 0;
        private _outAllLog = false;
        private _visible = true;

        private createLabel(): any {
            var label = new enchant.Label('');
            label.width = this.width;
            label.visible = false;
            if (this.font) {
                label.font = this.font;
            }

            this.addChild(label);
            this._labels.push(label);

            return label;
        }

        private enterFrame0() {
            if (this._texts.length == 0) return;

            this._outAllLog = this._outAllLog
                            ? 0 < this._texts.length
                            : 0 < this.stackLimit && this.stackLimit <= this._texts.length;

            var t = this._texts.shift();

            var label = null;
            for (var i = 0; i < this._labels.length; i++) {
                if (!this._labels[i].valid) {
                    label = this._labels[i];
                    break;
                }
            }
            if (!label) {
                label = this.createLabel();
                if (this.wordBreak) {
                    label._style.wordBreak = this.wordBreak;
                }
                label.valid = false;
            }
            label.x = 0;
            label.y = 0;
            label.text = t.text;
            label._style.fontSize = t.fontSize || "";
            label.color = t.color || "";
            label.height = t.lineHeight || 10;
            label.opacity = 0;
            label.textAlign = t.textAlign || 'left';

            this._fadeInLabel = label;
            this._scrollNum = label.height;

            var bottom = 0;
            for (var i = 0; i < this._labels.length; i++) {
                var l = this._labels[i];
                if (!l.valid) continue;
                var b = l.y + l.height;
                if (bottom < b) {
                    bottom = b;
                    this._fadeOutLabel = l;
                }
            }
            if (this.height < (bottom + label.height)) {
                this._currentWork = 1;
            } else {
                this._currentWork = 2;
            }
        }

        private enterFrame1() {
            if (this._outAllLog || this._fadeOutLabel.opacity < this.fadeOut) {
                this._fadeOutLabel.opacity = 0;
                this._fadeOutLabel.visible = false;
                this._fadeOutLabel.valid = false;
                this._currentWork = 2;
            } else {
                this._fadeOutLabel.opacity -= this.fadeOut;
            }
        }

        private enterFrame2() {
            if (0 < this._scrollNum) {
                var px = (this._outAllLog || this._scrollNum <= this.scrollPx)
                            ? this._scrollNum
                            : this.scrollPx;
                for (var i = 0; i < this._labels.length; i++) {
                    var l = this._labels[i];
                    if (l.visible) {
                        l.y += px;
                    }
                }
                this._scrollNum -= px;
            }
            if (this._scrollNum <= 0) {
                this._currentWork = 3;
                this._fadeInLabel.visible = true;
                this._fadeInLabel.valid = true;
            }
        }

        private enterFrame3() {
            if (this._outAllLog || (1.0 - this.fadeIn) < this._fadeInLabel.opacity) {
                this._fadeInLabel.opacity = 1;
                this._currentWork = 0;
            } else {
                this._fadeInLabel.opacity += this.fadeIn;
            }
        }

        private enterFrame(e) {
            switch (this._currentWork) {
                case 0: this.enterFrame0(); break;
                case 1: this.enterFrame1(); break;
                case 2: this.enterFrame2(); break;
                case 3: this.enterFrame3(); break;
            }
        }

        // 表示/非表示
        public get visible() { return this._visible; }
        public set(v) {
            if (this._visible == v) return;
            this._visible = v;
            for (var i = 0; i < this._labels.length; i++) {
                var l = this._labels[i];
                l.visible = v && l.valid;
            }
        }

        // ログ登録
        // @param {文字列} [text] 表示するテキスト
        // @param {文字列} [color] このテキストのみの文字色。省略時はデフォルト
        // @param {文字列} [fontSize] このテキストのみのフォントサイズ。省略時はデフォルト
        // @param {数値} [lineWidth] このテキストのみの行高さ。省略時はデフォルト
        // @param {数値} [textAlign] このテキストのみの文字位置。省略時はデフォルト
        public regist(text: string, color?: string, fontSize?: string, lineHeight?: number, textAlign?: number): void {
            this._texts.push({
                text: text,
                color: color || this.color,
                fontSize: fontSize || this.fontSize,
                lineHeight: lineHeight || this.lineHeight,
                textAlign: textAlign || this.textAlign
            });
        }

        // 溜まっているログを、アニメーションを無効化して一気に出力
        public outAllLog(): void {
            this._outAllLog = true;
        }

        // 全削除
        public clear(): void {
            this._texts.length = 0;
            for (var i = 0; i < this._labels.length; i++) {
                var l = this._labels[i];
                l.visible = l.valid = false;
            }
            this._currentWork = 0;
        }
    }

    // 単純な四角形のSurface作成
    // @param {実数} [width] 幅
    // @param {実数} [height] 高さ
    // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
    // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
    // @return {enchant.Surface} 結果
    export function createRectangleSurface(width: number, height: number, color: string, fill?: bool): enchant.Surface {
        var s = new enchant.Surface(width, height);
        var c = s.context;
        if (fill) {
            c.fillStyle = color;
            c.fillRect(0, 0, width, height);
        } else {
            c.strokeStyle = color;
            c.strokeRect(0, 0, width, height);
        }
        return s;
    }

    // 単純な四角形のSprite作成
    // @param {実数} [width] 幅
    // @param {実数} [height] 高さ
    // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
    // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
    // @return {enchant.Sprite} 結果
    export function createRectangleSprite(width: number, height: number, color: string, fill?: bool): enchant.Sprite {
        var sprite = new enchant.Sprite(width, height);
        sprite.image = createRectangleSurface(width, height, color, fill);
        return sprite;
    }

    // 単純な円のSurface作成
    // @param {整数} [radius] 半径
    // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
    // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
    // @return {enchant.Surface} 結果
    export function createCircleSurface(radius: number, color: string, fill?: bool): enchant.Surface {
        var s = new enchant.Surface(radius * 2, radius * 2);
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
    }

    // 単純な円のSprite作成
    // @param {整数} [radius] 半径
    // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
    // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
    // @return {enchant.Sprite} 結果
    export function createCircleSprite(radius: number, color: string, fill?: bool): enchant.Sprite {
        var sprite = new enchant.Sprite(radius * 2, radius * 2);
        sprite.image = createCircleSurface(radius, color, fill);
        return sprite;
    }

    // 単純な楕円のSurface作成
    // @param {整数} [width] 省略時は0
    // @param {整数} [height] 省略時は0
    // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
    // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
    // @return {enchant.Surface} 結果
    export function createEllipseSurface(width: number, height: number, color: string, fill?: bool): enchant.Surface {
        var s = new enchant.Surface(width, height);
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
    }

    // 単純な楕円のSprite作成
    // @param {整数} [width] 省略時は0
    // @param {整数} [height] 省略時は0
    // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
    // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
    // @return {enchant.Sprite} 結果
    export function createEllipseSprite(width: number, height: number, color: string, fill?: bool): enchant.Sprite {
        var sprite = new enchant.Sprite(width, height);
        sprite.image = createEllipseSurface(width, height, color, fill);
        return sprite;
    }

    // 単純な円のSurface作成
    // @param {整数} [radius] 半径
    // @param {ラジアン} [angle] 方向角(弧の中央)
    // @param {ラジアン} [range] 弧の範囲。angle±(range/2)が描画される
    // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
    // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
    // @return {enchant.Surface} 結果
    export function createArcSurface(radius: number, angle: number, range: number, color: string, fill?: bool): enchant.Surface {
        var s = new enchant.Surface(radius * 2, radius * 2);
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
    }

    // 単純な円弧のSprite作成
    // @param {整数} [radius] 半径
    // @param {ラジアン} [angle] 方向角(弧の中央)
    // @param {ラジアン} [range] 弧の範囲。angle±(range/2)が描画される
    // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
    // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
    // @return {enchant.Sprite} 結果
    export function createArcSprite(radius: number, angle: number, range: number, color: string, fill?: bool): enchant.Sprite {
        var sprite = new enchant.Sprite(radius * 2, radius * 2);
        sprite.image = createArcSurface(radius, angle, range, color, fill);
        return sprite;
    }

    // 点
    export class Point {
        x = 0;
        y = 0;

        // @param {整数} [x] 省略時は0
        // @param {整数} [y] 省略時は0
        constructor (x: number, y: number) {
            // X座標値
            this.x = x || 0;

            // Y座標値
            this.y = y || 0;
        }

        // 指定した点と自分との距離
        // @param {object} [point] 点{x,y}
        // @return {実数} 距離
        public getDistance(point: enchant.IPoint) {
            var dx = point.x - this.x;
            var dy = point.y - this.y;
            return Math.sqrt(dx * dx + dy * dy);
        }

        // 指定した点と自分が同じ位置かどうか
        // @param {object} [point] 点{x,y}
        // @return {boolen} 同じならtrue
        public isEqual(point) {
            return point.x == this.x && point.y == this.y;
        }

        // 複製
        // @return {Point} 新しいインスタンス
        public clone(): Point {
            return new Point(this.x, this.y);
        }
    }

    // 線
    export class Line {
        // 始点
        posS: Point;

        // 終点
        posE: Point;

        // @param {整数} [x1] 始点X 省略時は0
        // @param {整数} [y1] 始点Y 省略時は0
        // @param {整数} [x2] 終点X 省略時は0
        // @param {整数} [y2] 終点Y 省略時は0
        constructor (x1: number, y1: number, x2: number, y2: number) {
            // 始点
            this.posS = new Point(x1, y1);

            // 終点
            this.posE = new Point(x2, y2);
        }

        // 始終点間のX量。終点が始点より左にあったらマイナスになる
        public get dx() {
            return this.posE.x - this.posS.x;
        }
        public set dx(dx: number) {
            this.posE.x = this.posS.x + dx;
        }

        // 始終点間のY量。終点が始点より上にあったらマイナスになる
        public get dy() {
            return this.posE.y - this.posS.y;
        }
        public set dy(dy: number) {
            this.posE.y = this.posS.y + dy;
        }

        // 長さ。set時、終点の位置が変わる。始点から遠くor近くなる
        public get length() {
            return this.posS.getDistance(this.posE);
        }
        public set length(dstL: number) {
            var srcL = this.length;
            this.posE.x = this.posS.x + Math.floor(this.dx * dstL / srcL);
            this.posE.y = this.posS.y + Math.floor(this.dy * dstL / srcL);
        }

        // 指定した線と交差しているかどうか
        // @param {Line} [line] 線
        // @return {Boolen} 交差しているならtrue
        public isCross(line: Line): bool {
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
        }

        // Surface作成
        // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
        // @param {整数} [width] 線幅。省略時は1
        // @return {enchant.Surface} 結果
        public createSurface(color: string, width?: number): enchant.Surface {
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

            var s = new enchant.Surface(Math.abs(this.dx), Math.abs(this.dy));
            var c = s.context;
            c.strokeStyle = color;
            c.lineWidth = width || 1;

            c.beginPath();
            c.moveTo(x1, y1);
            c.lineTo(x2, y2);
            c.stroke();

            return s;
        }

        // Sprite作成
        // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
        // @param {整数} [width] 線幅。省略時は1
        // @return {enchant.Sprite} 結果
        public createSprite(color: string, width?: number): enchant.Sprite {
            var s = this.createSurface(color, width);

            var sprite = new enchant.Sprite(s.width, s.height);
            sprite.x = Math.min(this.posS.x, this.posE.x);
            sprite.y = Math.min(this.posS.y, this.posE.y);
            sprite.image = s;
            return sprite;
        }

        // 複製
        // @return {Line} 新しいインスタンス
        public clone(): Line {
            return new Line(this.posS.x, this.posS.y, this.posE.x, this.posE.y);
        }
    }

    // 範囲のある図形の基本クラス
    export class Area {
        x: number;
        y: number;
        width: number;
        height: number;

        // @param {整数} [x] 図形の左上座標X 省略時は0
        // @param {整数} [y] 図形の左上座標Y 省略時は0
        // @param {整数} [width] 省略時は0
        // @param {整数} [height] 省略時は0
        constructor (x: number, y: number, width: number, height: number) {
            this.x = x || 0;
            this.y = y || 0;
            this.width = width || 0;
            this.height = height || 0;
        }

        // 上
        public get top() { return this.y; }
        public set top(t: number) { this.y = t; }

        // 下
        public get bottom() { return this.y + this.height; }
        public set bottom(b: number) {
            // 位置維持を優先
            this.height = Math.abs(b - this.y);
            if (b < this.y) {
                this.y = b;
            }

            // サイズ維持を優先
            //this.y = b - this.height;
        }

        // 左
        public get left() { return this.x; }
        public set left(l: number) { this.x = l; }

        // 右
        public get right() { return this.x + this.width; }
        public set right(r: number) {
            // 位置維持を優先
            this.width = Math.abs(r - this.x);
            if (r < this.x) {
                this.x = r;
            }

            // サイズ維持を優先
            //this.x = r - this.width;
        }

        // 中心 {x,y} 
        public get center() {
            return new Point(this.x + this.width / 2, this.y + this.height / 2);
        }
        public set center(c) {
            this.x = c.x - this.width / 2;
            this.y = c.y - this.height / 2;
        }

        // 対角線の長さ。setは中心基準で変更
        public get diagonal() {
            return Math.sqrt(this.width * this.width + this.height * this.height);
        }
        public set diagonal(l: number) {
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

        // 拡大縮小。基準は中心
        // ※enchant.Spriteのような一時的な変化ではなく、値は上書きされる
        // @param {実数} [sx] 横方向の拡大率
        // @param {実数} [sy] 縦方向の拡大率。省略時はsxと同じ
        public scale(sx: number, sy?: number): void {
            if (typeof sy != 'number') sy = sx;
            var w = this.width * sx;
            var h = this.height * sy;
            this.x += Math.floor((this.width - w) * 0.5);
            this.y += Math.floor((this.height - h) * 0.5);
            this.width = Math.floor(w);
            this.height = Math.floor(h);
        }

        // enchant.Sprieteの位置・大きさを取り込む
        // @param {enchant.Sprite} [sprite] 対象
        public updateFrom(sprite: enchant.Sprite): void {
            this.x = sprite.x;
            this.y = sprite.y;
            this.height = sprite.height * sprite.scaleX;
            this.width = sprite.width;
        }

        // enchant.Spriete等に位置・大きさを設定
        // @param {enchant.Sprite} [sprite] 対象
        // @param {Boolen} [updateSize] サイズの取り込みにおいて、幅/高さを更新するならtrue。scaleX/scaleYを更新するなら false。省略時はfalse
        public setTo(sprite: enchant.Sprite, updateSize?: bool) {
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
        }

        // 色情報の一括取得
        // ※enchant.Surface.getPixelが遅いらしいので
        // @param {enchant.Surface} [surface] 取得元Surface
        // @return {Array.<Array.<{r,g,b,a}>>} 例えば data[y][x].r は、座標x,yの赤色の値
        public getPixels(surface: enchant.Surface): IColor[] {
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
        }

        // 複製
        // @return {Area} 新しいインスタンス
        public clone(): Area {
            return new Area(this.x, this.y, this.width, this.height);
        }
    }

    // 四角形
    export class Rectangle extends Area {
        // @param {整数} [x] 四角形の左上座標X 省略時は0
        // @param {整数} [y] 四角形の左上座標Y 省略時は0
        // @param {整数} [width] 省略時は0
        // @param {整数} [height] 省略時は0
        constructor (x: number, y: number, width: number, height: number) {
            super(x, y, width, height);

        }

        private _calcWidth(key) {
            return Math.floor(this.width * ((key - 1) % 3) * 0.5);
        }
        private _calcHeight(key) {
            return Math.floor(this.height * (2 - Math.floor((key - 1) / 3)) * 0.5);
        }

        // 指定した座標が四角形内に入っているかどうか
        // @param {object} [point] 位置{x,y}
        // @return {Boolen} 入っているならtrue
        public hitTest(point: enchant.IPoint): bool {
            return this.x < point.x && point.x < this.right &&
                this.y < point.y && point.y < this.bottom;
        }

        // 指定した四角形と重なっているならtrue
        // @param {Rectangle} [rect] 四角形
        // @return {Boolen} 重なっているならtrue
        public intersectRect(rect: Area): bool {
            return this.x < rect.right && rect.x < this.right &&
                this.y < rect.bottom && rect.y < this.bottom;
        }

        // 指定した線と重なっているならtrue
        // @param {Line} [line] 線
        // @return {Boolen} 重なっているならtrue
        public intersectLine(line: Line): bool {
            // 線の端部が四角形内にあるかどうか
            if (this.hitTest(line.posS) || this.hitTest(line.posE)) {
                return true;
            }

            // 線が四角形の各辺と交差しているか
            return this.getSideLine(0).isCross(line) ||
                this.getSideLine(1).isCross(line) ||
                this.getSideLine(2).isCross(line) ||
                this.getSideLine(3).isCross(line);
        }

        // テンキー1～9の位置を四角形の各点に見立て、その座標を返す
        // 例えば1だと四角形の左下の座標値を返す
        // @param {整数} [key] 1～9
        // @return {Point} 結果
        public getPos(key: number): Point {
            return new Point(
            this.x + this._calcWidth(key),
            this.y + this._calcHeight(key));
        }

        // テンキー1～9の位置を四角形の各点に見立て、指定した座標がその位置になるように変更
        // 例えば1なら、四角形の左下の座標値を指定値に合わせる
        // @param {整数} [key] 1～9
        // @param {object} [pos] 位置{x,y}
        public setPos(key: number, pos: enchant.IPoint): void {
            this.x = pos.x - this._calcWidth(key);
            this.y = pos.y - this._calcHeight(key);
        }

        // 指定した座標を四角形内に収める
        // @param {object} [pos] 位置{x,y}
        public adjustPos(pos: enchant.IPoint): void {
            if (pos.x < this.left) pos.x = this.left;
            else if (this.right < pos.x) pos.x = this.right;
            if (pos.y < this.top) pos.y = this.top;
            else if (this.bottom < pos.y) pos.y = this.bottom;
        }

        // 四角形内のランダムな座標を返す
        // @return {Point} 結果
        public getRandomPos(): Point {
            return new Point(
            this.x + rand(this.width),
            this.y + rand(this.height));
        }

        // 四角形の各辺をLineオブジェクトで返す
        // @param {整数} [no] 0=上辺, 1=下辺, 2=左辺,3=右辺
        // @return {Line} 結果
        public getSideLine(no: number): Line {
            var key1, key2;
            switch (no) {
                case 0: key1 = 7; key2 = 9; break;
                case 1: key1 = 1; key2 = 3; break;
                case 2: key1 = 7; key2 = 1; break;
                case 3: key1 = 9; key2 = 3; break;
            }
            var line = new Line(0, 0, 0, 0);
            line.posS = this.getPos(key1);
            line.posE = this.getPos(key2);
            return line;
        }

        // 対角線をLineオブジェクトとして返す
        // @param {整数} [key] テンキー1,3,7,9のどれか。それを始点になる
        // @return {Line} 結果
        public getDiagonalLine(key: number): Line {
            var key2;
            switch (key) {
                case 1: key2 = 9; break;
                case 3: key2 = 7; break;
                case 7: key2 = 3; break;
                case 9: key2 = 1; break;
            }
            var line = new Line(0, 0, 0, 0);
            line.posS = this.getPos(key);
            line.posE = this.getPos(key2);
            return line;
        }

        // Surface作成
        // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
        // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
        // @return {enchant.Surface} 結果
        public createSurface(color: string, fill?: bool): enchant.Surface {
            return createRectangleSurface(this.width, this.height, color, fill);
        }

        // Sprite作成
        // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
        // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
        // @return {enchant.Sprite} 結果
        public createSprite(color: string, fill?: bool): enchant.Sprite {
            var s = this.createSurface(color, fill);
            var sprite = new enchant.Sprite(s.width, s.height);
            sprite.image = s;
            sprite.x = this.x;
            sprite.y = this.y;
            return sprite;
        }

        // 複製
        // @return {Rectangle} 新しいインスタンス
        public clone(): Rectangle {
            return new Rectangle(this.x, this.y, this.width, this.height);
        }
    }

    // 円
    export class Circle extends Area {
        // @param {整数} [centerX] 中心座標X 省略時は0
        // @param {整数} [centerY] 中心座標Y 省略時は0
        // @param {整数} [radius] 半径 省略時は0
        constructor (centerX: number, centerY: number, radius: number) {
            super(centerX - radius, centerY - radius, radius * 2, radius * 2);
        }

        // 半径
        public get radius() {
            return this.width / 2;
        }
        public set radius(r) {
            var v = Math.floor((r - this.radius) * 0.5);
            this.x -= v;
            this.y -= v;
            this.width = r * 2;
        }

        // 直径
        public get diameter() {
            return this.width;
        }
        public set(d) {
            var v = Math.floor((d - this.diameter) * 0.5);
            this.x -= v;
            this.y -= v;
            this.width = d;
        }

        // 指定した座標が円内に入っているかどうか
        // @param {object} [point] 位置{x,y}
        // @return {Boolen} 入っているならtrue
        public hitTest(point: enchant.IPoint): bool {
            return this.center.getDistance(point) < this.radius;
        }

        // 指定した四角形と重なっているならtrue
        // @param {Rectangle} [rect] 四角形
        // @return {Boolen} 重なっているならtrue
        public intersectRect(rect): bool {
            //return this.x < rect.right && rect.x < this.right &&
            //        this.y < rect.bottom && rect.y < this.bottom;

            // 未実装
            throw new Error('Circle.intersectRect is not implemented');
        }

        // 指定した線と重なっているならtrue
        // @param {Line} [line] 線
        // @return {Boolen} 重なっているならtrue
        public intersectLine(line: Line): bool {
            //// 線の端部が円内にあるかどうか
            //if (this.hitTest(line.posS) || this.hitTest(line.posE)) {
            //    return true;
            //}

            // 未実装
            throw new Error('Circle.intersectLine is not implemented');
        }

        // 指定した円と重なっているならtrue
        // @param {Circle} [circle] 円
        // @return {Boolen} 重なっているならtrue
        public intersectCircle(circle: Circle): bool {
            var distance = (this.diameter + circle.diameter) / 2;

            var _;
            return (_ = this.x - circle.x + (this.width - circle.width) / 2) * _ +
                    (_ = this.y - circle.y + (this.height - circle.height) / 2) * _ < distance * distance;
        }

        // 指定した座標を円内に収める
        // @param {object} [pos] 位置{x,y}
        public adjustPos(pos: enchant.IPoint): void {
            var distance = this.center.getDistance(pos);
            if (distance < this.radius) return;

            var center = this.center;
            pos.x = center.x + Math.floor(this.radius * (pos.x - center.x) / distance);
            pos.y = center.y + Math.floor(this.radius * (pos.y - center.y) / distance);
        }

        // 円内のランダムな座標{x,y}を返す
        // @return {Point} 結果
        public getRandomPos(): Point {
            var r = Math.random() * this.radius;
            var angle = Math.random() * Math.PI * 2;
            var point = this.center;
            point.x += Math.floor(Math.cos(angle) * r);
            point.y += Math.floor(Math.sin(angle) * r);
            return point;
        }

        // 単純な円のSurface作成
        // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
        // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
        // @return {enchant.Surface} 結果
        public createSurface(color: string, fill?: bool): enchant.Surface {
            return createCircleSurface(this.radius, color, fill);
        }

        // Sprite作成
        // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
        // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
        // @return {enchant.Sprite} 結果
        public createSprite(color: string, fill?: bool): enchant.Sprite {
            var s = this.createSurface(color, fill);
            var sprite = new enchant.Sprite(s.width, s.height);
            sprite.image = s;
            sprite.x = this.x;
            sprite.y = this.y;
            return sprite;
        }

        // 複製
        // @return {Circle} 新しいインスタンス
        public clone(): Circle {
            var center = this.center;
            return new Circle(center.x, center.y, this.radius);
        }
    }

    // 楕円
    export class Ellipse extends Area {
        // @param {整数} [centerX] 中心座標X 省略時は0
        // @param {整数} [centerY] 中心座標Y 省略時は0
        // @param {整数} [width] 省略時は0
        // @param {整数} [height] 省略時は0
        constructor (centerX: number, centerY: number, width: number, height: number) {
            super(centerX - width / 2, centerY - height / 2, width, height);
        }

        // 指定した座標が楕円内に入っているかどうか
        // @param {object} [point] 位置{x,y}
        // @return {Boolen} 入っているならtrue
        public hitTest(point: enchant.IPoint): bool {
            //var pos = (typeof sec == 'Point') ? point : new Point(point.x, point.y);
            //return this.center.getDistance(pos) < radius;

            // 未実装
            throw new Error('Ellipse.hitTest is not implemented');
        }

        // 指定した四角形と重なっているならtrue
        // @param {Rectangle} [rect] 四角形
        // @return {Boolen} 重なっているならtrue
        public intersectRect(rect: Rectangle): bool {
            //return this.x < rect.right && rect.x < this.right &&
            //        this.y < rect.bottom && rect.y < this.bottom;

            // 未実装
            throw new Error('Ellipse.intersectRect is not implemented');
        }

        // 指定した線と重なっているならtrue
        // @param {Line} [line] 線
        // @return {Boolen} 重なっているならtrue
        public intersectLine(line: Line): bool {
            // 線の端部が楕円内にあるかどうか
            //if (this.hitTest(line.posS) || this.hitTest(line.posE)) {
            //    return true;
            //}

            // 未実装
            throw new Error('Ellipse.intersectLine is not implemented');
        }

        // 指定した座標を楕円内に収める
        // @param {object} [pos] 位置{x,y}
        public adjustPos(pos: enchant.IPoint): void {
            // 未完成(円として判定)
            //var radius = Math.min(this.width, this.height) / 2;

            //var distance = this.center.getDistance(pos);
            //if (distance < radius) return;

            //var center = this.center;
            //pos.x = center.x + Math.floor(radius * (pos.x - center.x) / distance);
            //pos.y = center.y + Math.floor(radius * (pos.y - center.y) / distance);

            // 未実装
            throw new Error('Ellipse.adjustPos is not implemented');
        }

        // 楕円内のランダムな座標{x,y}を返す
        // @return {Point} 結果
        public getRandomPos(): Point {
            // 未完成(円として判定)
            //var r = Math.random() * Math.min(this.width, this.height) * 0.5;
            //var angle = Math.random() * Math.PI * 2;
            //var point = this.center;
            //point.x += Math.floor(Math.cos(angle) * r);
            //point.y += Math.floor(Math.sin(angle) * r);
            //return point;

            // 未実装
            throw new Error('Ellipse.getRandomPos is not implemented');
        }

        // Surface作成
        // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
        // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
        // @return {enchant.Surface} 結果
        public createSurface(color: string, fill?: bool): enchant.Surface {
            return createEllipseSurface(this.width, this.height, color, fill);
        }

        // Sprite作成
        // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
        // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
        // @return {enchant.Sprite} 結果
        public createSprite(color: string, fill?: bool): enchant.Sprite {
            var s = this.createSurface(color, fill);
            var sprite = new enchant.Sprite(s.width, s.height);
            sprite.image = s;
            sprite.x = this.x;
            sprite.y = this.y;
            return sprite;
        }

        // 複製
        // @return {Ellipse} 新しいインスタンス
        public clone(): Ellipse {
            var center = this.center;
            return new Ellipse(center.x, center.y, this.width, this.height);
        }
    }

    // 円弧
    export class Arc extends Circle {
        // 方向角(弧の中央)
        angle: number;

        // 弧の範囲。angle±(range/2)が描画される
        range: number;

        // @param {整数} [centerX] 中心座標X 省略時は0
        // @param {整数} [centerY] 中心座標Y 省略時は0
        // @param {整数} [radius] 半径 省略時は0
        // @param {ラジアン} [angle] 方向角(弧の中央) 省略時は0
        // @param {ラジアン} [range] 弧の範囲。angle±(range/2)が描画される 省略時は0
        constructor (centerX: number, centerY: number, radius: number, angle: number, range: number) {
            super(centerX, centerY, radius);

            this.angle = normalinzeRad(angle | 0);
            this.range = normalinzeRad(range | 0);
        }

        // 開始角度(ラジアン)
        public get angleStart() {
            return normalinzeRad(this.angle - this.range * 0.5);
        }

        // 終了角度(ラジアン)
        public get angleEnd() {
            return normalinzeRad(this.angle + this.range * 0.5);
        }

        // 指定した座標が円弧内に入っているかどうか
        // @param {object} [point] 位置{x,y}
        // @return {Boolen} 入っているならtrue
        public hitTest(point: enchant.IPoint): bool {
            //var pos = (typeof sec == 'Point') ? point : new Point(point.x, point.y);
            //if (this.radius < this.center.getDistance(pos)) return false;

            // 未実装
            throw new Error('Arc.hitTest is not implemented');
        }

        // 指定した四角形と重なっているならtrue
        // @param {Rectangle} [rect] 四角形
        // @return {Boolen} 重なっているならtrue
        public intersectRect(rect: Rectangle): bool {
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
        }

        // 指定した線と重なっているならtrue
        // @param {Line} [line] 線
        // @return {Boolen} 重なっているならtrue
        public intersectLine(line: Line): bool {
            // 線の端部が円内にあるかどうか
            //if (this.hitTest(line.posS) || this.hitTest(line.posE)) {
            //    return true;
            //}

            // 未実装
            throw new Error('Arc.intersectLine is not implemented');
        }

        // 指定した円と重なっているならtrue
        // @param {Circle} [circle] 円
        // @return {Boolen} 重なっているならtrue
        public intersectCircle(circle: Circle): bool {
            // 未実装(円として判定)
            //var distance = (this.diameter + circle.diameter) / 2;

            //var _;
            //return (_ = this.x - rect.x + (this.width - rect.width) / 2) * _ +
            //(_ = this.y - circle.y + (this.height - circle.height) / 2) * _ < distance * distance;

            // 未実装
            throw new Error('Arc.intersectCircle is not implemented');
        }

        // 指定した座標を円弧内に収める
        // @param {object} [pos] 位置{x,y}
        public adjustPos(pos: enchant.IPoint): void {
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
        }

        // 円弧内のランダムな座標{x,y}を返す
        // @return {Point} 結果
        public getRandomPos(): Point {
            var r = Math.random() * this.radius;
            var angle = this.angle + Math.random() * this.range - this.range * 0.5;
            var point = this.center;
            point.x += Math.floor(Math.cos(angle) * r);
            point.y += Math.floor(Math.sin(angle) * r);
            return point;
        }

        // Surface作成
        // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
        // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
        // @return {enchant.Surface} 結果
        public createSurface(color: string, fill?: bool): enchant.Surface {
            return createArcSurface(this.radius, this.angle, this.range, color, fill);
        }

        // Sprite作成
        // @param {string} [color] 色。'red'など。もしくは toRGBString で作る
        // @param {boolen} [fill] true=塗りつぶし,false=枠線。省略時は枠線
        // @return {enchant.Sprite} 結果
        public createSprite(color: string, fill?: bool): enchant.Sprite {
            var s = this.createSurface(color, fill);
            var sprite = new enchant.Sprite(s.width, s.height);
            sprite.image = s;
            sprite.x = this.x;
            sprite.y = this.y;
            return sprite;
        }

        // 複製
        // @return {Arc} 新しいインスタンス
        public clone(): Arc {
            var center = this.center;
            return new Arc(center.x, center.y, this.radius, this.angle, this.range);
        }
    }

    // 波紋
    // ※Chromeでうまくいかない。Firefoxでは大丈夫
    export class Ripple extends enchant.Sprite {
        // @param {整数} [width] 幅 省略時はゲーム画面幅
        // @param {整数} [height] 高さ 省略時はゲーム画面高さ
        constructor (width: number, height: number) {
            super(width, height);
            //var game = enchant.Game.instance;
            //width = width || game.width;
            //h/eight = height || game.height;

            //super(width, height);

            //-----------------------------

            this.image = new enchant.Surface(width, height);

            this.addEventListener(enchant.Event.ENTER_FRAME, function(e) {
                if (!this._active) return;

                this._radius += this._speed;
                if (this._radius < this._radiusMax) {
                    this._draw();
                } else {
                    this.stop();
                }
            });
        }

        private _active = false;
        //_lineColor = 'black';
        private _radius = 0;
        private _radiusMax = 0;
        private _radiusLimit = 0;
        private _speed = 1;
        private _center: Point;

        private _draw() {
            var c = this.image.context;
            c.fillStyle = 'transparent';

            this.image.clear();
            //c.strokeStyle = this._radiusLimit == 0 || this._radius < this._radiusLimit
            //    ? this._lineColor
            //    : c.fillStyle;

            c.beginPath();
            c.arc(this._center.x, this._center.y, this._radius, 0, Math.PI * 2, false);
            c.closePath();

            //c.fill();
            c.stroke();
        }

            // 線色
        public get lineColor() {
            return this.image.context.strokeStyle; // this._lineColor;
        }
        public set(c) {
            //this._lineColor = c;
            this.image.context.strokeStyle = c;
        }

        // 線幅
        public get lineWidth() {
            return this.image.context.lineWidth;
        }
        public set lineWidth(l) {
            this.image.context.lineWidth = l;
        }

        // 波紋の速度(フレーム毎の半径増加量)
        public get speed() {
            return this._speed;
        }
        public set speed(s) {
            this._speed = s;
        }

        // 現在表示している波紋の半径
        public get radius() {
            return this._radius;
        }

        // 波紋の最大半径。startで指定した位置から、一番遠い四隅までの距離
        public get radiusMax() {
            return this._radiusMax;
        }

        // 半径の制限。0だと描画範囲を越えるまで実行
        public get radiusLimit() {
            return this._radiusLimit;
        }
        public set radiusLimit(r) {
            this._radiusLimit = r;
        }

        // 表示開始
        // @param {整数} [x] 開始地点 X座標
        // @param {整数} [y] 開始地点 X座標
        public start(x: number, y: number) {
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
        }

        // 停止/再開
        public get active() {
            return this._active;
        }
        public set active(a) {
            if (this._active == a) return;
            if (a && this._radiusMax == 0) return;
            this._active = a;
        }

        // 表示終了
        public stop() {
            this._active = false;
            this._radiusMax = 0;
            this.image.clear();
        }
    }
}
