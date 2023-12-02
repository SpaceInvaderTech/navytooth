import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace dfu. */
export namespace dfu {

    /** OpCode enum. */
    enum OpCode {
        RESET = 0,
        INIT = 1
    }

    /** FwType enum. */
    enum FwType {
        APPLICATION = 0,
        SOFTDEVICE = 1,
        BOOTLOADER = 2,
        SOFTDEVICE_BOOTLOADER = 3,
        EXTERNAL_APPLICATION = 4
    }

    /** HashType enum. */
    enum HashType {
        NO_HASH = 0,
        CRC = 1,
        SHA128 = 2,
        SHA256 = 3,
        SHA512 = 4
    }

    /** ValidationType enum. */
    enum ValidationType {
        NO_VALIDATION = 0,
        VALIDATE_GENERATED_CRC = 1,
        VALIDATE_SHA256 = 2,
        VALIDATE_ECDSA_P256_SHA256 = 3
    }

    /** Properties of a Hash. */
    interface IHash {

        /** Hash hashType */
        hashType: dfu.HashType;

        /** Hash hash */
        hash: Uint8Array;
    }

    /** Represents a Hash. */
    class Hash implements IHash {

        /**
         * Constructs a new Hash.
         * @param [properties] Properties to set
         */
        constructor(properties?: dfu.IHash);

        /** Hash hashType. */
        public hashType: dfu.HashType;

        /** Hash hash. */
        public hash: Uint8Array;

        /**
         * Creates a new Hash instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Hash instance
         */
        public static create(properties?: dfu.IHash): dfu.Hash;

        /**
         * Encodes the specified Hash message. Does not implicitly {@link dfu.Hash.verify|verify} messages.
         * @param message Hash message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dfu.IHash, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Hash message, length delimited. Does not implicitly {@link dfu.Hash.verify|verify} messages.
         * @param message Hash message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dfu.IHash, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Hash message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Hash
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dfu.Hash;

        /**
         * Decodes a Hash message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Hash
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dfu.Hash;

        /**
         * Verifies a Hash message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Hash message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Hash
         */
        public static fromObject(object: { [k: string]: any }): dfu.Hash;

        /**
         * Creates a plain object from a Hash message. Also converts values to other types if specified.
         * @param message Hash
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dfu.Hash, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Hash to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Hash
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BootValidation. */
    interface IBootValidation {

        /** BootValidation type */
        type: dfu.ValidationType;

        /** BootValidation bytes */
        bytes: Uint8Array;
    }

    /** Represents a BootValidation. */
    class BootValidation implements IBootValidation {

        /**
         * Constructs a new BootValidation.
         * @param [properties] Properties to set
         */
        constructor(properties?: dfu.IBootValidation);

        /** BootValidation type. */
        public type: dfu.ValidationType;

        /** BootValidation bytes. */
        public bytes: Uint8Array;

        /**
         * Creates a new BootValidation instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BootValidation instance
         */
        public static create(properties?: dfu.IBootValidation): dfu.BootValidation;

        /**
         * Encodes the specified BootValidation message. Does not implicitly {@link dfu.BootValidation.verify|verify} messages.
         * @param message BootValidation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dfu.IBootValidation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BootValidation message, length delimited. Does not implicitly {@link dfu.BootValidation.verify|verify} messages.
         * @param message BootValidation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dfu.IBootValidation, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BootValidation message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BootValidation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dfu.BootValidation;

        /**
         * Decodes a BootValidation message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BootValidation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dfu.BootValidation;

        /**
         * Verifies a BootValidation message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BootValidation message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BootValidation
         */
        public static fromObject(object: { [k: string]: any }): dfu.BootValidation;

        /**
         * Creates a plain object from a BootValidation message. Also converts values to other types if specified.
         * @param message BootValidation
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dfu.BootValidation, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BootValidation to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BootValidation
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an InitCommand. */
    interface IInitCommand {

        /** InitCommand fwVersion */
        fwVersion?: (number|null);

        /** InitCommand hwVersion */
        hwVersion?: (number|null);

        /** InitCommand sdReq */
        sdReq?: (number[]|null);

