/// <reference path="enchant.d.ts"/>

module enchant.util {
    declare class MutableText extends Sprite {
        constructor(x: number, y: number, width?: number);
        setText(txt: string): void;
        text: string;
        row: number;
    }
    declare class ScoreLabel extends MutableText {
        constructor (x?: number, y?: number);
        score: number;
    }
    declare class TimeLabel extends MutableText {
        constructor (x?: number, y?: number, counttype?: string);
        time: number;
    }
    declare class LifeLabel extends Group {
        constructor (x?: number, y?: number, maxlife?: number);
        life: number;
    }
    declare class Bar extends Sprite {
        constructor (x?: number, y?: number);
        direction: string;
        maxvalue: number;
    }
    declare class VirtualMap extends Group {
        addChild(node: Node): void;
        insertBefore(node: Node, reference: Node): void;
    }
}

declare function rand(number): number;