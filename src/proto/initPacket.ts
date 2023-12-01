import type { BinaryLike, KeyObject } from 'node:crypto';
import { join as pathJoin } from 'node:path';
import { Buffer } from 'node:buffer';
import { createSign } from 'crypto';
import { load } from 'protobufjs';

const protoFilePath = pathJoin(__dirname, '/dfu-cc.proto');

function signData(data: BinaryLike, privateKey: KeyObject) {
  // Create a Sign object with SHA256 as hashing algorithm
  const sign = createSign('SHA256').update(data).end();
  // Sign the data using the private key and specify the output format
  const signature = sign.sign({
    key: privateKey,
    dsaEncoding: 'ieee-p1363',
  });
  // Split the buffer into two 32-byte parts and reverse each part
  const r = Buffer.from(signature.subarray(0, 32));
  const s = Buffer.from(signature.subarray(32, 64));
  return Buffer.concat([r.reverse(), s.reverse()]);
}

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
