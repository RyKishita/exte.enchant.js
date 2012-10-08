/// <reference path="enchant.d.ts"/>

module enchant.ui {
    declare class Pad extends Sprite {
        constructor ();
    }
    declare class APad extends Sprite {
        constructor ();
        isTouched: bool;
        vx: number;
        vy: number;
        rad: number;
        dist: number;
        mode: string;
    }
    declare class Button extends Entity {
        constructor (text: string, theme: string, height: number, width: number);
        text: string;
        size: string;
        font: string;
        color: string;
    }
}
