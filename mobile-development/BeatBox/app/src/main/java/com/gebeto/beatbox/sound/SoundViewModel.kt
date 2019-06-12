package com.gebeto.beatbox.sound

import androidx.databinding.BaseObservable
import androidx.databinding.Bindable
import com.gebeto.beatbox.main.*

class SoundViewModel(private val beatBox: BeatBoxModel) : BaseObservable() {
    var sound: SoundModel? = null
        set(value) {
        field = value
        notifyChange()
    }

    @Bindable
    fun onButtonClicked() {
        sound?.let {
            beatBox.play(it)
        }
    }
}
