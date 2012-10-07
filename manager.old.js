var GameData = enchant.Class.create({
    initialize: function () {
        this.playAssetName = 'img/play.png';
        this.mapAssetName = 'map1.gif';

        this.buttonWidth = 60;
        this.buttonHeight = 40;
        this.buttonAAssetName = "img/buttonA.png";
        this.buttonBAssetName = "img/buttonB.png";

        this.soundStart = 'sounds/se6.wav';
        this.soundOK = 'sounds/lock4.wav';
        this.soundBGM = 'sounds/bgm08.wav';
    },
    getAssetList: function () {
        var assetList = new Array(
            this.playAssetName,
            this.mapAssetName,
            this.buttonAAssetName,
            this.buttonBAssetName,
            this.soundStart,
            this.soundOK,
            this.soundBGM);
        return assetList;
    }
});
