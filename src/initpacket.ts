import type { KeyObject } from 'node:crypto';
import { Buffer } from 'node:buffer';
import { dfu } from './protobuf/dfu';
import { signDataLE } from './crypt';

type InitCommandParameters = NonNullable<
  Parameters<typeof dfu.InitCommand.create>[0]
>;

export type MakeInitPacketProps = Pick<
  InitCommandParameters,
  'appSize' | 'fwVersion' | 'hwVersion' | 'sdReq' | 'isDebug'
> & {
  privateKey: KeyObject;
  firmwareHash: NonNullable<InitCommandParameters['hash']>['hash'];
  verify?: boolean;
};

function handleVerify(errMsg: string | null) {
  if (errMsg) throw Error(errMsg);
}

export default function makeInitPacket({
  firmwareHash, // hash of the firmware
  appSize, // application size
  privateKey, // private key for signing
  fwVersion, // firmware version
  hwVersion, // required hardware version
  sdReq, // Allowed versions of the SoftDevice
  isDebug = false, // whether the firmware is a debug build
  verify = true,
}: MakeInitPacketProps) {
  // Create the hash message
  const hash = dfu.Hash.create({
    hashType: dfu.HashType.SHA256,
    hash: firmwareHash,
  });
  if (verify) handleVerify(dfu.Hash.verify(hash));

  // Create the boot validation message
  const bootValidation = dfu.BootValidation.create({
    type: dfu.ValidationType.VALIDATE_GENERATED_CRC,
    bytes: Buffer.alloc(0), // empty byte array
  });
  if (verify) handleVerify(dfu.BootValidation.verify(bootValidation));

  // Create the init command message
  const initCommandProperties: InitCommandParameters = {
    type: dfu.FwType.APPLICATION,
    fwVersion,
    hwVersion,
    sdReq,
    appSize,
    isDebug,
    hash,
    bootValidation: [bootValidation],
  };
  if (verify) handleVerify(dfu.InitCommand.verify(initCommandProperties));
  const initCommandMessage = dfu.InitCommand.create(initCommandProperties);

  // Create the command message
  const commandProperties: Parameters<typeof dfu.Command.create>[0] = {
    opCode: dfu.OpCode.INIT,
    init: initCommandMessage,
  };
  if (verify) handleVerify(dfu.Command.verify(commandProperties));
  const commandMessage = dfu.Command.create(commandProperties);

  // Sign
  const encodedCommandMessage = dfu.Command.encode(commandMessage).finish();
  // strip the first 4 bytes (the presumed length indicator)
  const commandMessageForSignature = encodedCommandMessage.subarray(4);
  const signature = signDataLE(commandMessageForSignature, privateKey);

  // Create the signed command message
  const signCommandProperties: Parameters<typeof dfu.SignedCommand.create>[0] =
    {
      command: commandMessage,
      signatureType: dfu.SignatureType.ECDSA_P256_SHA256,
      signature: signature,
    };
  if (verify) handleVerify(dfu.SignedCommand.verify(signCommandProperties));
  const signedCommandMessage = dfu.SignedCommand.create(signCommandProperties);

  // Create the packet message
  const packetProperties: Parameters<typeof dfu.Packet.create>[0] = {
    signedCommand: signedCommandMessage,
  };
  if (verify) handleVerify(dfu.Packet.verify(packetProperties));
  const packetMessage = dfu.Packet.create(packetProperties);

  // Encode the packet message to a buffer
  if (verify) handleVerify(dfu.Packet.verify(packetMessage));
  return dfu.Packet.encode(packetMessage).finish();
}
