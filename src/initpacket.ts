import { Buffer } from 'node:buffer';
import { dfu } from './protobuf/dfu';
import { signData } from './crypt';

function handleVerify(errMsg: string | null) {
  if (errMsg) throw Error(errMsg);
}

export default function makeInitPacket(
  firmwareHash: Buffer,
  appSize: number,
  privateKey: Buffer,
) {
  const initCommandProperties: Parameters<typeof dfu.InitCommand.create>[0] = {
    fwVersion: dfu.FwType.SOFTDEVICE,
    hwVersion: 52, // hardware version
    sdReq: [0x0103], // soft device requirements
    appSize, // application size
    hash: {
      hashType: dfu.HashType.SHA256,
      hash: firmwareHash, // firmware hash
    },
    bootValidation: [
      {
        type: dfu.ValidationType.VALIDATE_GENERATED_CRC,
        bytes: Buffer.alloc(0), // empty byte array
      },
    ],
  };
  handleVerify(dfu.InitCommand.verify(initCommandProperties));
  const initCommandMessage = dfu.InitCommand.create(initCommandProperties);

  // Create the command message
  const commandProperties: Parameters<typeof dfu.Command.create>[0] = {
    opCode: dfu.OpCode.INIT,
    init: initCommandMessage,
  };
  handleVerify(dfu.Command.verify(commandProperties));
  const commandMessage = dfu.Command.create(commandProperties);

  // Sign
  const encodedCommandMessage = dfu.Command.encode(commandMessage).finish();
  const signature = signData(encodedCommandMessage, privateKey);

  // Create the signed command message
  const signCommandProperties: Parameters<typeof dfu.SignedCommand.create>[0] =
    {
      command: commandMessage,
      signatureType: dfu.SignatureType.ECDSA_P256_SHA256,
      signature: signature,
    };
  handleVerify(dfu.SignedCommand.verify(signCommandProperties));
  const signedCommandMessage = dfu.SignedCommand.create(signCommandProperties);

  // Create the packet message
  const packetProperties: Parameters<typeof dfu.Packet.create>[0] = {
    signedCommand: signedCommandMessage,
  };
  handleVerify(dfu.Packet.verify(packetProperties));
  const packetMessage = dfu.Packet.create(packetProperties);

  // Encode the packet message to a buffer
  return dfu.Packet.encode(packetMessage).finish();
}
