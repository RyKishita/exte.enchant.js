module ExteGame {
    export class GameData{
        constructor () { }

        mapAssetName = 'map1.gif';
        waitAssetName = 'img/wait.png';

        buttonWidth = 60;
        buttonHeight = 40;
        buttonAAssetName = "img/buttonA.png";
        buttonBAssetName = "img/buttonB.png";

        soundStart = 'sounds/se6.wav';
        soundOK = 'sounds/lock4.wav';
        soundBGM = 'sounds/bgm08.wav';

        getAssetList(): string[] {
            return [
                this.mapAssetName,
                this.buttonAAssetName,
                this.buttonBAssetName,
                this.soundStart,
                this.soundOK,
                this.soundBGM,
                this.waitAssetName,
                ];
        }
    }
}
