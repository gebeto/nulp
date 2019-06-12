package com.gebeto.draganddraw

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.PointF
import android.os.Parcelable
import android.util.AttributeSet
import android.util.Log
import android.view.MotionEvent
import android.view.View



class BoxDrawingView : View {
    private var mCurrentBox: Box? = null
    private val mBoxen = ArrayList<Box>()

    private val mBoxPaint: Paint = Paint()
    private val mBackgroundPaint: Paint = Paint();

    constructor(context: Context, attributes: AttributeSet?) : super(context, attributes!!) {
        mBoxPaint.setARGB(64, 255, 0, 0);
        mBackgroundPaint.setARGB(255, 255, 255, 255);
    }

    override fun onTouchEvent(event: MotionEvent?): Boolean {
        val current = PointF(event!!.getX(), event.getY());
        var action = "";
        if (event.action == MotionEvent.ACTION_DOWN) {
            action = "ACTION_DOWN"
            mCurrentBox = Box(current);
            mBoxen.add(mCurrentBox!!);
        } else if (event.action == MotionEvent.ACTION_MOVE) {
            if (mCurrentBox != null) {
                mCurrentBox!!.setCurrent(current);
                invalidate();
            }
            action = "ACTION_MOVE"
        } else if (event.action == MotionEvent.ACTION_UP) {
            action = "ACTION_UP"
            mCurrentBox = null;
        } else if (event.action == MotionEvent.ACTION_CANCEL) {
            action = "ACTION_CANCEL"
            mCurrentBox = null;
        }
        Log.i(TAG, action + " at x=" + current.x + ", y=" + current.y);
        return true
    }

    override fun onDraw(canvas: Canvas?) {
        super.onDraw(canvas);

        canvas!!.drawPaint(mBackgroundPaint);
        for (box: Box in mBoxen) {
            val left = Math.min(box.getOrigin().x, box.getCurrent().x)
            val right = Math.max(box.getOrigin().x, box.getCurrent().x)
            val top = Math.min(box.getOrigin().y, box.getCurrent().y)
            val bottom = Math.max(box.getOrigin().y, box.getCurrent().y)
            canvas.drawRect(left, top, right, bottom, mBoxPaint)
        }
    }

    companion object {
        private const val TAG: String = "BoxDrawingView"
    }
}