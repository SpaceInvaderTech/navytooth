from codecs import encode
from base64 import b64decode
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.backends import default_backend

# python3 test/test.py

def bytes_to_int(b):
    return int(encode(b, "hex"), 16)

def get_compressed_public_key(priv):
    # Derive the private key
    private_key = ec.derive_private_key(priv, ec.SECP224R1(), default_backend())
    
    # Get the full public key
    public_key = private_key.public_key()
    public_numbers = public_key.public_numbers()
    
    # Extract x and y coordinates
    x = public_numbers.x
    y = public_numbers.y

    # Determine if y is even or odd
    prefix = '02' if y % 2 == 0 else '03'

    # Compress and format the public key
    compressed_public_key = f'{prefix}{x:056x}'
    return compressed_public_key

# Base64 encoded private key data
data = "bwaa+RfcHRvgbfwjBRKBuHVAW2wEHlrlPNpvDw=="

# Convert to integer
private_key = bytes_to_int(b64decode(data))

# Get compressed public key
compressed_public_key = get_compressed_public_key(private_key)

print('Private Key:', private_key)
print('Compressed Public Key:', compressed_public_key)
