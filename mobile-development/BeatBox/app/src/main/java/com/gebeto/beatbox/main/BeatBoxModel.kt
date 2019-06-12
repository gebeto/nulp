package com.gebeto.beatbox.main

import android.content.Context
import android.content.res.AssetManager
import android.media.AudioManager
import android.media.SoundPool
import android.util.Log
import com.gebeto.beatbox.sound.*
import java.io.IOException

private const val SOUNDS_FOLDER = "sample_sounds"
private const val MAX_SOUNDS = 5

@Suppress("DEPRECATION")
class BeatBoxModel(context: Context) {

    val sounds = mutableListOf<SoundModel>()

    private val TAG = BeatBoxModel::class.java.simpleName

    private val assetManager: AssetManager = context.assets
    private val soundPool: SoundPool by lazy { SoundPool(MAX_SOUNDS, AudioManager.STREAM_MUSIC, 0) }

    init {
        loadSounds()
    }

    fun play(sound: SoundModel) {
        sound.soundId?.let {
            soundPool.play(it, 1.0F, 1.0F, 1, 0, 1.0F)
        }
    }

    fun release() {
        soundPool.release()
    }

    fun loadSounds() {
        val soundNames: Array<String>?
        try {
            soundNames = assetManager.list(SOUNDS_FOLDER)
            Log.i(TAG, "Found ${soundNames.size} sounds")
        } catch (e: IOException) {
            Log.e(TAG, "Could not list assets", e)
            return
        }
        soundNames.forEach {
            try {
                val assetPath = "$SOUNDS_FOLDER/$it"
                val sound = SoundModel(assetPath)
                load(sound)
                sounds.add(sound)
            } catch (ioe: IOException) {
                Log.e(TAG, "Could not load sound $it", ioe)
            }
        }
    }

    private fun load(sound: SoundModel) {
        val assetFileDescriptor = assetManager.openFd(sound.assetPath)
        val soundId = soundPool.load(assetFileDescriptor, 1)
        sound.soundId = soundId
    }
}
