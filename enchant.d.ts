module enchant {
    declare class Class {
        constructor (superclass: Function, definition?: any);
        static create(superclass: Function, definition?: any): Class;
        static getInheritanceTree(Constructor: Function): Function;
    }

    declare class ENV {
        static VENDOR_PREFIX: string;
        static TOUCH_ENABLED: bool;
        static RETINA_DISPLAY: bool;
        static USE_FLASH_SOUND: bool;
        static USE_DEFAULT_EVENT_TAGS: string[];
        static CANVAS_DRAWING_METHODS: string[];
        static KEY_BIND_TABLE: Array;
        static PREVENT_DEFAULT_KEY_CODES: number[];
        static SOUND_ENABLED_ON_MOBILE_SAFARI: bool;
        static USE_WEBAUDIO: bool;
        static USE_ANIMATION: bool;
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
        static CHILD_ADDED: string;
        static ADDED: string;
        static ADDED_TO_SCENE: string;
        static CHILD_REMOVED: string;
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
        static ADDED_TO_TIMELINE: string;
        static REMOVED_FROM_TIMELINE: string;
        static ACTION_START: string;
        static ACTION_END: string;
        static ACTION_TICK: string;
        static ACTION_ADDED: string;
        static ACTION_REMOVED: string;
    }

    declare class EventTarget {
        constructor();
        addEventListener(type: string, listener: (Event) => void ): void;
        on(): void;
        removeEventListener(type: string, listener: (Event) => void ): void;
        clearEventListener(type: string): void;
        dispatchEvent(e: Event): void;
    }

    declare class Core extends EventTarget {
        static instance : Core;

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
        onload: () =>void;//?
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

    declare class Game extends Core {
        static instance : Game;
    }

    declare class Node extends EventTarget implements IPoint {
        constructor();
        age: number;
        parentNode: Node;
        scene: Scene;
        moveTo(x: number, y: number): void;
        moveBy(x: number, y: number): void;
        x: number;
        y: number;
        remove(): void;
        tl: Timeline;   //enchant.ENV.USE_ANIMATION==true
    }

    declare class Entity extends Node implements IArea {
        constructor();
        compositeOperation: string;
        buttonMode: string;
        buttonPressed: bool;
        width: number;
        height: number;
        backgroundColor: string;
        opacity: number;
        visible: bool;
        touchEnabled: bool;
        intersect(other: IArea): bool;
        within(other: IArea, distance?: number): bool;
        scale(x: number, y: number): void;
        rotate(deg: number): void;
        scaleX: number;
        scaleY: number;
        rotation: number;
        originX: number;
        originY: number;
        enableCollection(): void;
        disableCollection(): void;
    }

    declare class Sprite extends Entity {
        constructor (width: number, height: number);
        image: Surface;
        frame: any;//number or number[]
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
        checkTile(x: number, y: number): number;
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
        rotation: number;
        scaleX: number;
        scaleY: number;
        originX: number;
        originY: number;
    }

    declare class CanvasLayer extends Group {
        constructor ();
        width: number;
        height: number;
        context: CanvasRenderingContext2D;
    }

    // no comments.
    declare class Scene extends Group {
        constructor ();
        backgroundColor: string;
        addLayer(type: string, i?: number): void;
    }

    declare class Surface extends EventTarget {
        constructor (width: number, height: number);
        width: number;
        height: number;
        context: CanvasRenderingContext2D;
        getPixel(x: number, y: number): Int32Array;
        setPixel(x: number, y: number, r: number, g: number, b: number, a: number): void;
        clear(): void;
        draw(src: Surface, sx: number, sy: number, sw?: number, sh?: number, dx?: number, dy?: number, dw?: number, dh?: number): void;
        clone(): Surface;
        toDataURL(): string;
        static load(src: string, callback?: Function): Surface;
    }

    declare class Sound {
        constructor ();
        play(dup?: bool): void;
        pause(): void;
        stop(): void;
        clone(): Sound;
        dulation: number;
        volume: number;
        currentTime: number;
        static load(src: string, type?: string, callback?: Function): Sound;
        static audioContext: any; //webkitAudioContext
        static destination: any;  //AudioNode
    }

    declare class Easing {
        static LINEAR: Function;
        static SWING: Function;
        static QUAD_EASEIN: Function;
        static QUAD_EASEOUT: Function;
        static QUAD_EASEINOUT: Function;
        static CUBIC_EASEIN: Function;
        static CUBIC_EASEOUT: Function;
        static CUBIC_EASEINOUT: Function;
        static QUART_EASEIN: Function;
        static QUART_EASEOUT: Function;
        static QUART_EASEINOUT: Function;
        static QUINT_EASEIN: Function;
        static QUINT_EASEOUT: Function;
        static QUINT_EASEINOUT: Function;
        static SIN_EASEIN: Function;
        static SIN_EASEOUT: Function;
        static SIN_EASEINOUT: Function;
        static CIRC_EASEIN: Function;
        static CIRC_EASEOUT: Function;
        static CIRC_EASEINOUT: Function;
        static ELASTIC_EASEIN: Function;
        static ELASTIC_EASEOUT: Function;
        static ELASTIC_EASEINOUT: Function;
        static BOUNCE_EASEOUT: Function;
        static BOUNCE_EASEIN: Function;
        static BOUNCE_EASEINOUT: Function;
        static BACK_EASEIN: Function;
        static BACK_EASEOUT: Function;
        static BACK_EASEINOUT: Function;
        static EXPO_EASEIN: Function;
        static EXPO_EASEOUT: Function;
        static EXPO_EASEINOUT: Function;
    }

    declare class ActionEventTarget extends EventTarget {
        constructor();
        dispatchEvent(e: Event): void;
    }

    declare class Timeline extends EventTarget {
        constructor(node: Node, unitialized: bool);
        setFrameBased(): void;
        setTimeBased(): void;
        next(remainingTime: number): void;
        tick(enterFrameEvent: Event): void;
        add(action: Action): Timeline;
        action(params: any): Timeline;
        tween(params: any): Timeline;
        clear(): Timeline;
        skip(frame: number): Timeline;
        pause(): Timeline;
        resume(): Timeline;
        loop(): Timeline;
        unloop(): Timeline;
        delay(time: number): Timeline;
        wait(time: number): Timeline;// reserved
        then(func: Function): Timeline;
        exec(func: Function): void;
        cue(cue: Array): void;
        repeat(func: Function, time: number): Timeline;
        and(): Timeline;
        or(): Timeline;
        doAll(): Timeline;
        waitAll(): Timeline;
        waitUntil(func: ()=> bool): Timeline;
        fadeTo(opacity: number, time: number, easing: Function): Timeline;
        fadeIn(time: number, easing: Function): Timeline;
        fadeOut(time: number, easing: Function): Timeline;
        moveTo(x: number, y: number, time: number, easing: Function): Timeline;
        moveX(x: number, time: number, easing: Function): Timeline;
        moveY(y: number, time: number, easing: Function): Timeline;
        moveBy(x: number, y: number, time: number, easing: Function): Timeline;
        hide(): Timeline;
        show(): Timeline;
        removeFromScene(): Timeline;
        scaleTo(scale: number, time: number, easing: Function): Timeline;
        scaleBy(scale: number, time: number, easing: Function): Timeline;
        rotateTo(deg: number, time: number, easing: Function): Timeline;
        rotateBy(deg: number, time: number, easing: Function): Timeline;
    }

    declare class Action extends ActionEventTarget {
        constructor(param: any);
    }

    declare class ParallelAction extends Action {
        constructor(param: any);
        actions: Action[];
        endedActions: Action[];
    }

    declare class Tween extends Action {
        constructor(params: any);
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
