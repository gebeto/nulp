using System;
using System.Diagnostics;
using System.IO;
using System.Text;

namespace RC5Alg
{
	class Program
	{
		static void Main(string[] args)
		{
			Console.WriteLine("1. Encrypt");
			Console.WriteLine("2. Decrypt");

			int selectedItem = int.Parse(Console.ReadLine());

			Console.Write("Key: ");
			string password = Console.ReadLine();

			if (selectedItem == 1)
			{
				Encrypt(password);

			}
			else if (selectedItem == 2)
			{
				Decrypt(password);
			}

			Console.ReadKey();
		}


		static void Encrypt(string password)
		{
			byte[] key = Encoding.ASCII.GetBytes(password);

			RC5 rc5 = new RC5(key);

			var rawInputStream = new FileStream("encryptionData.txt", FileMode.Open, FileAccess.Read);
			var rawOutputStream = new FileStream("encrypted.txt", FileMode.OpenOrCreate, FileAccess.ReadWrite);

			rc5.Encrypt_CBC_pad(rawInputStream, rawOutputStream);

			rawInputStream.Close();
			rawOutputStream.Close();

			Process.Start("encrypted.txt");

			Console.WriteLine("The text has been encrypted successfully");
		}

		static void Decrypt(string hashKey)
		{
			byte[] key = Encoding.ASCII.GetBytes(hashKey);

			RC5 rc5 = new RC5(key);
			var rawInputStream = new FileStream("encrypted.txt", FileMode.Open, FileAccess.Read);
			var rawOutputStream = new FileStream("decrypted.txt", FileMode.OpenOrCreate, FileAccess.ReadWrite);

	
			rc5.Decrypt_CBC_pad(rawInputStream, rawOutputStream);
			rawInputStream.Close();
			rawOutputStream.Close();

			Process.Start("decrypted.txt");

			Console.WriteLine("The text has been decrypted successfully");
		}
	}
}
