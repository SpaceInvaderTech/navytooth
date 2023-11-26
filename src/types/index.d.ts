export type Accessory = {
  id: number;
  colorComponents: number[];
  name: string;
  lastDerivationTimestamp: Date;
  symmetricKey: Buffer;
  updateInterval: number;
  privateKey: Buffer;
  icon: string;
  isDeployed: boolean;
  colorSpaceName: string;
  usesDerivation: boolean;
  oldestRelevantSymmetricKey: Buffer;
  isActive: boolean;
};
