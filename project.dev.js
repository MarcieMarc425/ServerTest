require = function () {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c) return c(i, !0);
                    if (u) return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND", a;
                }
                var p = n[i] = {
                    exports: {}
                };
                e[i][0].call(p.exports, function (r) {
                    var n = e[i][1][r];
                    return o(n || r);
                }, p, p.exports, r, e, n, t);
            }
            return n[i].exports;
        }
        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
        return o;
    }
    return r;
}()({
    main: [function (require, module, exports) {
        "use strict";
        cc._RF.push(module, "038eae8MfRKv7fRwjlCyX38", "main");
        "use strict";
        cc.Class({
            extends: cc.Component,
            properties: {
                uncookedCounter: {
                    default: null,
                    type: cc.Label
                },
                connectionDisplay: {
                    default: null,
                    type: cc.Label
                },
                player1Count: {
                    default: null,
                    type: cc.Label
                },
                player2Count: {
                    default: null,
                    type: cc.Label
                },
                player1Money: {
                    default: null,
                    type: cc.Label
                },
                plusBtn: {
                    default: null,
                    type: cc.Button
                },
                minusBtn: {
                    default: null,
                    type: cc.Button
                },
                cookBtn: {
                    default: null,
                    type: cc.Button
                },
                buyBtn: {
                    default: null,
                    type: cc.Button
                }
            },
            onLoad: function onLoad() {
                var _this = this;
                initPlayerData((player) => {
                    var playerData = player;
                    _this.uncooked = 0;
                    _this.cookedChicken = playerData.chickenCount;
                    _this.money = playerData.moneyCount;
                    _this.uncookedCounter.string = _this.uncooked;
                    _this.player1Count.string = '你煮熟的鸡扒: ' + _this.cookedChicken;
                    _this.player1Money.string = '你的钱: ' + _this.money;    
                });
            },
            start: function start() {},
            plusBtnOnClicked: function plusBtnOnClicked() {
                this.uncooked++;
            },
            minusBtnOnClicked: function minusBtnOnClicked() {
                if (this.uncooked - 1 < 0) return;
                this.uncooked--;
            },
            cookBtnOnClicked: function cookBtnOnClicked() {
                sendChicken(this.uncooked);
                this.uncooked = 0;
            },
            buyBtnOnClicked: function buyBtnOnClicked() {},
            update: function update(dt) {
                this.uncookedCounter.string = this.uncooked;
                this.player1Money.string = '你的钱: ' + this.money;
                this.player1Count.string = '你煮熟的鸡扒: ' + this.cookedChicken;
            }
        });
        cc._RF.pop();
    }, {}]
}, {}, ["main"]);