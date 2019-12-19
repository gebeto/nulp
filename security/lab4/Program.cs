using System;
using System.IO;
using System.Text;
using System.Diagnostics;
using System.Security.Cryptography;


namespace lab4
{
    public class Program
    {
        public static void Main(string[] args)
        {
        	_RC5("KEY");
        	_RSA();
        }

        public static void _RC5(string key) {
			RC5 rc5 = new RC5(Encoding.ASCII.GetBytes(key), 12);

			var watch = System.Diagnostics.Stopwatch.StartNew();
			for (int i = 0; i < 1000; i++) {
				rc5.Encrypt("Input.txt", "RC5_Encrypted.txt");
			}
			watch.Stop();
			Console.WriteLine(String.Format("RC5 Encrypt: {0} milliseconds.", watch.ElapsedMilliseconds));
        }

        public static void _RSA() {
			Rsa rsa = new Rsa(64, 128);
        	File.WriteAllBytes("RSA_PublicKey.txt", rsa.rsaProvider.ExportCspBlob(false));
        	File.WriteAllBytes("RSA_PrivateKey.txt", rsa.rsaProvider.ExportCspBlob(true));

			var watch = System.Diagnostics.Stopwatch.StartNew();
			for (int i = 0; i < 1000; i++) {
				rsa.Cipher("Input.txt", "RSA_Encrypted.txt", "RSA_PublicKey.txt");
			}

			watch.Stop();
			Console.WriteLine(String.Format("RSA Encrypt: {0} milliseconds.", watch.ElapsedMilliseconds));
        }
    }
}