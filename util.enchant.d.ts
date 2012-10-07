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
}
