using System;

namespace lab_1
{
	class Program
	{
		static void Main(string[] args)
		{
			Console.WriteLine("Hello World!");
		}
	}


	public static Complex[] FFT(Complex[] data, Direction direction) {
		int n = data.Length;
		int m = Tools.Log2(n);

		// reorder data first
		ReorderData(data);

		// compute FFT
		int tn = 1, tm;

		for (int k = 1; k <= m; k++)
		{
			Complex[] rotation = FourierTransform.GetComplexRotation(k, direction);

			tm = tn;
			tn <<= 1;

			for (int i = 0; i < tm; i++)
			{
				Complex t = rotation[i];

				for (int even = i; even < n; even += tn)
				{
					int odd = even + tm;
					if ((odd < n) && even < n)
					{
						Complex ce = data[even];
						Complex co = data[odd];

						double tr = co.Re * t.Re - co.Im * t.Im;
						double ti = co.Re * t.Im + co.Im * t.Re;

						data[even].Re += tr;
						data[even].Im += ti;

						data[odd].Re = ce.Re - tr;
						data[odd].Im = ce.Im - ti;
					}
				}
			}
		}

		if (direction == Direction.Forward)
		{
			for (int i = 0; i < n; i++)
			{
				data[i].Re /= (double)n;
				data[i].Im /= (double)n;
			}
		}

		return data;
	}

	// Get array, indicating which data members should be swapped before FFT
	private static int[] GetReversedBits(int numberOfBits) {
		if ((numberOfBits < minBits) || (numberOfBits > maxBits))
			throw new ArgumentOutOfRangeException();

		// check if the array is already calculated
		if (reversedBits[numberOfBits - 1] == null)
		{
			int n = Tools.Pow2(numberOfBits);
			int[] rBits = new int[n];

			// calculate the array
			for (int i = 0; i < n; i++)
			{
				int oldBits = i;
				int newBits = 0;

				for (int j = 0; j < numberOfBits; j++)
				{
					newBits = (newBits << 1) | (oldBits & 1);
					oldBits = (oldBits >> 1);
				}
				rBits[i] = newBits;
			}
			reversedBits[numberOfBits - 1] = rBits;
		}
		return reversedBits[numberOfBits - 1];
	}

		// Get rotation of complex number
	private static Complex[] GetComplexRotation(int numberOfBits, Direction direction) {
		int directionIndex = (direction == Direction.Forward) ? 0 : 1;

		// check if the array is already calculated
		if (complexRotation[numberOfBits - 1, directionIndex] == null)
		{
			int n = 1 << (numberOfBits - 1);
			double uR = 1.0;
			double uI = 0.0;
			double angle = System.Math.PI / n * (int)direction;
			double wR = System.Math.Cos(angle);
			double wI = System.Math.Sin(angle);
			double t;
			Complex[] rotation = new Complex[n];

			for (int i = 0; i < n; i++)
			{
				rotation[i] = new Complex(uR, uI);
				t = uR * wI + uI * wR;
				uR = uR * wR - uI * wI;
				uI = t;
			}

			complexRotation[numberOfBits - 1, directionIndex] = rotation;
		}
		return complexRotation[numberOfBits - 1, directionIndex];
	}

	// Reorder data for FFT using
	private static void ReorderData(Complex[] data) {
		int len = data.Length;


		int[] rBits = GetReversedBits(Tools.Log2(len));

		for (int i = 0; i < len; i++)
		{
			int s = rBits[i];

			if (s > i && s < len)
			{
				Complex t = data[i];
				data[i] = data[s];
				data[s] = t;
			}
		}
	}
}
