using System.IO;
using System.Security.Cryptography;


namespace lab4
{
	public class Rsa
	{
		public RSACryptoServiceProvider rsaProvider;
		public int CipherKeyLength { get; set; }
		public int DecipherKeyLength { get; set; }

		public Rsa(int c, int d)
		{
			rsaProvider = new RSACryptoServiceProvider(1024);
			CipherKeyLength = c;
			DecipherKeyLength = d;
		}

		public void Cipher(string input, string output, string pbKey)
		{
			rsaProvider.ImportCspBlob(File.ReadAllBytes(pbKey));
			var iStream = new FileStream(input, FileMode.Open);
			var oStream = new FileStream(output, FileMode.OpenOrCreate);


			var size = new FileInfo(input).Length;
			var length = size < CipherKeyLength ? size : CipherKeyLength;
			var bytes = new byte[length];
			while (true)
			{
				length = iStream.Read(bytes, 0, (int)length);
				if (length == 0) break;
				var ciphered = rsaProvider.Encrypt(bytes, false);
				oStream.Write(ciphered, 0, ciphered.Length);
			}
			iStream.Close();
			oStream.Close();
		}

		public void Decipher(string input, string output, string prKey)
		{
			rsaProvider.ImportCspBlob(File.ReadAllBytes(prKey));
			var iStream = new FileStream(input, FileMode.Open);
			var oStream = new FileStream(output, FileMode.Create);
			var bytes = new byte[DecipherKeyLength];
			var length = DecipherKeyLength;
			while (length == DecipherKeyLength)
			{
				length = iStream.Read(bytes, 0, DecipherKeyLength);
				if (length == 0) break;
				var deciphered = rsaProvider.Decrypt(bytes, false);


				oStream.Write(deciphered, 0, deciphered.Length);
			}
			iStream.Close();
			oStream.Close();
		}
	}
}