        /** InitCommand type */
        type?: (dfu.FwType|null);

        /** InitCommand sdSize */
        sdSize?: (number|null);

        /** InitCommand blSize */
        blSize?: (number|null);

        /** InitCommand appSize */
        appSize?: (number|null);

        /** InitCommand hash */
        hash?: (dfu.IHash|null);

        /** InitCommand isDebug */
        isDebug?: (boolean|null);

        /** InitCommand bootValidation */
        bootValidation?: (dfu.IBootValidation[]|null);
    }

    /** Represents an InitCommand. */
    class InitCommand implements IInitCommand {

        /**
         * Constructs a new InitCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: dfu.IInitCommand);

        /** InitCommand fwVersion. */
        public fwVersion: number;

        /** InitCommand hwVersion. */
        public hwVersion: number;

        /** InitCommand sdReq. */
        public sdReq: number[];

        /** InitCommand type. */
        public type: dfu.FwType;

        /** InitCommand sdSize. */
        public sdSize: number;

        /** InitCommand blSize. */
        public blSize: number;

        /** InitCommand appSize. */
        public appSize: number;

        /** InitCommand hash. */
        public hash?: (dfu.IHash|null);

        /** InitCommand isDebug. */
        public isDebug: boolean;

        /** InitCommand bootValidation. */
        public bootValidation: dfu.IBootValidation[];

        /**
         * Creates a new InitCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InitCommand instance
         */
        public static create(properties?: dfu.IInitCommand): dfu.InitCommand;

        /**
         * Encodes the specified InitCommand message. Does not implicitly {@link dfu.InitCommand.verify|verify} messages.
         * @param message InitCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dfu.IInitCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InitCommand message, length delimited. Does not implicitly {@link dfu.InitCommand.verify|verify} messages.
         * @param message InitCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dfu.IInitCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InitCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InitCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dfu.InitCommand;

        /**
         * Decodes an InitCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InitCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dfu.InitCommand;

        /**
         * Verifies an InitCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InitCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InitCommand
         */
        public static fromObject(object: { [k: string]: any }): dfu.InitCommand;

        /**
         * Creates a plain object from an InitCommand message. Also converts values to other types if specified.
         * @param message InitCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dfu.InitCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InitCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for InitCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResetCommand. */
    interface IResetCommand {

        /** ResetCommand timeout */
        timeout: number;
    }

    /** Represents a ResetCommand. */
    class ResetCommand implements IResetCommand {

        /**
         * Constructs a new ResetCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: dfu.IResetCommand);

        /** ResetCommand timeout. */
        public timeout: number;

        /**
         * Creates a new ResetCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResetCommand instance
         */
        public static create(properties?: dfu.IResetCommand): dfu.ResetCommand;

        /**
         * Encodes the specified ResetCommand message. Does not implicitly {@link dfu.ResetCommand.verify|verify} messages.
         * @param message ResetCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dfu.IResetCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResetCommand message, length delimited. Does not implicitly {@link dfu.ResetCommand.verify|verify} messages.
         * @param message ResetCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dfu.IResetCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResetCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResetCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dfu.ResetCommand;

        /**
         * Decodes a ResetCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResetCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dfu.ResetCommand;

        /**
         * Verifies a ResetCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResetCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResetCommand
         */
        public static fromObject(object: { [k: string]: any }): dfu.ResetCommand;

        /**
         * Creates a plain object from a ResetCommand message. Also converts values to other types if specified.
         * @param message ResetCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dfu.ResetCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResetCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResetCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Command. */
    interface ICommand {

        /** Command opCode */
        opCode?: (dfu.OpCode|null);

        /** Command init */
        init?: (dfu.IInitCommand|null);

        /** Command reset */
        reset?: (dfu.IResetCommand|null);
    }

    /** Represents a Command. */
    class Command implements ICommand {

        /**
         * Constructs a new Command.
         * @param [properties] Properties to set
         */
        constructor(properties?: dfu.ICommand);

        /** Command opCode. */
        public opCode: dfu.OpCode;

