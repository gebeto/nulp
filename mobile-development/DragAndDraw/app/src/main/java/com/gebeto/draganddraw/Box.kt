package com.gebeto.draganddraw

import android.graphics.PointF

class Box {
    private var mOrigin: PointF = PointF()
    private var mCurrent: PointF = PointF()

    constructor(origin: PointF) {
        mOrigin = origin;
        mCurrent = origin;
    }

    fun getCurrent(): PointF {
        return mCurrent;
    }

    fun setCurrent(current: PointF) {
        mCurrent = current;
    }

    fun getOrigin(): PointF {
        return mOrigin;
    }
}