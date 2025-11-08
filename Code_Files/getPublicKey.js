const { initiateDeveloperControlledWalletsClient } = require('@circle-fin/developer-controlled-wallets');

async function getPublicKey() {
  const client = initiateDeveloperControlledWalletsClient({
    apiKey: 'TEST_API_KEY:a772975fb6c81cef04c5196969ab9be3:782189298497c27d81ef2c1c7ad3e7f7', // Replace with your actual API key
    entitySecret: 'a0dbe239c7b9e84c7a5ac04e096c8625912755409f8dc060ce2402232221c345', // Use a temporary entity secret here
  });

  try {
    const publicKeyResponse = await client.getPublicKey();
    console.log('Entity Public Key:', publicKeyResponse.data?.publicKey);
    return publicKeyResponse.data?.publicKey;
  } catch (error) {
    console.error('Error fetching public key:', error);
    throw error;
  }
}

getPublicKey();
