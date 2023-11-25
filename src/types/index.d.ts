export type Accessory = {
  id: number;
  colorComponents: number[];
  name: string;
  lastDerivationTimestamp: Date;
  symmetricKey: Buffer;
  updateInterval: number;
  publicKey: KeyObject;
  privateKey: KeyObject;
  icon: string;
  isDeployed: boolean;
  colorSpaceName: string;
  usesDerivation: boolean;
  oldestRelevantSymmetricKey: Buffer;
  isActive: boolean;
};
