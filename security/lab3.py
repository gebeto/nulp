#! python3
### flake8: noqa

from ctypes import c_uint32 as uint32


def random():
    _previousValue = 4
    _module = pow(2, 10) - 1
    _factor = pow(3, 5)
    _growth = 1

    while True:
        value = (_factor * _previousValue + _growth) % _module
        _previousValue = value
        yield value


def RC5(key: bytearray):
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

    def __init__(self, key):
        self.u = self.W / 8
        self.b = len(key)

        self.c = (self.b / self.u + 1) if (self.b % self.u > 0) else (self.b / self.u)
        self.L = [uint32(0)] * self.c  # довжина масиву - кількість байт в ключі ділити на кількість байт в слові

        # for (int i = b - 1; i >= 0; i--)
        for i in range(self.b - 1, -1, -1):
            k = i / u
            self.L[k] = RotateLeft(self.L[k], 8) + key[i]

        self.t = 2 * (self.R + 1)
        self.S = [uint32(0)] * t
        self.S[0] = self.pw
        for i in range(1, self.t):
            self.S[i] = self.S[i - 1] + self.qw

        N = 3 * self.c if self.c > self.t else 3 * self.t

        G = uint32(0)
        H = uint32(0)

        a = 0
        j = 0

        for i in range(N):
            G = self.S[a] = RotateLeft((self.S[a] + G + H), 3)
            H = self.L[j] = RotateLeft((self.L[j] + G + H), int(G + H))
            a = (a + 1) % self.t
            j = (j + 1) % self.c

    def RotateLeft(self, a, offset):
        r1 = a << offset
        r2 = a >> (W - offset)
        return (r1 | r2)

    def RotateRight(self, a, offset):
        r1 = a >> offset
        r2 = a << (W - offset)
        return (r1 | r2)

    def Encrypt_CBC_pad(self, Stream input, Stream output):
        input.Position = 0
        message = bytearray(input.Length)
        input.Read(message, 0, int(input.Length))
        v = self.u * 2 - message.Length % (2 * sizeof(uint))
        message = message.Concat(Enumerable.Repeat(byte(v), v)).ToArray()
        Encrypt_CBC(new MemoryStream(message), output)

    def Decrypt_CBC_pad(self, Stream input, Stream output):
        Stream decrypted = new MemoryStream()
        Decrypt_CBC(input, decrypted)
        decrypted.Position = 0
        message = bytearray(decrypted.Length)
        decrypted.Read(message, 0, int(decrypted.Length))

        if message.Length < message.Last():
            output.Write(message, 0, message.Length)
        else:
            byte[] resultMessage = message.Take(message.Length - message.Last()).ToArray()
            output.Write(resultMessage, 0, resultMessage.Length)

    def Decrypt_CBC(self, Stream input, Stream output):
        input.Position = 0
        block = bytearray(self.u * 2)
        input.Read(block, 0, self.u * 2)
        a = uint32(0)
        b = uint32(0)
        a = int.from_bytes(block, "little")
        b = int.from_bytes(block[u:], "little")

        DecryptBlock_NoWrite(ref a, ref b)
        while input.Position < input.Length:
            input.Read(block, 0, u * 2)
            a = int.from_bytes(block, "little")
            b = int.from_bytes(block[u:], "little")
            DecryptBlock(ref a, ref b, output)

    def DecryptBlock_NoWrite(self, ref uint a, ref uint b):
        for i in range(R, 0, -1):
            b = RotateRight((b - self.S[2 * i + 1]), int(a)) ^ a
            a = RotateRight((a - self.S[2 * i]), int(b)) ^ b
        b = b - self.S[1]
        a = a - self.S[0]

    def Encrypt_CBC(self, Stream input, Stream output):
        input.Position = 0
        block = bytearray(self.u * 2)
        random = random()

        a = next(random)
        b = next(random)
        EncryptBlock(ref a, ref b, output)
        while (input.Position < input.Length):
            input.Read(block, 0, self.u * 2)
            a = int.from_bytes(block, "little")
            b = int.from_bytes(block[self.u:], "little")
            EncryptBlock(ref a, ref b, output)

    # Чим заповнити пробіли в останньому блоці???
    def EncryptBlock(self, ref UInt32 a, ref UInt32 b, Stream output):
        a = a + self.S[0]
        b = b + self.S[1]

        for i in range(1, self.R+1):
            a = RotateLeft((a ^ b), int(b)) + self.S[2 * i]
            b = RotateLeft((b ^ a), int(a)) + self.S[2 * i + 1]
        output.Write(bytearray(a), 0, self.u)
        output.Write(bytearray(b), 0, self.u)

    def DecryptBlock(self, ref UInt32 a, ref UInt32 b, Stream output):
        for i in range(R, 0, -1):
            b = RotateRight((b - self.S[2 * i + 1]), int(a)) ^ a
            a = RotateRight((a - self.S[2 * i]), int(b)) ^ b

        b = b - self.S[1]
        a = a - self.S[0]
        output.Write(bytearray(a), 0, self.u)
        output.Write(bytearray(b), 0, self.u)


def Encrypt(password):
    key = bytearray(password, "ascii")

    rc5 = RC5(key)

    var rawInputStream = new FileStream("encryptionData.txt", FileMode.Open, FileAccess.Read)
    var rawOutputStream = new FileStream("encrypted.txt", FileMode.OpenOrCreate, FileAccess.ReadWrite)

    rc5.Encrypt_CBC_pad(rawInputStream, rawOutputStream)

    rawInputStream.Close()
    rawOutputStream.Close()

    # Process.Start("encrypted.txt")

    Console.WriteLine("The text has been encrypted successfully");


def Decrypt(hashKey):
    key = bytearray(hashKey, "ascii")

    rc5 = RC5(key)
    rawInputStream = new FileStream("encrypted.txt", FileMode.Open, FileAccess.Read)
    rawOutputStream = new FileStream("decrypted.txt", FileMode.OpenOrCreate, FileAccess.ReadWrite)

    rc5.Decrypt_CBC_pad(rawInputStream, rawOutputStream)
    rawInputStream.Close()
    rawOutputStream.Close()

    # Process.Start("decrypted.txt")

    Console.WriteLine("The text has been decrypted successfully")
