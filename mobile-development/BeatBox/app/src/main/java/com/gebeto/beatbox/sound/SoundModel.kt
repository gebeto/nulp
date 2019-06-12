package com.gebeto.beatbox.sound

private const val SEPARATOR = "/"
private const val EXTENSION = ".wav"
private const val EMPTY = ""
private const val POSITION = 1

data class SoundModel(val assetPath: String) {

    val name: String
    var soundId: Int? = null

    init {
        val components = assetPath.split(SEPARATOR)
        val fileName = components[components.size - POSITION]
        name = fileName.replace(EXTENSION, EMPTY)
    }
}
