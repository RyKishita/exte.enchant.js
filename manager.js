var GameData = enchant.Class.create({
    initialize: function () {
        this.iconAssetName = 'icon0.gif';
        this.iconWidth = 16;
        this.iconHeight = 16;
        this.iconColumnCount = 16;

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
            this.iconAssetName,
            this.playAssetName,
            this.mapAssetName,
            this.buttonAAssetName,
            this.buttonBAssetName,
            this.soundStart,
            this.soundOK,
            this.soundBGM);
        return assetList;
    },
    createIconImage: function (index, count, assetName, width, height, columnNum) {
        if (!count) count = 1;
        if (!assetName) assetName = this.iconAssetName;
        if (!width) width = this.iconWidth;
        if (!height) height = this.iconHeight;
        if (!columnNum) columnNum = this.iconColumnCount;

        var x = (index % columnNum) * width;
        var y = Math.floor(index / columnNum) * height;

        var image = new Surface(width * count, height);
        image.draw(
            enchant.Game.instance.assets[assetName],
            x, y, width * count, height,
            0, 0, width * count, height);
        return image;
    },
    createIconSprite: function (index, count, assetName, width, height, columnNum) {
        if (!width) width = this.iconWidth;
        if (!height) height = this.iconHeight;

        var sprite = new Sprite(width, height);
        sprite.image = this.createIconImage(index, count, assetName, width, height, columnNum);
        return sprite
    }
});
