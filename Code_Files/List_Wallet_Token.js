// list_wallet_tokens.js
const axios = require("axios");
require("dotenv").config();

const KEY   = (process.env.CIRCLE_API_KEY||"").trim();
const TOKEN = (process.env.CIRCLE_ENTITY_TOKEN||"").trim(); // or use CIRCLE_ENTITY_SECRET
const WALLET_ID = (process.env.FUNDING_WALLET_ID || "").trim(); // or set a specific wallet id here

if (!KEY || !TOKEN) throw new Error("Set CIRCLE_API_KEY and CIRCLE_ENTITY_TOKEN in .env");

const headers = {
  Authorization: `Bearer ${KEY}`,
  "X-User-Entity-Token": TOKEN,
  "X-Environment": "sandbox",
  "Content-Type": "application/json"
};

async function run() {
  const url = WALLET_ID
    ? `https://api.circle.com/v1/w3s/wallets/${WALLET_ID}`
    : `https://api.circle.com/v1/w3s/wallets`;
  const res = await axios.get(url, { headers });
  const payload = res.data?.data || res.data;

  // normalize to an array of wallets
  const wallets = Array.isArray(payload) ? payload : (payload?.wallets || payload?.items || [payload]);

  for (const w of wallets) {
    const id = w.id || w.walletId || w.wallet?.id;
    console.log("WALLET:", id);
    const tokens = w.tokens || w.assets || w.holdings || w.balances || [];
    for (const t of tokens) {
      // common fields to inspect
      console.log("  token id:", t.id || t.tokenId || t.assetId || "(no id)");
      console.log("  symbol  :", t.symbol || t.currency || t.tokenSymbol);
      console.log("  balance :", (t.balance||t.amount||t.value) ? JSON.stringify(t.balance||t.amount||t.value) : "n/a");
    }
    console.log("------");
  }
}

run().catch(e => { console.error("Error:", e.response?.data || e.message); process.exit(1); });
