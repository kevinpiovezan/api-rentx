"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var EtherealMailProvider_1 = require("./implementations/EtherealMailProvider");
var SESMailProvider_1 = require("./implementations/SESMailProvider");
var mailProvider = {
    ethereal: EtherealMailProvider_1.EtherealMailProvider,
    ses: SESMailProvider_1.SESMailProvider,
};
tsyringe_1.container.registerSingleton('MailProvider', mailProvider[process.env.MAIL_PROVIDER]);
