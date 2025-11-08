// Copyright (c) 2023, Circle Technologies, LLC. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Installed by `npm install node-forge`
const forge = require('node-forge');

// Paste your entity public key here.
const publicKeyString = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAnaxgC3jLHa/wk1I/nAn4
IdgThc+aTTblwyxupBxmoohDFyhsLyk7MYkacM1TYRp6o0o8TV6lh+OuLj0vldku
GMPnH1fXJ7OkTCa6SsGyObriytHO8LyjgAFwxO3rDDwi3CyoW+5KtyZZWSBORqB5
87EESO62fBRfyPzt00I+hNahUtEVkQSaMRz/2AcbYDTIQD1Zyx63N9u3uvH04/S3
5n9CcIC3VsL8Eez+aRgk7KUh7WvnwnQlTfRuX/tkhx45Xoj/g4Z2Aj1KL74/SNnu
yODJOD2sASV4adbh7JGXyQ8lDyQjOJMMfDgE3vVrdb0LdH/maqsTYDC80Vlw0wE0
Rn61PJNJE1rMI1sT7Yq2pBafPBvs3yZhZIQMq5/ejPGhE3WtRnIx1zopFD6hXrui
MVX8zOoixMLf5xnvPjQ1K0DbjfDcEu/dxmqiTxUpYqpxOGmE0USHfnCCOjpdlgqH
nmMSDWHCj+RR5Mc8iZXLcyj4GAhafapB5BNhCMGlaIyJ/uqjwHtDvJLVKS52Tz0O
s8iBFiv80dj9uTdhZ8iBXFgarp2WagNWVw8fE0ZRp2WO9QtZqQ5hse6zEePgqi0c
fyxnU2l0y+/EZv0Mf58xoYEPd248Zz8uo5vcDSo5orziTABVv0M2h2DZC1BqpDyY
M9hUvTCJHvpflacuW5btw0MCAwEAAQ==
-----END PUBLIC KEY-----`

// If you already have a hex encoded entity secret, you can paste it here. the length of the hex string should be 64.
const hexEncodedEntitySecret = "a0dbe239c7b9e84c7a5ac04e096c8625912755409f8dc060ce2402232221c345"

// The following sample codes generate a distinct entity secret ciphertext with each execution
function main() {
    const entitySecret = forge.util.hexToBytes(hexEncodedEntitySecret);
    if (entitySecret.length != 32) {
        console.log("invalid entity secret");
        return;
    }

    // encrypt data by the public key
    const publicKey = forge.pki.publicKeyFromPem(publicKeyString);
    const encryptedData = publicKey.encrypt(entitySecret, "RSA-OAEP", {
        md: forge.md.sha256.create(),
        mgf1: {
            md: forge.md.sha256.create()
        }
    });

    // encode to base64
    const base64EncryptedData = forge.util.encode64(encryptedData);

    console.log('Hex encoded entity secret: ', hexEncodedEntitySecret);
    console.log('Entity secret ciphertext: ', base64EncryptedData);
}

if (require.main === module) {
    main();
}