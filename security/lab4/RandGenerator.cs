using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace lab4
{
    using System.IO;

    public class Generator
        {
            public int m { get; set; }
            public int a { get; set; }
            public int c { get; set; }
            public int X0 { get; set; }
            public int period { get; set; }
            public Generator(int m, int mstep, int mminus, int a, int astep, int c, int X0)
            {
                this.m = (int)Math.Pow(m, mstep) - mminus;
                this.a = (int)Math.Pow(a, astep);
                this.c = c;
                this.X0 = X0;
           }
        public Generator()
        {
            m = (int)Math.Pow(2, 24) - 1;
            a = (int)Math.Pow(11, 3);
            c = 610;
            X0 = 9;
        }

        public void NextBytes(ref byte[] b)
        {
            int tmp;
            for (int i = 0; i < b.Length; i++)
            {
                tmp = X0;
                tmp = (a * tmp + c) % m;
                X0 = tmp;
                b[i] = BitConverter.GetBytes(tmp)[0];
         
            }
        
        }


        }
   
}
