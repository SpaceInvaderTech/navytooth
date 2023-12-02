import { Buffer } from 'node:buffer';
import { dfu } from './protobuf/dfu';
import { signData } from './crypt';

export default function makeInitPacket(
  firmwareHash: Buffer,
  appSize: number,
  privateKey: Buffer,
) {
  const initCommandMessage = dfu.InitCommand.create({
    fwVersion: 1, // firmware version
    hwVersion: 52, // hardware version
    sdReq: [0x0103], // soft device requirements
    appSize, // application size
    hash: {
      hashType: 3, // SHA256
      hash: firmwareHash, // firmware hash
    },
    bootValidation: [
      {
        type: 1, // VALIDATE_GENERATED_CRC
        bytes: Buffer.alloc(0), // empty byte array
      },
    ],
  });

  // Create the command message
  const commandMessage = dfu.Command.create({
    opCode: 1, // INIT
    init: initCommandMessage,
  });

  // Sign
  const encodedCommandMessage = dfu.Command.encode(commandMessage).finish();
  const signature = signData(encodedCommandMessage, privateKey);

  // Create the signed command message
  const signedCommandMessage = dfu.SignedCommand.create({
    command: commandMessage,
    signatureType: 0, // ECDSA_P256_SHA256
    signature: signature,
  });

  // Create the packet message
  const packetMessage = dfu.Packet.create({
    signedCommand: signedCommandMessage,
  });

  // Validate
  const errMsg = dfu.Packet.verify(packetMessage);
  if (errMsg) throw Error(errMsg);

  // Encode the packet message to a buffer
  return Buffer.from(dfu.Packet.encode(packetMessage).finish());
}
