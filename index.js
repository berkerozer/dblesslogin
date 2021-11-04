"use strict";
exports.__esModule = true;
var sha256 = require("crypto-js/sha256");
var jwt = require("jsonwebtoken");
var dblessAuth = /** @class */ (function () {
    function dblessAuth(url, rule, privateKey, publicKey) {
        var _this = this;
        this.register = function (mail, password) {
            for (var nonce = 0; nonce < 1000000; nonce++) {
                var obj = {
                    url: _this.url,
                    mail: mail,
                    password: password,
                    nonce: nonce
                };
                var jsonsheet = JSON.stringify(obj);
                var crypted = sha256(jsonsheet).toString();
                if (_this.verifyToken(crypted)) {
                    return nonce;
                }
            }
        };
        this.verifyToken = function (crypted) {
            if (crypted[_this.rule[0].split(':')[0]] == _this.rule[0].split(':')[1] &&
                crypted[_this.rule[1].split(':')[0]] == _this.rule[1].split(':')[1] &&
                crypted[_this.rule[2].split(':')[0]] == _this.rule[2].split(':')[1]) {
                return true;
            }
            else {
                return false;
            }
        };
        this.login = function (mail, password, pin) {
            var obj = {
                url: _this.url,
                mail: mail,
                password: password,
                nonce: pin
            };
            var jsonsheet = JSON.stringify(obj);
            var crypted = sha256(jsonsheet).toString();
            if (_this.verifyToken(crypted)) {
                var token = jwt.sign(crypted, _this.privateKey, { algorithm: 'RS256' });
                return token;
            }
            else {
                return false;
            }
        };
        this.isAuth = function (token) {
            try {
                var decoded = jwt.verify(token, _this.publicKey);
                if (_this.verifyToken(decoded.toString())) {
                    return true;
                }
            }
            catch (error) {
                return false;
            }
        };
        this.url = url;
        this.rule = rule;
        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }
    return dblessAuth;
}());
exports["default"] = dblessAuth;
