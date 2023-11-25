import type { Accessory } from './types';
import { generateKeyPairSync } from 'node:crypto';

// https://github.com/SpaceInvaderTech/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/Model/Accessory.swift

function makeKeyPair() {
  return generateKeyPairSync('ec', {
    namedCurve: 'prime256v1', // Ensure the curve matches what's used in Swift
    publicKeyEncoding: {
      type: 'spki',
      format: 'der',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });
}

export default function makeAccessory(): Accessory {
  const { publicKey, privateKey } = makeKeyPair();
  return {
    id: 1,
    colorComponents: [0, 0, 0],
    name: 'TheLoveBoat',
    lastDerivationTimestamp: new Date(),
    symmetricKey: Buffer.alloc(0),
    updateInterval: 0,
    publicKey,
    privateKey,
    icon: '',
    isDeployed: false,
    colorSpaceName: '',
    usesDerivation: false,
    oldestRelevantSymmetricKey: Buffer.alloc(0),
    isActive: false,
  };
}
