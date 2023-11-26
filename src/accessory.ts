import type { Accessory } from './types';
import { createECDH } from 'node:crypto';

// https://github.com/seemoo-lab/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/Model/Accessory.swift

function makePrivateKey() {
  const curve = createECDH('secp224r1');
  curve.generateKeys();
  return curve.getPrivateKey();
}

export default function makeAccessory(): Accessory {
  return {
    id: 1,
    colorComponents: [0, 0, 0],
    name: 'TheLoveBoat',
    lastDerivationTimestamp: new Date(),
    symmetricKey: Buffer.alloc(0),
    updateInterval: 0,
    privateKey: makePrivateKey(),
    icon: '',
    isDeployed: false,
    colorSpaceName: '',
    usesDerivation: false,
    oldestRelevantSymmetricKey: Buffer.alloc(0),
    isActive: false,
  };
}
