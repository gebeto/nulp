using System;
using System.IO;
using System.Linq;

namespace Lab3
{
	class RC5
	{
		const int W = 32;
		const int R = 12;

		const UInt32 pw = 0xb7e15163;
		const UInt32 qw = 0x9e3779b9;

		UInt32[] L;
		UInt32[] S;

		int t;
		int b;
		int u;
		int c;

		public RC5(byte[] key)
		{
			u = W / 8;
			b = key.Length;
			c = b % u > 0 ? (b / u + 1) : (b / u);
			L = new UInt32[c]; //довжина масиву - кількість байт в ключі ділити на кількість байт в слові

			for (int i = b - 1; i >= 0; i--)
			{
				int k = i / u;
				L[k] = RotateLeft(L[k], 8) + key[i];
			}

			t = 2 * (R + 1);
			S = new UInt32[t];
			S[0] = pw;
			for (int i = 1; i < t; i++)
				S[i] = S[i - 1] + qw;

			int N = c > t ? 3 * c : 3 * t;

			UInt32 G = 0, H = 0;
			int a = 0, j = 0;
			for (int i = 0; i < N; i++)
			{
				G = S[a] = RotateLeft((S[a] + G + H), 3);
				H = L[j] = RotateLeft((L[j] + G + H), (int)(G + H));
				a = (a + 1) % t;
				j = (j + 1) % c;
			}
		}

		public void Encrypt_CBC_pad(Stream input, Stream output)
		{
			input.Position = 0;
			byte[] message = new byte[input.Length];
			input.Read(message, 0, (int)input.Length);
			int v = u * 2 - message.Length % (2 * sizeof(uint));
			message = message.Concat(Enumerable.Repeat((byte)v, v)).ToArray();
			Encrypt_CBC(new MemoryStream(message), output);
		}

		public void Decrypt_CBC_pad(Stream input, Stream output)
		{

			Stream decrypted = new MemoryStream();
			Decrypt_CBC(input, decrypted);
			decrypted.Position = 0;
			byte[] message = new byte[decrypted.Length];
			decrypted.Read(message, 0, (int)decrypted.Length);

			if (message.Length < message.Last()) output.Write(message, 0, message.Length);
			else
			{
				byte[] resultMessage = message.Take(message.Length - message.Last()).ToArray();
				output.Write(resultMessage, 0, resultMessage.Length);
			}

		}

		public void Decrypt_CBC(Stream input, Stream output)
		{

			input.Position = 0;
			var block = new byte[u * 2];
			input.Read(block, 0, u * 2);
			UInt32 a = 0, b = 0;
			a = BitConverter.ToUInt32(block, 0);
			b = BitConverter.ToUInt32(block, u);

			DecryptBlock_NoWrite(ref a, ref b);
			while (input.Position < input.Length)
			{
				input.Read(block, 0, u * 2);
				a = BitConverter.ToUInt32(block, 0);
				b = BitConverter.ToUInt32(block, u);
				DecryptBlock(ref a, ref b, output);
			}

		}

		private void DecryptBlock_NoWrite(ref uint a, ref uint b)
		{
			for (int i = R; i > 0; i--)
			{
				b = RotateRight((b - S[2 * i + 1]), (int)a) ^ a;
				a = RotateRight((a - S[2 * i]), (int)b) ^ b;
			}
			b = b - S[1];
			a = a - S[0];
		}

		public void Encrypt_CBC(Stream input, Stream output)
		{
			input.Position = 0;
			var block = new byte[u * 2];
			var random = new RandLehmer();

			UInt32 a = random.NextValue, b = random.NextValue;
			EncryptBlock(ref a, ref b, output);
			while (input.Position < input.Length)
			{
				input.Read(block, 0, u * 2);
				a = BitConverter.ToUInt32(block, 0);
				b = BitConverter.ToUInt32(block, u);
				EncryptBlock(ref a, ref b, output);
			}
		}


		//Чим заповнити пробіли в останньому блоці???
		private void EncryptBlock(ref UInt32 a, ref UInt32 b, Stream output)
		{
			a = a + S[0];
			b = b + S[1];

			for (int i = 1; i < R + 1; i++)
			{
				a = RotateLeft((a ^ b), (int)b) + S[2 * i];
				b = RotateLeft((b ^ a), (int)a) + S[2 * i + 1];
			}
			output.Write(BitConverter.GetBytes(a), 0, u);
			output.Write(BitConverter.GetBytes(b), 0, u);
		}
		private void DecryptBlock(ref UInt32 a, ref UInt32 b, Stream output)
		{
			for (int i = R; i > 0; i--)
			{
				b = RotateRight((b - S[2 * i + 1]), (int)a) ^ a;
				a = RotateRight((a - S[2 * i]), (int)b) ^ b;
			}

			b = b - S[1];
			a = a - S[0];
			output.Write(BitConverter.GetBytes(a), 0, u);
			output.Write(BitConverter.GetBytes(b), 0, u);
		}

		private UInt32 RotateLeft(UInt32 a, int offset)
		{
			UInt32 r1, r2;
			r1 = a << offset;
			r2 = a >> (W - offset);
			return (r1 | r2);
		}

		private UInt32 RotateRight(UInt32 a, int offset)
		{
			UInt32 r1, r2;
			r1 = a >> offset;
			r2 = a << (W - offset);
			return (r1 | r2);
		}
	}
}
