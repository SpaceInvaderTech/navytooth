/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const dfu = $root.dfu = (() => {

    /**
     * Namespace dfu.
     * @exports dfu
     * @namespace
     */
    const dfu = {};

    /**
     * OpCode enum.
     * @name dfu.OpCode
     * @enum {number}
     * @property {number} RESET=0 RESET value
     * @property {number} INIT=1 INIT value
     */
    dfu.OpCode = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "RESET"] = 0;
        values[valuesById[1] = "INIT"] = 1;
        return values;
    })();

    /**
     * FwType enum.
     * @name dfu.FwType
     * @enum {number}
     * @property {number} APPLICATION=0 APPLICATION value
     * @property {number} SOFTDEVICE=1 SOFTDEVICE value
     * @property {number} BOOTLOADER=2 BOOTLOADER value
     * @property {number} SOFTDEVICE_BOOTLOADER=3 SOFTDEVICE_BOOTLOADER value
     * @property {number} EXTERNAL_APPLICATION=4 EXTERNAL_APPLICATION value
     */
    dfu.FwType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "APPLICATION"] = 0;
        values[valuesById[1] = "SOFTDEVICE"] = 1;
        values[valuesById[2] = "BOOTLOADER"] = 2;
        values[valuesById[3] = "SOFTDEVICE_BOOTLOADER"] = 3;
        values[valuesById[4] = "EXTERNAL_APPLICATION"] = 4;
        return values;
    })();

    /**
     * HashType enum.
     * @name dfu.HashType
     * @enum {number}
     * @property {number} NO_HASH=0 NO_HASH value
     * @property {number} CRC=1 CRC value
     * @property {number} SHA128=2 SHA128 value
     * @property {number} SHA256=3 SHA256 value
     * @property {number} SHA512=4 SHA512 value
     */
    dfu.HashType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NO_HASH"] = 0;
        values[valuesById[1] = "CRC"] = 1;
        values[valuesById[2] = "SHA128"] = 2;
        values[valuesById[3] = "SHA256"] = 3;
        values[valuesById[4] = "SHA512"] = 4;
        return values;
    })();

    /**
     * ValidationType enum.
     * @name dfu.ValidationType
     * @enum {number}
     * @property {number} NO_VALIDATION=0 NO_VALIDATION value
     * @property {number} VALIDATE_GENERATED_CRC=1 VALIDATE_GENERATED_CRC value
     * @property {number} VALIDATE_SHA256=2 VALIDATE_SHA256 value
     * @property {number} VALIDATE_ECDSA_P256_SHA256=3 VALIDATE_ECDSA_P256_SHA256 value
     */
    dfu.ValidationType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NO_VALIDATION"] = 0;
        values[valuesById[1] = "VALIDATE_GENERATED_CRC"] = 1;
        values[valuesById[2] = "VALIDATE_SHA256"] = 2;
        values[valuesById[3] = "VALIDATE_ECDSA_P256_SHA256"] = 3;
        return values;
    })();

    dfu.Hash = (function() {

        /**
         * Properties of a Hash.
         * @memberof dfu
         * @interface IHash
         * @property {dfu.HashType} hashType Hash hashType
         * @property {Uint8Array} hash Hash hash
         */

        /**
         * Constructs a new Hash.
         * @memberof dfu
         * @classdesc Represents a Hash.
         * @implements IHash
         * @constructor
         * @param {dfu.IHash=} [properties] Properties to set
         */
        function Hash(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Hash hashType.
         * @member {dfu.HashType} hashType
         * @memberof dfu.Hash
         * @instance
         */
        Hash.prototype.hashType = 0;

        /**
         * Hash hash.
         * @member {Uint8Array} hash
         * @memberof dfu.Hash
         * @instance
         */
        Hash.prototype.hash = $util.newBuffer([]);

        /**
         * Creates a new Hash instance using the specified properties.
         * @function create
         * @memberof dfu.Hash
         * @static
         * @param {dfu.IHash=} [properties] Properties to set
         * @returns {dfu.Hash} Hash instance
         */
        Hash.create = function create(properties) {
            return new Hash(properties);
        };

        /**
         * Encodes the specified Hash message. Does not implicitly {@link dfu.Hash.verify|verify} messages.
         * @function encode
         * @memberof dfu.Hash
         * @static
         * @param {dfu.IHash} message Hash message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Hash.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.hashType);
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.hash);
            return writer;
        };

        /**
         * Encodes the specified Hash message, length delimited. Does not implicitly {@link dfu.Hash.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dfu.Hash
         * @static
         * @param {dfu.IHash} message Hash message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Hash.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Hash message from the specified reader or buffer.
         * @function decode
         * @memberof dfu.Hash
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dfu.Hash} Hash
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Hash.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dfu.Hash();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.hashType = reader.int32();
                        break;
                    }
                case 2: {
                        message.hash = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("hashType"))
                throw $util.ProtocolError("missing required 'hashType'", { instance: message });
            if (!message.hasOwnProperty("hash"))
                throw $util.ProtocolError("missing required 'hash'", { instance: message });
            return message;
        };

        /**
         * Decodes a Hash message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dfu.Hash
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dfu.Hash} Hash
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Hash.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Hash message.
         * @function verify
         * @memberof dfu.Hash
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Hash.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.hashType) {
            default:
                return "hashType: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                break;
            }
            if (!(message.hash && typeof message.hash.length === "number" || $util.isString(message.hash)))
                return "hash: buffer expected";
            return null;
        };

        /**
         * Creates a Hash message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dfu.Hash
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dfu.Hash} Hash
         */
        Hash.fromObject = function fromObject(object) {
            if (object instanceof $root.dfu.Hash)
                return object;
            let message = new $root.dfu.Hash();
            switch (object.hashType) {
            default:
                if (typeof object.hashType === "number") {
                    message.hashType = object.hashType;
                    break;
                }
                break;
            case "NO_HASH":
            case 0:
                message.hashType = 0;
                break;
            case "CRC":
            case 1:
                message.hashType = 1;
                break;
            case "SHA128":
            case 2:
                message.hashType = 2;
                break;
            case "SHA256":
            case 3:
                message.hashType = 3;
                break;
            case "SHA512":
            case 4:
                message.hashType = 4;
                break;
            }
            if (object.hash != null)
                if (typeof object.hash === "string")
                    $util.base64.decode(object.hash, message.hash = $util.newBuffer($util.base64.length(object.hash)), 0);
                else if (object.hash.length >= 0)
                    message.hash = object.hash;
            return message;
        };

        /**
         * Creates a plain object from a Hash message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dfu.Hash
         * @static
         * @param {dfu.Hash} message Hash
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Hash.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.hashType = options.enums === String ? "NO_HASH" : 0;
                if (options.bytes === String)
                    object.hash = "";
                else {
                    object.hash = [];
                    if (options.bytes !== Array)
                        object.hash = $util.newBuffer(object.hash);
                }
            }
            if (message.hashType != null && message.hasOwnProperty("hashType"))
                object.hashType = options.enums === String ? $root.dfu.HashType[message.hashType] === undefined ? message.hashType : $root.dfu.HashType[message.hashType] : message.hashType;
            if (message.hash != null && message.hasOwnProperty("hash"))
                object.hash = options.bytes === String ? $util.base64.encode(message.hash, 0, message.hash.length) : options.bytes === Array ? Array.prototype.slice.call(message.hash) : message.hash;
            return object;
        };

        /**
         * Converts this Hash to JSON.
         * @function toJSON
         * @memberof dfu.Hash
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Hash.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Hash
         * @function getTypeUrl
         * @memberof dfu.Hash
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Hash.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/dfu.Hash";
        };

        return Hash;
    })();

    dfu.BootValidation = (function() {

        /**
         * Properties of a BootValidation.
         * @memberof dfu
         * @interface IBootValidation
         * @property {dfu.ValidationType} type BootValidation type
         * @property {Uint8Array} bytes BootValidation bytes
         */

        /**
         * Constructs a new BootValidation.
         * @memberof dfu
         * @classdesc Represents a BootValidation.
         * @implements IBootValidation
         * @constructor
         * @param {dfu.IBootValidation=} [properties] Properties to set
         */
        function BootValidation(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BootValidation type.
         * @member {dfu.ValidationType} type
         * @memberof dfu.BootValidation
         * @instance
         */
        BootValidation.prototype.type = 0;

        /**
         * BootValidation bytes.
         * @member {Uint8Array} bytes
         * @memberof dfu.BootValidation
         * @instance
         */
        BootValidation.prototype.bytes = $util.newBuffer([]);

        /**
         * Creates a new BootValidation instance using the specified properties.
         * @function create
         * @memberof dfu.BootValidation
         * @static
         * @param {dfu.IBootValidation=} [properties] Properties to set
         * @returns {dfu.BootValidation} BootValidation instance
         */
        BootValidation.create = function create(properties) {
            return new BootValidation(properties);
        };

        /**
         * Encodes the specified BootValidation message. Does not implicitly {@link dfu.BootValidation.verify|verify} messages.
         * @function encode
         * @memberof dfu.BootValidation
         * @static
         * @param {dfu.IBootValidation} message BootValidation message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BootValidation.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.bytes);
            return writer;
        };

        /**
         * Encodes the specified BootValidation message, length delimited. Does not implicitly {@link dfu.BootValidation.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dfu.BootValidation
         * @static
         * @param {dfu.IBootValidation} message BootValidation message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BootValidation.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BootValidation message from the specified reader or buffer.
         * @function decode
         * @memberof dfu.BootValidation
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dfu.BootValidation} BootValidation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BootValidation.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dfu.BootValidation();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                case 2: {
                        message.bytes = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("type"))
                throw $util.ProtocolError("missing required 'type'", { instance: message });
            if (!message.hasOwnProperty("bytes"))
                throw $util.ProtocolError("missing required 'bytes'", { instance: message });
            return message;
        };

        /**
         * Decodes a BootValidation message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dfu.BootValidation
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dfu.BootValidation} BootValidation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BootValidation.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BootValidation message.
         * @function verify
         * @memberof dfu.BootValidation
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BootValidation.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.type) {
            default:
                return "type: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
                break;
            }
            if (!(message.bytes && typeof message.bytes.length === "number" || $util.isString(message.bytes)))
                return "bytes: buffer expected";
            return null;
        };

        /**
         * Creates a BootValidation message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dfu.BootValidation
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dfu.BootValidation} BootValidation
         */
        BootValidation.fromObject = function fromObject(object) {
            if (object instanceof $root.dfu.BootValidation)
                return object;
            let message = new $root.dfu.BootValidation();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "NO_VALIDATION":
            case 0:
                message.type = 0;
                break;
            case "VALIDATE_GENERATED_CRC":
            case 1:
                message.type = 1;
                break;
            case "VALIDATE_SHA256":
            case 2:
                message.type = 2;
                break;
            case "VALIDATE_ECDSA_P256_SHA256":
            case 3:
                message.type = 3;
                break;
            }
            if (object.bytes != null)
                if (typeof object.bytes === "string")
                    $util.base64.decode(object.bytes, message.bytes = $util.newBuffer($util.base64.length(object.bytes)), 0);
                else if (object.bytes.length >= 0)
                    message.bytes = object.bytes;
            return message;
        };

        /**
         * Creates a plain object from a BootValidation message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dfu.BootValidation
         * @static
         * @param {dfu.BootValidation} message BootValidation
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BootValidation.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "NO_VALIDATION" : 0;
                if (options.bytes === String)
                    object.bytes = "";
                else {
                    object.bytes = [];
                    if (options.bytes !== Array)
                        object.bytes = $util.newBuffer(object.bytes);
                }
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.dfu.ValidationType[message.type] === undefined ? message.type : $root.dfu.ValidationType[message.type] : message.type;
            if (message.bytes != null && message.hasOwnProperty("bytes"))
                object.bytes = options.bytes === String ? $util.base64.encode(message.bytes, 0, message.bytes.length) : options.bytes === Array ? Array.prototype.slice.call(message.bytes) : message.bytes;
            return object;
        };

        /**
         * Converts this BootValidation to JSON.
         * @function toJSON
         * @memberof dfu.BootValidation
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BootValidation.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for BootValidation
         * @function getTypeUrl
         * @memberof dfu.BootValidation
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        BootValidation.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/dfu.BootValidation";
        };

        return BootValidation;
    })();

    dfu.InitCommand = (function() {

        /**
         * Properties of an InitCommand.
         * @memberof dfu
         * @interface IInitCommand
         * @property {number|null} [fwVersion] InitCommand fwVersion
         * @property {number|null} [hwVersion] InitCommand hwVersion
         * @property {Array.<number>|null} [sdReq] InitCommand sdReq
         * @property {dfu.FwType|null} [type] InitCommand type
         * @property {number|null} [sdSize] InitCommand sdSize
         * @property {number|null} [blSize] InitCommand blSize
         * @property {number|null} [appSize] InitCommand appSize
         * @property {dfu.IHash|null} [hash] InitCommand hash
         * @property {boolean|null} [isDebug] InitCommand isDebug
         * @property {Array.<dfu.IBootValidation>|null} [bootValidation] InitCommand bootValidation
         */

        /**
         * Constructs a new InitCommand.
         * @memberof dfu
         * @classdesc Represents an InitCommand.
         * @implements IInitCommand
         * @constructor
         * @param {dfu.IInitCommand=} [properties] Properties to set
         */
        function InitCommand(properties) {
            this.sdReq = [];
            this.bootValidation = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * InitCommand fwVersion.
         * @member {number} fwVersion
         * @memberof dfu.InitCommand
         * @instance
         */
        InitCommand.prototype.fwVersion = 0;

        /**
         * InitCommand hwVersion.
         * @member {number} hwVersion
         * @memberof dfu.InitCommand
         * @instance
         */
        InitCommand.prototype.hwVersion = 0;

        /**
         * InitCommand sdReq.
         * @member {Array.<number>} sdReq
         * @memberof dfu.InitCommand
         * @instance
         */
        InitCommand.prototype.sdReq = $util.emptyArray;

        /**
         * InitCommand type.
         * @member {dfu.FwType} type
         * @memberof dfu.InitCommand
         * @instance
         */
        InitCommand.prototype.type = 0;

        /**
         * InitCommand sdSize.
         * @member {number} sdSize
         * @memberof dfu.InitCommand
         * @instance
         */
        InitCommand.prototype.sdSize = 0;

        /**
         * InitCommand blSize.
         * @member {number} blSize
         * @memberof dfu.InitCommand
         * @instance
         */
        InitCommand.prototype.blSize = 0;

        /**
         * InitCommand appSize.
         * @member {number} appSize
         * @memberof dfu.InitCommand
         * @instance
         */
        InitCommand.prototype.appSize = 0;

        /**
         * InitCommand hash.
         * @member {dfu.IHash|null|undefined} hash
         * @memberof dfu.InitCommand
         * @instance
         */
        InitCommand.prototype.hash = null;

        /**
         * InitCommand isDebug.
         * @member {boolean} isDebug
         * @memberof dfu.InitCommand
         * @instance
         */
        InitCommand.prototype.isDebug = false;

        /**
         * InitCommand bootValidation.
         * @member {Array.<dfu.IBootValidation>} bootValidation
         * @memberof dfu.InitCommand
         * @instance
         */
        InitCommand.prototype.bootValidation = $util.emptyArray;

        /**
         * Creates a new InitCommand instance using the specified properties.
         * @function create
         * @memberof dfu.InitCommand
         * @static
         * @param {dfu.IInitCommand=} [properties] Properties to set
         * @returns {dfu.InitCommand} InitCommand instance
         */
        InitCommand.create = function create(properties) {
            return new InitCommand(properties);
        };

        /**
         * Encodes the specified InitCommand message. Does not implicitly {@link dfu.InitCommand.verify|verify} messages.
         * @function encode
         * @memberof dfu.InitCommand
         * @static
         * @param {dfu.IInitCommand} message InitCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InitCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.fwVersion != null && Object.hasOwnProperty.call(message, "fwVersion"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.fwVersion);
            if (message.hwVersion != null && Object.hasOwnProperty.call(message, "hwVersion"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.hwVersion);
            if (message.sdReq != null && message.sdReq.length) {
                writer.uint32(/* id 3, wireType 2 =*/26).fork();
                for (let i = 0; i < message.sdReq.length; ++i)
                    writer.uint32(message.sdReq[i]);
                writer.ldelim();
            }
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.type);
            if (message.sdSize != null && Object.hasOwnProperty.call(message, "sdSize"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.sdSize);
            if (message.blSize != null && Object.hasOwnProperty.call(message, "blSize"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.blSize);
            if (message.appSize != null && Object.hasOwnProperty.call(message, "appSize"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.appSize);
            if (message.hash != null && Object.hasOwnProperty.call(message, "hash"))
                $root.dfu.Hash.encode(message.hash, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.isDebug != null && Object.hasOwnProperty.call(message, "isDebug"))
                writer.uint32(/* id 9, wireType 0 =*/72).bool(message.isDebug);
            if (message.bootValidation != null && message.bootValidation.length)
                for (let i = 0; i < message.bootValidation.length; ++i)
                    $root.dfu.BootValidation.encode(message.bootValidation[i], writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified InitCommand message, length delimited. Does not implicitly {@link dfu.InitCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dfu.InitCommand
         * @static
         * @param {dfu.IInitCommand} message InitCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InitCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an InitCommand message from the specified reader or buffer.
         * @function decode
         * @memberof dfu.InitCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dfu.InitCommand} InitCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InitCommand.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dfu.InitCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.fwVersion = reader.uint32();
                        break;
                    }
                case 2: {
                        message.hwVersion = reader.uint32();
                        break;
                    }
                case 3: {
                        if (!(message.sdReq && message.sdReq.length))
                            message.sdReq = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.sdReq.push(reader.uint32());
                        } else
                            message.sdReq.push(reader.uint32());
                        break;
                    }
                case 4: {
                        message.type = reader.int32();
                        break;
                    }
                case 5: {
                        message.sdSize = reader.uint32();
                        break;
                    }
                case 6: {
                        message.blSize = reader.uint32();
                        break;
                    }
                case 7: {
                        message.appSize = reader.uint32();
                        break;
                    }
                case 8: {
                        message.hash = $root.dfu.Hash.decode(reader, reader.uint32());
                        break;
                    }
                case 9: {
                        message.isDebug = reader.bool();
                        break;
                    }
                case 10: {
                        if (!(message.bootValidation && message.bootValidation.length))
                            message.bootValidation = [];
                        message.bootValidation.push($root.dfu.BootValidation.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an InitCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dfu.InitCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dfu.InitCommand} InitCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InitCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an InitCommand message.
         * @function verify
         * @memberof dfu.InitCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InitCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.fwVersion != null && message.hasOwnProperty("fwVersion"))
                if (!$util.isInteger(message.fwVersion))
                    return "fwVersion: integer expected";
            if (message.hwVersion != null && message.hasOwnProperty("hwVersion"))
                if (!$util.isInteger(message.hwVersion))
                    return "hwVersion: integer expected";
            if (message.sdReq != null && message.hasOwnProperty("sdReq")) {
                if (!Array.isArray(message.sdReq))
                    return "sdReq: array expected";
                for (let i = 0; i < message.sdReq.length; ++i)
                    if (!$util.isInteger(message.sdReq[i]))
                        return "sdReq: integer[] expected";
            }
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.sdSize != null && message.hasOwnProperty("sdSize"))
                if (!$util.isInteger(message.sdSize))
                    return "sdSize: integer expected";
            if (message.blSize != null && message.hasOwnProperty("blSize"))
                if (!$util.isInteger(message.blSize))
                    return "blSize: integer expected";
            if (message.appSize != null && message.hasOwnProperty("appSize"))
                if (!$util.isInteger(message.appSize))
                    return "appSize: integer expected";
            if (message.hash != null && message.hasOwnProperty("hash")) {
                let error = $root.dfu.Hash.verify(message.hash);
                if (error)
                    return "hash." + error;
            }
            if (message.isDebug != null && message.hasOwnProperty("isDebug"))
                if (typeof message.isDebug !== "boolean")
                    return "isDebug: boolean expected";
            if (message.bootValidation != null && message.hasOwnProperty("bootValidation")) {
                if (!Array.isArray(message.bootValidation))
                    return "bootValidation: array expected";
                for (let i = 0; i < message.bootValidation.length; ++i) {
                    let error = $root.dfu.BootValidation.verify(message.bootValidation[i]);
                    if (error)
                        return "bootValidation." + error;
                }
            }
            return null;
        };

        /**
         * Creates an InitCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dfu.InitCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dfu.InitCommand} InitCommand
         */
        InitCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.dfu.InitCommand)
                return object;
            let message = new $root.dfu.InitCommand();
            if (object.fwVersion != null)
                message.fwVersion = object.fwVersion >>> 0;
            if (object.hwVersion != null)
                message.hwVersion = object.hwVersion >>> 0;
            if (object.sdReq) {
                if (!Array.isArray(object.sdReq))
                    throw TypeError(".dfu.InitCommand.sdReq: array expected");
                message.sdReq = [];
                for (let i = 0; i < object.sdReq.length; ++i)
                    message.sdReq[i] = object.sdReq[i] >>> 0;
            }
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "APPLICATION":
            case 0:
                message.type = 0;
                break;
            case "SOFTDEVICE":
            case 1:
                message.type = 1;
                break;
            case "BOOTLOADER":
            case 2:
                message.type = 2;
                break;
            case "SOFTDEVICE_BOOTLOADER":
            case 3:
                message.type = 3;
                break;
            case "EXTERNAL_APPLICATION":
            case 4:
                message.type = 4;
                break;
            }
            if (object.sdSize != null)
                message.sdSize = object.sdSize >>> 0;
            if (object.blSize != null)
                message.blSize = object.blSize >>> 0;
            if (object.appSize != null)
                message.appSize = object.appSize >>> 0;
            if (object.hash != null) {
                if (typeof object.hash !== "object")
                    throw TypeError(".dfu.InitCommand.hash: object expected");
                message.hash = $root.dfu.Hash.fromObject(object.hash);
            }
            if (object.isDebug != null)
                message.isDebug = Boolean(object.isDebug);
            if (object.bootValidation) {
                if (!Array.isArray(object.bootValidation))
                    throw TypeError(".dfu.InitCommand.bootValidation: array expected");
                message.bootValidation = [];
                for (let i = 0; i < object.bootValidation.length; ++i) {
                    if (typeof object.bootValidation[i] !== "object")
                        throw TypeError(".dfu.InitCommand.bootValidation: object expected");
                    message.bootValidation[i] = $root.dfu.BootValidation.fromObject(object.bootValidation[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an InitCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dfu.InitCommand
         * @static
         * @param {dfu.InitCommand} message InitCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InitCommand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.sdReq = [];
                object.bootValidation = [];
            }
            if (options.defaults) {
                object.fwVersion = 0;
                object.hwVersion = 0;
                object.type = options.enums === String ? "APPLICATION" : 0;
                object.sdSize = 0;
                object.blSize = 0;
                object.appSize = 0;
                object.hash = null;
                object.isDebug = false;
            }
            if (message.fwVersion != null && message.hasOwnProperty("fwVersion"))
                object.fwVersion = message.fwVersion;
            if (message.hwVersion != null && message.hasOwnProperty("hwVersion"))
                object.hwVersion = message.hwVersion;
            if (message.sdReq && message.sdReq.length) {
                object.sdReq = [];
                for (let j = 0; j < message.sdReq.length; ++j)
                    object.sdReq[j] = message.sdReq[j];
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.dfu.FwType[message.type] === undefined ? message.type : $root.dfu.FwType[message.type] : message.type;
            if (message.sdSize != null && message.hasOwnProperty("sdSize"))
                object.sdSize = message.sdSize;
            if (message.blSize != null && message.hasOwnProperty("blSize"))
                object.blSize = message.blSize;
            if (message.appSize != null && message.hasOwnProperty("appSize"))
                object.appSize = message.appSize;
            if (message.hash != null && message.hasOwnProperty("hash"))
                object.hash = $root.dfu.Hash.toObject(message.hash, options);
            if (message.isDebug != null && message.hasOwnProperty("isDebug"))
                object.isDebug = message.isDebug;
            if (message.bootValidation && message.bootValidation.length) {
                object.bootValidation = [];
                for (let j = 0; j < message.bootValidation.length; ++j)
                    object.bootValidation[j] = $root.dfu.BootValidation.toObject(message.bootValidation[j], options);
            }
            return object;
        };

        /**
         * Converts this InitCommand to JSON.
         * @function toJSON
         * @memberof dfu.InitCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InitCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for InitCommand
         * @function getTypeUrl
         * @memberof dfu.InitCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        InitCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/dfu.InitCommand";
        };

        return InitCommand;
    })();

    dfu.ResetCommand = (function() {

        /**
         * Properties of a ResetCommand.
         * @memberof dfu
         * @interface IResetCommand
         * @property {number} timeout ResetCommand timeout
         */

        /**
         * Constructs a new ResetCommand.
         * @memberof dfu
         * @classdesc Represents a ResetCommand.
         * @implements IResetCommand
         * @constructor
         * @param {dfu.IResetCommand=} [properties] Properties to set
         */
        function ResetCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ResetCommand timeout.
         * @member {number} timeout
         * @memberof dfu.ResetCommand
         * @instance
         */
        ResetCommand.prototype.timeout = 0;

        /**
         * Creates a new ResetCommand instance using the specified properties.
         * @function create
         * @memberof dfu.ResetCommand
         * @static
         * @param {dfu.IResetCommand=} [properties] Properties to set
         * @returns {dfu.ResetCommand} ResetCommand instance
         */
        ResetCommand.create = function create(properties) {
            return new ResetCommand(properties);
        };

        /**
         * Encodes the specified ResetCommand message. Does not implicitly {@link dfu.ResetCommand.verify|verify} messages.
         * @function encode
         * @memberof dfu.ResetCommand
         * @static
         * @param {dfu.IResetCommand} message ResetCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResetCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.timeout);
            return writer;
        };

        /**
         * Encodes the specified ResetCommand message, length delimited. Does not implicitly {@link dfu.ResetCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dfu.ResetCommand
         * @static
         * @param {dfu.IResetCommand} message ResetCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResetCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ResetCommand message from the specified reader or buffer.
         * @function decode
         * @memberof dfu.ResetCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dfu.ResetCommand} ResetCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResetCommand.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dfu.ResetCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.timeout = reader.uint32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("timeout"))
                throw $util.ProtocolError("missing required 'timeout'", { instance: message });
            return message;
        };

        /**
         * Decodes a ResetCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dfu.ResetCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dfu.ResetCommand} ResetCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResetCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ResetCommand message.
         * @function verify
         * @memberof dfu.ResetCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ResetCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.timeout))
                return "timeout: integer expected";
            return null;
        };

        /**
         * Creates a ResetCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dfu.ResetCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dfu.ResetCommand} ResetCommand
         */
        ResetCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.dfu.ResetCommand)
                return object;
            let message = new $root.dfu.ResetCommand();
            if (object.timeout != null)
                message.timeout = object.timeout >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a ResetCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dfu.ResetCommand
         * @static
         * @param {dfu.ResetCommand} message ResetCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ResetCommand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.timeout = 0;
            if (message.timeout != null && message.hasOwnProperty("timeout"))
                object.timeout = message.timeout;
            return object;
        };

        /**
         * Converts this ResetCommand to JSON.
         * @function toJSON
         * @memberof dfu.ResetCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ResetCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ResetCommand
         * @function getTypeUrl
         * @memberof dfu.ResetCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ResetCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/dfu.ResetCommand";
        };

        return ResetCommand;
    })();

    dfu.Command = (function() {

        /**
         * Properties of a Command.
         * @memberof dfu
         * @interface ICommand
         * @property {dfu.OpCode|null} [opCode] Command opCode
         * @property {dfu.IInitCommand|null} [init] Command init
         * @property {dfu.IResetCommand|null} [reset] Command reset
         */

        /**
         * Constructs a new Command.
         * @memberof dfu
         * @classdesc Represents a Command.
         * @implements ICommand
         * @constructor
         * @param {dfu.ICommand=} [properties] Properties to set
         */
        function Command(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Command opCode.
         * @member {dfu.OpCode} opCode
         * @memberof dfu.Command
         * @instance
         */
        Command.prototype.opCode = 0;

        /**
         * Command init.
         * @member {dfu.IInitCommand|null|undefined} init
         * @memberof dfu.Command
         * @instance
         */
        Command.prototype.init = null;

        /**
         * Command reset.
         * @member {dfu.IResetCommand|null|undefined} reset
         * @memberof dfu.Command
         * @instance
         */
        Command.prototype.reset = null;

        /**
         * Creates a new Command instance using the specified properties.
         * @function create
         * @memberof dfu.Command
         * @static
         * @param {dfu.ICommand=} [properties] Properties to set
         * @returns {dfu.Command} Command instance
         */
        Command.create = function create(properties) {
            return new Command(properties);
        };

        /**
         * Encodes the specified Command message. Does not implicitly {@link dfu.Command.verify|verify} messages.
         * @function encode
         * @memberof dfu.Command
         * @static
         * @param {dfu.ICommand} message Command message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Command.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.opCode != null && Object.hasOwnProperty.call(message, "opCode"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.opCode);
            if (message.init != null && Object.hasOwnProperty.call(message, "init"))
                $root.dfu.InitCommand.encode(message.init, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.reset != null && Object.hasOwnProperty.call(message, "reset"))
                $root.dfu.ResetCommand.encode(message.reset, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Command message, length delimited. Does not implicitly {@link dfu.Command.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dfu.Command
         * @static
         * @param {dfu.ICommand} message Command message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Command.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Command message from the specified reader or buffer.
         * @function decode
         * @memberof dfu.Command
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dfu.Command} Command
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Command.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dfu.Command();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.opCode = reader.int32();
                        break;
                    }
                case 2: {
                        message.init = $root.dfu.InitCommand.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.reset = $root.dfu.ResetCommand.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Command message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dfu.Command
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dfu.Command} Command
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Command.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Command message.
         * @function verify
         * @memberof dfu.Command
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Command.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.opCode != null && message.hasOwnProperty("opCode"))
                switch (message.opCode) {
                default:
                    return "opCode: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.init != null && message.hasOwnProperty("init")) {
                let error = $root.dfu.InitCommand.verify(message.init);
                if (error)
                    return "init." + error;
            }
            if (message.reset != null && message.hasOwnProperty("reset")) {
                let error = $root.dfu.ResetCommand.verify(message.reset);
                if (error)
                    return "reset." + error;
            }
            return null;
        };

        /**
         * Creates a Command message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dfu.Command
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dfu.Command} Command
         */
        Command.fromObject = function fromObject(object) {
            if (object instanceof $root.dfu.Command)
                return object;
            let message = new $root.dfu.Command();
            switch (object.opCode) {
            default:
                if (typeof object.opCode === "number") {
                    message.opCode = object.opCode;
                    break;
                }
                break;
            case "RESET":
            case 0:
                message.opCode = 0;
                break;
            case "INIT":
            case 1:
                message.opCode = 1;
                break;
            }
            if (object.init != null) {
                if (typeof object.init !== "object")
                    throw TypeError(".dfu.Command.init: object expected");
                message.init = $root.dfu.InitCommand.fromObject(object.init);
            }
            if (object.reset != null) {
                if (typeof object.reset !== "object")
                    throw TypeError(".dfu.Command.reset: object expected");
                message.reset = $root.dfu.ResetCommand.fromObject(object.reset);
            }
            return message;
        };

        /**
         * Creates a plain object from a Command message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dfu.Command
         * @static
         * @param {dfu.Command} message Command
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Command.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.opCode = options.enums === String ? "RESET" : 0;
                object.init = null;
                object.reset = null;
            }
            if (message.opCode != null && message.hasOwnProperty("opCode"))
                object.opCode = options.enums === String ? $root.dfu.OpCode[message.opCode] === undefined ? message.opCode : $root.dfu.OpCode[message.opCode] : message.opCode;
            if (message.init != null && message.hasOwnProperty("init"))
                object.init = $root.dfu.InitCommand.toObject(message.init, options);
            if (message.reset != null && message.hasOwnProperty("reset"))
                object.reset = $root.dfu.ResetCommand.toObject(message.reset, options);
            return object;
        };

        /**
         * Converts this Command to JSON.
         * @function toJSON
         * @memberof dfu.Command
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Command.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Command
         * @function getTypeUrl
         * @memberof dfu.Command
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Command.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/dfu.Command";
        };

        return Command;
    })();

    /**
     * SignatureType enum.
     * @name dfu.SignatureType
     * @enum {number}
     * @property {number} ECDSA_P256_SHA256=0 ECDSA_P256_SHA256 value
     * @property {number} ED25519=1 ED25519 value
     */
    dfu.SignatureType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "ECDSA_P256_SHA256"] = 0;
        values[valuesById[1] = "ED25519"] = 1;
        return values;
    })();

    dfu.SignedCommand = (function() {

        /**
         * Properties of a SignedCommand.
         * @memberof dfu
         * @interface ISignedCommand
         * @property {dfu.ICommand} command SignedCommand command
         * @property {dfu.SignatureType} signatureType SignedCommand signatureType
         * @property {Uint8Array} signature SignedCommand signature
         */

        /**
         * Constructs a new SignedCommand.
         * @memberof dfu
         * @classdesc Represents a SignedCommand.
         * @implements ISignedCommand
         * @constructor
         * @param {dfu.ISignedCommand=} [properties] Properties to set
         */
        function SignedCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SignedCommand command.
         * @member {dfu.ICommand} command
         * @memberof dfu.SignedCommand
         * @instance
         */
        SignedCommand.prototype.command = null;

        /**
         * SignedCommand signatureType.
         * @member {dfu.SignatureType} signatureType
         * @memberof dfu.SignedCommand
         * @instance
         */
        SignedCommand.prototype.signatureType = 0;

        /**
         * SignedCommand signature.
         * @member {Uint8Array} signature
         * @memberof dfu.SignedCommand
         * @instance
         */
        SignedCommand.prototype.signature = $util.newBuffer([]);

        /**
         * Creates a new SignedCommand instance using the specified properties.
         * @function create
         * @memberof dfu.SignedCommand
         * @static
         * @param {dfu.ISignedCommand=} [properties] Properties to set
         * @returns {dfu.SignedCommand} SignedCommand instance
         */
        SignedCommand.create = function create(properties) {
            return new SignedCommand(properties);
        };

        /**
         * Encodes the specified SignedCommand message. Does not implicitly {@link dfu.SignedCommand.verify|verify} messages.
         * @function encode
         * @memberof dfu.SignedCommand
         * @static
         * @param {dfu.ISignedCommand} message SignedCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SignedCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            $root.dfu.Command.encode(message.command, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.signatureType);
            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.signature);
            return writer;
        };

        /**
         * Encodes the specified SignedCommand message, length delimited. Does not implicitly {@link dfu.SignedCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dfu.SignedCommand
         * @static
         * @param {dfu.ISignedCommand} message SignedCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SignedCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SignedCommand message from the specified reader or buffer.
         * @function decode
         * @memberof dfu.SignedCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dfu.SignedCommand} SignedCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SignedCommand.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dfu.SignedCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.command = $root.dfu.Command.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.signatureType = reader.int32();
                        break;
                    }
                case 3: {
                        message.signature = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("command"))
                throw $util.ProtocolError("missing required 'command'", { instance: message });
            if (!message.hasOwnProperty("signatureType"))
                throw $util.ProtocolError("missing required 'signatureType'", { instance: message });
            if (!message.hasOwnProperty("signature"))
                throw $util.ProtocolError("missing required 'signature'", { instance: message });
            return message;
        };

        /**
         * Decodes a SignedCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dfu.SignedCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dfu.SignedCommand} SignedCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SignedCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SignedCommand message.
         * @function verify
         * @memberof dfu.SignedCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SignedCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            {
                let error = $root.dfu.Command.verify(message.command);
                if (error)
                    return "command." + error;
            }
            switch (message.signatureType) {
            default:
                return "signatureType: enum value expected";
            case 0:
            case 1:
                break;
            }
            if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                return "signature: buffer expected";
            return null;
        };

        /**
         * Creates a SignedCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dfu.SignedCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dfu.SignedCommand} SignedCommand
         */
        SignedCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.dfu.SignedCommand)
                return object;
            let message = new $root.dfu.SignedCommand();
            if (object.command != null) {
                if (typeof object.command !== "object")
                    throw TypeError(".dfu.SignedCommand.command: object expected");
                message.command = $root.dfu.Command.fromObject(object.command);
            }
            switch (object.signatureType) {
            default:
                if (typeof object.signatureType === "number") {
                    message.signatureType = object.signatureType;
                    break;
                }
                break;
            case "ECDSA_P256_SHA256":
            case 0:
                message.signatureType = 0;
                break;
            case "ED25519":
            case 1:
                message.signatureType = 1;
                break;
            }
            if (object.signature != null)
                if (typeof object.signature === "string")
                    $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
                else if (object.signature.length >= 0)
                    message.signature = object.signature;
            return message;
        };

        /**
         * Creates a plain object from a SignedCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dfu.SignedCommand
         * @static
         * @param {dfu.SignedCommand} message SignedCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SignedCommand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.command = null;
                object.signatureType = options.enums === String ? "ECDSA_P256_SHA256" : 0;
                if (options.bytes === String)
                    object.signature = "";
                else {
                    object.signature = [];
                    if (options.bytes !== Array)
                        object.signature = $util.newBuffer(object.signature);
                }
            }
            if (message.command != null && message.hasOwnProperty("command"))
                object.command = $root.dfu.Command.toObject(message.command, options);
            if (message.signatureType != null && message.hasOwnProperty("signatureType"))
                object.signatureType = options.enums === String ? $root.dfu.SignatureType[message.signatureType] === undefined ? message.signatureType : $root.dfu.SignatureType[message.signatureType] : message.signatureType;
            if (message.signature != null && message.hasOwnProperty("signature"))
                object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
            return object;
        };

        /**
         * Converts this SignedCommand to JSON.
         * @function toJSON
         * @memberof dfu.SignedCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SignedCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SignedCommand
         * @function getTypeUrl
         * @memberof dfu.SignedCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SignedCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/dfu.SignedCommand";
        };

        return SignedCommand;
    })();

    dfu.Packet = (function() {

        /**
         * Properties of a Packet.
         * @memberof dfu
         * @interface IPacket
         * @property {dfu.ICommand|null} [command] Packet command
         * @property {dfu.ISignedCommand|null} [signedCommand] Packet signedCommand
         */

        /**
         * Constructs a new Packet.
         * @memberof dfu
         * @classdesc Represents a Packet.
         * @implements IPacket
         * @constructor
         * @param {dfu.IPacket=} [properties] Properties to set
         */
        function Packet(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Packet command.
         * @member {dfu.ICommand|null|undefined} command
         * @memberof dfu.Packet
         * @instance
         */
        Packet.prototype.command = null;

        /**
         * Packet signedCommand.
         * @member {dfu.ISignedCommand|null|undefined} signedCommand
         * @memberof dfu.Packet
         * @instance
         */
        Packet.prototype.signedCommand = null;

        /**
         * Creates a new Packet instance using the specified properties.
         * @function create
         * @memberof dfu.Packet
         * @static
         * @param {dfu.IPacket=} [properties] Properties to set
         * @returns {dfu.Packet} Packet instance
         */
        Packet.create = function create(properties) {
            return new Packet(properties);
        };

        /**
         * Encodes the specified Packet message. Does not implicitly {@link dfu.Packet.verify|verify} messages.
         * @function encode
         * @memberof dfu.Packet
         * @static
         * @param {dfu.IPacket} message Packet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Packet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.command != null && Object.hasOwnProperty.call(message, "command"))
                $root.dfu.Command.encode(message.command, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.signedCommand != null && Object.hasOwnProperty.call(message, "signedCommand"))
                $root.dfu.SignedCommand.encode(message.signedCommand, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Packet message, length delimited. Does not implicitly {@link dfu.Packet.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dfu.Packet
         * @static
         * @param {dfu.IPacket} message Packet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Packet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Packet message from the specified reader or buffer.
         * @function decode
         * @memberof dfu.Packet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dfu.Packet} Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Packet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dfu.Packet();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.command = $root.dfu.Command.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.signedCommand = $root.dfu.SignedCommand.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Packet message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dfu.Packet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dfu.Packet} Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Packet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Packet message.
         * @function verify
         * @memberof dfu.Packet
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Packet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.command != null && message.hasOwnProperty("command")) {
                let error = $root.dfu.Command.verify(message.command);
                if (error)
                    return "command." + error;
            }
            if (message.signedCommand != null && message.hasOwnProperty("signedCommand")) {
                let error = $root.dfu.SignedCommand.verify(message.signedCommand);
                if (error)
                    return "signedCommand." + error;
            }
            return null;
        };

        /**
         * Creates a Packet message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dfu.Packet
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dfu.Packet} Packet
         */
        Packet.fromObject = function fromObject(object) {
            if (object instanceof $root.dfu.Packet)
                return object;
            let message = new $root.dfu.Packet();
            if (object.command != null) {
                if (typeof object.command !== "object")
                    throw TypeError(".dfu.Packet.command: object expected");
                message.command = $root.dfu.Command.fromObject(object.command);
            }
            if (object.signedCommand != null) {
                if (typeof object.signedCommand !== "object")
                    throw TypeError(".dfu.Packet.signedCommand: object expected");
                message.signedCommand = $root.dfu.SignedCommand.fromObject(object.signedCommand);
            }
            return message;
        };

        /**
         * Creates a plain object from a Packet message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dfu.Packet
         * @static
         * @param {dfu.Packet} message Packet
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Packet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.command = null;
                object.signedCommand = null;
            }
            if (message.command != null && message.hasOwnProperty("command"))
                object.command = $root.dfu.Command.toObject(message.command, options);
            if (message.signedCommand != null && message.hasOwnProperty("signedCommand"))
                object.signedCommand = $root.dfu.SignedCommand.toObject(message.signedCommand, options);
            return object;
        };

        /**
         * Converts this Packet to JSON.
         * @function toJSON
         * @memberof dfu.Packet
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Packet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Packet
         * @function getTypeUrl
         * @memberof dfu.Packet
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Packet.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/dfu.Packet";
        };

        return Packet;
    })();

    return dfu;
})();

export { $root as default };
