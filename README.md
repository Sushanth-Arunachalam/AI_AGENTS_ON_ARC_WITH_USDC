# AI_AGENTS_ON_ARC_WITH_USDC
This repository is created for AI Agents on ARC with USDC
ARC × USDC Relief Portal
AI-Powered Disaster Relief Distribution Using Circle Developer Wallets
 Overview

ARC × USDC Relief Portal enables instant, transparent, and fraud-proof disaster aid distribution using AI agents, Circle Developer-Controlled Wallets, and zero-knowledge verification.

When a disaster strikes, relief organizations can:

Define an incident zone (geofence).

Allow victims to verify location and request financial aid privately.

Let AI agents review and approve payouts automatically.

Execute USDC transfers via Circle’s Wallet API with a single click.
Project Structure
ARC-USDC-RELIEF/
│
├── frontend/
│   ├── index.html                     # Main UI (single-file portal)
│   └── assets/                        # Optional images, icons, etc.
│
├── backend/
│   ├── createWallet.js                # Creates custodial wallets
│   ├── get_token_id.js                # Retrieves wallet token balances
│   ├── transfer_w3s.js                # Initiates USDC transfers
│   ├── List_Wallet_Token.js           # Lists tokens in each wallet
│   ├── Check_Transfer_Status.js       # Checks transaction status
│   ├── generate_entity_secret_ciphertext.js
│   ├── generateSecret.js
│   ├── custodial_demo.js
│   ├── package.json / tsconfig.json   # Node.js config
│   └── .env                           # API keys (not committed)
│
└── worker/
    ├── src/index.ts                   # Cloudflare Worker (proxy)
    └── wrangler.toml                  # Worker configuration

Features

✅ Geofenced Incident Zones – Admins define areas for eligibility
✅ Zero-Knowledge Verification – Victims prove presence without revealing coordinates
✅ AI-Assisted Review – Automated validation and fund approval
✅ USDC Transfers via Circle SDK – Secure, programmable payouts
✅ Cloudflare Worker Backend – Safely bridges frontend and Circle API

 Frontend (Demo Instructions)
1️ Open the portal

Launch frontend/index.html
 in any browser.

Or open the live site via GitHub Pages (if enabled).

2️ Choose demo mode

In Settings → Mode, select:

Local Mock (no backend, instant simulation)

Circle via Worker (real API calls through Cloudflare)

3️ Demo Flow

Create a new Incident Zone (enter name, lat/lng, radius).

Switch to Victim Portal → Verify location → Generate ZK Proof → Submit aid request.

In Review & Payout, click Approve & Pay.

View transaction confirmation (mock or live via Worker).

Backend (Circle Wallet Integration)

All wallet operations use Circle’s Developer-Controlled Wallets SDK.

Example:

import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";

const circle = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY,
  entitySecret: process.env.CIRCLE_ENTITY_SECRET,
});

const balance = await circle.getWalletTokenBalance({
  id: "225bfae4-0202-51c5-8b0a-352cd4c4fa20",
});
console.log(balance);


💡 The transfer_w3s.js file uses the same SDK to transfer USDC between wallets, returning a transaction hash that the frontend displays.
