"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
// This module allows you to 'wrap' your API for serverless use. No HTTP server, no ports or sockets. 
// https://github.com/dougmoscrop/serverless-http
var serverless = require('serverless-http');
// Connecting to Mongoo Atlas database
mongoose.connect('mongodb+srv://ander_frago:4Vientos@cluster0.wdu3m.mongodb.net/productsdb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var app = express();
var router = express.Router();
var contactSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    categories: {
        type: Array,
        required: true,
    },
    images: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
});
var Product = mongoose.model('products', contactSchema);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://dazzling-hypatia-8b2b7c.netlify.app"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/.netlify/functions/store-rest-server', router); // path must route to lambda
app.get('/products', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product.find({})];
            case 1:
                products = _a.sent();
                console.log("ask for products");
                try {
                    res.json(products);
                }
                catch (err) {
                    res.status(500).send(err);
                }
                return [2 /*return*/];
        }
    });
}); });
app.post('/products', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                product = new Product(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, product.save()];
            case 2:
                _a.sent();
                res.send(product);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(500).send(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.delete('/product/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Product.findByIdAndDelete(req.params.id)];
            case 1:
                product = _a.sent();
                if (!product)
                    res.status(404).send("No item found");
                res.status(200).send();
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(500).send(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.patch('/product/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Product.findByIdAndUpdate(req.params.id, req.body)];
            case 1:
                product = _a.sent();
                return [4 /*yield*/, Product.save()];
            case 2:
                _a.sent();
                res.send(product);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(500).send(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/*
const server = app.listen(8000, "localhost", () => {
  const { address, port } = server.address();

  console.log('Listening on %s %s', address, port);
});

*/
module.exports = app;
module.exports.handler = serverless(app);
