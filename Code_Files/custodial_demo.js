// transfer.js — Simple W3S wallet-to-wallet transfer
const axios = require("axios");
require("dotenv").config();

// Base URL for Web3 Services (W3S)
const API = "https://api.circle.com/v1/w3s";

// Read credentials and wallet IDs from .env
const KEY = process.env.CIRCLE_API_KEY?.trim();            // TEST_API_KEY:...:...
const SECRET = process.env.CIRCLE_ENTITY_SECRET?.trim();   // optional
const FROM = process.env.FUNDING_WALLET_ID?.trim();        // sender wallet ID
const TO = process.env.RECIPIENT_WALLET_ID?.trim();        // recipient wallet ID
const AMOUNT = process.env.AMOUNT?.trim() || "1.00";       // amount to transfer
const NETWORK = "ARC-TESTNET";                             // network of your wallets
const ASSET = "USDC";                                      // or tokenId if required

if (!KEY || !FROM || !TO) {
  console.error("Missing required env vars. Need CIRCLE_API_KEY, FUNDING_WALLET_ID, RECIPIENT_WALLET_ID");
  process.exit(1);
}

// HTTP headers
const headers = {
  authorization: `Bearer ${KEY}`,
  accept: "application/json",
  "Content-Type": "application/json",
  ...(SECRET ? { "X-Entity-Secret": SECRET } : {}),
};

// Axios helpers
async function post(path, body) {
  try {
    const { data } = await axios.post(`${API}${path}`, body, { headers });
    return { ok: true, data };
  } catch (e) {
    return { ok: false, status: e.response?.status, data: e.response?.data || e.message };
  }
}

(async () => {
  console.log(`💸 Sending ${AMOUNT} ${ASSET} from ${FROM} → ${TO}`);

  const body = {
    idempotencyKey: `w3s-${Date.now()}`,
    source: { type: "wallet", id: FROM },
    destination: { type: "wallet", id: TO },
    amount: AMOUNT,
    network: NETWORK,
    asset: ASSET, // if 400 error, replace with token/contract ID from docs
  };

  // Try both common W3S routes
  let r = await post("/transactions/transfer", body);
  if (!r.ok && r.status === 404) r = await post("/transfers", body);

  if (!r.ok) {
    console.error("❌ Transfer failed:", r.status, r.data);
    if (r.status === 400) console.error("➡️ Hint: endpoint may need a token/contract ID instead of 'USDC'");
    process.exit(1);
  }

  console.log("✅ Transfer success:");
  console.log(JSON.stringify(r.data, null, 2));
})();
