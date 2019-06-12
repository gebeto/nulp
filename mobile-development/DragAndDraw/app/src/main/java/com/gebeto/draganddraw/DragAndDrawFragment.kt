package com.gebeto.draganddraw

import android.content.Context
import android.net.Uri
import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup


class DragAndDrawFragment : Fragment() {
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_drag_and_draw, container, false)
    }

    companion object {
        private const val TAG: String = "NerdLauncherFragment"
        fun newInstance(): DragAndDrawFragment {
            return DragAndDrawFragment()
        }
    }
}
