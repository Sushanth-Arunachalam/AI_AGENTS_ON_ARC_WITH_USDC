// List_All_Transfers_Wallet.js
const { initiateDeveloperControlledWalletsClient } = require("@circle-fin/developer-controlled-wallets");

(async () => {
  try {
    const circle = initiateDeveloperControlledWalletsClient({
      apiKey: "TEST_API_KEY:a772975fb6c81cef04c5196969ab9be3:782189298497c27d81ef2c1c7ad3e7f7",
      entitySecret: "a0dbe239c7b9e84c7a5ac04e096c8625912755409f8dc060ce2402232221c345",
    });

    const res = await circle.listTransactions({
      walletId: "225bfae4-0202-51c5-8b0a-352cd4c4fa20",
    });

    console.log("✅ Transfers for wallet:");
    console.log(JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error("❌ Failed to list transfers:", err?.response?.data || err.message || err);
  }
})();
