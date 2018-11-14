using System;

namespace lab_1
{
    public interface IFrameChangeArgs
    {
        int Time { get; set; }
    }

    public delegate void FrameChangeHandler(object sender, IFrameChangeArgs args);
}