        /** Command init. */
        public init?: (dfu.IInitCommand|null);

        /** Command reset. */
        public reset?: (dfu.IResetCommand|null);

        /**
         * Creates a new Command instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Command instance
         */
        public static create(properties?: dfu.ICommand): dfu.Command;

        /**
         * Encodes the specified Command message. Does not implicitly {@link dfu.Command.verify|verify} messages.
         * @param message Command message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dfu.ICommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Command message, length delimited. Does not implicitly {@link dfu.Command.verify|verify} messages.
         * @param message Command message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dfu.ICommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Command message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Command
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dfu.Command;

        /**
         * Decodes a Command message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Command
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dfu.Command;

        /**
         * Verifies a Command message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Command message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Command
         */
        public static fromObject(object: { [k: string]: any }): dfu.Command;

        /**
         * Creates a plain object from a Command message. Also converts values to other types if specified.
         * @param message Command
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dfu.Command, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Command to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Command
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** SignatureType enum. */
    enum SignatureType {
        ECDSA_P256_SHA256 = 0,
        ED25519 = 1
    }

    /** Properties of a SignedCommand. */
    interface ISignedCommand {

        /** SignedCommand command */
        command: dfu.ICommand;

        /** SignedCommand signatureType */
        signatureType: dfu.SignatureType;

        /** SignedCommand signature */
        signature: Uint8Array;
    }

    /** Represents a SignedCommand. */
    class SignedCommand implements ISignedCommand {

        /**
         * Constructs a new SignedCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: dfu.ISignedCommand);

        /** SignedCommand command. */
        public command: dfu.ICommand;

        /** SignedCommand signatureType. */
        public signatureType: dfu.SignatureType;

        /** SignedCommand signature. */
        public signature: Uint8Array;

        /**
         * Creates a new SignedCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SignedCommand instance
         */
        public static create(properties?: dfu.ISignedCommand): dfu.SignedCommand;

        /**
         * Encodes the specified SignedCommand message. Does not implicitly {@link dfu.SignedCommand.verify|verify} messages.
         * @param message SignedCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dfu.ISignedCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SignedCommand message, length delimited. Does not implicitly {@link dfu.SignedCommand.verify|verify} messages.
         * @param message SignedCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dfu.ISignedCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SignedCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SignedCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dfu.SignedCommand;

        /**
         * Decodes a SignedCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SignedCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dfu.SignedCommand;

        /**
         * Verifies a SignedCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SignedCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SignedCommand
         */
        public static fromObject(object: { [k: string]: any }): dfu.SignedCommand;

        /**
         * Creates a plain object from a SignedCommand message. Also converts values to other types if specified.
         * @param message SignedCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dfu.SignedCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SignedCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SignedCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Packet. */
    interface IPacket {

        /** Packet command */
        command?: (dfu.ICommand|null);

        /** Packet signedCommand */
        signedCommand?: (dfu.ISignedCommand|null);
    }

    /** Represents a Packet. */
    class Packet implements IPacket {

        /**
         * Constructs a new Packet.
         * @param [properties] Properties to set
         */
        constructor(properties?: dfu.IPacket);

        /** Packet command. */
        public command?: (dfu.ICommand|null);

        /** Packet signedCommand. */
        public signedCommand?: (dfu.ISignedCommand|null);

        /**
         * Creates a new Packet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Packet instance
         */
        public static create(properties?: dfu.IPacket): dfu.Packet;

        /**
         * Encodes the specified Packet message. Does not implicitly {@link dfu.Packet.verify|verify} messages.
         * @param message Packet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dfu.IPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Packet message, length delimited. Does not implicitly {@link dfu.Packet.verify|verify} messages.
         * @param message Packet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dfu.IPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Packet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dfu.Packet;

        /**
         * Decodes a Packet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dfu.Packet;

        /**
         * Verifies a Packet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Packet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Packet
         */
        public static fromObject(object: { [k: string]: any }): dfu.Packet;

        /**
         * Creates a plain object from a Packet message. Also converts values to other types if specified.
         * @param message Packet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dfu.Packet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Packet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Packet
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
