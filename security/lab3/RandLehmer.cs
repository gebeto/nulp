using System;

namespace Lab3
{
	public class RandLehmer
	{
		private uint _previousValue;
		private uint _module;
		private uint _factor;
		private uint _growth;

		public RandLehmer()
		{
			_previousValue = 4;
			_module = (uint)Math.Pow(2, 11) - 1;
			_factor = (uint)Math.Pow(3, 5);
			_growth = 1;
		}

		public uint NextValue
		{
			get
			{
				var value = (_factor * _previousValue + _growth) % _module;
				_previousValue = value;
				return value;
			}
		}
	}
}
