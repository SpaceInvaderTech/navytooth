import hashlib
from ecdsa import SigningKey, VerifyingKey, util

def load_private_key(file_path):
    """
    Load an ECDSA private key from a PEM file.
    """
    with open(file_path, "r") as file:
        private_key_pem = file.read()
    return SigningKey.from_pem(private_key_pem)

def sign_data(private_key, data):
    """
    Create signature for provided data using P-256 curve and SHA-256 as hashing algorithm.
    Returns R and S keys combined in a 64 byte array, formatted as little-endian.
    """
    signature = private_key.sign(data, hashfunc=hashlib.sha256, sigencode=util.sigencode_string)
    return signature[31::-1] + signature[63:31:-1]

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
        # print(f"Verification failed: {e}")
        return False


data_to_sign = b"The Love Boat"
private_key = load_private_key('../private.pem')

# Sign the data
signature = sign_data(private_key, data_to_sign)
print("Signature:", signature.hex())

# Verify the signature
public_key = private_key.get_verifying_key()
is_valid = verify_signature(public_key, data_to_sign, signature)
print("Signature valid:", is_valid)
