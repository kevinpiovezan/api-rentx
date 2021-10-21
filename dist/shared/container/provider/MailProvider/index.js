"use strict";

var _tsyringe = require("tsyringe");

var _EtherealMailProvider = require("./implementations/EtherealMailProvider");

var _SESMailProvider = require("./implementations/SESMailProvider");

const mailProvider = {
  ethereal: _EtherealMailProvider.EtherealMailProvider,
  ses: _SESMailProvider.SESMailProvider
};

_tsyringe.container.registerSingleton('MailProvider', mailProvider[process.env.MAIL_PROVIDER]);