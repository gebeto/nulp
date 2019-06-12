package com.gebeto.beatbox.main

import androidx.fragment.app.Fragment
import com.gebeto.beatbox.SingleFragmentActivity

open class BeatBoxActivity : SingleFragmentActivity() {
    override fun createFragment(): Fragment = BeatBoxFragment.newInstance()
}
