import hashlib
from ecdsa import SigningKey, util
from binascii import unhexlify

def load_private_key(file_path):
    with open(file_path, "r") as file:
        private_key_pem = file.read()
    return SigningKey.from_pem(private_key_pem)

def verify_signature(public_key, data, signature):
    """
    Verify the provided data against the signature, expecting a little-endian formatted signature.
    """
    # Get the order of the curve
    order = public_key.curve.order
    # Convert the signature to the format expected by the VerifyingKey.verify method
    r = signature[:32][::-1]
    s = signature[32:][::-1]
    r_int = int.from_bytes(r, byteorder="big")
    s_int = int.from_bytes(s, byteorder="big")
    der_signature = util.sigencode_der(r_int, s_int, order)
    try:
        return public_key.verify(der_signature, data, hashfunc=hashlib.sha256, sigdecode=util.sigdecode_der)
    except Exception as e:
        print(f"Verification failed: {e}")
        return False

def verify_initpacket(public_key):
    signature_good = unhexlify('c16814676d0f81a45116136994d5b56f8daba7bf5295dec18a2c349c262284390955d994a618cd8db52036b9c52d7c99e5d7838809eb384dd92232d9793b327d')
    file_path = "test/EA140CF93E0D/initpacket.dat"
    with open(file_path, "rb") as file:
        initpacket = file.read()
    return verify_signature(public_key, initpacket, signature_good)
    # try:
    #     return public_key.verify(signature_good, initpacket, hashfunc=hashlib.sha256)
    # except Exception as e:
    #     print("Error:", str(e))
    #     return False

private_key = load_private_key('../private.pem')
public_key = private_key.get_verifying_key()
is_valid = verify_initpacket(public_key)
print("Signature (EA140CF93E0D) valid:", is_valid)
