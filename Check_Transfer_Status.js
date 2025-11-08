const { initiateDeveloperControlledWalletsClient } = require("@circle-fin/developer-controlled-wallets");

(async () => {
  const circle = initiateDeveloperControlledWalletsClient({
    apiKey: "TEST_API_KEY:a772975fb6c81cef04c5196969ab9be3:782189298497c27d81ef2c1c7ad3e7f7",
    entitySecret: "a0dbe239c7b9e84c7a5ac04e096c8625912755409f8dc060ce2402232221c345",
  });

  const transferId = "1d27c57d-763b-5628-82a7-8ec2e0dcc654"; // from your successful response

  const res = await circle.getTransaction({ id: transferId });
  console.log("Status:", res.data.status);
  console.log("Transaction hash:", res.data.transactionHash);
})();
