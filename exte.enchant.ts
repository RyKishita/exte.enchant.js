// enchant.js�g�����C�u����
// The MIT License
// Copyright (c) 2012 Ryuuma Kishita

/// <reference path="enchant.d.ts"/>
/// <reference path="util.enchant.d.ts"/>

module exte {
    // �F
    export interface IColor {
        r: number;
        g: number;
        b: number;
        a: number;
    }

    // �����̗���
    // @param {number} [num] 0�`num-1�𔭐�������
    // @return {number} ����
    export function rand(num: number): number {
        if (num <= 1) return 0;
        return Math.floor(Math.random() * num);
    }

    // ���s�[���擾
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

    // �f�o�b�O�p�B�����̓��e���R���\�[���ɏo��
    export function trace(...argArray: any[]): void {
        if (argArray.length == 0) return;
        var args = Array.prototype.slice.call(argArray, 0);
        for (var i = 0; i < args.length; i++) {
            console.log(args[i]);
        }
    }

    // �J��Ԃ�������̍쐬
    // @param {String} [text] ������
    // @param {����} [n] �󔒕����� �ȗ����͈��(=text�̂܂�)
    // @return {String} ����
    export function makeRepeatString(text: string, n?: number): string {
        var s = text;
        if (n) {
            for (var i = 1; i < n; i++) {
                s += text;
            }
        }
        return s;
    }

    // �󔒂̍쐬
    // @param {����} [n] �󔒕����� �ȗ����͂P����
    // @return {String} ����
    export function makeSpace(n?: number): string {
        return makeRepeatString('&nbsp;', n);
    }

    // �����̗����𐶐�
    // Math.random�Ɣ�ׂāA���������l�����̔����ȍ~�ɏo�ɂ����Ȃ�܂��B
    // �l�̕΂肪�h����邱�Ƃŉ^�ɍ��E����Â炭�Ȃ�܂����A
    // ���̂��N���Ȃ��̂Ŗʔ����Ȃ������Ƃ������܂��B
    export class AverageRandamizer {
        // @param {����} [range] 0�`range-1�𔭐�������
        constructor (range: number) {
            this.range = range;
        }

        private _table = [];

        // �����̎擾
        // @return {����} ����
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

        // �����͈͂̎擾
        public get range(): number {
            return this._table.length;
        }

        // �����͈͂̐ݒ�
        public set range(r: number) {
            if (r < this.range) {
                // �T�C�Y������ꍇ�̓��Z�b�g
                this._table.length = 0;
            }
            for (var i = this.range; i < r; i++) {
                this._table.push(r);
            }
        }
    }

    // �F������̍쐬
    // �����Ȃ�:����
    // ����1��:RGB���l
    // ����2��:RGB���l, alpha
    // ����3��:red, green, blue
    // ����4��:red, green, blue, alpha
    // @return {String} �F
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

    // �z��̃����_�����בւ�
    // @param {Array}[src] ���f�[�^
    // @return {Array} ����
    export function shuffleArray(src: any[]): any[] {
        var dst = [];
        while (0 < src.length) {
            var index = rand(src.length);
            var value = src.splice(index, 1)[0];
            dst.push(value);
        }
        return dst;
    }

    // ���l�̕�����
    // @param {number}[value] ���l
    // @param {string}[chars]�ϊ��e�[�u��
    // @param {string}[ketas]���̕ϊ��e�[�u��
    // @return {Array} ����
    export function makeKanji(value: number, chars: string, ketas: string): string {
        value = Math.floor(value);
        if (value == 0) return chars[0];
        var ketaMax = ketas.length;

        var nums = [];
        while (0 < value) {
            nums.push(value % 10);
            if (ketas.length + 1 < nums.length) {
                //�I�[�o�[�����̂ōő�l�Ŏ~�߂�
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

            // 0�͒ǉ����Ȃ�
            // 1�͐擪�ƍŌ��1�̏ꍇ�͒ǉ��i���ƌĂԎ�������悤�ȁj
            // ����ȊO�͒ǉ�
            if (v != 0 && (v != 1 || nums.length == ketaMax || nums.length == 0)) {
                result += chars[v];
            }

            // ���ǉ�
            if (0 < v) {
                result += keta;
            }
        }
        return result;
    }

    // �x �� ���W�A��
    // @param {number} [d] �x
    // @return {number} ���W�A��
    export function degToRad(d: number): number {
        return d * Math.PI / 180.0;
    }

    // ���W�A�� �� �x
    // @param {number} [r] ���W�A��
    // @return {number} �x
    export function radToDeg(r: number): number {
        return r * 180.0 / Math.PI;
    }

    // ���W�A����0�`Math.PI * 2.0�����͈̔͂ɕ␳
    // @param {number} [r] ���W�A��
    // @return {number} ����
    export function normalinzeRad(r: number): number {
        if (r < 0.0) {
            return normalinzeRad(r + Math.PI * 2.0); //�ċA
        }
        if (Math.PI * 2.0 <= r) {
            return normalinzeRad(r - Math.PI * 2.0); //�ċA
        }
        return r;
    }

    // �x��0�`360�����͈̔͂ɕ␳
    // @param {number} [d] �x
    // @return {number} ����
    export function normalinzeDeg(d: number): number {
        if (d < 0.0) {
            return this.normalinzeDeg(d + 360.0); //�ċA
        }
        if (360.0 <= d) {
            return this.normalinzeDeg(d - 360.0); //�ċA
        }
        return d;
    }

    // �p�x(���W�A��)���L�����N�^�����l�ɕϊ�
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

    // �L�����N�^�����l���p�x(���W�A��)�ɕϊ�
    export function directionToAngle(direction: number): number {
        switch (direction) {
            case 0: return Math.PI * 0.5;
            case 1: return Math.PI * 1.0;
            case 2: return Math.PI * 0.0;
            case 3: return Math.PI * 1.5;
        }
    }

    // 2�̊p�x�̋��p�B�Ⴆ�΃L�����N�^�̌����Ă�������ƓG�̕����������ł���ق�0.0�ɋ߂��Ȃ�
    // @param {number} [angle1] �p�x1(���W�A��)
    // @param {number} [angle2] �p�x2(���W�A��)
    // @return {number} ����
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

    // 2�_�Ԃ̋���
    export function getDistance(point1: enchant.IPoint, point2: enchant.IPoint): number {
        var dx = point1.x - point2.x;
        var dy = point1.y - point2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // �p�x�̌v�Z�B�E��0�ŁA���v��������+�A�t��-�B�܂�-�΁`0�`�΂̒l�����
    export function getAngle(from: enchant.IPoint, to: enchant.IPoint): number {
        var dx = to.x - from.x;
        var dy = to.y - from.y;
        return Math.atan2(dy, dx);
    }

    // �Ⴆ�ΑS��1���Z�b�g����Array�Ȃǂ����
    // @param {�Ȃ�ł�} [value] �l
    // @param {����} [count] �� �ȗ�����1
    // @return {Array} ����
    export function makeValues(value: any, count: number): any[] {
        var values = [];
        for (var i = 0; i < count; i++) {
            values.push(value);
        }
        return values;
    }

    // ���H�쐬(�_�|���@) enchant.Map��collisionData�Ɠ����`���ŕԂ��i�ǂ�1�A�ʘH��0�j
    // @param {����} [rowNum] �s���B�K����ɂ��邱��
    // @param {����} [columnNum] �񐔁B�K����ɂ��邱��
    // @param {Boolen} [addframe] �O�g��ǂɂ��邩�ǂ����B�ȗ�����false(�ǂɂ��Ȃ�)
    // @return {Array.<Array.<Number>>} ����
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

                //�w�肵�������̒ʘH��ǂŖ��߂�
                var r = rand(range);
                maze[row + dy[r]][column + dx[r]] = 1;
            }
            //������͈�ԍŏ��̍s�̂�
            if (range == 4) range = 3;
        }

