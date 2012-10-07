module exte {
    export function rand(num: number): number;
    export function getUserAgent(): string;
    export function trace(): void;
    export function makeRepeatString(text: string, n?: number): string;
    export function makeSpace(n: number): string;
    export class AverageRandamizer {
        constructor (range: number);
        private _table: any[];
        public next : number;
        public range : number;
    }
    export function toRGBString(): string;
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
    export function createMaze(rowNum: number, columnNum: number, addframe: bool): number[][];
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
        constructor (row: number, column: number, rest: number, route: MapPoint[][]);
        public rest: number;
        public routes: MapPoint[][];
        public valid: bool;
    }
    export class ResultMoveCost {
        public cost: number;
        public routes: number[][];
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
    export function createIconSprite(index: number, count: number, assetName: string, width: number, height: number, columnNum: number): enchant.Sprite;
    export function isDebug(): bool;
    export function playSound(assetName: string): void;
    export class RepeatSoundPlayer extends enchant.Node {
        constructor (assetName: string, fadeSec: number, volume: number);
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
        constructor (name: string, fadeInSec: number, fadeOutSec: number);
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
    export function setMazeData(map: enchant.Map, rowNum: number, columnNum: number, floorNo: number, wallNo: number, addframe: bool): void;
    export function stringWidth(surface: enchant.Surface, str: string): number;
    export function isOutOfScreen(obj: enchant.IArea, padding: number): bool;
    export function createSimpleMap(assetName: string, tileSize: number, rowNum: number, columnNum: number, no: number, tlNo?: number, tNo?: number, trNo?: number, lNo?: number, rNo?: number, blNo?: number, bNo?: number, brNo?: number): enchant.Map;
    export function createSampleMap(typeNo: number, rowNum: number, columnNum: number): enchant.Map;
    export class LogList extends enchant.Group {
        public fadeIn: number;
        public fadeOut: number;
        public scrollPx: number;
        public lineHeight: number;
        public color;
        public font;
        public fontSize;
        public wordBreak;
        public textAlign;
        public stackLimit: number;
        constructor (x: number, y: number, width: number, height: number);
        public width: number;
        public height: number;
        private _labels: any[];
        private _texts: any[];
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
        public set(v): void;
        public regist(text: string, color?: string, fontSize?: string, lineHeight?: number, textAlign?: number): void;
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
    export class Point {
        public x: number;
        public y: number;
        constructor (x: number, y: number);
        public getDistance(point: enchant.IPoint): number;
        public isEqual(point): bool;
        public clone(): Point;
    }
    export class Line {
        public posS: Point;
        public posE: Point;
        constructor (x1: number, y1: number, x2: number, y2: number);
        public dx : number;
        public dy : number;
        public length : number;
        public isCross(line: Line): bool;
        public createSurface(color: string, width?: number): enchant.Surface;
        public createSprite(color: string, width?: number): enchant.Sprite;
        public clone(): Line;
    }
    export class Area {
        public x: number;
        public y: number;
        public width: number;
        public height: number;
        constructor (x: number, y: number, width: number, height: number);
        public top : number;
        public bottom : number;
        public left : number;
        public right : number;
        public center : Point;
        public diagonal : number;
        public scale(sx: number, sy?: number): void;
        public updateFrom(sprite: enchant.Sprite): void;
        public setTo(sprite: enchant.Sprite, updateSize?: bool): void;
        public getPixels(surface: enchant.Surface);
        public clone(): Area;
    }
    export class Rectangle extends Area {
        constructor (x: number, y: number, width: number, height: number);
        private _calcWidth(key): number;
        private _calcHeight(key): number;
        public hitTest(point: enchant.IPoint): bool;
        public intersectRect(rect: Area): bool;
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
        public set(d): void;
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
        public lineColor : any;
        public set(c): void;
        public lineWidth : number;
        public speed : number;
        public radius : number;
        public radiusMax : number;
        public radiusLimit : number;
        public start(x: number, y: number): void;
        public active : bool;
        public stop(): void;
    }
}
