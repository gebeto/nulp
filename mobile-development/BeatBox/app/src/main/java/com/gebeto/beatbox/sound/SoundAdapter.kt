package com.gebeto.beatbox.sound

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.recyclerview.widget.RecyclerView
import com.gebeto.beatbox.main.*
import com.gebeto.beatbox.R
import com.gebeto.beatbox.databinding.ListItemSoundBinding


class SoundAdapter(private val beatBox: BeatBoxModel) : RecyclerView.Adapter<SoundAdapter.SoundHolder>() {
    private val sounds = arrayListOf<SoundModel>()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SoundHolder {
        val inflater = LayoutInflater.from(parent.context)
        val binding = DataBindingUtil
            .inflate<ListItemSoundBinding>(
                inflater,
                R.layout.list_item_sound,
                parent, false
            )
        return SoundHolder(binding, beatBox)
    }

    override fun getItemCount(): Int = sounds.size

    override fun onBindViewHolder(holder: SoundHolder, position: Int) {
        val sound = sounds[position]
        holder.bind(sound)
    }

    fun setSounds(sounds: List<SoundModel>) {
        this.sounds.clear()
        this.sounds.addAll(sounds)
        notifyDataSetChanged()
    }

    class SoundHolder(
        private val binding: ListItemSoundBinding,
        beatBox: BeatBoxModel) : RecyclerView.ViewHolder(binding.root) {

        init {
            binding.viewModel = SoundViewModel(beatBox)
        }

        fun bind(sound: SoundModel) {
            binding.viewModel!!.sound = sound
            binding.executePendingBindings()
        }
    }
}
