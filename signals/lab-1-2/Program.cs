using System;

namespace lab_1_2
{
	class Program
	{
	
		static void Main(string[] args)
		{
			StreamWriter str = new StreamWriter("ak_koef.txt");
			StreamWriter str2 = new StreamWriter("bk_koef.txt");
			string fileName = "error.txt";
			FileStream aFile = new FileStream(fileName, FileMode.OpenOrCreate);
			StreamWriter sw = new StreamWriter(aFile);
			aFile.Seek(0, SeekOrigin.End);
			double result = func(2);
			Console.Write("Result: " + result + '\n');
			double furier = fourier(2, str, str2);
			Console.Write("Fourier: " + furier);

			double calculationError = Math.Abs(result - furier);
			
			Console.Write('\n' + "Calculation error: " + Convert.ToDouble(string.Format("{0:0.0000000}", calculationError)));
		   
			sw.WriteLine("Calculation error: " + Convert.ToDouble(string.Format("{0:0.0000000}", calculationError)));
			sw.WriteLine("N = 6000");
			sw.Close();
			Console.ReadKey();
		}
		
		public static double fourier(double x, StreamWriter str, StreamWriter str2)
		{
			int N = 1000;
			double fur = a0()/2;
			for (int i = 1; i < N; i++)
			{
			   fur += ak_koef(i, str) * Math.Cos(x * i) + bk_koef(i, str2) * Math.Sin(x * i); 
			}
			return fur;
		}
		public static double func(double x)
		{
			int n = 4;
			double f = Math.Pow(x, n) * Math.Exp(-(Math.Pow(x, 2) / n));
			return f;
		}
		public static double ak_koef (int k, StreamWriter str)
		{
			double ak_koef = 1 / Math.PI * a_integr(k);
			
			str.WriteLine(ak_koef);
			
			return ak_koef;
		}
		public static double a_integr(double k)
		{
			double xi, xi1, sum = 0, res = 0;
			double a = -Math.PI;
			double b = Math.PI;
			int n = 4000;
			double h = (b - a) / n;
			for (int i = 0; i < n; i++)
			{
				xi = a + i * h;
				xi1 = a + (i + 1) * h;
				sum += func(xi) * Math.Cos(k * xi) + func(xi1) * Math.Cos(k * xi1);
			}
			res = sum * h / 2;
			return Convert.ToDouble(string.Format("{0:0.0000000}", res));
		}
		public static double a0()
		{
			double ak_koef = 1 / Math.PI * a0_integr();
			return ak_koef;
		}
		public static double a0_integr()
		{
			double xi, xi1, sum = 0, res = 0;
			double a = -Math.PI;
			double b = Math.PI;
			int n = 40000;
			double h = (b - a) / n;
			for (int i = 0; i < n; i++)
			{
				xi = a + i * h;
				xi1 = a + (i + 1) * h;
				sum += func(xi) + func(xi1);
			}
			res = sum * h / 2;
			return Convert.ToDouble(string.Format("{0:0.0000000}", res));
		}
		public static double bk_koef(int k, StreamWriter str2)
		{
			double bk_koef = 1 / Math.PI * b_integr(k);
			str2.WriteLine(bk_koef);
			return bk_koef;
		}
		public static double b_integr(double k)
		{
			double xi, xi1, sum = 0, res = 0;
			double a = -Math.PI;
			double b = Math.PI;
			int n = 400;
			double h = (b - a) / n;
			for (int i = 0; i < n; i++)
			{
				xi = a + i * h;
				xi1 = a + (i + 1) * h;
			  
				sum += func(xi) * Math.Sin(k * xi) + func(xi1) * Math.Sin(k * xi1);
			}
			res = sum * h / 2;
			return res;
		}
	}
}
