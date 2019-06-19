using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace lab_3
{
    class Program
    {
        static void Main(string[] args)
        {
            int N = 10000;
            var st = new double[N];
            while (true)
            {
                StreamWriter input = new StreamWriter("input.txt");

                for (int i = 0; i < st.Length; i++)
                {
                    st[i] = Math.Cos(Math.PI * 1 / N * i);
                    input.WriteLine("var" + i + " = " + st[i]);
                }

                input.Close();

                Console.Write(
                    "Choose way:\n1 - Forward DFT\n2 - Backward DFT\n3 - Forward FFT\n4 - Backward FFT\n0 - Exit\n >> ");

                string value = Console.ReadLine();
				if (value == "0")
				{
				    System.Environment.Exit(1);
				}
                else if (value == "1")
                {
                    Console.Write("Starting DFT...\n");

                    var watch = System.Diagnostics.Stopwatch.StartNew();
                    var d = PreTransform(st);
                    double normalizer = 1.0 / st.Length * 2;
                    Complex[] inputSignal = new Complex[N];
                    for (int i = 0; i < d.Item1.Length; i++)
                    {
                        Complex temp = new Complex(d.Item1[i] * normalizer, d.Item2[i] * normalizer);
                        inputSignal[i] = temp;
                    }

                    var res = FourierTransform.DFT(inputSignal, FourierTransform.Direction.Forward);
                    watch.Stop();
                    var elapsedMs = watch.ElapsedMilliseconds;

                    StreamWriter complexNumberStream = new StreamWriter("output.txt");

                    for (int i = 0; i < res.Length; i++)
                    {
                        complexNumberStream.WriteLine("real" + i + " = " + res[i].Re);
                        complexNumberStream.WriteLine("imag" + i + " = " + res[i].Im);
                    }

                    complexNumberStream.Close();

                    Console.Write("Count of operations [O(N^2)]: " + N * N + "\n");
                    Console.Write("Forward DFT execution time: " + elapsedMs + " ms \nForward DFT Complete! Check info in txt files!\n\n\n");

                }
                else if (value == "2")
                {
                    Console.Write("Starting Backward DFT...\n");

                    var watch = System.Diagnostics.Stopwatch.StartNew();
                    var d = PreTransform(st);
                    double normalizer = 1.0 / st.Length * 2;
                    Complex[] inputSignal = new Complex[N];
                    for (int i = 0; i < d.Item1.Length; i++)
                    {
                        Complex temp = new Complex(d.Item1[i] * normalizer, d.Item2[i] * normalizer);
                        inputSignal[i] = temp;
                    }

                    var res = FourierTransform.DFT(inputSignal, FourierTransform.Direction.Backward);
                    watch.Stop();
                    var elapsedMs = watch.ElapsedMilliseconds;

                    StreamWriter complexNumberStream = new StreamWriter("output.txt");

                    for (int i = 0; i < res.Length; i++)
                    {
                        complexNumberStream.WriteLine("real" + i + " = " + res[i].Re);
                        complexNumberStream.WriteLine("imag" + i + " = " + res[i].Im);
                    }

                    complexNumberStream.Close();

                    Console.Write("Backward DFT execution time: " + elapsedMs + " ms \nBackward DFT Complete! Check info in txt files!\n\n\n");

                }
                else if (value == "3")
                {
                    Console.Write("Starting FFT...\n");

                    var watch = System.Diagnostics.Stopwatch.StartNew();
                    var d = PreTransform(st);
                    double normalizer = 1.0 / st.Length * 2;
                    Complex[] inputSignal = new Complex[N];
                    for (int i = 0; i < d.Item1.Length; i++)
                    {
                        Complex temp = new Complex(d.Item1[i] * normalizer, d.Item2[i] * normalizer);
                        inputSignal[i] = temp;
                    }

                    var res = FourierTransform.FFT(inputSignal, FourierTransform.Direction.Forward);
                    watch.Stop();
                    var elapsedMs = watch.ElapsedMilliseconds;

                    StreamWriter complexNumberStream = new StreamWriter("output.txt");

                    for (int i = 0; i < res.Length; i++)
                    {
                        complexNumberStream.WriteLine("real" + i + " = " + res[i].Re);
                        complexNumberStream.WriteLine("imag" + i + " = " + res[i].Im);
                    }

                    complexNumberStream.Close();

                    Console.Write("Count of operations [O(N*log2(N))]: " + N * Tools.Log2(N) + "\n");
                    Console.Write("Forward FFT execution time: " + elapsedMs +
                                  " ms \nForward FFT Complete! Check info in txt files!\n\n\n");

                }
                else if (value == "4")
                {
                    Console.Write("Starting Backward FFT...\n");

                    var watch = System.Diagnostics.Stopwatch.StartNew();
                    var d = PreTransform(st);
                    double normalizer = 1.0 / st.Length * 2;
                    Complex[] inputSignal = new Complex[N + 1];
                    for (int i = 0; i < N; i++)
                    {
                        Complex temp = new Complex(d.Item1[i] * normalizer, d.Item2[i] * normalizer);
                        inputSignal[i] = temp;
                    }

                    var res = FourierTransform.FFT(inputSignal, FourierTransform.Direction.Backward);
                    watch.Stop();
                    var elapsedMs = watch.ElapsedMilliseconds;

                    StreamWriter complexNumberStream = new StreamWriter("output.txt");

                    for (int i = 0; i < res.Length; i++)
                    {
                        complexNumberStream.WriteLine("real" + i + " = " + res[i].Re);
                        complexNumberStream.WriteLine("imag" + i + " = " + res[i].Im);
                    }

                    complexNumberStream.Close();

                    Console.Write("FFT execution time: " + elapsedMs + " ms \nBackward FFT Complete! Check info in txt files!\n\n\n");

                }
                else
                {
                    Console.WriteLine("Invalid key!");
                }
            }
        }

        // трансформація у валідний сигнал для перетворень
        public static Tuple<double[], double[]> PreTransform(double[] input, int partials = 0)
        {
            int len = input.Length;
            double[] cosDFT = new double[len];
            double[] sinDFT = new double[len];

            if (partials == 0)
                partials = len / 2;

            for (int n = 0; n <= partials; n++)
            {
                double cos = 0.0;
                double sin = 0.0;

                for (int i = 0; i < len; i++)
                {
                    cos += input[i] * Math.Cos(2 * Math.PI * n / len * i);
                    sin += input[i] * Math.Sin(2 * Math.PI * n / len * i);
                }

                cosDFT[n] = cos;
                sinDFT[n] = sin;
            }

            return new Tuple<double[], double[]>(cosDFT, sinDFT);
        }
    }
}