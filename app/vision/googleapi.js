"use strict";

var electron = require("electron").remote;

var dialog = electron.dialog;

var fs = require("fs");

var path = require("path");

var vision = require("electron").remote.require("@google-cloud/vision"); //const credentials = require("../config/ocrimagens-1b069cc4306d.json");


var credentialsTeste = {
  type: "service_account",
  project_id: "ocrimagens",
  private_key_id: "1b069cc4306d26a98113aec076d8f849f765c91f",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJqxfwOVpBq/7J\niirh7S7Z3KpsWDlHoYVWYC53QYw//hmMcq/SCAVnen+eVKl8qtCkWmGum+p2MghW\nTrL7j6vumqvIaMKPNBb5U4EmaWisHemr0lsW7pwcvy5w5CdJxdLxgyISXD5GiluJ\njnRDNNNDw/WMEn92QaxNLBr+CPM7LFKyE02cFLU4H01JwCpln+H2sIffB6LLfNHt\nEX+I8Nu5F/V1YlJT4HRl+Q7K2X5RAXbC31z+WUh1DqmAKA5SQORFjFu0sg3817af\nXyx4z6rC7zXFd0hPy1ZtBK75kd/2m3ehc//I7pKry4KmzKQe8k7bvitxd3bdbmAY\nUfDvQothAgMBAAECggEAFcWQG8nhTdo280SknQf5aSFKz9AVfP950Omo0oyjysvQ\nr8o444ykoreFnA8JTjF1vWyZg5uHDDQaFNFBvulTlzqhBY2TxZiKy2eBt6clGwHO\ntpNK7LadaXgVWDA1cqA2BgdRcBh/y6dHuxnDQPcswLHg6jqcAqUT6C/1CQxnz/En\nZ4NHooT0dLthLRdRUsaC7jnqXZctqxpnMBXVv+/2zmDdnqSbci7Sto2mCAQUfDV2\nNMG193ILnzylrR8GuIsdmoW89HxN13ZqLyXdi23TT9OtFxQuL+L/BEQkv0PosKWJ\n4q1DGyWwVxPu/XM0Rp6ziPGadea08L4wJos6H3NccQKBgQD/INKxmAOgjZ6Vc7H2\nkHiJAgUhiekSL7I2JvSEVVh/wD7QNzF2LKsNJ7vIxCWKWpKHI2nW7+lS9YrwNRiK\njtKj7ilVbuyU43o1N6neCEWaYXqjrCHXV2cXQJ2PRs76JLxTiaYmStkTAFpFFoWa\nf7fRFwdg44W0CXPS4pgCz4GyWQKBgQDKW4F2DwbZ3N2esw7m7raq9rgrOBvHTBaC\nP2C/ePegwGgKBjxKWGzUXWgQtuOyGZ9qIPorZ5Tahd0m46TPLJeFavCrroBOtfHU\niDUT7AH0ddzaAJyAyeP3H+oBHkyL54TBitBTrxm91vEdrEaTvvF4LpjV6mTBMU6G\nomVNacYwSQKBgQDClQYc7RPXICwTUGoq44UK+b9wFP7uH/KL2qojQ/R7euRtaasP\ntoG/Rs6yEOeQ3gNjjl7qz4/k9eFB0z0kcEm3Pa3IuxE1fUl3zTyBW026sR4YNvCY\njNDTqzSAUkEKB3qbPCC8k9l75Ij0qHi9nStVDXtTKjSPW6Y68Rd/DUSeAQKBgEXX\nHTB88TViKE8sp5kGjJ8m9dtcyyGW3jHn4+FRw82EeqPzEP3r1OvarR8PsDh45W9A\noHc4kcR17SUN7oTedBFFHnlyibAg1a0vsXoFu4r+3tGS4nEEvRw+tIncRjkHF+eg\nnFQ1m+HMfH1sRxOZFEgRdQhnlIylEuAezm3QcumZAoGBAKOPGqGHjy6YJHUjuepM\niu1SwZ16Eu/2umBt8XKujJOCg70TQ3nL0he19De5ZZCQvO/k+3lkvO2gxmkKZBdT\ntQZK5ay+C2IsfRs+GtgLQSwtIs1Utf3Yt3VGO+1SWKmnWWCaUNjXwfDsdGm35GDy\nBbxkgVNW0FFt1J/9jLylCvI2\n-----END PRIVATE KEY-----\n",
  client_email: "ocrimagens@ocrimagens.iam.gserviceaccount.com",
  client_id: "106159732867904979547",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/ocrimagens%40ocrimagens.iam.gserviceaccount.com"
};
var credentials = {
  type: "service_account",
  project_id: "agile-device-270422",
  private_key_id: "1a4bedfd9da4c53307e47456ff4acb35087391d2",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCq1BAI5BztIqKU\nMUcfZKW8v1DIXszpwDfDZVJXhUDJKUw1f+lAIZ5e3hSh0WDEaiw++JIPRSpMDLkV\n6DUIAU1V8nJRXhYHM/gOkStsVlbCNCgtajKcHG2j8rW+5LcqMinqcqLiXi4GBs5Y\nDG0Ig1qIQ8Z3E59Ud2wZf2nA3VaAkO1Le2cJiLKdPT9XB2atUE+twzDiTIVHp0wb\n8FV030QdVcVKvX8F0QjkLCYtqXlhh7IfiZzeB1rNtDc1EmNQ1CdH+hDhs9QFMGkd\newWFQ3AjPOkwIUppXqo004AWyG1fk+OgKuc2V4itHaPbFXdRUx8R8azNBwK797CV\ne+eP5X6xAgMBAAECggEAGscNEGe5hQ51z6b90BT1yeVvY0lA8682zoE2bBOuORop\nIQXA6VWbvqEvOMJaWc+Oyfwq4QvlenBQHvf8QBn8JmnPs6N87nod+yKUXPIXvW9x\nkNThxAjMwvNLu/WcJJgia+a2U6eRrU4p0DF6cegtK8j79jR0OEhUAJcxW5MWeSZ8\nbphe4cn3I6XLmZLNmp3uhpe06WuNPJGdnVcYJ4yBpnwHDAe54p4fgQhs/91H5FLW\nj5TcJqOCpglaoZ7SUct+zcX/pAXMhE+9xcIFlDlwZ0PoD20fKf5ZeyUlT1SvPoJW\naXZA4d4UedOQ1yYcVyIF8F06pWuvcuHFs1i87xiFpQKBgQDv0CM1bbFRzcPZHUu6\ndlQwDmDyfdJ3ZT7qSOcP2VE8gVL8dcbUcKsuXZOrKtIe2HO1FeVSFR/ha+CgUMSb\n6RAFf9bNPVF2PM1X+xq+LPDBHTC5TwOH1EOQiPqzZJfgXiiEWF7onWdyNoQ2i6RU\nyOlwpJMC1VNbtGqQ8SkcCh/bRwKBgQC2W+aZEkN058XFokLbjT5U40i9AZvamL+y\nN2Ujc53yzTw8btLIuhQh93Vq7kAlpAxEJePk023CW7icE2QIoTXs3t6TQpBBRZoc\nyMUey2bT/KUpMU2kGlBRIVPd2pWpHDGPeupc8LsZlKBjTLoWanNGDcxvVxxrCJ4H\nkQZPOi3iRwKBgD4QTtxn/CkgqJwLEes67oTVY8++MncF8+dsYKhgZL7U9WYzEPcw\nBY1lWG9HEMQ83o0yEnxQzURox+SVopx7D9Nsh2nsgaWpDLfFW+F1/gTsigybX12K\n2MWSPdeppAjENZYyzLVE713GsCbxsuDick/dt9JW5VDpe17xmuMP17jHAoGANi0L\nTwJ8A+kvek2Aa1WE5Rc47t3hfYnPuZR3eZbJn+6VLKcH/BY8EPNBcOkjKYuZEU3o\nbHzbqNgy+jtQhrfOG3cCzOEDlkClTlPfLAzlmaj/MEOze0NOBSxPjCN6PulfV+7+\nXWovS6Q6GgYbarlpUbCbwaAxkyLWQA03wKXaJ9UCgYAlCkVuusrl8t5kvb6AL2K2\n37OL9sXbtg04yzNnpmDNqQCmwFA94wmHaNOor5lZMw8Um7MWr5GSmcokH7TPKZmm\nhgbug2lrIxDPs0BL2RrwGrsWIhJdQSjkr25vzrz93RvH7AP0Iu1rvLROhaLT2pG6\n4queLaoHSFh8Rgn2i4snJw==\n-----END PRIVATE KEY-----\n",
  client_email: "botanalisedocumentos@agile-device-270422.iam.gserviceaccount.com",
  client_id: "117595042141934372467",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/botanalisedocumentos%40agile-device-270422.iam.gserviceaccount.com"
};

