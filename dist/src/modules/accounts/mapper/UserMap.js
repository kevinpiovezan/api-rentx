"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMap = void 0;
var class_transformer_1 = require("class-transformer");
var UserMap = /** @class */ (function () {
    function UserMap() {
    }
    UserMap.toDTO = function (_a) {
        var email = _a.email, name = _a.name, avatar = _a.avatar, driver_license = _a.driver_license, id = _a.id, avatar_url = _a.avatar_url;
        var user = (0, class_transformer_1.classToClass)({
            email: email,
            name: name,
            avatar: avatar,
            id: id,
            driver_license: driver_license,
            avatar_url: avatar_url,
        });
        return user;
    };
    return UserMap;
}());
exports.UserMap = UserMap;
