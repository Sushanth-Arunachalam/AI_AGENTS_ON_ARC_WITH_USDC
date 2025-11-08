// transfer_tx.js
const { initiateDeveloperControlledWalletsClient } = require("@circle-fin/developer-controlled-wallets");

(async () => {
  try {
    const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
      apiKey: "TEST_API_KEY:a772975fb6c81cef04c5196969ab9be3:782189298497c27d81ef2c1c7ad3e7f7",
      entitySecret: "a0dbe239c7b9e84c7a5ac04e096c8625912755409f8dc060ce2402232221c345",
    });

    const response = await circleDeveloperSdk.createTransaction({
      walletId: "225bfae4-0202-51c5-8b0a-352cd4c4fa20",
      tokenId: "15dc2b5d-0994-58b0-bf8c-3a0501148ee8",
      destinationAddress: "0xdb24454b8f952da4ead583189fe13bc98ed618aa",
      amounts: ["1.00"],
      fee: {
        type: "level",
        config: { feeLevel: "MEDIUM" },
      },
    });

    console.log("✅ Transaction created:");
    console.log(JSON.stringify(response.data, null, 2));
  } catch (err) {
    console.error("❌ Transaction failed:", err?.response?.data || err.message || err);
  }
})();
