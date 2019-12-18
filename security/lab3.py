#! python3
### flake8: noqa

from io import BytesIO
# from ctypes import c_uint32 as uint32, c_uint
from numpy import add, uint32
# uint32 = int


def random():
    _previousValue = 4
    _module = pow(2, 11) - 1
    _factor = pow(3, 5)
    _growth = 1

    while True:
        value = (_factor * _previousValue + _growth) % _module
        _previousValue = value
        yield value


class RC5(object):
    W: int = 32
    R: int = 12

    pw: uint32 = 0xb7e15163
    qw: uint32 = 0x9e3779b9

    L: [uint32]
    S: [uint32]

    t: int
    b: int
    u: int
    c: int

    def __init__(self, key: bytearray):
        self.u = self.W // 8
        self.b = len(key)

        self.c = int(self.b / self.u + 1) if (self.b % self.u > 0) else int(self.b / self.u)
        self.L = [uint32(0)] * self.c  # довжина масиву - кількість байт в ключі ділити на кількість байт в слові

        # for (int i = b - 1; i >= 0; i--)
        for i in range(self.b - 1, -1, -1):
            k = int(i / self.u)
            self.L[k] = self.RotateLeft(self.L[k], 8) + key[i]

        self.t = 2 * (self.R + 1)
        self.S = [uint32(0)] * self.t
        self.S[0] = self.pw
        # self.S.insert(self.pw)
        for i in range(1, self.t):
            self.S[i] = self.S[i - 1] + self.qw

        N = 3 * self.c if self.c > self.t else 3 * self.t

        G = uint32(0)
        H = uint32(0)

        # print("ASAD", type(self.S[0]))
        # exit()

        a = 0
        j = 0

        for i in range(N):
            G = self.S[a] = self.RotateLeft(self.S[a] + add(G, H), 3)
            H = self.L[j] = self.RotateLeft((self.L[j] + add(G, H)), G + H)
            a = (a + 1) % self.t
            j = (j + 1) % self.c

    def RotateLeft(self, a, offset):
        # print("BBBB", a, offset, type(a), type(offset), type(self.W))
        # a = a.value if type(a) == uint32 else a
        r1 = a << offset
        print(self.W, offset, self.W - offset)
        r2 = a >> (self.W - offset)
        return (r1 | r2)

    def RotateRight(self, a, offset):
        # print("BBBB", type(a), type(offset), type(self.W))
        # a = a.value if type(a) == uint32 else a
        r1 = a >> offset
        print(self.W, offset, self.W - offset)
        r2 = a << (self.W - offset)
        return (r1 | r2)

    def Encrypt_CBC_pad(self, input, output):
        # input.Position = 0
        input.seek(0)
        # message = bytearray(input.Length)
        message = input.read(len(input.getbuffer()))
        # v = self.u * 2 - message.Length % (2 * sizeof(uint))
        v = self.u * 2 - len(message) % (2 * 4)
        # message = message.Concat(Enumerable.Repeat(bytes(v), v)).ToArray()
        message = message + bytearray(v) * v
        self.Encrypt_CBC(BytesIO(message), output)

    def Decrypt_CBC_pad(self, input, output):
        # decrypted = new MemoryStream()
        decrypted = BytesIO(b"")
        self.Decrypt_CBC(input, decrypted)
        # decrypted.Position = 0
        decrypted.seek(0)
        message = bytearray(len(decrypted))
        decrypted.read(message, 0, int(decrypted.Length))

        if message.Length < message.Last():
            output.write(message, 0, message.Length)
        else:
            # byte[] resultMessage = message.Take(message.Length - message.Last()).ToArray()
            resultMessage = message[:len(message) - message[-1]]
            output.write(resultMessage, 0, len(resultMessage))

    def Decrypt_CBC(self, input, output):
        # input.Position = 0
        input.seek(0)
        # block = bytearray(self.u * 2)
        block = input.read(0, self.u * 2)
        a = uint32(int.from_bytes(block, "little"))
        b = uint32(int.from_bytes(block[self.u:], "little"))

        a, b = self.DecryptBlock_NoWrite(a, b)
        while input.Position < input.Length:
            input.Read(block, 0, self.u * 2)
            a = int.from_bytes(block, "little")
            b = int.from_bytes(block[self.u:], "little")
            a, b = self.DecryptBlock(a, b, output)

    def DecryptBlock_NoWrite(self, a, b):
        for i in range(self.R, 0, -1):
            b = self.RotateRight((b - self.S[2 * i + 1]), int(a)) ^ a
            a = self.RotateRight((a - self.S[2 * i]), int(b)) ^ b
        b = b - self.S[1]
        a = a - self.S[0]
        return a, b

    def Encrypt_CBC(self, input, output):
        input.Position = 0
        block = bytearray(self.u * 2)
        rand = random()

        a = next(rand)
        b = next(rand)
        a, b = self.EncryptBlock(a, b, output)
        while (input.Position < input.Length):
            input.Read(block, 0, self.u * 2)
            a = int.from_bytes(block, "little")
            b = int.from_bytes(block[self.u:], "little")
            a, b = self.EncryptBlock(a, b, output)

    # Чим заповнити пробіли в останньому блоці???
    def EncryptBlock(self, a, b, output):
        a = a + self.S[0]
        b = b + self.S[1]

        for i in range(1, self.R + 1):
            a = self.RotateLeft((a ^ b), b) + self.S[2 * i]
            b = self.RotateLeft((b ^ a), a) + self.S[2 * i + 1]
        print(self.u, a, b)
        output.write(bytearray(a)[:self.u])
        output.write(bytearray(b)[:self.u])

        return a, b

    def DecryptBlock(self, a, b, output):
        for i in range(self.R, 0, -1):
            b = self.RotateRight((b - self.S[2 * i + 1]), int(a)) ^ a
            a = self.RotateRight((a - self.S[2 * i]), int(b)) ^ b

        b = b - self.S[1]
        a = a - self.S[0]
        output.write(bytearray(a), 0, self.u)
        output.write(bytearray(b), 0, self.u)
        return a, b


def Encrypt(password):
    key = bytearray(password, "ascii")

    rc5 = RC5(key)
    print(rc5)

    rawInputStream = BytesIO(b"Hello world")
    rawOutputStream = BytesIO(b"")
    # var rawInputStream = new FileStream("encryptionData.txt", FileMode.Open, FileAccess.Read)
    # var rawOutputStream = new FileStream("encrypted.txt", FileMode.OpenOrCreate, FileAccess.ReadWrite)

    rc5.Encrypt_CBC_pad(rawInputStream, rawOutputStream)

    # rawInputStream.Close()
    # rawOutputStream.Close()

    # Process.Start("encrypted.txt")

    # Console.WriteLine("The text has been encrypted successfully");


# def Decrypt(hashKey):
#     key = bytearray(hashKey, "ascii")

#     rc5 = RC5(key)
#     rawInputStream = new FileStream("encrypted.txt", FileMode.Open, FileAccess.Read)
#     rawOutputStream = new FileStream("decrypted.txt", FileMode.OpenOrCreate, FileAccess.ReadWrite)

#     rc5.Decrypt_CBC_pad(rawInputStream, rawOutputStream)
#     rawInputStream.Close()
#     rawOutputStream.Close()

#     # Process.Start("decrypted.txt")

#     Console.WriteLine("The text has been decrypted successfully")


Encrypt("Hello world!")
