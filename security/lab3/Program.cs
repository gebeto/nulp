using System;
using System.Diagnostics;
using System.IO;
using System.Text;

namespace Lab3
{

	public class CommandObject
	{
		public string Key{get;set;}
		public string Input{get;set;}
		public string Output{get;set;}

	    public bool Encrypt{get;set;}
		public bool Decrypt{get;set;}
	}

	class Program
	{
		static void Main(string[] args)
		{
			var command = Args.Configuration.Configure<CommandObject>().CreateAndBind(args);

			byte[] key = Encoding.ASCII.GetBytes(command.Key);
			RC5 rc5 = new RC5(key);
			var rawInputStream = new FileStream(command.Input, FileMode.Open, FileAccess.Read);
			var rawOutputStream = new FileStream(command.Output, FileMode.OpenOrCreate, FileAccess.ReadWrite);

			string method = "";
			if (command.Encrypt && command.Input.Length > 0) {
				rc5.Encrypt_CBC_pad(rawInputStream, rawOutputStream);
				method = "Encrypted";
			} else if (command.Decrypt) {
				rc5.Decrypt_CBC_pad(rawInputStream, rawOutputStream);
				method = "Decrypted";
			}

			rawInputStream.Close();
			rawOutputStream.Close();

			Console.WriteLine(String.Format("{0} \"{1}\" has been saved in \"{2}\"", method, command.Input, command.Output));

		}

	}
}
