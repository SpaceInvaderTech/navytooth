import type { KeyObject } from 'node:crypto';
import { join as pathJoin } from 'node:path';
import { Buffer } from 'node:buffer';
import { load } from 'protobufjs';
import { signData } from '../crypt';

const protoFilePath = pathJoin(__dirname, '/dfu-cc.proto');

export default async function makeInitPacket(
  firmwareHash: Buffer,
  appSize: number,
  privateKey: KeyObject,
) {
  const root = await load(protoFilePath);

  // Obtain the message types
  const InitCommand = root.lookupType('dfu.InitCommand');
  const Command = root.lookupType('dfu.Command');
  const SignedCommand = root.lookupType('dfu.SignedCommand');
  const Packet = root.lookupType('dfu.Packet');

  const initCommandMessage = InitCommand.create({
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
  const commandMessage = Command.create({
    opCode: 1, // INIT
    init: initCommandMessage,
  });

  // Sign
  const encodedCommandMessage = Command.encode(commandMessage).finish();
  const signature = signData(encodedCommandMessage, privateKey);

  // Create the signed command message
  const signedCommandMessage = SignedCommand.create({
    command: commandMessage,
    signatureType: 0, // ECDSA_P256_SHA256
    signature: signature,
  });

  // Create the packet message
  const packetMessage = Packet.create({ signedCommand: signedCommandMessage });

  // Validate
  const errMsg = Packet.verify(packetMessage);
  if (errMsg) throw Error(errMsg);

  // Encode the packet message to a buffer
  return Buffer.from(Packet.encode(packetMessage).finish());
}
