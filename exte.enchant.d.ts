module exte {
    interface IColor {
        r: number;
        g: number;
        b: number;
        a: number;
    }
    function rand(num: number): number;
    function getUserAgent(): string;
    function trace(...argArray: any[]): void;
    function makeRepeatString(text: string, n?: number): string;
    function makeSpace(n?: number): string;
    class AverageRandamizer {
        constructor (range: number);
        private _table;
        public next : number;
        public range : number;
    }
    function toRGBString(...argArray: number[]): string;
    function shuffleArray(src: any[]): any[];
    function makeKanji(value: number, chars: string, ketas: string): string;
    function degToRad(d: number): number;
    function radToDeg(r: number): number;
    function normalinzeRad(r: number): number;
    function normalinzeDeg(d: number): number;
    function angleToDirection(angle: number): number;
    function directionToAngle(direction: number): number;
    function getNarrowAngle(angle1: number, angle2: number): number;
    function getDistance(point1: enchant.IPoint, point2: enchant.IPoint): number;
    function getAngle(from: enchant.IPoint, to: enchant.IPoint): number;
    function makeValues(value: any, count: number): any[];
    function createMaze(rowNum: number, columnNum: number, addframe?: bool): number[][];
    function randomString(len: number, pattern?: string): string;
    function round(num: number, figure?: number): number;
    function ceil(num: number, figure?: number): number;
    function floor(num: number, figure?: number): number;
    function paddingLeft(num: number, len: number, ch?: string): string;
    function paddingRight(num: number, len: number, ch?: string): string;
    function formatString(format: string, ...argArray: any[]): string;
    function arrayEraseIf(ary: any[], fn: (element: any, index: number, array: any[]) => bool): void;
    class MapPoint {
        constructor (row: number, column: number);
        public row: number;
        public column: number;
    }
    class ResultRoute extends MapPoint {
        constructor (row: number, column: number, rest: number, routes: MapPoint[][]);
        public rest: number;
        public routes: MapPoint[][];
        public valid: bool;
    }
    class ResultMoveCost {
        public cost: number;
        public routes: MapPoint[][];
    }
    class MapPointSeacher {
        constructor (map: number[][]);
        private map;
        private rowNum;
        private columnNum;
        public limitLeft: number;
        public limitRight: number;
        public limitTop: number;
        public limitBottom: number;
        public getSamePoints(baseRowNo: number, baseColumnNo: number, matchFunc?: (value1: number, value2: number) => bool): MapPoint[];
        public getRoute(baseRowNo: number, baseColumnNo: number, cost: number): ResultRoute[];
        public calcMoveCost(map: number[][], fromRowNo: number, fromColumnNo: number, toRowNo: number, toColumnNo: number): ResultMoveCost;
    }
    function createIconSurface(index: number, count: number, assetName: string, width: number, height: number, columnNum: number): enchant.Surface;
    function createIconSprite(index: number, count?: number, assetName?: string, width?: number, height?: number, columnNum?: number): enchant.Sprite;
    function isDebug(): bool;
    function playSound(assetName: string): void;
    class RepeatSoundPlayer extends enchant.Node {
        constructor (assetName: string, fadeSec?: number, volume?: number);
        private _sound;
        private _fadeSec;
        private _volume;
        public play(): void;
        public pause(): void;
        public stop(): void;
        public enterFrame(): void;
    }
    var Event_SceneInput: string;
    class SceneExEvent extends enchant.Event {
        constructor (type: string);
        public eventID: number;
        public sec: number;
    }
    class InputPatternData {
        public eventID: number;
        public pattern: Array;
        public framelimit: number;
        public loop: bool;
        public index: number;
        public frame: number;
        public active: bool;
    }
    class SceneInput extends enchant.Scene {
        constructor ();
        private inputPatterns;
        private makeEvent(p);
        private enterFrame(e);
        private changeInput(e);
        public regist(eventID: number, pattern: Array, timelimit?: number, loop?: bool): void;
    }
    var Event_SceneExStarting: string;
    class SceneEx extends SceneInput {
        public name: string;
        private _opacity;
        private _setFadeIn;
        private _setFadeOut;
        private _nextSceneName;
        private _fadeInStep;
        private _fadeOutStep;
        static _scenes;
        constructor (name: string, fadeInSec?: number, fadeOutSec?: number);
        private enterFrame(e);
        private sceneNext();
        private _fadeIn();
        private _fadeOut();
        private _setOpacityChilds(me, opct);
        public fadeProsessing : bool;
        public opacity : number;
        public moveSceneTo(name: string): void;
    }
    function addFadeOutText(group: enchant.Group, targetsprite: enchant.IPoint, text: string, sec?: number): void;
    function keyBind(key: string, button: string): void;
    var Event_TimerTimeOut: string;
    class Timer extends enchant.Node {
        constructor ();
        public _frame: number;
        public _startFrame: number;
        public _active: bool;
        public start(sec: number): void;
        public stop(): void;
    }
    function inputToRad(): number;
    function collision2Sprites(sprite1: enchant.Sprite, sprite2: enchant.Sprite): bool;
    function setMazeData(map: enchant.Map, rowNum: number, columnNum: number, floorNo: number, wallNo: number, addframe?: bool): void;
    function stringWidth(surface: enchant.Surface, str: string): number;
    function isOutOfScreen(obj: enchant.IArea, padding?: number): bool;
    function createSimpleMap(assetName: string, tileSize: number, rowNum: number, columnNum: number, no: number, tlNo?: number, tNo?: number, trNo?: number, lNo?: number, rNo?: number, blNo?: number, bNo?: number, brNo?: number): enchant.Map;
    function createSampleMap(typeNo: number, rowNum: number, columnNum: number, assetName?: string): enchant.Map;
    class LogList extends enchant.Group {
        public fadeIn: number;
        public fadeOut: number;
        public scrollPx: number;
        public lineHeight: number;
        public color: string;
        public backgroundColor: string;
        public font: string;
        public textAlign: string;
        public adjustWidth: bool;
        public stackLimit: number;
        constructor (x: number, y: number, width: number, height: number, backgroundColor?: string);
        public width : number;
        public height : number;
        private _width;
        private _height;
        private _labels;
        private _texts;
        private _currentWork;
        private _fadeInLabel;
        private _fadeOutLabel;
        private _scrollNum;
        private _outAllLog;
        private _visible;
        private createLabel();
        private enterFrame0();
        private enterFrame1();
        private enterFrame2();
        private enterFrame3();
        private enterFrame(e);
        public visible : bool;
        public regist(text: string, color?: string, font?: string, lineHeight?: number, textAlign?: string, backgroundColor?: string): void;
        public outAllLog(): void;
        public clear(): void;
    }
    function createRectangleSurface(width: number, height: number, color: string, fill?: bool): enchant.Surface;
    function createRectangleSprite(width: number, height: number, color: string, fill?: bool): enchant.Sprite;
    function createCircleSurface(radius: number, color: string, fill?: bool): enchant.Surface;
    function createCircleSprite(radius: number, color: string, fill?: bool): enchant.Sprite;
    function createEllipseSurface(width: number, height: number, color: string, fill?: bool): enchant.Surface;
    function createEllipseSprite(width: number, height: number, color: string, fill?: bool): enchant.Sprite;
    function createArcSurface(radius: number, angle: number, range: number, color: string, fill?: bool): enchant.Surface;
    function createArcSprite(radius: number, angle: number, range: number, color: string, fill?: bool): enchant.Sprite;
    class Point implements enchant.IPoint {
        public x: number;
        public y: number;
        constructor (x?: number, y?: number);
        public getDistance(point: enchant.IPoint): number;
        public isEqual(point): bool;
        public clone(): Point;
    }
    class Line {
        public posS: Point;
        public posE: Point;
        constructor (x1?: number, y1?: number, x2?: number, y2?: number);
        public dx : number;
        public dy : number;
        public length : number;
        public isCross(line: Line): bool;
        public createSurface(color: string, width?: number): enchant.Surface;
        public createSprite(color: string, width?: number): enchant.Sprite;
        public clone(): Line;
    }
    class Area extends Point implements enchant.IArea {
        public width: number;
        public height: number;
        constructor (x?: number, y?: number, width?: number, height?: number);
        public top : number;
        public bottom : number;
        public left : number;
        public right : number;
        public center : enchant.IPoint;
        public diagonal : number;
        public scale(sx: number, sy?: number): void;
        public updateFrom(sprite: enchant.Sprite): void;
        public setTo(sprite: enchant.Sprite, updateSize?: bool): void;
        public getPixels(surface: enchant.Surface): IColor[];
        public clone(): Area;
    }
    class Rectangle extends Area {
        constructor (x: number, y: number, width: number, height: number);
        private _calcWidth(key);
        private _calcHeight(key);
        public hitTest(point: enchant.IPoint): bool;
        public intersectRect(rect: enchant.IArea): bool;
        public intersectLine(line: Line): bool;
        public getPos(key: number): Point;
        public setPos(key: number, pos: enchant.IPoint): void;
        public adjustPos(pos: enchant.IPoint): void;
        public getRandomPos(): Point;
        public getSideLine(no: number): Line;
        public getDiagonalLine(key: number): Line;
        public createSurface(color: string, fill?: bool): enchant.Surface;
        public createSprite(color: string, fill?: bool): enchant.Sprite;
        public clone(): Rectangle;
    }
    class Circle extends Area {
        constructor (centerX: number, centerY: number, radius: number);
        public radius : number;
        public diameter : number;
        public set(d: number): void;
        public hitTest(point: enchant.IPoint): bool;
        public intersectRect(rect): bool;
        public intersectLine(line: Line): bool;
        public intersectCircle(circle: Circle): bool;
        public adjustPos(pos: enchant.IPoint): void;
        public getRandomPos(): Point;
        public createSurface(color: string, fill?: bool): enchant.Surface;
        public createSprite(color: string, fill?: bool): enchant.Sprite;
        public clone(): Circle;
    }
    class Ellipse extends Area {
        constructor (centerX: number, centerY: number, width: number, height: number);
        public hitTest(point: enchant.IPoint): bool;
        public intersectRect(rect: Rectangle): bool;
        public intersectLine(line: Line): bool;
        public adjustPos(pos: enchant.IPoint): void;
        public getRandomPos(): Point;
        public createSurface(color: string, fill?: bool): enchant.Surface;
        public createSprite(color: string, fill?: bool): enchant.Sprite;
        public clone(): Ellipse;
    }
    class Arc extends Circle {
        public angle: number;
        public range: number;
        constructor (centerX: number, centerY: number, radius: number, angle: number, range: number);
        public angleStart : number;
        public angleEnd : number;
        public hitTest(point: enchant.IPoint): bool;
        public intersectRect(rect: Rectangle): bool;
        public intersectLine(line: Line): bool;
        public intersectCircle(circle: Circle): bool;
        public adjustPos(pos: enchant.IPoint): void;
        public getRandomPos(): Point;
        public createSurface(color: string, fill?: bool): enchant.Surface;
        public createSprite(color: string, fill?: bool): enchant.Sprite;
        public clone(): Arc;
    }
    class Ripple extends enchant.Sprite {
        constructor (width: number, height: number);
        private _active;
        private _radius;
        private _radiusMax;
        private _radiusLimit;
        private _speed;
        private _center;
        private _draw();
        public lineColor : string;
        public set(c: string): void;
        public lineWidth : number;
        public speed : number;
        public radius : number;
        public radiusMax : number;
        public radiusLimit : number;
        public start(x: number, y: number): void;
        public active : bool;
        public stop(): void;
    }
    function pushWaitScene(eventEnterFrame: () => bool, image?: enchant.Surface): void;
    function http2str(url: string): string;
}
module exte {
    class Card {
        static CARD: string;
        static ICON: string;
        static FONT: string;
        static BACK: string;
        static WIDTH: number;
        static HEIGHT: number;
        static SUIT_SIZE: number;
        static NUME_SIZE: number;
        static CARD_SIZE: number;
        static SPADE: number;
        static HEART: number;
        static DIAMOND: number;
        static CLUB: number;
        static ACE: number;
        static JACK: number;
        static QUEEN: number;
        static KING: number;
        static ERROR: number;
        static JOKER: number;
        static S01: number;
        static S02: number;
        static S03: number;
        static S04: number;
        static S05: number;
        static S06: number;
        static S07: number;
        static S08: number;
        static S09: number;
        static S10: number;
        static S11: number;
        static S12: number;
        static S13: number;
        static H01: number;
        static H02: number;
        static H03: number;
        static H04: number;
        static H05: number;
        static H06: number;
        static H07: number;
        static H08: number;
        static H09: number;
        static H10: number;
        static H11: number;
        static H12: number;
        static H13: number;
        static D01: number;
        static D02: number;
        static D03: number;
        static D04: number;
        static D05: number;
        static D06: number;
        static D07: number;
        static D08: number;
        static D09: number;
        static D10: number;
        static D11: number;
        static D12: number;
        static D13: number;
        static C01: number;
        static C02: number;
        static C03: number;
        static C04: number;
        static C05: number;
        static C06: number;
        static C07: number;
        static C08: number;
        static C09: number;
        static C10: number;
        static C11: number;
        static C12: number;
        static C13: number;
        static SA: number;
        static SJ: number;
        static SQ: number;
        static SK: number;
        static HA: number;
        static HJ: number;
        static HQ: number;
        static HK: number;
        static DA: number;
        static DJ: number;
        static DQ: number;
        static DK: number;
        static CA: number;
        static CJ: number;
        static CQ: number;
        static CK: number;
        static getSuit(card: number): number;
        static getNumber(card: number): number;
        static getData(suit: number, no: number): number;
        static getCard(data: number): TCardSprite;
        static setImage(): void;
        static drawCard(card): enchant.Surface;
    }
    class TCardSprite extends enchant.Sprite {
        constructor (width: number, height: number);
        public data: number;
    }
}
module exte {
    class Dice extends enchant.Sprite {
        constructor ();
        static IMAGE: string;
        static WIDTH: number;
        static HEIGHT: number;
        static MAXNUM: number;
        public value : number;
        public drawFace(top: number): enchant.Surface;
    }
}
