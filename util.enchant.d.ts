/// <reference path="enchant.d.ts"/>

module enchant.util {
    declare class MutableText extends Sprite {
        constructor(posX: number, posY: number, width?: number);
        text: string;
        fedingValue: number;
    }
    declare class Wallpaper extends Sprite {
        constructor (backgroundimage: Surface);
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
    declare class VirtualMap extends Group {
    }
}

module enchant {
    // なぜかこれだけutilに入っていない
    declare class Bar extends Sprite {
        constructor (x?: number, y?: number);
        direction: string;
        maxvalue: number;
    }
}

declare function isTouch(): bool;
declare function rand(number): number;
