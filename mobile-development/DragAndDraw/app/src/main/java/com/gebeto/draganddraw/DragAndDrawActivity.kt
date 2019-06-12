package com.gebeto.draganddraw


import android.support.v4.app.Fragment


class DragAndDrawActivity : SingleFragmentActivity() {
    override fun createFragment(): Fragment {
        return DragAndDrawFragment.newInstance()
    }

}