var GOOGLEAPI = function GOOGLEAPI() {};

GOOGLEAPI.prototype.imgToText = function (data, callback) {
  var client = new vision.ImageAnnotatorClient({
    credentials: credentials
  });
  var content = data.replace("data:image/jpeg;base64,", "");
  var request = {
    image: {
      content: content //data.indexOf("base64") > -1 ? data : fs.readFileSync(data)

    }
  };
  client.documentTextDetection(path.join(path.dirname(data), path.basename(data))).then(function (results) {
    var fullTextAnnotation = results[0].fullTextAnnotation;

    if (fullTextAnnotation) {
      callback(fullTextAnnotation);
    } else callback(null);
  })["catch"](function (err) {});
};

GOOGLEAPI.prototype.imgGetLabel = function (data, callback) {
  var client = new vision.ImageAnnotatorClient({
    credentials: credentials
  });
  var content = data.replace("data:image/jpeg;base64,", "");
  var request = {
    image: {
      content: content //data.indexOf("base64") > -1 ? data : fs.readFileSync(data)

    }
  };
  client.labelDetection(path.join(path.dirname(data), path.basename(data))).then(function (results) {})["catch"](function (err) {});
};

GOOGLEAPI.prototype.pdfToText = function (data, callback) {
  var client = new vision.ImageAnnotatorClient({
    credentials: credentials
  });
  var content = data.replace("data:image/jpeg;base64,", "");
  var request = {
    image: {
      content: content //data.indexOf("base64") > -1 ? data : fs.readFileSync(data)

    }
  };
  client.documentTextDetection(path.join(path.dirname(data), path.basename(data))).then(function (results) {
    var fullTextAnnotation = results[0].fullTextAnnotation;

    if (fullTextAnnotation) {
      //  console.log(`Full text: ${fullTextAnnotation.text}`);
      callback(fullTextAnnotation);
    } else callback(null);
  })["catch"](function (err) {});
};

module.exports = new GOOGLEAPI();