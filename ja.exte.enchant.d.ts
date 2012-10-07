module exte {
    declare function toKanji1(value: number): string;
    declare function toKanji2(value: number): string;
    declare function toKatakanaCase(str: string): string;
    declare function toHirakanaCase(str: string): string;
    declare class Geolocation {
        constructor ();
        public getCurrentPosition(func: Function);
        public getXFromLong(currentLongitude: number): number;
        public getYFromLat(currentLatitude: number): number;
        public getLongFromX(x: number): number;
        public getLatFromY(y: number): number;
        public show_location(event: any): void;
        public getDistance(pre: any, now: any): number;
    }
}