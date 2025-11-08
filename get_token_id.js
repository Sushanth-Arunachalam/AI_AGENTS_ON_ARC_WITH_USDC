// get_token_id.js
const { initiateDeveloperControlledWalletsClient } = require("@circle-fin/developer-controlled-wallets");

(async () => {
  try {
    const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
      apiKey: "TEST_API_KEY:a772975fb6c81cef04c5196969ab9be3:782189298497c27d81ef2c1c7ad3e7f7",
      entitySecret: "a0dbe239c7b9e84c7a5ac04e096c8625912755409f8dc060ce2402232221c345",
    });

    const response = await circleDeveloperSdk.getWalletTokenBalance({
      id: "225bfae4-0202-51c5-8b0a-352cd4c4fa20",
    });

    // ✅ print just the data (no circular refs)
    console.log(JSON.stringify(response.data, null, 2));

    // Example: print token IDs (USDC / MATIC)
    const balances = response?.data?.tokenBalances || [];
    for (const b of balances) {
      const t = b.token || {};
      console.log(`symbol=${t.symbol} amount=${b.amount} token_id=${t.id} chain=${t.blockchain}`);
    }
  } catch (err) {
    // If Circle returned an error body, show that; else show message
    console.error("Error fetching wallet balance:", err?.response?.data || err.message || err);
  }
})();
