import { Buffer } from 'node:buffer';
import { createECDH, createHash, sign } from 'node:crypto';

// P-224 elliptic curve used for the accessory
const curveName = 'secp224r1';

// Private key for the accessory where the public key is used for  Find My network
// https://github.com/seemoo-lab/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/Model/Accessory.swift#L70
export function makePrivateKey() {
  const exchange = createECDH(curveName);
  exchange.generateKeys();
  // Get the private key in DER (binary) format
  return exchange.getPrivateKey();
}

// https://github.com/seemoo-lab/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/Model/Accessory.swift#L154-L164
export function getAdvertisementKey(privateKey: Buffer) {
  const exchange = createECDH(curveName);
  exchange.setPrivateKey(privateKey);
  const publicKey = exchange.getPublicKey(null, 'compressed');
  return Buffer.from(publicKey.subarray(1));
}

// https://github.com/NordicSemiconductor/pc-nrfutil/blob/master/nordicsemi/dfu/package.py#L550-L566
export function hashFirmware(firmwarePatched: Buffer) {
  // Calculate SHA256 of the patched firmware
  const firmwareHash = createHash('sha256').update(firmwarePatched).digest();
  // Convert to little endian format
  return Buffer.from(firmwareHash.reverse());
}

// Swap signature from big-endian to little-endian or vice versa
export function endianSwap(signature: Uint8Array) {
  return Buffer.concat([
    Buffer.from(signature.subarray(0, 32)).reverse(),
    Buffer.from(signature.subarray(32, 64)).reverse(),
  ]);
}

// https://github.com/NordicSemiconductor/pc-nrfutil/blob/master/nordicsemi/dfu/signing.py#L90-L101
// https://github.com/SpaceInvaderTech/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/SpaceInvaderController.swift#L35-L40
// https://github.com/DiUS/nRF5-SDK-15.3.0-reduced/blob/master/components/libraries/bootloader/dfu/nrf_dfu_validation.c#L341-L417
export function signData(data: Uint8Array, privateKey: Buffer) {
  // ECDSA_P256_SHA256 signature in little-endian format
  return endianSwap(
    sign(null, data, {
      key: privateKey,
      dsaEncoding: 'ieee-p1363',
    }),
  );
}
