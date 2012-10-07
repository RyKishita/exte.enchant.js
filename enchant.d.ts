module enchant {
    declare class ENV {
        static VENDOR_PREFIX: string;
        static TOUCH_ENABLED: bool;
        static RETINA_DISPLAY: bool;
        static USE_FLASH_SOUND: bool;
        static USE_DEFAULT_EVENT_TAGS: string[];
        static CANVAS_DRAWING_METHODS: string[];
    }

    declare class Event {
        constructor(type: string);
        type: string;
        target: any;
        x: number;
        y: number;
        localX: number;
        localY: number;

        static LOAD: string;
        static PROGRESS: string;
        static ENTER_FRAME: string;
        static EXIT_FRAME: string;
        static ENTER: string;
        static EXIT: string;
        static ADDED: string;
        static ADDED_TO_SCENE: string;
        static REMOVED: string;
        static REMOVED_FROM_SCENE: string;
        static TOUCH_START: string;
        static TOUCH_MOVE: string;
        static TOUCH_END: string;
        static RENDER: string;
        static INPUT_START: string;
        static INPUT_CHANGE: string;
        static INPUT_END: string;
        static LEFT_BUTTON_DOWN: string;
        static LEFT_BUTTON_UP: string;
        static RIGHT_BUTTON_DOWN: string;
        static RIGHT_BUTTON_UP: string;
        static UP_BUTTON_DOWN: string;
        static UP_BUTTON_UP: string;
        static DOWN_BUTTON_DOWN: string;
        static DOWN_BUTTON_UP: string;
        static A_BUTTON_DOWN: string;
        static A_BUTTON_UP: string;
        static B_BUTTON_DOWN: string;
        static B_BUTTON_UP: string;
    }

    declare class EventTarget {
        constructor();
        addEventListener(type: string, listener: (Event) => void ): void;
        on(): void;
        removeEventListener(type: string, listener: (Event) => void ): void;
        clearEventListener(type: string): void;
        dispatchEvent(e: Event): void;
    }

    declare class Game extends EventTarget {
        static instance : Game;

        constructor(width: number, height: number);
        width: number;
        height: number;
        scale: number;
        fps: number;
        frame: number;
        ready: bool;
        running: bool;
        assets: Array;
        currentScene: Scene;
        rootScene: Scene;
        loadingScene: Scene;
        input: Input;
        onload: () =>void;
        preload(...argArray: any[]): void;
        load(src: string, callback: Function): void;
        start(): void;
        debug(): void;
        actualFps: number;
        stop(): void;
        pause(): void;
        resume(): void;
        pushScene(scene: Scene): Scene;
        popScene(): Scene;
        replaceScene(scene: Scene): Scene;
        removeScene(scene: Scene): Scene;
        keybind(key: number, button: string): void;
        getElapsedTime(): number;
        findExt(path: string): string;

        _debug: bool;
    }

    declare class Node extends EventTarget {
        constructor();
        age: number;
        parentNode: Node;
        scene: Scene;
        moveTo(x: number, y: number): void;
        moveBy(x: number, y: number): void;
        x: number;
        y: number;
        remove(): void;
    }

    declare class Entity extends Node {
        constructor();
        buttonMode: string;
        buttonPressed: bool;
        id: string;
        className: string;
        width: number;
        height: number;
        backgroundColor: string;
        opacity: number;
        visible: bool;
        touchEnabled: bool;
        intersect(other: IArea): bool;
        within(other: IArea, distance: number): bool;
        scale(x: number, y: number): void;
        rotate(deg: number): void;
        scaleX: number;
        scaleY: number;
        rotation: number;
    }

    declare class Sprite extends Entity {
        constructor (width: number, height: number);
        image: Surface;
        frame: number;
    }

    declare class Label extends Entity {
        constructor (text: string);
        text: string;
        textAlign: string;
        font: string;
        color: string;
    }

    declare class Map extends Entity {
        constructor (tileWidth: number, tileHeight: number);
        collisionData: any[];
        loadData(thisArg: any, ...argArray: any[]): void;
        hitTest(x: number, y: number): bool;
        image: Surface;
        tileWidth: number;
        tileHeight: number;
    }

    declare class Group extends Node {
        constructor ();
        childNodes: Node[];
        addChild(node: Node): void;
        insertBefore(node: Node, reference: Node): void;
        removeChild(node: Node): void;
        firstChild: Node;
        lastChild: Node;
    }

    declare class RGroup extends Group {
        constructor (width: number, height: number);
        width: number;
        height: number;
        rotationOrigin: IPoint;
        addChild(node: Node): void;
        rotation: number;
    }

    declare class Scene extends Group {
        constructor ();
        backgroundColor: string;
    }

    declare class CanvasGroup extends Group {
        constructor ();
        width: number;
        height: number;
        context: CanvasRenderingContext2D;
        rotation: number;
        scaleX: number;
        scaleY: number;
        addChild(node: Node): void;
        insertBefore(node: Node, reference: Node): void;
        removeChild(node: Node): void;
    }

    declare class Surface extends EventTarget {
        constructor (width: number, height: number);
        width: number;
        height: number;
        context: CanvasRenderingContext2D;
        getPixel(x: number, y: number): Int32Array;
        setPixel(x: number, y: number, r: number, g: number, b: number, a: number): void;
        clear(): void;
        draw(src: Surface, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void;
        clone(): void;
        toDataURL(): String;
        static load(src: string): Surface;
    }

    declare class Sound {
        constructor ();
        play(): void;
        pause(): void;
        stop(): void;
        clone(): Sound;
        currentTime: number;
        volume: number;
        static load(src: string, type?: string): Sound;
        static enabledInMobileSafari: bool;
    }


    // --------------------------------------

    declare class Input {
        up: bool;
        down: bool;
        left: bool;
        right: bool;
        a: bool;
        b: bool;
    }

    interface IPoint {
        x: number;
        y: number;
    }

    interface IArea extends IPoint {
        width: number;
        height: number;
    }
}

//declare function enchant(): void;