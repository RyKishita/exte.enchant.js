module exte {
    export interface IColor {
        r: number;
        g: number;
        b: number;
        a: number;
    }
    export function rand(num: number): number;
    export function getUserAgent(): string;
    export function trace(...argArray: any[]): void;
    export function makeRepeatString(text: string, n?: number): string;
    export function makeSpace(n?: number): string;
    export class AverageRandamizer {
        constructor (range: number);
        private _table: any[];
        public next : number;
        public range : number;
    }
    export function toRGBString(...argArray: number[]): string;
    export function shuffleArray(src: any[]): any[];
    export function makeKanji(value: number, chars: string, ketas: string): string;
    export function degToRad(d: number): number;
    export function radToDeg(r: number): number;
    export function normalinzeRad(r: number): number;
    export function normalinzeDeg(d: number): number;
    export function angleToDirection(angle: number): number;
    export function directionToAngle(direction: number): number;
    export function getNarrowAngle(angle1: number, angle2: number): number;
    export function getDistance(point1: enchant.IPoint, point2: enchant.IPoint): number;
    export function getAngle(from: enchant.IPoint, to: enchant.IPoint): number;
    export function makeValues(value: any, count: number): any[];
    export function createMaze(rowNum: number, columnNum: number, addframe?: bool): number[][];
    export function randomString(len: number, pattern?: string): string;
    export function round(num: number, figure?: number): number;
    export function ceil(num: number, figure?: number): number;
    export function floor(num: number, figure?: number): number;
    export function paddingLeft(num: number, len: number, ch?: string): string;
    export function paddingRight(num: number, len: number, ch?: string): string;
    export function formatString(format: string, ...argArray: any[]): string;
    export function arrayEraseIf(ary: any[], fn: (element: any,index: number,array: any[]) => bool): void;
    export class MapPoint {
        constructor (row: number, column: number);
        public row: number;
        public column: number;
    }
    export class ResultRoute extends MapPoint {
        constructor (row: number, column: number, rest: number, routes: MapPoint[][]);
        public rest: number;
        public routes: MapPoint[][];
        public valid: bool;
    }
    export class ResultMoveCost {
        public cost: number;
        public routes: MapPoint[][];
    }
    export class MapPointSeacher {
        constructor (map: number[][]);
        private map: number[][];
        private rowNum: number;
        private columnNum: number;
        public limitLeft: number;
        public limitRight: number;
        public limitTop: number;
        public limitBottom: number;
        public getSamePoints(baseRowNo: number, baseColumnNo: number, matchFunc?: (value1: number,value2: number) => bool): MapPoint[];
        public getRoute(baseRowNo: number, baseColumnNo: number, cost: number): ResultRoute[];
        public calcMoveCost(map: number[][], fromRowNo: number, fromColumnNo: number, toRowNo: number, toColumnNo: number): ResultMoveCost;
    }
    export function createIconSurface(index: number, count: number, assetName: string, width: number, height: number, columnNum: number): enchant.Surface;
    export function createIconSprite(index: number, count?: number, assetName?: string, width?: number, height?: number, columnNum?: number): enchant.Sprite;
    export function isDebug(): bool;
    export function playSound(assetName: string): void;
    export class RepeatSoundPlayer extends enchant.Node {
        constructor (assetName: string, fadeSec?: number, volume?: number);
        private _sound;
        private _fadeSec;
        private _volume;
        public play(): void;
        public pause(): void;
        public stop(): void;
        public enterFrame(): void;
    }
    export var Event_SceneInput: string;
    export class SceneExEvent extends enchant.Event {
        constructor (type: string);
        public eventID: number;
        public sec: number;
    }
    export class InputPatternData {
        public eventID: number;
        public pattern: Array;
        public framelimit: number;
        public loop: bool;
        public index: number;
        public frame: number;
        public active: bool;
    }
    export class SceneInput extends enchant.Scene {
        constructor ();
        private inputPatterns: any[];
        private makeEvent(p): void;
        private enterFrame(e): void;
        private changeInput(e): void;
        public regist(eventID: number, pattern: Array, timelimit?: number, loop?: bool): void;
    }
    export var Event_SceneExStarting: string;
    export class SceneEx extends SceneInput {
        public name: string;
        private _opacity: number;
        private _setFadeIn: bool;
        private _setFadeOut: bool;
        private _nextSceneName: string;
        private _fadeInStep: number;
        private _fadeOutStep: number;
        static _scenes;
        constructor (name: string, fadeInSec?: number, fadeOutSec?: number);
        private enterFrame(e): void;
        private sceneNext(): void;
        private _fadeIn(): bool;
        private _fadeOut(): bool;
        private _setOpacityChilds(me, opct): void;
        public fadeProsessing : bool;
        public opacity : number;
        public moveSceneTo(name: string): void;
    }
    export function addFadeOutText(group: enchant.Group, targetsprite: enchant.IPoint, text: string, sec?: number): void;
    export function keyBind(key, button): void;
    export var Event_TimerTimeOut: string;
    export class Timer extends enchant.Node {
        constructor ();
        public _frame: number;
        public _startFrame: number;
        public _active: bool;
        public start(sec: number): void;
        public stop(): void;
    }
    export function inputToRad(): number;
    export function collision2Sprites(sprite1: enchant.Sprite, sprite2: enchant.Sprite): bool;
    export function setMazeData(map: enchant.Map, rowNum: number, columnNum: number, floorNo: number, wallNo: number, addframe?: bool): void;
    export function stringWidth(surface: enchant.Surface, str: string): number;
    export function isOutOfScreen(obj: enchant.IArea, padding?: number): bool;
    export function createSimpleMap(assetName: string, tileSize: number, rowNum: number, columnNum: number, no: number, tlNo?: number, tNo?: number, trNo?: number, lNo?: number, rNo?: number, blNo?: number, bNo?: number, brNo?: number): enchant.Map;
    export function createSampleMap(typeNo: number, rowNum: number, columnNum: number): enchant.Map;
    export class LogList extends enchant.Group {
        public fadeIn: number;
        public fadeOut: number;
        public scrollPx: number;
        public lineHeight: number;
        public color: string;
        public backgroundColor: string;
        public font: string;
        public fontSize: string;
        public wordBreak: string;
        static WB_Normal: string;
        static WB_BreakAll: string;
        static WB_KeepAll: string;
        public textAlign: string;
        public adjustWidth: bool;
        public stackLimit: number;
        constructor (x: number, y: number, width: number, height: number, backgroundColor?: string);
        public width: number;
        public height: number;
        private _labels: any[];
        private _texts;
        private _currentWork: number;
        private _fadeInLabel;
        private _fadeOutLabel;
        private _scrollNum: number;
        private _outAllLog: bool;
        private _visible: bool;
        private createLabel(): any;
        private enterFrame0(): void;
        private enterFrame1(): void;
        private enterFrame2(): void;
        private enterFrame3(): void;
        private enterFrame(e): void;
        public visible : bool;
        public regist(text: string, color?: string, fontSize?: string, lineHeight?: number, textAlign?: string, backgroundColor?: string): void;
        public outAllLog(): void;
        public clear(): void;
    }
    export function createRectangleSurface(width: number, height: number, color: string, fill?: bool): enchant.Surface;
    export function createRectangleSprite(width: number, height: number, color: string, fill?: bool): enchant.Sprite;
    export function createCircleSurface(radius: number, color: string, fill?: bool): enchant.Surface;
    export function createCircleSprite(radius: number, color: string, fill?: bool): enchant.Sprite;
    export function createEllipseSurface(width: number, height: number, color: string, fill?: bool): enchant.Surface;
    export function createEllipseSprite(width: number, height: number, color: string, fill?: bool): enchant.Sprite;
    export function createArcSurface(radius: number, angle: number, range: number, color: string, fill?: bool): enchant.Surface;
    export function createArcSprite(radius: number, angle: number, range: number, color: string, fill?: bool): enchant.Sprite;
    export class Point implements enchant.IPoint {
        public x: number;
        public y: number;
        constructor (x?: number, y?: number);
        public getDistance(point: enchant.IPoint): number;
        public isEqual(point): bool;
        public clone(): Point;
    }
    export class Line {
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
    export class Area extends Point implements enchant.IArea {
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
    export class Rectangle extends Area {
        constructor (x: number, y: number, width: number, height: number);
        private _calcWidth(key): number;
        private _calcHeight(key): number;
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
    export class Circle extends Area {
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
    export class Ellipse extends Area {
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
    export class Arc extends Circle {
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
    export class Ripple extends enchant.Sprite {
        constructor (width: number, height: number);
        private _active: bool;
        private _radius: number;
        private _radiusMax: number;
        private _radiusLimit: number;
        private _speed: number;
        private _center;
        private _draw(): void;
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
    export function pushWaitScene(eventEnterFrame: () => bool, image?: enchant.Surface): void;
    export function http2str(url: string): string;
}
module exte {
    export class Card {
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
    export class TCardSprite extends enchant.Sprite {
        constructor (width: number, height: number);
        public data: number;
    }
}
module exte {
    export class Dice extends enchant.Sprite {
        constructor ();
        static IMAGE: string;
        static WIDTH: number;
        static HEIGHT: number;
        static MAXNUM: number;
        public value : number;
        public drawFace(top: number): enchant.Surface;
    }
}
