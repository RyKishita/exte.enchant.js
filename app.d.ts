module ExteGame {
    export class GameData {
        constructor ();
        public playAssetName: string;
        public mapAssetName: string;
        public waitAssetName: string;
        public buttonWidth: number;
        public buttonHeight: number;
        public buttonAAssetName: string;
        public buttonBAssetName: string;
        public soundStart: string;
        public soundOK: string;
        public soundBGM: string;
        public getAssetList(): string[];
    }
}
module ExteGame {
    export function CreatePlayScene(gameData): void;
}
module ExteGame {
}
