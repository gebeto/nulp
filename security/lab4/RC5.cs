using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace lab4
{
    using System.IO;

    internal class RC5
    {
        private static readonly double GoldenRatio = (1 + Math.Sqrt(5)) / 2;

        private static readonly Generator Random = new Generator();

        private int R;

        private byte[] initializationVector;

        private const UInt32 Qw = 0xB7E15162;

        private const UInt32 Pw = 0x9E3779B9;

        private const int W = 32; // розмір машинного слова

        private const int WW = 4; // розмір машинного слова в байтах WW = W / 8

        private const int BB = 8; // розмір блоку BB = WW * 2

        private const int ROT_MASK = 31; // W - 1

        private UInt32[] S;

        public RC5(byte[] K, int r)
        {
            R = r;
            initializationVector = new byte[BB];

        
            int i, j, k, LL, t, T;
            var b = K.Length;

            LL = (b + WW - 1) / WW;
            UInt32[] L = new UInt32[LL];
            UInt32 A, B;

            for (i = 0; i < b; i++)
            {
                t = (K[i] << (8 * (i % 4)));
                L[i / WW] = (UInt32)(L[i / WW] + (decimal)t);
            }

            /* Step 3 */

            T = 2 * (R + 1);
            S = new UInt32[T];
            S[0] = Pw;
            for (i = 1; i < T; i++)
            {
                S[i] = (UInt32)(S[i - 1] + Qw);
            }

            /* Step 4 */

            i = j = 0;
            A = B = 0;

            if (LL > T)
            {
                k = 3 * LL;
            }
            else
            {
                k = 3 * T;
            }

            for (; k > 0; k--)
            {
                A = (UInt32)ROTL((long)(S[i] + A + B), 3, W);
                S[i] = A;
                B = (UInt32)ROTL((long)(L[j] + A + B), (long)(A + B), W);
                L[j] = B;
                i = (i + 1) % T;
                j = (j + 1) % LL;
            }
        }

        public void Encrypt(byte[] input, byte[] output)
        {
            ulong a = (ulong)BitConverter.ToInt32(input, 0);
            ulong b = (ulong)BitConverter.ToInt32(input, WW);

            a = (ulong)(a + S[0]);
            b = (ulong)(b + S[1]);
            for (var i = 1; i <= R; i++)
            {
                a = (ulong)(RotateLeft((ulong)(a ^ b), (int)b) + S[2 * i]);
                b = (ulong)(RotateLeft((ulong)(b ^ a), (int)a) + S[2 * i + 1]);
            }

            var aBytes = BitConverter.GetBytes((UInt32)a);
            var bBytes = BitConverter.GetBytes((UInt32)b);

            // з'єдную два масиви в один - output
            // output = aBytes + bBytes
            var outputIndex = 0;

            foreach (byte @byte in aBytes)
            {
                output[outputIndex++] = @byte;
            }

            foreach (byte @byte in bBytes)
            {
                output[outputIndex++] = @byte;
            }
        }

        public void Decrypt(byte[] input, byte[] output)
        {
            ulong a = (ulong)BitConverter.ToInt32(input, 0);
            ulong b = (ulong)BitConverter.ToInt32(input, WW);

            for (var i = R; i > 0; i--)
            {
                b = (ulong)(RotateRight((ulong)(b - S[2 * i + 1]), (int)a) ^ a);
                a = (ulong)(RotateRight((ulong)(a - S[2 * i]), (int)b) ^ b);
            }

            b = (ulong)(b - S[1]);
            a = (ulong)(a - S[0]);

            var aBytes = BitConverter.GetBytes((UInt32)a);
            var bBytes = BitConverter.GetBytes((UInt32)b);

            // з'єдную два масиви в один - output
            // output = aBytes + bBytes
            var outputIndex = 0;

            foreach (byte @byte in aBytes)
            {
                output[outputIndex++] = @byte;
            }

            foreach (byte @byte in bBytes)
            {
                output[outputIndex++] = @byte;
            }
        }

        public byte[] Encrypt(byte[] plainTextBytes)
        {
            var encodedTextBytes = new List<byte>();

            // розбити plainTextBytes на блоки по BB байтів
            // якщо блок недотягує до BB байтів, то доповнити його
            List<byte[]> blocks =
                plainTextBytes.Select((value, index) => new { Num = index / (int)BB, value })
                    .GroupBy(word => word.Num)
                    .Select(
                        wordGrp =>
                            {
                                // доповнюю блок байтами padCount, якщо він не дотягує до WW байт
                                var block = wordGrp.Select(word => word.value);
                                var padCount = BB - block.Count();
                                if (padCount != 0)
                                {
                                    block = block.Concat(Enumerable.Repeat((byte)padCount, padCount));
                                }
                                return block.ToArray();
                            }).ToList();

            var encryptedBlock = new byte[BB];
            Array.Copy(initializationVector, encryptedBlock, (int)BB);

            // http://upload.wikimedia.org/wikipedia/commons/d/d3/Cbc_encryption.png
            foreach (var inputBlock in blocks)
            {
                for (var i = 0; i < inputBlock.Length; i++)
                {
                    inputBlock[i] = (byte)(inputBlock[i] ^ encryptedBlock[i]);
                }

                Encrypt(inputBlock, encryptedBlock);
                encodedTextBytes.AddRange(encryptedBlock);
            }

            return encodedTextBytes.ToArray();
        }

        public byte[] Decrypt(byte[] encryptedBytes)
        {
            var plainTextBytes = new List<byte>();

            // розбити encryptedBytes на блоки по BB байтів
            List<byte[]> blocks =
                encryptedBytes.Select((value, index) => new { Num = index / (int)BB, value })
                    .GroupBy(word => word.Num)
                    .Select(wordGrp => wordGrp.Select(word => word.value).ToArray())
                    .ToList();

            var decryptedBlock = new byte[BB];
            var prevEncryptedBlock = new byte[BB];
            Array.Copy(initializationVector, prevEncryptedBlock, (int)BB);

            // http://upload.wikimedia.org/wikipedia/commons/6/66/Cbc_decryption.png
            foreach (var encryptedBlock in blocks)
            {
                Decrypt(encryptedBlock, decryptedBlock);

                for (var i = 0; i < decryptedBlock.Length; i++)
                {
                    decryptedBlock[i] = (byte)(prevEncryptedBlock[i] ^ decryptedBlock[i]);
                }

                plainTextBytes.AddRange(decryptedBlock);
                Array.Copy(encryptedBlock, prevEncryptedBlock, (int)BB);
            }

            return plainTextBytes.ToArray();
        }

        public void Encrypt(string inputFilePath, string outputFilePath)
        {
            using (var block = new RC5Block(inputFilePath, outputFilePath, BB))
            {
                // generate initialization vector
                var encryptedBlock = new byte[BB];
                //
                //
                //
                Random.NextBytes(ref encryptedBlock);
                //
                //
                //
                block.PutBlock(encryptedBlock);

                byte[] inputBlock;
                while ((inputBlock = block.ReadBlock()) != null)
                {
                    for (var i = 0; i < inputBlock.Length; i++)
                    {
                        inputBlock[i] = (byte)(inputBlock[i] ^ encryptedBlock[i]);
                    }

                    Encrypt(inputBlock, encryptedBlock);
                    block.PutBlock(encryptedBlock);
                }
            }
        }

        public void Decrypt(string inputFilePath, string outputFilePath)
        {
            using (var block = new RC5Block(inputFilePath, outputFilePath, BB))
            {
                var initializationVector = block.ReadBlock();
                var prevEncryptedBlock = new byte[BB];
                Array.Copy(initializationVector, prevEncryptedBlock, (int)BB);

                byte[] encryptedBlock;
                var decryptedBlock = new byte[BB];

                while ((encryptedBlock = block.ReadBlock()) != null)
                {
                    Decrypt(encryptedBlock, decryptedBlock);

                    for (var i = 0; i < decryptedBlock.Length; i++)
                    {
                        decryptedBlock[i] = (byte)(prevEncryptedBlock[i] ^ decryptedBlock[i]);
                    }

                    block.PutBlock(decryptedBlock);
                    Array.Copy(encryptedBlock, prevEncryptedBlock, (int)BB);
                }
            }
        }

        public string Encrypt(string plainText)
        {
            var plainTextBytes = Encoding.ASCII.GetBytes(plainText);
            var encryptedBytes = Encrypt(plainTextBytes);

            return Encoding.ASCII.GetString(encryptedBytes);
        }

        public string Decrypt(string encryptedText)
        {
            var encryptedTextBytes = Encoding.ASCII.GetBytes(encryptedText);
            var decryptedBytes = Encrypt(encryptedTextBytes);

            return Encoding.ASCII.GetString(decryptedBytes);
        }

        private long SHL(long x, long s)
        {
            return x << (int)(s & ROT_MASK);
        }

        private long SHR(long x, long s, long w)
        {
            return x >> (int)(w - (s & ROT_MASK));
        }

        private long ROTL(long x, long s, long w)
        {
            return SHL(x, s) | SHR(x, s, w);
        }

        private static UInt32 RotateLeft(ulong num, int carry)
        {
            return (UInt32)(((UInt32)num << (carry & ROT_MASK)) | ((UInt32)num >> (W - (carry & ROT_MASK))));
        }

        private static UInt32 RotateRight(ulong num, int carry)
        {
            return (UInt32)(((UInt32)num >> (carry & ROT_MASK)) | ((UInt32)num << (W - (carry & ROT_MASK))));
        }

        private static ulong Odd(double num)
        {
            var n = (ulong)num;

            return n % 2 == 0 ? n + 1 : n;
        }

        private class RC5Block : IDisposable
        {
            private string readFilePath;

            private string putFilePath;

            private FileStream readFileStream;

            private FileStream putFileStream;

            private byte[] buffer;

            private int blockSize;

            public RC5Block(string readFilePath, string putFilePath, int blockSize)
            {
                this.readFilePath = readFilePath;
                this.putFilePath = putFilePath;
                this.blockSize = blockSize;
                buffer = new byte[blockSize];

                readFileStream = new FileStream(readFilePath, FileMode.Open, FileAccess.Read);
                putFileStream = new FileStream(putFilePath, FileMode.Create, FileAccess.Write);
            }

            public byte[] ReadBlock()
            {
                var readBytesCount = readFileStream.Read(buffer, 0, blockSize);
                if (readBytesCount == 0)
                {
                    return null;
                }
                // доповлення байтів до кінця блоку.
                // має сенс, якщо відбувається закодовування файла
                if (readBytesCount < blockSize)
                {
                    var padByte = (byte)(blockSize - readBytesCount);
                    for (var i = readBytesCount; i < blockSize; i++)
                    {
                        buffer[i] = padByte;
                    }
                }

                return buffer;
            }

            public void PutBlock(byte[] block)
            {
                putFileStream.Write(block, 0, blockSize);
            }

            public void Dispose()
            {
                readFileStream.Close();
                putFileStream.Close();
            }
        }
    }
}
