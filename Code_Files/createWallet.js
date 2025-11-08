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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var developer_controlled_wallets_1 = require("@circle-fin/developer-controlled-wallets");
function createDeveloperControlledWalletOnArcTestnet() {
    return __awaiter(this, void 0, void 0, function () {
        var client, publicKeyResponse, walletSetResponse, walletSetId, walletResponse, wallet, error_1;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 4, , 5]);
                    // Step 1: Generate an entity secret (uncomment this if you need to generate a new secret)
                    // This will print the secret to the console - save it securely
                    (0, developer_controlled_wallets_1.generateEntitySecret)();
                    client = (0, developer_controlled_wallets_1.initiateDeveloperControlledWalletsClient)({
                        apiKey: 'TEST_API_KEY:a772975fb6c81cef04c5196969ab9be3:782189298497c27d81ef2c1c7ad3e7f7', // Replace with your actual API key
                        entitySecret: 'a0dbe239c7b9e84c7a5ac04e096c8625912755409f8dc060ce2402232221c345', // Replace with your actual entity secret
                    });
                    return [4 /*yield*/, client.getPublicKey()];
                case 1:
                    publicKeyResponse = _d.sent();
                    console.log('Entity Public Key:', (_a = publicKeyResponse.data) === null || _a === void 0 ? void 0 : _a.publicKey);
                    return [4 /*yield*/, client.createWalletSet({
                            name: 'Arc Testnet Wallet Set',
                        })];
                case 2:
                    walletSetResponse = _d.sent();
                    if (!((_b = walletSetResponse.data) === null || _b === void 0 ? void 0 : _b.walletSet)) {
                        throw new Error('Failed to create wallet set');
                    }
                    walletSetId = walletSetResponse.data.walletSet.id;
                    console.log('Created Wallet Set:', walletSetResponse.data.walletSet);
                    return [4 /*yield*/, client.createWallets({
                            blockchains: ['ARC-TESTNET'],
                            count: 1,
                            walletSetId: walletSetId,
                            metadata: [
                                {
                                    name: 'My Arc Testnet Wallet - Receiver Wallet',
                                    refId: 'arc-testnet-wallet-001'
                                }
                            ]
                        })];
                case 3:
                    walletResponse = _d.sent();
                    if (!((_c = walletResponse.data) === null || _c === void 0 ? void 0 : _c.wallets) || walletResponse.data.wallets.length === 0) {
                        throw new Error('Failed to create wallet');
                    }
                    wallet = walletResponse.data.wallets[0];
                    console.log('Created Wallet:', wallet);
                    return [2 /*return*/, {
                            walletSet: walletSetResponse.data.walletSet,
                            wallet: wallet
                        }];
                case 4:
                    error_1 = _d.sent();
                    console.error('Error creating developer-controlled wallet:', error_1);
                    throw error_1;
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Execute the function
createDeveloperControlledWalletOnArcTestnet()
    .then(function (result) {
    console.log('Successfully created developer-controlled wallet on Arc testnet');
    if (result && result.wallet && result.wallet.address) {
        console.log('Wallet Address:', result.wallet.address);
    }
    else {
        console.log('Wallet Address: Not available');
    }
})
    .catch(function (error) {
    console.error('Failed to create developer-controlled wallet:', error);
});
