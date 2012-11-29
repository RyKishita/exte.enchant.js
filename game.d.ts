module ExteGame {
    class GameData {
        constructor ();
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
    function CreatePlayScene(gameData): void;
}
module ExteGame {
}
