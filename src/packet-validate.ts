import { createPrivateKey, createPublicKey } from 'node:crypto';
import { dfu } from './protobuf/dfu';
import { endianSwap } from '../src/crypt';
import { validateSignature } from './cybercrypt';

export function packetValidate(
  initPacket: Uint8Array,
  privateKeyBuffer: Buffer,
) {
  const packet = dfu.Packet.decode(initPacket);
  if (!packet.signedCommand) {
    throw new Error('Packet does not contain a signedCommand');
  }
  const { command, signature } = packet.signedCommand;
  const data = dfu.Command.encode(command).finish();
  // strip 08011240: the presumed length indicator
  const dataRaw = data.subarray(4);
  const publicKey = createPublicKey(createPrivateKey(privateKeyBuffer));
  return validateSignature(dataRaw, endianSwap(signature), publicKey);
}
