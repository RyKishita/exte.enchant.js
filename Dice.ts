// http://9leap.net/games/2250


/// <reference path="enchant.d.ts"/>

module exte {
    export class Dice extends enchant.Sprite {
        constructor () {
            super(Dice.WIDTH, Dice.HEIGHT);

            this.image = new enchant.Surface(Dice.WIDTH * Dice.MAXNUM, Dice.HEIGHT);
            for (var i = 0; i < Dice.MAXNUM; i++) {
                this.image.draw(this.drawFace(i + 1), i * Dice.WIDTH, 0);
            }
        }

        static IMAGE  = 'icon0.png';
        static WIDTH  = 24;
        static HEIGHT = 34;
        static MAXNUM = 6;

        get value(): number {
            return this.frame;
        }
        set value(num: number) {
            if (0 < num && num <= Dice.MAXNUM) this.frame = num - 1;
        }

        /* // tl.enchantはTypeScriptだとどう実装するか不明なのでとりあえずコメントアウト
        private _rolled = false;

        get rolled(): bool {
            return this._rolled;
        }

        roll(): void {
            if (this.rolled) return;
            this._rolled = true;
            this.tl.scaleTo(1.5, 30).and().rotateBy(360, 30)
                   .scaleTo(0.5, 30).and().rotateBy(360, 30)
                   .scaleTo(1.0, 30).and().rotateBy(360, 30)
                   .then(function () { this._rolled = false; });

            this.addEventListener(enchant.Event.ENTER_FRAME, function () {
                if (!this.rolled) this.removeEventListener(enchant.Event.ENTER_FRAME, arguments.callee);
                this.frame = Math.floor(Math.random() * 6) + 1;
            });
        }
        */

        drawFace(top: number):enchant.Surface {
            var num = [];
            top == 1 ? num.push(64,80,96):
            top == 2 ? num.push(80,96,144):
            top == 3 ? num.push(96,144,128):
            top == 4 ? num.push(112,128,64):
            top == 5 ? num.push(128,64,112):
            top == 6 ? num.push(144,112,80):
                       num.push(0,0,0);
            var face = new enchant.Surface(Dice.WIDTH,Dice.HEIGHT);
            var c = face.context;
            //with(face.context) { //withはanyじゃないとダメ？
                c.moveTo(12,0);
                c.lineTo(24,12);
                c.lineTo(24,24);
                c.lineTo(12,34);
                c.lineTo(0,24);
                c.lineTo(0,12);
                c.closePath();
                c.fill();
            //};
            var rad = 45 * Math.PI / 180;
            // top
            face.context.setTransform(
                1,		// 横の比率 1が100%
                1,		// 縦軸の移動量
                -1,		// 横軸の移動量
                1,		// 縦の比率 1が100%
                12,		// ｘ軸の表示開始位置
                -5		// y軸の表示開始位置
            );
            face.draw(enchant.Game.instance.assets[Dice.IMAGE],
                      num[0],32,16,16,0, 0,16,16);
            // left
            face.context.setTransform(
                1,		// 横の比率 1が100%
                1,		// 縦軸の移動量
                0,		// 横軸の移動量
                1,		// 縦の比率 1が100%
                -2,		// ｘ軸の表示開始位置
                7		// y軸の表示開始位置
            );
            face.draw(enchant.Game.instance.assets[Dice.IMAGE],
                      num[1],32,16,16,0, 0,16,16);
            // right
            face.context.setTransform(
                1,		// 横の比率 1が100%
                -1,		// 縦軸の移動量
                0,		// 横軸の移動量
                1,		// 縦の比率 1が100%
                10,		// ｘ軸の表示開始位置
                23		// y軸の表示開始位置
            );
            face.draw(enchant.Game.instance.assets[Dice.IMAGE],
                      num[2],32,16,16,0, 0,16,16);
            return face;
        }
    }
}
