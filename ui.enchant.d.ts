/// <reference path="enchant.d.ts"/>

module enchant.ui {
    declare class Pad extends Sprite {
        constructor ();
    }
    declare class APad extends Group {
        constructor (mode?: string);
        isTouched: bool;
        vx: number;
        vy: number;
        rad: number;
        dist: number;
        mode: string;
    }
    declare class Button extends Entity {
        constructor (text: string, theme?: any, height?: number, width?: number);
        pressed: bool;
        theme: string;
        text: string;
        size: string;
        font: string;
        color: string;
    }

    declare class MutableText extends Sprite {
        constructor(x: number, y: number, width?: number);
        setText(txt: string): void;
        text: string;
        row: number;
    }
    declare class ScoreLabel extends MutableText {
        constructor (x?: number, y?: number);
        easing: number;
        label: string;
        score: number;
    }
    declare class TimeLabel extends MutableText {
        constructor (x?: number, y?: number, counttype?: string);
        label: string;
        time: number;
    }
    declare class LifeLabel extends Group {
        constructor (x?: number, y?: number, maxlife?: number);
        life: number;
    }
    declare class Bar extends Sprite {
        constructor (x?: number, y?: number);
        value: number;
        easing: number;
        direction: string;
        x: number;
        maxvalue: number;
    }
    declare class VirtualMap extends Group {
        constructor (meshWidth?: number, meshHeight?: number);
        addChild(node: Node): void;
        insertBefore(node: Node, reference: Node): void;
        bind(node: Node): void;
    }
}

declare function rand(number): number;
