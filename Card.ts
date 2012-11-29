// http://9leap.net/games/2243

/// <reference path="enchant.d.ts"/>

module exte {
    export class Card {
        static CARD = 'card.png';
        static ICON = 'icon0.png';
        static FONT = 'font1.png';
        static BACK = 'enchant_normal.png';
        static WIDTH     = 32;
        static HEIGHT    = 48;
        // 擬似定数宣言
        static SUIT_SIZE =  4; // スートの総数（スペード、ハート、ダイア、クラブ）
        static NUME_SIZE = 13; // 番号の総数（Ａ、２、３、４、５、６、７、８、９、１０、Ｊ，Ｑ，Ｋ）
        static CARD_SIZE = 52; // ジョーカーを覗いたカードの総数（スペードのＡからクラブのＫ）
        // スートの定義
        static SPADE   =  1; // スートの定義
        static HEART   =  2;
        static DIAMOND =  3;
        static CLUB    =  4;
        // トランプの数定義
        static ACE   =  1; // 数札の定義
        static JACK    = 11;
        static QUEEN   = 12;
        static KING    = 13;
        // 数札（pipcards/numeralcards）他の定義
        static ERROR   = -1; // カードの終端などのエラー値
        static JOKER   =  0; // ジョーカー
        static S01   =  1; // スペード
        static S02   =  2;
        static S03   =  3;
        static S04   =  4;
        static S05   =  5;
        static S06   =  6;
        static S07   =  7;
        static S08   =  8;
        static S09   =  9;
        static S10   = 10;
        static S11   = 11;
        static S12   = 12;
        static S13   = 13;
        static H01   = 14; // ハート
        static H02   = 15;
        static H03   = 16;
        static H04   = 17;
        static H05   = 18;
        static H06   = 19;
        static H07   = 20;
        static H08   = 21;
        static H09   = 22;
        static H10   = 23;
        static H11   = 24;
        static H12   = 25;
        static H13   = 26;
        static D01   = 27; // ダイア
        static D02   = 28;
        static D03   = 29;
        static D04   = 30;
        static D05   = 31;
        static D06   = 32;
        static D07   = 33;
        static D08   = 34;
        static D09   = 35;
        static D10   = 36;
        static D11   = 37;
        static D12   = 38;
        static D13   = 39;
        static C01   = 40; // クローバー
        static C02   = 41;
        static C03   = 42;
        static C04   = 43;
        static C05   = 44;
        static C06   = 45;
        static C07   = 46;
        static C08   = 47;
        static C09   = 48;
        static C10   = 49;
        static C11   = 50;
        static C12   = 51;
        static C13   = 52;
        // 絵札（courTCards）の定義
        static SA    = Card.S01;  // スペード
        static SJ    = Card.S11;
        static SQ    = Card.S12;
        static SK    = Card.S13;
        static HA    = Card.H01;  // ハート
        static HJ    = Card.H11;
        static HQ    = Card.H12;
        static HK    = Card.H13;
        static DA    = Card.D01;  // ダイア
        static DJ    = Card.D11;
        static DQ    = Card.D12;
        static DK    = Card.D13;
        static CA    = Card.C01;  // クローバー
        static CJ    = Card.C11;
        static CQ    = Card.C12;
        static CK    = Card.C13;
        /**
         * カードのスート取得
         * @param card  <int> カードの通し番号
         * @return          カードのスート
         */
        static getSuit(card: number): number {
          // 通し番号がジョーカーならジョーカーとして返す。
          if (card == Card.JOKER) return Card.JOKER;
          // 通し番号が範囲外であったときはエラーを返す。
          if (card <= Card.ERROR || Card.CARD_SIZE < card) return Card.ERROR;
          // マークを計算して返す。
          return Math.floor((card + Card.NUME_SIZE - 1) / Card.NUME_SIZE);
        }
        /**
         * カードの番号取得
         * @param card  <int> カードの通し番号
         * @return          カードの番号
         */
        static getNumber(card: number): number {
          // 通し番号がジョーカーならジョーカーとして返す。
          if (card == Card.JOKER) return Card.JOKER;
          // 通し番号が範囲外であったときはエラーを返す。
          if (card <= Card.ERROR || Card.CARD_SIZE < card) return Card.ERROR;
          // 番号を計算して返す。
          return (card - 1) % Card.NUME_SIZE + 1;
        }
        /**
         * カードの通し番号取得
         * @param suit  <int> カードのスート
         * @param no <int> カードの番号
         * @return          カードの番号
         */
        static getData(suit: number, no: number) {
          // スート、または番号がジョーカーのときはジョーカーを返す。
          if (suit == Card.JOKER || no == Card.JOKER) return Card.JOKER;
          // スート、または番号が範囲外であったときはエラーを返す。
          if (suit <= Card.ERROR || Card.SUIT_SIZE < suit ||
            no <= Card.ERROR || Card.NUME_SIZE < no) return Card.ERROR;
          // 通し番号を計算して返す。
          return (suit - 1) * Card.NUME_SIZE + no;
        }
        /**
　        * dataで指定したカード画像を取得
         * @param data <int> カードの通し番号
         * @return          カード画像
         */
        static getCard(data: number): TCardSprite {
            if (data <= Card.ERROR || Card.CARD_SIZE < data) return null;

            var image = new enchant.Surface(Card.WIDTH * 2, Card.HEIGHT);

            var assetName = enchant.Core.instance.assets[Card.CARD];
            // 表の描画
            var x = (Card.getNumber(data) - 1) * Card.WIDTH;
            var y = (Card.getSuit(data) - 1) * Card.HEIGHT;
            image.draw(assetName
                        , x, y, Card.WIDTH, Card.HEIGHT
                        , 0, 0, Card.WIDTH, Card.HEIGHT);
            // 裏の描画
            image.draw(assetName
                        , Card.WIDTH, Card.HEIGHT * 4, Card.WIDTH, Card.HEIGHT
                        , Card.WIDTH, 0, Card.WIDTH, Card.HEIGHT);

            var card = new TCardSprite(Card.WIDTH, Card.HEIGHT);
            card.image = image;
            card.data = data;
            return card;
        };
        /**
         * カード画像をassetsに登録する
         * Card.setImage();
         * var img = new Sprite(size,size);
         * img.image = game.assets[Card.CARD];
         */
        static setImage(): void {
            var cards = new enchant.Surface(Card.WIDTH * Card.NUME_SIZE, Card.HEIGHT * (Card.SUIT_SIZE + 1));

            // 通常カードの描画
            for (var card = Card.S01; card <= Card.CARD_SIZE; card++) {
                var x = (Card.getNumber(card) - 1) * Card.WIDTH;
                var y = (Card.getSuit(card) - 1) * Card.HEIGHT;
                cards.draw(Card.drawCard(card)
                          , 0, 0, Card.WIDTH, Card.HEIGHT
                          , x, y, Card.WIDTH, Card.HEIGHT);
            };
            // Jokerの描画
            cards.draw(Card.drawCard(Card.JOKER)
                       , 0, 0, Card.WIDTH, Card.HEIGHT
                       , 0, Card.SUIT_SIZE * Card.HEIGHT, Card.WIDTH, Card.HEIGHT);
            // 背表紙の描画
            cards.draw(Card.drawCard(Card.ERROR)
                       , 0, 0, Card.WIDTH, Card.HEIGHT
                       , Card.WIDTH, Card.SUIT_SIZE * Card.HEIGHT, Card.WIDTH, Card.HEIGHT);

            enchant.Core.instance.assets[Card.CARD] = cards;
        };
        static drawCard(card): enchant.Surface {
            var face = new enchant.Surface(Card.WIDTH,Card.HEIGHT);
            // 外枠描画
            var c = face.context;
            //with(face.context) {  //withはanyじゃないとダメ？
                c.fillStyle = 'white';
                c.strokeStyle = 'black';
                c.beginPath();
                c.moveTo(0,8);
                c.quadraticCurveTo(0, 0, 8, 0);
                c.lineTo(22,0);
                c.quadraticCurveTo(32, 0,32, 8);
                c.lineTo(32,40);
                c.quadraticCurveTo(32,48,22,48);
                c.lineTo(8,48);
                c.quadraticCurveTo( 0,48, 0,40);
                c.closePath();
                c.fill();
                c.stroke();
            //};
            switch (Card.getSuit(card)) {
                case Card.JOKER:
                    face.draw(enchant.Core.instance.assets[Card.ICON]
                               , 16 * 11, 0, 16, 16, 4, 12, 24, 24);
                    break;
                case Card.ERROR:
                    face.draw(enchant.Core.instance.assets[Card.BACK]
                                 , 0, 0, 48, 48, 0, 8, 32, 32);
                    break;
                default:
                    // スート描画
                    var sx = Card.getSuit(card) == Card.SPADE ? 48 :
                             Card.getSuit(card) == Card.HEART ? 96 :
                             Card.getSuit(card) == Card.DIAMOND ? 80 :
                             Card.getSuit(card) == Card.CLUB ? 64 : 0;
                    face.draw(enchant.Core.instance.assets[Card.ICON]
                                 , sx, 64, 16, 16, 8, 4, 16, 16);

                    // 数描画
                    var fontAssetName = enchant.Core.instance.assets[Card.FONT];
                    if (Card.getNumber(card) == 10) {
                        face.draw(fontAssetName
                                    , 16, 16, 16, 16, 1, 26, 16, 16);
                        face.draw(fontAssetName
                                    , 0, 16, 16, 16, 13, 26, 16, 16);
                    } else {
                        var nm = Card.getNumber(card) == Card.ACE ? [16, 32] :
                                 Card.getNumber(card) == 2 ? [32, 16] :
                                 Card.getNumber(card) == 3 ? [48, 16] :
                                 Card.getNumber(card) == 4 ? [64, 16] :
                                 Card.getNumber(card) == 5 ? [80, 16] :
                                 Card.getNumber(card) == 6 ? [96, 16] :
                                 Card.getNumber(card) == 7 ? [112, 16] :
                                 Card.getNumber(card) == 8 ? [128, 16] :
                                 Card.getNumber(card) == 9 ? [144, 16] :
                                 Card.getNumber(card) == Card.JACK ? [160, 32] :
                                 Card.getNumber(card) == Card.QUEEN ? [16, 48] :
                                 Card.getNumber(card) == Card.KING ? [176, 32] : [0, 0];
                        face.draw(fontAssetName
                                  , nm[0], nm[1], 16, 16, 10, 26, 16, 16);
                    }
                    break;
            }
            return face;
        }
    }

    export class TCardSprite extends enchant.Sprite {
        constructor (width: number, height: number) {
            super(width, height);
        }
        data: number;
    }
}