        return maze;
    }

    var base = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

    // �����_��������
    // @param {Number} [len] �������B�ȗ�����1����
    // @param {string} [pattern] �g�������B�ȗ����̓A���t�@�x�b�g�召����
    // @return {String} ����
    export function randomString(len: number, pattern?: string): string {
        if (!pattern) pattern = base;

        var result = "";
        len = len || 1;
        for (var i = 0; i < len; i++) {
            result += pattern.charAt(rand(pattern.length));
        }
        return result;
    }

    // �l�̌ܓ�
    // @param {����} [num] ���l
    // @param {����} [figure] �����_�ȉ����B�ȗ�����0(Math.round�Ɠ���)
    // @return {����} ����
    export function round(num: number, figure?: number): number {
        if (figure) {
            var base = Math.pow(10, figure);
            return Math.round(num * base) / base;
        } else {
            return Math.round(num);
        }
    }

    // �؂�グ
    // @param {����} [num] ���l
    // @param {����} [figure] �����_�ȉ����B�ȗ�����0(Math.ceil�Ɠ���)
    // @return {����} ����
    export function ceil(num: number, figure?: number): number {
        if (figure) {
            var base = Math.pow(10, figure);
            return Math.ceil(num * base) / base;
        } else {
            return Math.ceil(num);
        }
    }

    // �؂�̂�
    // @param {����} [num] ���l
    // @param {����} [figure] �����_�ȉ����B�ȗ�����0(Math.floor�Ɠ���)
    // @return {����} ����
    export function floor(num: number, figure?: number): number {
        if (figure) {
            var base = Math.pow(10, figure);
            return Math.floor(num * base) / base;
        } else {
            return Math.floor(num);
        }
    }

    // �w�肵�����ɒB���Ă��Ȃ����l�̐擪�ɕ����𖄂߂ĕԂ��B�E��
    // @param {����} [num] ���l
    // @param {����} [len] ����
    // @param {String} [ch] �����B�ȗ�����'0'�B�󔒂�����Ƃ���'&nbsp;'(Label)��' '(MutableText)
    // @return {String} ������
    export function paddingLeft(num: number, len: number, ch?: string): string {
        ch = ch || '0';

        var str = num.toString();
        len -= str.length;
        while (0 < len--) { str = ch + str; }

        return str;
    }

    // �w�肵�����ɒB���Ă��Ȃ����l�̖����ɕ����𖄂߂ĕԂ��B����
    // @param {����} [num] ���l
    // @param {����} [len] ����
    // @param {����} [ch] �����B�ȗ�����'0'�B�󔒂�����Ƃ���'&nbsp;'(Label)��' '(MutableText)
    // @return {String} ������
    export function paddingRight(num: number, len: number, ch?: string): string {
        ch = ch || '0';

        var str = num.toString();
        len -= str.length;
        while (0 < len--) { str += ch; }

        return str;
    }

    // ������t�H�[�}�b�g
    // ��1�FformatString("rgb({r}, {g}, {b})", color)
    //      �� color��{r:128, g:0, b:255}�ł���Ƃ��A"rgb(128, 0, 255)"
    // ��2�FformatString("{0} + {1} = {2}", 5, 10, 5+10)
    //      �� "5 + 10 = 15"
    // @param {������} [format] �t�H�[�}�b�g
    // @param {object or arguments} [arg] �l
    // @return {String} ������
    export function formatString(format: string, ...argArray: any[]): string {
        // �u���t�@���N
        var rep_fn = undefined;

        // �I�u�W�F�N�g�̏ꍇ
        if (argArray.length == 1 && typeof argArray[0] == "object") {
            /** @ignore */
            rep_fn = function (m, k) { return argArray[0][k]; }
        }
            // ���������������ꍇ
        else {
            /** @ignore */
            rep_fn = function (m, k) { return argArray[parseInt(k) + 1]; }
        }

        return format.replace(/\{(\w+)\}/g, rep_fn);
    }

    // �z����ɂ���A�����ɍ����v�f�̍폜
    // @param {Array} [ary] �z��
    // @param {Function} [fn] ��������֐��Bfunction(�z����̗v�f�A�z����̏��ԁA�z�񎩑�)�B�폜����Ȃ�true��Ԃ�
    export function arrayEraseIf(ary: any[], fn: (element: any, index: number, array: any[]) =>bool) {
        for (var i = ary.length - 1; i >= 0; i--) {// �t��
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

    // MapPointSeacher.getRoute �̌��ʃf�[�^
    export class ResultRoute extends MapPoint {
        constructor (row: number, column: number, rest: number, route: MapPoint[][]) {
            super(row, column);
            this.row = row;
            this.column = column;
            this.rest = rest;
            this.routes = route;
        }

        //�c��ړ���
        rest: number;

        //���̃}�X�֍s�����߂̓���
        //�����̃��[�g�ɂȂ邱�Ƃ�����̂Ŕz��̔z��ɂȂ��Ă���
        routes: MapPoint[][];

        //��Ɨp
        valid: bool = true;
    }

    // calcMoveCost �̌��ʃf�[�^
    export class ResultMoveCost {
        cost: number;
        routes: number[][];
    }

    // �}�b�v��̒n�_����
    export class MapPointSeacher {
        // @param {number[][]} [map] �e�n�_�̈ړ��R�X�g�B�܂��̓}�b�v��ޕʂ̒l
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

        // �}�b�v���̓���͈̔͂Ɍ��肵�Č������鎞�Ɏw��
        public limitLeft: number;
        public limitRight: number;
        public limitTop: number;
        public limitBottom: number;

        // �w�肵���n�_�Ɠ����l�������n�_��Ԃ��B���G�����\�t�g�̓h��Ԃ��̃C���[�W
        // @param {����} [baseRowNo] ��n�_�̍s�ԍ�
        // @param {����} [baseColumnNo] ��n�_�̗�ԍ�
        // @param {Function} [matchFunc] �l��r�֐��BmatchFunc(value1, value2)�߂�lBoolen �ȗ�����'=='�Ŕ�r 
        // @return {MapPoint[]} ���ʁB��n�_���܂�
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

        // �V�~�����[�V�����Q�[���Ȃǂ̃��j�b�g�ړ�����
        // @param {Array<Array<����>>} [map] 2�����z��B
        //      �e�}�X�̈ړ��R�X�g(0��}�C�i�X����)��ݒ肵�܂��B
        //      �ړ��ł��Ȃ��}�X�ɂ͑傫�Ȑ��������Ă��������B
        //      �e�s�̗񐔂͑S�ē����ł��邱�Ƃ����҂��܂��B
        // @param {����} [baseRowNo] ���j�b�g�̌��݈ʒu�̍s�ԍ�
        // @param {����} [baseColumnNo] ���j�b�g�̌��݈ʒu�̗�ԍ�
        // @param {����} [cost] ���j�b�g�̈ړ���
        // @return {MapPoint[]} ���ʁB�R�X�g�������ΊJ�n�n�_�����ޖ���邱�Ƃ�����܂�
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

        // �w�肵���ʒu�ɍs���̂ɕK�v�ȍŏ��R�X�g�Ƃ��̓������v�Z(��L getRoute �̋t)
        // @param {����} [fromRowNo] ���݈ʒu�̍s�ԍ�
        // @param {����} [fromColumnNo] ���݈ʒu�̗�ԍ�
        // @param {����} [toRowNo] �ړI�̒n�_�̍s�ԍ�
        // @param {����} [toColumnNo] �ړI�̒n�_�̗�ԍ�
        // @return {ResultMoveCost} ����
        public calcMoveCost(map: number[][], fromRowNo: number, fromColumnNo: number, toRowNo: number, toColumnNo: number): ResultMoveCost {
            // ��Ƃ��Ă܂������ړI�n�ɍs�������̃R�X�g���v�Z
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

            // ���̃R�X�g�ōs���鏊�S�Ă��擾���āA�ړI�̈ʒu��������L�^
            var routes = this.getRoute(fromRowNo, fromColumnNo, cost);

            var resultRoutes
            routes.forEach(value => {
                if (value.row == toRowNo && value.column == toColumnNo) {
                    resultRoutes = routes;
                }
            });

            // �����������ŃR�X�g���Čv�Z
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

    // �A�C�R��Surface�쐬
    // @param {����} [index] �A�C�R���C���[�W���̃C���f�b�N�X
    // @param {����} [count] index~index+count-1���C���[�W�Ɋ܂߂�(�����s��)�B�����l��1
    // @param {String} [assetName] �A�C�R���C���[�W�t�@�C��(�A�Z�b�g��)�B�����l��'icon0.png'
    // @param {����} [width] �A�C�R��1���̕��B�����l��16
    // @param {����} [height] �A�C�R��1���̍����B�����l��16 
    // @param {����} [columnNum] assetName���̈�s�ɂ���A�C�R�����B�����l��16('icon0.png'��z��)
    // @return {Surface} ����
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

    // �A�C�R��Sprite�쐬
    // @param {����} [index] �A�C�R���C���[�W���̃C���f�b�N�X
    // @param {����} [count] index~index+count-1���C���[�W�Ɋ܂߂�(�����s��)�B�����l��1
    // @param {String} [assetName] �A�C�R���C���[�W�t�@�C��(�A�Z�b�g��)�B�����l��'icon0.png'
    // @param {����} [width] �A�C�R��1���̕��B�����l��16
    // @param {����} [height] �A�C�R��1���̍����B�����l��16 
    // @param {����} [columnNum] assetName���̈�s�ɂ���A�C�R�����B�����l��16('icon0.png'��z��)
    // @return {Sprite} ����
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

    // ���݃f�o�b�O���[�h���ǂ���
    export function isDebug(): bool {
        return enchant.Game.instance._debug;
    }

    // ���̍Đ�
    // @param {������} [assetName] �A�Z�b�g��
    export function playSound(assetName: string): void {
        enchant.Game.instance.assets[assetName].clone().play();
    }

    // ���BGM�p�B�Ȃ̏I�����t�F�[�h�A�E�g���ċȂ̓��ɂȂ���
    // ��enchant.Scene��Event.ENTER_FRAME��enterFrame���Ă�
    // �������enchant.Scene�ŗ����Ȃ�AaddChild�ł��ǂ�
    export class RepeatSoundPlayer extends enchant.Node {
        // @param {������} [assetName] �A�Z�b�g��
        // @param {����} [fadeSec] �c�艽�b����t�F�[�h�A�E�g���J�n���邩�B�ȗ�����5�b
        // @param {����} [volume] ���ʁB�ȗ�����1.0(�ő�)
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

        // �Đ��J�n
        public play() {
            this._sound.volume = this._volume;
            this._sound.play();
        }

        // ���f
        public pause() {
            this._sound.pause();
        }

        // ��~
        stop() {
            this._sound.stop();
        }

        // enchant.Event.ENTER_FRAME�Ŏ��s
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

    // SceneInput�p�B�o�^�������̓p�^�[���������������̃C�x���g
    // e.eventID �C�x���gID
    // e.sec     ���͊����܂ł̕b��
    export var Event_SceneInput = 'exte.enchant.Event_SceneInput';

    // SceneInput�p�C�x���g
    export class SceneExEvent extends enchant.Event {
        constructor (type: string) {
            super(type);
        }

        eventID: number;
        sec: number;
    }

    // SceneInput�p���̓p�^�[���f�[�^
    export class InputPatternData {
        // �C�x���gID
        eventID: number;

        // ���͓��e
        pattern: Array;

        // ���̃t���[�����܂łɓ��͂�����������C�x���g���s
        framelimit: number;

        // true�ɂ����framelimit�̈Ӗ����t�ɂȂ�B����ɉ���������ƘA�����Ĕ��s
        loop: bool;

        // ��Ɨp
        index: number = 0;
        frame: number = 0;
        active: bool = false;
    }


    // Scene�̊g��
    // �E�L�[���͕⏕�B�w�肵�����Ԃœ��͂���ƃC�x���g���s
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

        // ���̓p�^�[���̓o�^�B�p�^�[���Ɉ�v�����Event_SceneExInput�C�x���g�𔭍s
        // @param {����}  [eventID] �C�x���g�ԍ�
        // @param {Array} [pattern] enchant.Event.?_BUTTON_UP/DOWN �̑g�ݍ��킹���w��
        //     -----------------------------------------------------------------------------
        //      [A_BUTTON_DOWN]              A�{�^����������
        //      [A_BUTTON_DOWN, A_BUTTON_UP] A�{�^���������ė�����
        //      [DOWN_BUTTON_DOWN, RIGHT_BUTTON_DOWN, DOWN_BUTTON_UP, A_BUTTON_DOWN] �g����
        //     -----------------------------------------------------------------------------
        // @param {����} [timelimit] ���̕b���܂łɓ��͂�����������C�x���g���s�B�ȗ�����1.0
        // @param {Bool} [loop] true�ɂ����timelimit�̈Ӗ����t�ɂȂ�B����ɉ���������ƘA�����Ĕ��s�B�ȗ�����false
        public regist(eventID: number, pattern: Array, timelimit?: number, loop?: bool): void {
            var data = new InputPatternData();
            data.eventID = eventID;
            data.pattern = pattern;
            data.framelimit = Math.floor((timelimit || 1.0) * enchant.Game.instance.fps);
            data.loop = (loop === true);

            this.inputPatterns.push(data);
        }
    }

    // SceneEx�p�B�V�[�����t�F�[�h�C�����J�n���钼�O�ɗ���
    export var Event_SceneExStarting = 'Event_SceneExStarting';

    // Scene�̊g��
    // �E�V�[���؂�ւ��ƁA�t�F�[�h�C��/�A�E�g����
    // �E�V�[���S�̂̓��ߗ��ύX
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

        // �t�F�[�h�C���܂��̓t�F�[�h�A�E�g��
        public get fadeProsessing(): bool {
            return this._setFadeIn || this._setFadeOut;
        }

        // ���ߗ��擾
        public get opacity(): number {
            return this._opacity;
        }

        // ���ߗ��ݒ�
        public set opacity(v: number) {
            this._opacity = v;
            this._setOpacityChilds(this, v);
        }

        // �V�[���؂�ւ��B���݂̃V�[�����w�肵���ꍇ���X�^�[�g
        // @param {string} [name] �؂�ւ���V�[���̖��O
        public moveSceneTo(name: string): void {
            this._nextSceneName = name;
            this._setFadeOut = true;
        }
    }

    // �����Ńt�F�[�h�A�E�g���ď��ł��镶��
    // @param {enchant.Group} [group] �����X�v���C�g�o�^��
    // @param {enchant.Sprite} [targetsprite] �������o����ƂȂ�v�f
    // @param {������} [text] �����B���p�p���L���̂�
    // @param {����} [sec] �\�����Ă��鎞��(�ȗ�����1�b)
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

    // �L�[�o�C���h�B�����R�[�h�𒲂ׂ�̂��ʓ|�Ȃ̂�
    // @param {������} [key] ���蓖�Ă�1����
    // @param {������} [button] 'left', 'right', 'up', 'down', 'a', 'b' �Ȃ�
    export function keyBind(key, button) {
        var game = enchant.Game.instance;
        game.keybind(key[0].toUpperCase().charCodeAt(0), button);
        game.keybind(key[0].toLowerCase().charCodeAt(0), button);
    }

    // Timer�p�B�w�肵�����Ԃ��������̃C�x���g
    export var Event_TimerTimeOut = 'Event_TimerTimeout';

    //�w�肵�����Ԃ�������C�x���g���s
    // ��game.frame���x�[�X�ɂ��Ă���̂Ő��m�ł͂Ȃ��B
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

        // �^�C�}�[���J�n
        // @param {����} [sec] �b�B�w�肵�Ȃ��ꍇ�͑O��Ɠ���
        start(sec: number) {
            if (typeof sec == 'number') {
                this._frame =
                this._startFrame = sec * enchant.Game.instance.fps;
            }
            this._active = (0 < this._startFrame);
        }

        // �^�C�}�[���~
        stop() {
            this._active = false;
        }
    }

    // �����L�[����(�܂���ui.Pad�̓���)�����W�A���ɕϊ�
    // @return {����} ���ʁB0�`Math.PI*2(�E��0)�B���͂��Ă��Ȃ��Ƃ���Number.NaN
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

    // ��]���l�������Փ˔���
    // ���Q�l http://smallomega.com/?p=397
    // @param {enchant.Sprite} [sprite1] �v�f1
    // @param {enchant.Sprite} [sprite2] �v�f2
    // @return {Boolen} �Փ˂��Ă���Ȃ�true
    export function collision2Sprites(sprite1: enchant.Sprite, sprite2: enchant.Sprite): bool {
        if (sprite1.rotation == 0 && sprite2.rotation == 0) return sprite1.intersect(sprite2);

        //a��this,b��other
        var a = new Array(9);
        var b = new Array(9);

        //��]���ĂȂ��Ƃ��̂S�_���i�[+�e�ӂ̒��_4�_([0]=[4],[5][6][7][8]�͂��蔲�����Ђǂ��̂Œǉ�)
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

        //�X�v���C�g�̒��S�����_�ɕ��s�ړ�
        for (var i = 0; i < a.length; i++) {
            a[i].X -= (sprite1.x + sprite1.width / 2);
            a[i].Y -= (sprite1.y + sprite1.height / 2);
        }
        for (var i = 0; i < b.length; i++) {
            b[i].X -= (sprite2.x + sprite2.width / 2);
            b[i].Y -= (sprite2.y + sprite2.height / 2);
        }

        //�X�v���C�g����]������
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

        //���̈ʒu�ɕ��s�ړ�
        for (var i = 0; i < a.length; i++) {
            a[i].X += (sprite1.x + sprite1.width / 2);
            a[i].Y += (sprite1.y + sprite1.height / 2);
        }
        for (var i = 0; i < b.length; i++) {
            b[i].X += (sprite2.x + sprite2.width / 2);
            b[i].Y += (sprite2.y + sprite2.height / 2);
        }

        //���ꂼ��̐����Ō�������
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

    // ���H�쐬(�_�|���@)
    // @param {enchant.Map} [map] �쐬�����f�[�^�̐ݒ��Bmap.collisionData��exte.createMaze�̒l���Z�b�g���Ă���
    // @param {����} [rowNum] �s���B�K����ɂ��邱��
    // @param {����} [columnNum] �񐔁B�K����ɂ��邱��
    // @param {����} [floorNo] ���ɂ���C���[�WNo�B�w�i�Ɏg�p
    // @param {����} [wallNo] �ǂɂ���C���[�WNo�B
    // @param {Boolen} [addframe] �O�g��ǂɂ��邩�ǂ����B�ȗ�����false(�ǂɂ��Ȃ�)
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

    // ������̕�(�S�p���Ɛ��m�ł͂Ȃ�)
    // @param {enchant.Surface} [surface] �`���
    // @param {String} [str] ������
    // @return {Number} ��
    export function stringWidth(surface: enchant.Surface, str: string) {
        return surface.context.measureText(str).width;
    }

    // �X�N���[���O�ɏo�����ǂ���
    // @param {Object} [obj] �Ώۂ̗v�f{x,y,width,height}�B�Ⴆ��enchant.Sprite
    // @param {����} [padding] �����ւ̗]���B�w�肵�Ȃ��ꍇ��0(�v�f�������Ȃ��Ȃ������ɖ߂�l��true�ɂȂ�)
    // @return {Boolen} �o���Ȃ�true
    export function isOutOfScreen(obj: enchant.IArea, padding?: number) {
        var game = enchant.Game.instance;
        padding = padding | 0;
        return obj.x + obj.width < padding ||
                obj.y + obj.height < padding ||
                game.width - padding < obj.x ||
                game.height - padding < obj.y;
    }

    // �P����enchant.Map�̍쐬
    // @param {String} [assetName] �A�Z�b�g��
    // @param {����} [tileSize] 1�}�X�̏c����
    // @param {����} [rowNum] �s��
    // @param {����} [columnNum] ��
    // @param {����} [no] �����}�b�v�`�b�vNo
    // @param {����} [tlNo] ����}�b�v�`�b�vNo �ȗ�����no�Ɠ���
    // @param {����} [tNo] ��}�b�v�`�b�vNo �ȗ�����no�Ɠ���
    // @param {����} [trNo] �E��}�b�v�`�b�vNo �ȗ�����no�Ɠ���
    // @param {����} [lNo] ���}�b�v�`�b�vNo �ȗ�����no�Ɠ���
    // @param {����} [rNo] �E�}�b�v�`�b�vNo �ȗ�����no�Ɠ���
    // @param {����} [blNo] �����}�b�v�`�b�vNo �ȗ�����no�Ɠ���
    // @param {����} [bNo] ���}�b�v�`�b�vNo �ȗ�����no�Ɠ���
    // @param {����} [brNo] �E���}�b�v�`�b�vNo �ȗ�����no�Ɠ���
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

    // "enchant.js/images/map1.gif"���g�����A�P����enchant.Map���쐬
    // @param {����} [typeNo] �^�C�v 0�`
    // @param {����} [rowNum] �s��
    // @param {����} [columnNum] ��
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

    // ���O�̂悤�ɗ���郁�b�Z�[�W��\��
    export class LogList extends enchant.Group {//enchant.CanvasGroup���ƕ����傫�������f���Ȃ�(2012/10/7���_)
        // ������ǉ����̓��ߗ��ω���/�t���[��
        public fadeIn = 0.1;

        // ������폜���̓��ߗ��ω���/�t���[��
        public fadeOut = 0.1;

        // ����郁�b�Z�[�W�̃X�N���[����/�t���[��
        public scrollPx = 2;

        // �s����
        public lineHeight = 10;

        // �f�t�H���g�J���[
        public color = null;

        // �f�t�H���g�w�i�F(���x�����̂̔w�i�B�S�̂̔w�i�̓R���X�g���N�^�Ŏw��)
        public backgroundColor = null;

        // �f�t�H���g�t�H���g
        public font = null;

        // �f�t�H���g�t�H���g�T�C�Y
        public fontSize = null;

        // �܂�Ԃ��B�unormal�v�ubreak-all�v�ukeep-all�v�̂ǂꂩ
        public wordBreak = null;

        // �����ʒu�B�uleft�v�ucenter�v�uright�v�Ȃ�
        public textAlign = null;

        // �e���O��LogList���ɍ��킹��Ȃ�true�Bfalse���ƃe�L�X�g�������ƕ��𒴂���
        public adjustWidth = true;

        // ���̐��܂Ń��O�����܂������́A�A�j���[�V�����𖳌������Ĉ�C�ɕ\��
        // 0�̎��͐������Ȃ�
        public stackLimit = 0;

        // @param {����} [x] X���W
        // @param {����} [y] Y���W
        // @param {����} [width] ��
        // @param {����} [height] ����
        // @param {string} [backgroundColor] �w�i�F
        constructor (x: number, y: number, width: number, height: number, backgroundColor?: string) {
            super();

            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;

            if (backgroundColor) {
                var back = createRectangleSprite(width, height, backgroundColor, true);
                this.addChild(back);
            }

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
            if (this.adjustWidth) {
                label.width = this.width;
            }
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
            label.backgroundColor = t.backgroundColor || "";
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

        // �\��/��\��
        public get visible() { return this._visible; }
        public set(v) {
            if (this._visible == v) return;
            this._visible = v;
            for (var i = 0; i < this._labels.length; i++) {
                var l = this._labels[i];
                l.visible = v && l.valid;
            }
        }

        // ���O�o�^
        // @param {������} [text] �\������e�L�X�g
        // @param {������} [color] ���̃e�L�X�g�݂̂̕����F�B�ȗ����̓f�t�H���g
        // @param {������} [fontSize] ���̃e�L�X�g�݂̂̃t�H���g�T�C�Y�B�ȗ����̓f�t�H���g
        // @param {���l} [lineWidth] ���̃e�L�X�g�݂̂̍s�����B�ȗ����̓f�t�H���g
        // @param {���l} [textAlign] ���̃e�L�X�g�݂̂̕����ʒu�B�ȗ����̓f�t�H���g
        // @param {string} [backgroundColor] ���̃e�L�X�g�݂̂̔w�i�F
        public regist(text: string, color?: string, fontSize?: string, lineHeight?: number, textAlign?: number, backgroundColor?: string): void {
            this._texts.push({
                text: text,
                color: color || this.color,
                fontSize: fontSize || this.fontSize,
                lineHeight: lineHeight || this.lineHeight,
                textAlign: textAlign || this.textAlign,
                backgroundColor: backgroundColor || this.backgroundColor
            });
        }

        // ���܂��Ă��郍�O���A�A�j���[�V�����𖳌������Ĉ�C�ɏo��
        public outAllLog(): void {
            this._outAllLog = true;
        }

        // �S�폜
        public clear(): void {
            this._texts.length = 0;
            for (var i = 0; i < this._labels.length; i++) {
                var l = this._labels[i];
                l.visible = l.valid = false;
            }
            this._currentWork = 0;
        }
    }

    // �P���Ȏl�p�`��Surface�쐬
    // @param {����} [width] ��
    // @param {����} [height] ����
    // @param {string} [color] �F�B'red'�ȂǁB�������� toRGBString �ō��
    // @param {boolen} [fill] true=�h��Ԃ�,false=�g���B�ȗ����͘g��
    // @return {enchant.Surface} ����
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

    // �P���Ȏl�p�`��Sprite�쐬
    // @param {����} [width] ��
    // @param {����} [height] ����
    // @param {string} [color] �F�B'red'�ȂǁB�������� toRGBString �ō��
    // @param {boolen} [fill] true=�h��Ԃ�,false=�g���B�ȗ����͘g��
    // @return {enchant.Sprite} ����
    export function createRectangleSprite(width: number, height: number, color: string, fill?: bool): enchant.Sprite {
        var sprite = new enchant.Sprite(width, height);
        sprite.image = createRectangleSurface(width, height, color, fill);
        return sprite;
    }

    // �P���ȉ~��Surface�쐬
    // @param {����} [radius] ���a
    // @param {string} [color] �F�B'red'�ȂǁB�������� toRGBString �ō��
    // @param {boolen} [fill] true=�h��Ԃ�,false=�g���B�ȗ����͘g��
    // @return {enchant.Surface} ����
    export function createCircleSurface(radius: number, color: string, fill?: bool): enchant.Surface {
        var s = new enchant.Surface(radius * 2, radius * 2);
        var c = s.context;

        // �����������ɏ���
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

    // �P���ȉ~��Sprite�쐬
    // @param {����} [radius] ���a
    // @param {string} [color] �F�B'red'�ȂǁB�������� toRGBString �ō��
    // @param {boolen} [fill] true=�h��Ԃ�,false=�g���B�ȗ����͘g��
    // @return {enchant.Sprite} ����
    export function createCircleSprite(radius: number, color: string, fill?: bool): enchant.Sprite {
        var sprite = new enchant.Sprite(radius * 2, radius * 2);
        sprite.image = createCircleSurface(radius, color, fill);
        return sprite;
    }

    // �P���ȑȉ~��Surface�쐬
    // @param {����} [width] �ȗ�����0
    // @param {����} [height] �ȗ�����0
    // @param {string} [color] �F�B'red'�ȂǁB�������� toRGBString �ō��
    // @param {boolen} [fill] true=�h��Ԃ�,false=�g���B�ȗ����͘g��
    // @return {enchant.Surface} ����
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
        // �����������ɏ���
        var padding = c.lineWidth;

        // �߂�������canvas��ellipse���t���炵�����ǁA�����ł͋ߎ�
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

    // �P���ȑȉ~��Sprite�쐬
    // @param {����} [width] �ȗ�����0
    // @param {����} [height] �ȗ�����0
    // @param {string} [color] �F�B'red'�ȂǁB�������� toRGBString �ō��
    // @param {boolen} [fill] true=�h��Ԃ�,false=�g���B�ȗ����͘g��
    // @return {enchant.Sprite} ����
    export function createEllipseSprite(width: number, height: number, color: string, fill?: bool): enchant.Sprite {
        var sprite = new enchant.Sprite(width, height);
        sprite.image = createEllipseSurface(width, height, color, fill);
        return sprite;
    }

    // �P���ȉ~��Surface�쐬
    // @param {����} [radius] ���a
    // @param {���W�A��} [angle] �����p(�ʂ̒���)
    // @param {���W�A��} [range] �ʂ͈̔́Bangle�}(range/2)���`�悳���
    // @param {string} [color] �F�B'red'�ȂǁB�������� toRGBString �ō��
    // @param {boolen} [fill] true=�h��Ԃ�,false=�g���B�ȗ����͘g��
    // @return {enchant.Surface} ����
    export function createArcSurface(radius: number, angle: number, range: number, color: string, fill?: bool): enchant.Surface {
        var s = new enchant.Surface(radius * 2, radius * 2);
        var c = s.context;

        // �����������ɏ���
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

    // �P���ȉ~�ʂ�Sprite�쐬
    // @param {����} [radius] ���a
    // @param {���W�A��} [angle] �����p(�ʂ̒���)
    // @param {���W�A��} [range] �ʂ͈̔́Bangle�}(range/2)���`�悳���
    // @param {string} [color] �F�B'red'�ȂǁB�������� toRGBString �ō��
    // @param {boolen} [fill] true=�h��Ԃ�,false=�g���B�ȗ����͘g��
    // @return {enchant.Sprite} ����
    export function createArcSprite(radius: number, angle: number, range: number, color: string, fill?: bool): enchant.Sprite {
        var sprite = new enchant.Sprite(radius * 2, radius * 2);
        sprite.image = createArcSurface(radius, angle, range, color, fill);
        return sprite;
    }

    // �_
    export class Point {
        x = 0;
        y = 0;

        // @param {����} [x] �ȗ�����0
        // @param {����} [y] �ȗ�����0
        constructor (x: number, y: number) {
            // X���W�l
            this.x = x || 0;

            // Y���W�l
            this.y = y || 0;
        }

        // �w�肵���_�Ǝ����Ƃ̋���
        // @param {object} [point] �_{x,y}
        // @return {����} ����
        public getDistance(point: enchant.IPoint) {
            var dx = point.x - this.x;
            var dy = point.y - this.y;
            return Math.sqrt(dx * dx + dy * dy);
        }

        // �w�肵���_�Ǝ����������ʒu���ǂ���
        // @param {object} [point] �_{x,y}
        // @return {boolen} �����Ȃ�true
        public isEqual(point) {
            return point.x == this.x && point.y == this.y;
        }

        // ����
        // @return {Point} �V�����C���X�^���X
        public clone(): Point {
            return new Point(this.x, this.y);
        }
    }

    // ��
    export class Line {
        // �n�_
        posS: Point;

        // �I�_
        posE: Point;

        // @param {����} [x1] �n�_X �ȗ�����0
        // @param {����} [y1] �n�_Y �ȗ�����0
        // @param {����} [x2] �I�_X �ȗ�����0
        // @param {����} [y2] �I�_Y �ȗ�����0
        constructor (x1: number, y1: number, x2: number, y2: number) {
            // �n�_
            this.posS = new Point(x1, y1);

            // �I�_
            this.posE = new Point(x2, y2);
        }

        // �n�I�_�Ԃ�X�ʁB�I�_���n�_��荶�ɂ�������}�C�i�X�ɂȂ�
        public get dx() {
            return this.posE.x - this.posS.x;
        }
        public set dx(dx: number) {
            this.posE.x = this.posS.x + dx;
        }

        // �n�I�_�Ԃ�Y�ʁB�I�_���n�_����ɂ�������}�C�i�X�ɂȂ�
        public get dy() {
            return this.posE.y - this.posS.y;
        }
        public set dy(dy: number) {
            this.posE.y = this.posS.y + dy;
        }

        // �����Bset���A�I�_�̈ʒu���ς��B�n�_���牓��or�߂��Ȃ�
        public get length() {
            return this.posS.getDistance(this.posE);
        }
        public set length(dstL: number) {
            var srcL = this.length;
            this.posE.x = this.posS.x + Math.floor(this.dx * dstL / srcL);
            this.posE.y = this.posS.y + Math.floor(this.dy * dstL / srcL);
        }

        // �w�肵�����ƌ������Ă��邩�ǂ���
        // @param {Line} [line] ��
        // @return {Boolen} �������Ă���Ȃ�true
        public isCross(line: Line): bool {
            // ����A�̃x�N�g���B
            var vax = this.dx;
            var vay = this.dy;
            // vax, vay �����v����90�x��]�B
            var nx = -vay;
            var ny = vax;
            // �@���𐳋K���B
            var length = this.length;
            if (0 < length) {
                length = 1 / length;
            }
            nx *= length;
            ny *= length;

            // ����B�̃x�N�g���B
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
                // �������ĂȂ��B
                return false;
            }
            // ���Ƃ̌����_�B
            var hitX = line.posS.x + vbx * t;
            var hitY = line.posS.y + vby * t;
            //
            var doc = ((this.posS.x - hitX) * (this.posE.x - hitX)) + ((this.posS.y - hitY) * (this.posE.y - hitY));
            return (doc < 0);
        }

        // Surface�쐬
        // @param {string} [color] �F�B'red'�ȂǁB�������� toRGBString �ō��
        // @param {����} [width] �����B�ȗ�����1
        // @return {enchant.Surface} ����
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

        // Sprite�쐬
        // @param {string} [color] �F�B'red'�ȂǁB�������� toRGBString �ō��
        // @param {����} [width] �����B�ȗ�����1
        // @return {enchant.Sprite} ����
        public createSprite(color: string, width?: number): enchant.Sprite {
            var s = this.createSurface(color, width);

            var sprite = new enchant.Sprite(s.width, s.height);
            sprite.x = Math.min(this.posS.x, this.posE.x);
            sprite.y = Math.min(this.posS.y, this.posE.y);
            sprite.image = s;
            return sprite;
        }

        // ����
        // @return {Line} �V�����C���X�^���X
        public clone(): Line {
            return new Line(this.posS.x, this.posS.y, this.posE.x, this.posE.y);
        }
    }

    // �͈͂̂���}�`�̊�{�N���X
    export class Area {
        x: number;
        y: number;
        width: number;
        height: number;

        // @param {����} [x] �}�`�̍�����WX �ȗ�����0
        // @param {����} [y] �}�`�̍�����WY �ȗ�����0
        // @param {����} [width] �ȗ�����0
        // @param {����} [height] �ȗ�����0
        constructor (x: number, y: number, width: number, height: number) {
            this.x = x || 0;
            this.y = y || 0;
            this.width = width || 0;
            this.height = height || 0;
        }

        // ��
        public get top() { return this.y; }
        public set top(t: number) { this.y = t; }

        // ��
        public get bottom() { return this.y + this.height; }
        public set bottom(b: number) {
            // �ʒu�ێ���D��
            this.height = Math.abs(b - this.y);
            if (b < this.y) {
                this.y = b;
            }

            // �T�C�Y�ێ���D��
            //this.y = b - this.height;
        }

        // ��
        public get left() { return this.x; }
        public set left(l: number) { this.x = l; }

        // �E
        public get right() { return this.x + this.width; }
        public set right(r: number) {
            // �ʒu�ێ���D��
            this.width = Math.abs(r - this.x);
            if (r < this.x) {
                this.x = r;
            }

            // �T�C�Y�ێ���D��
            //this.x = r - this.width;
        }

        // ���S {x,y} 
        public get center() {
            return new Point(this.x + this.width / 2, this.y + this.height / 2);
        }
        public set center(c) {
            this.x = c.x - this.width / 2;
            this.y = c.y - this.height / 2;
        }

        // �Ίp���̒����Bset�͒��S��ŕύX
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

        // �g��k���B��͒��S
        // ��enchant.Sprite�̂悤�Ȉꎞ�I�ȕω��ł͂Ȃ��A�l�͏㏑�������
        // @param {����} [sx] �������̊g�嗦
        // @param {����} [sy] �c�����̊g�嗦�B�ȗ�����sx�Ɠ���
        public scale(sx: number, sy?: number): void {
            if (typeof sy != 'number') sy = sx;
            var w = this.width * sx;
            var h = this.height * sy;
            this.x += Math.floor((this.width - w) * 0.5);
            this.y += Math.floor((this.height - h) * 0.5);
            this.width = Math.floor(w);
            this.height = Math.floor(h);
        }

        // enchant.Spriete�̈ʒu�E�傫������荞��
        // @param {enchant.Sprite} [sprite] �Ώ�
        public updateFrom(sprite: enchant.Sprite): void {
            this.x = sprite.x;
            this.y = sprite.y;
            this.height = sprite.height * sprite.scaleX;
            this.width = sprite.width;
        }

        // enchant.Spriete���Ɉʒu�E�傫����ݒ�
        // @param {enchant.Sprite} [sprite] �Ώ�
        // @param {Boolen} [updateSize] �T�C�Y�̎�荞�݂ɂ����āA��/�������X�V����Ȃ�true�BscaleX/scaleY���X�V����Ȃ� false�B�ȗ�����false
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

        // �F���̈ꊇ�擾
        // ��enchant.Surface.getPixel���x���炵���̂�
        // @param {enchant.Surface} [surface] �擾��Surface
        // @return {Array.<Array.<{r,g,b,a}>>} �Ⴆ�� data[y][x].r �́A���Wx,y�̐ԐF�̒l
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

        // ����
        // @return {Area} �V�����C���X�^���X
        public clone(): Area {
            return new Area(this.x, this.y, this.width, this.height);
        }
    }

    // �l�p�`
    export class Rectangle extends Area {
        // @param {����} [x] �l�p�`�̍�����WX �ȗ�����0
        // @param {����} [y] �l�p�`�̍�����WY �ȗ�����0
        // @param {����} [width] �ȗ�����0
        // @param {����} [height] �ȗ�����0
        constructor (x: number, y: number, width: number, height: number) {
            super(x, y, width, height);

        }

        private _calcWidth(key) {
            return Math.floor(this.width * ((key - 1) % 3) * 0.5);
        }
        private _calcHeight(key) {
            return Math.floor(this.height * (2 - Math.floor((key - 1) / 3)) * 0.5);
        }

        // �w�肵�����W���l�p�`���ɓ����Ă��邩�ǂ���
        // @param {object} [point] �ʒu{x,y}
        // @return {Boolen} �����Ă���Ȃ�true
        public hitTest(point: enchant.IPoint): bool {
            return this.x < point.x && point.x < this.right &&
                this.y < point.y && point.y < this.bottom;
        }

        // �w�肵���l�p�`�Əd�Ȃ��Ă���Ȃ�true
        // @param {Rectangle} [rect] �l�p�`
        // @return {Boolen} �d�Ȃ��Ă���Ȃ�true
        public intersectRect(rect: Area): bool {
            return this.x < rect.right && rect.x < this.right &&
                this.y < rect.bottom && rect.y < this.bottom;
        }

        // �w�肵�����Əd�Ȃ��Ă���Ȃ�true
        // @param {Line} [line] ��
        // @return {Boolen} �d�Ȃ��Ă���Ȃ�true
        public intersectLine(line: Line): bool {
            // ���̒[�����l�p�`���ɂ��邩�ǂ���
            if (this.hitTest(line.posS) || this.hitTest(line.posE)) {
                return true;
            }

            // �����l�p�`�̊e�ӂƌ������Ă��邩
            return this.getSideLine(0).isCross(line) ||
                this.getSideLine(1).isCross(line) ||
                this.getSideLine(2).isCross(line) ||
                this.getSideLine(3).isCross(line);
        }

        // �e���L�[1�`9�̈ʒu���l�p�`�̊e�_�Ɍ����āA���̍��W��Ԃ�
        // �Ⴆ��1���Ǝl�p�`�̍����̍��W�l��Ԃ�
        // @param {����} [key] 1�`9
        // @return {Point} ����
        public getPos(key: number): Point {
            return new Point(
            this.x + this._calcWidth(key),
            this.y + this._calcHeight(key));
        }

        // �e���L�[1�`9�̈ʒu���l�p�`�̊e�_�Ɍ����āA�w�肵�����W�����̈ʒu�ɂȂ�悤�ɕύX
        // �Ⴆ��1�Ȃ�A�l�p�`�̍����̍��W�l���w��l�ɍ��킹��
        // @param {����} [key] 1�`9
        // @param {object} [pos] �ʒu{x,y}
        public setPos(key: number, pos: enchant.IPoint): void {
            this.x = pos.x - this._calcWidth(key);
            this.y = pos.y - this._calcHeight(key);
        }

        // �w�肵�����W���l�p�`���Ɏ��߂�
        // @param {object} [pos] �ʒu{x,y}
        public adjustPos(pos: enchant.IPoint): void {
            if (pos.x < this.left) pos.x = this.left;
            else if (this.right < pos.x) pos.x = this.right;
            if (pos.y < this.top) pos.y = this.top;
            else if (this.bottom < pos.y) pos.y = this.bottom;
        }

        // �l�p�`���̃����_���ȍ��W��Ԃ�
        // @return {Point} ����
        public getRandomPos(): Point {
            return new Point(
            this.x + rand(this.width),
            this.y + rand(this.height));
        }

        // �l�p�`�̊e�ӂ�Line�I�u�W�F�N�g�ŕԂ�
        // @param {����} [no] 0=���, 1=����, 2=����,3=�E��
        // @return {Line} ����
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

        // �Ίp����Line�I�u�W�F�N�g�Ƃ��ĕԂ�
        // @param {����} [key] �e���L�[1,3,7,9�̂ǂꂩ�B������n�_�ɂȂ�
        // @return {Line} ����
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

        // Surface�쐬
        // @param {string} [color] �F�B'red'�ȂǁB�������� toRGBString �ō��
        // @param {boolen} [fill] true=�h��Ԃ�,false=�g���B�ȗ����͘g��
        // @return {enchant.Surface} ����
        public createSurface(color: string, fill?: bool): enchant.Surface {
            return createRectangleSurface(this.width, this.height, color, fill);
        }

        // Sprite�쐬
        // @param {string} [color] �F�B'red'�ȂǁB�������� toRGBString �ō��
        // @param {boolen} [fill] true=�h��Ԃ�,false=�g���B�ȗ����͘g��
        // @return {enchant.Sprite} ����
        public createSprite(color: string, fill?: bool): enchant.Sprite {
            var s = this.createSurface(color, fill);
            var sprite = new enchant.Sprite(s.width, s.height);
            sprite.image = s;
            sprite.x = this.x;
            sprite.y = this.y;
            return sprite;
        }

        // ����
        // @return {Rectangle} �V�����C���X�^���X
        public clone(): Rectangle {
            return new Rectangle(this.x, this.y, this.width, this.height);
        }
    }

    // �~
    export class Circle extends Area {
        // @param {����} [centerX] ���S���WX �ȗ�����0
        // @param {����} [centerY] ���S���WY �ȗ�����0
        // @param {����} [radius] ���a �ȗ�����0
        constructor (centerX: number, centerY: number, radius: number) {
            super(centerX - radius, centerY - radius, radius * 2, radius * 2);
        }

        // ���a
        public get radius() {
            return this.width / 2;
        }
        public set radius(r) {
            var v = Math.floor((r - this.radius) * 0.5);
            this.x -= v;
            this.y -= v;
            this.width = r * 2;
        }

        // ���a
        public get diameter() {
            return this.width;
        }
        public set(d) {
            var v = Math.floor((d - this.diameter) * 0.5);
            this.x -= v;
            this.y -= v;
            this.width = d;
        }

        // �w�肵�����W���~���ɓ����Ă��邩�ǂ���
        // @param {object} [point] �ʒu{x,y}
        // @return {Boolen} �����Ă���Ȃ�true
        public hitTest(point: enchant.IPoint): bool {
            return this.center.getDistance(point) < this.radius;
        }

        // �w�肵���l�p�`�Əd�Ȃ��Ă���Ȃ�true
        // @param {Rectangle} [rect] �l�p�`
        // @return {Boolen} �d�Ȃ��Ă���Ȃ�true
        public intersectRect(rect): bool {
            //return this.x < rect.right && rect.x < this.right &&
            //        this.y < rect.bottom && rect.y < this.bottom;

            // ������
            throw new Error('Circle.intersectRect is not implemented');
        }

        // �w�肵�����Əd�Ȃ��Ă���Ȃ�true
        // @param {Line} [line] ��
        // @return {Boolen} �d�Ȃ��Ă���Ȃ�true
        public intersectLine(line: Line): bool {
            //// ���̒[�����~���ɂ��邩�ǂ���
            //if (this.hitTest(line.posS) || this.hitTest(line.posE)) {
            //    return true;
            //}

            // ������
            throw new Error('Circle.intersectLine is not implemented');
        }

        // �w�肵���~�Əd�Ȃ��Ă���Ȃ�true
        // @param {Circle} [circle] �~
        // @return {Boolen} �d�Ȃ��Ă���Ȃ�true
        public intersectCircle(circle: Circle): bool {
            var distance = (this.diameter + circle.diameter) / 2;

            var _;
            return (_ = this.x - circle.x + (this.width - circle.width) / 2) * _ +
                    (_ = this.y - circle.y + (this.height - circle.height) / 2) * _ < distance * distance;
        }

        // �w�肵�����W���~���Ɏ��߂�
        // @param {object} [pos] �ʒu{x,y}
        public adjustPos(pos: enchant.IPoint): void {
            var distance = this.center.getDistance(pos);
            if (distance < this.radius) return;

            var center = this.center;
            pos.x = center.x + Math.floor(this.radius * (pos.x - center.x) / distance);
            pos.y = center.y + Math.floor(this.radius * (pos.y - center.y) / distance);
        }

        // �~���̃����_���ȍ��W{x,y}��Ԃ�
        // @return {Point} ����
        public getRandomPos(): Point {
            var r = Math.random() * this.radius;
            var angle = Math.random() * Math.PI * 2;
            var point = this.center;
            point.x += Math.floor(Math.cos(angle) * r);
            point.y += Math.floor(Math.sin(angle) * r);
            return point;
        }

        // �P���ȉ~��Surface�쐬
        // @param {string} [color] �F�B'red'�ȂǁB�������� toRGBString �ō��
        // @param {boolen} [fill] true=�h��Ԃ�,false=�g���B�ȗ����͘g��
        // @return {enchant.Surface} ����
        public createSurface(color: string, fill?: bool): enchant.Surface {
            return createCircleSurface(this.radius, color, fill);
        }

        // Sprite�쐬
        // @param {string} [color] �F�B'red'�ȂǁB�������� toRGBString �ō��
        // @param {boolen} [fill] true=�h��Ԃ�,false=�g���B�ȗ����͘g��
        // @return {enchant.Sprite} ����
        public createSprite(color: string, fill?: bool): enchant.Sprite {
            var s = this.createSurface(color, fill);
            var sprite = new enchant.Sprite(s.width, s.height);
            sprite.image = s;
            sprite.x = this.x;
            sprite.y = this.y;
            return sprite;
        }

        // ����
        // @return {Circle} �V�����C���X�^���X
        public clone(): Circle {
            var center = this.center;
            return new Circle(center.x, center.y, this.radius);
        }
    }

    // �ȉ~
    export class Ellipse extends Area {
        // @param {����} [centerX] ���S���WX �ȗ�����0
        // @param {����} [centerY] ���S���WY �ȗ�����0
        // @param {����} [width] �ȗ�����0
        // @param {����} [height] �ȗ�����0
        constructor (centerX: number, centerY: number, width: number, height: number) {
            super(centerX - width / 2, centerY - height / 2, width, height);
        }

        // �w�肵�����W���ȉ~���ɓ����Ă��邩�ǂ���
        // @param {object} [point] �ʒu{x,y}
        // @return {Boolen} �����Ă���Ȃ�true
        public hitTest(point: enchant.IPoint): bool {
            //var pos = (typeof sec == 'Point') ? point : new Point(point.x, point.y);
            //return this.center.getDistance(pos) < radius;

            // ������
            throw new Error('Ellipse.hitTest is not implemented');
        }

        // �w�肵���l�p�`�Əd�Ȃ��Ă���Ȃ�true
        // @param {Rectangle} [rect] �l�p�`
        // @return {Boolen} �d�Ȃ��Ă���Ȃ�true
        public intersectRect(rect: Rectangle): bool {
            //return this.x < rect.right && rect.x < this.right &&
            //        this.y < rect.bottom && rect.y < this.bottom;

            // ������
            throw new Error('Ellipse.intersectRect is not implemented');
        }

        // �w�肵�����Əd�Ȃ��Ă���Ȃ�true
        // @param {Line} [line] ��
        // @return {Boolen} �d�Ȃ��Ă���Ȃ�true
        public intersectLine(line: Line): bool {
            // ���̒[�����ȉ~���ɂ��邩�ǂ���
            //if (this.hitTest(line.posS) || this.hitTest(line.posE)) {
            //    return true;
            //}

            // ������
            throw new Error('Ellipse.intersectLine is not implemented');
        }

        // �w�肵�����W��ȉ~���Ɏ��߂�
        // @param {object} [pos] �ʒu{x,y}
        public adjustPos(pos: enchant.IPoint): void {
            // ������(�~�Ƃ��Ĕ���)
            //var radius = Math.min(this.width, this.height) / 2;

            //var distance = this.center.getDistance(pos);
            //if (distance < radius) return;

            //var center = this.center;
            //pos.x = center.x + Math.floor(radius * (pos.x - center.x) / distance);
            //pos.y = center.y + Math.floor(radius * (pos.y - center.y) / distance);

            // ������
            throw new Error('Ellipse.adjustPos is not implemented');
        }

        // �ȉ~���̃����_���ȍ��W{x,y}��Ԃ�
        // @return {Point} ����
        public getRandomPos(): Point {
            // ������(�~�Ƃ��Ĕ���)
            //var r = Math.random() * Math.min(this.width, this.height) * 0.5;
            //var angle = Math.random() * Math.PI * 2;
            //var point = this.center;
            //point.x += Math.floor(Math.cos(angle) * r);
            //point.y += Math.floor(Math.sin(angle) * r);
            //return point;

            // ������
            throw new Error('Ellipse.getRandomPos is not implemented');
        }

        // Surface�쐬
        // @param {string} [color] �F�B'red'�ȂǁB�������� toRGBString �ō��
        // @param {boolen} [fill] true=�h��Ԃ�,false=�g���B�ȗ����͘g��
        // @return {enchant.Surface} ����
        public createSurface(color: string, fill?: bool): enchant.Surface {
            return createEllipseSurface(this.width, this.height, color, fill);
        }

        // Sprite�쐬
        // @param {string} [color] �F�B'red'�ȂǁB�������� toRGBString �ō��
        // @param {boolen} [fill] true=�h��Ԃ�,false=�g���B�ȗ����͘g��
        // @return {enchant.Sprite} ����
        public createSprite(color: string, fill?: bool): enchant.Sprite {
            var s = this.createSurface(color, fill);
            var sprite = new enchant.Sprite(s.width, s.height);
            sprite.image = s;
            sprite.x = this.x;
            sprite.y = this.y;
            return sprite;
        }

        // ����
        // @return {Ellipse} �V�����C���X�^���X
        public clone(): Ellipse {
            var center = this.center;
            return new Ellipse(center.x, center.y, this.width, this.height);
        }
    }

    // �~��
    export class Arc extends Circle {
        // �����p(�ʂ̒���)
        angle: number;

        // �ʂ͈̔́Bangle�}(range/2)���`�悳���
        range: number;

        // @param {����} [centerX] ���S���WX �ȗ�����0
        // @param {����} [centerY] ���S���WY �ȗ�����0
        // @param {����} [radius] ���a �ȗ�����0
        // @param {���W�A��} [angle] �����p(�ʂ̒���) �ȗ�����0
        // @param {���W�A��} [range] �ʂ͈̔́Bangle�}(range/2)���`�悳��� �ȗ�����0
        constructor (centerX: number, centerY: number, radius: number, angle: number, range: number) {
            super(centerX, centerY, radius);

            this.angle = normalinzeRad(angle | 0);
            this.range = normalinzeRad(range | 0);
        }

        // �J�n�p�x(���W�A��)
        public get angleStart() {
            return normalinzeRad(this.angle - this.range * 0.5);
        }

        // �I���p�x(���W�A��)
        public get angleEnd() {
            return normalinzeRad(this.angle + this.range * 0.5);
        }

        // �w�肵�����W���~�ʓ��ɓ����Ă��邩�ǂ���
        // @param {object} [point] �ʒu{x,y}
        // @return {Boolen} �����Ă���Ȃ�true
        public hitTest(point: enchant.IPoint): bool {
            //var pos = (typeof sec == 'Point') ? point : new Point(point.x, point.y);
            //if (this.radius < this.center.getDistance(pos)) return false;

            // ������
            throw new Error('Arc.hitTest is not implemented');
        }

        // �w�肵���l�p�`�Əd�Ȃ��Ă���Ȃ�true
        // @param {Rectangle} [rect] �l�p�`
        // @return {Boolen} �d�Ȃ��Ă���Ȃ�true
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

            // �������Barc_within.js���g���Ȃ炻������ǂ���
            throw new Error('Arc.intersectRect is not implemented');
        }

        // �w�肵�����Əd�Ȃ��Ă���Ȃ�true
        // @param {Line} [line] ��
        // @return {Boolen} �d�Ȃ��Ă���Ȃ�true
        public intersectLine(line: Line): bool {
            // ���̒[�����~���ɂ��邩�ǂ���
            //if (this.hitTest(line.posS) || this.hitTest(line.posE)) {
            //    return true;
            //}

            // ������
            throw new Error('Arc.intersectLine is not implemented');
        }

        // �w�肵���~�Əd�Ȃ��Ă���Ȃ�true
        // @param {Circle} [circle] �~
        // @return {Boolen} �d�Ȃ��Ă���Ȃ�true
        public intersectCircle(circle: Circle): bool {
            // ������(�~�Ƃ��Ĕ���)
            //var distance = (this.diameter + circle.diameter) / 2;

            //var _;
            //return (_ = this.x - rect.x + (this.width - rect.width) / 2) * _ +
            //(_ = this.y - circle.y + (this.height - circle.height) / 2) * _ < distance * distance;

            // ������
            throw new Error('Arc.intersectCircle is not implemented');
        }

        // �w�肵�����W���~�ʓ��Ɏ��߂�
        // @param {object} [pos] �ʒu{x,y}
        public adjustPos(pos: enchant.IPoint): void {
            // ������
            /*
            var distance = this.center.getDistance(pos);
            if (distance < this.radius) return;

            var center = this.center;
            pos.x = center.x + Math.floor(this.radius * (pos.x - center.x) / distance);
            pos.y = center.y + Math.floor(this.radius * (pos.y - center.y) / distance);
            */

            // ������
            throw new Error('Arc.adjustPos is not implemented');
        }

        // �~�ʓ��̃����_���ȍ��W{x,y}��Ԃ�
        // @return {Point} ����
        public getRandomPos(): Point {
            var r = Math.random() * this.radius;
            var angle = this.angle + Math.random() * this.range - this.range * 0.5;
            var point = this.center;
            point.x += Math.floor(Math.cos(angle) * r);
            point.y += Math.floor(Math.sin(angle) * r);
            return point;
        }

        // Surface�쐬
        // @param {string} [color] �F�B'red'�ȂǁB�������� toRGBString �ō��
        // @param {boolen} [fill] true=�h��Ԃ�,false=�g���B�ȗ����͘g��
        // @return {enchant.Surface} ����
        public createSurface(color: string, fill?: bool): enchant.Surface {
            return createArcSurface(this.radius, this.angle, this.range, color, fill);
        }

        // Sprite�쐬
        // @param {string} [color] �F�B'red'�ȂǁB�������� toRGBString �ō��
        // @param {boolen} [fill] true=�h��Ԃ�,false=�g���B�ȗ����͘g��
        // @return {enchant.Sprite} ����
        public createSprite(color: string, fill?: bool): enchant.Sprite {
            var s = this.createSurface(color, fill);
            var sprite = new enchant.Sprite(s.width, s.height);
            sprite.image = s;
            sprite.x = this.x;
            sprite.y = this.y;
            return sprite;
        }

        // ����
        // @return {Arc} �V�����C���X�^���X
        public clone(): Arc {
            var center = this.center;
            return new Arc(center.x, center.y, this.radius, this.angle, this.range);
        }
    }

    // �g��
    // ��Chrome�ł��܂������Ȃ��BFirefox�ł͑��v
    export class Ripple extends enchant.Sprite {
        // @param {����} [width] �� �ȗ����̓Q�[����ʕ�
        // @param {����} [height] ���� �ȗ����̓Q�[����ʍ���
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

            // ���F
        public get lineColor() {
            return this.image.context.strokeStyle; // this._lineColor;
        }
        public set(c) {
            //this._lineColor = c;
            this.image.context.strokeStyle = c;
        }

        // ����
        public get lineWidth() {
            return this.image.context.lineWidth;
        }
        public set lineWidth(l) {
            this.image.context.lineWidth = l;
        }

        // �g��̑��x(�t���[�����̔��a������)
        public get speed() {
            return this._speed;
        }
        public set speed(s) {
            this._speed = s;
        }

        // ���ݕ\�����Ă���g��̔��a
        public get radius() {
            return this._radius;
        }

        // �g��̍ő唼�a�Bstart�Ŏw�肵���ʒu����A��ԉ����l���܂ł̋���
        public get radiusMax() {
            return this._radiusMax;
        }

        // ���a�̐����B0���ƕ`��͈͂��z����܂Ŏ��s
        public get radiusLimit() {
            return this._radiusLimit;
        }
        public set radiusLimit(r) {
            this._radiusLimit = r;
        }

        // �\���J�n
        // @param {����} [x] �J�n�n�_ X���W
        // @param {����} [y] �J�n�n�_ X���W
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

        // ��~/�ĊJ
        public get active() {
            return this._active;
        }
        public set active(a) {
            if (this._active == a) return;
            if (a && this._radiusMax == 0) return;
            this._active = a;
        }

        // �\���I��
        public stop() {
            this._active = false;
            this._radiusMax = 0;
            this.image.clear();
        }
    }

    // �ҋ@�V�[���̒ǉ�
    // �w��̃R�[���o�b�N��true��Ԃ��܂őҋ@��������
    // �C���[�W���w�肵���ꍇ�͉�ʒ����ɔz�u����
    export function pushWaitScene(eventEnterFrame: () =>bool, image?: enchant.Surface) {
        var game = enchant.Game.instance;

        var scene = new enchant.Scene();

        if (image) {
            var backSprite = new enchant.Sprite(image.width, image.height);
            backSprite.x = (game.width - image.width) / 2;
            backSprite.y = (game.height - image.height) / 2;
            backSprite.image = image;
            scene.addChild(backSprite);
        }

        scene.addEventListener(enchant.Event.ENTER_FRAME, function (e) {
            if (eventEnterFrame()) {
                game.popScene();
            }
        });

        game.pushScene(scene);
    }

    //HTTP��������
    export function http2str(url: string): string {
        try {
            var request = new XMLHttpRequest();
            request.open("GET", url, false);
            request.send(null);
            if (request.status == 200 || request.status == 0) {
                return request.responseText;
            }
        } catch (e) {
        }
        return null;
    }
}
