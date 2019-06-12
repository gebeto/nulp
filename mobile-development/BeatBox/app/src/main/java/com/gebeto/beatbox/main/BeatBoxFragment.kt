package com.gebeto.beatbox.main

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.GridLayoutManager
import com.gebeto.beatbox.R
import com.gebeto.beatbox.sound.*
import kotlinx.android.synthetic.main.fragment_beat_box.*

private const val SPAN_COUNT = 4

class BeatBoxFragment : Fragment() {
    private lateinit var adapter: SoundAdapter
    private lateinit var beatBox: BeatBoxModel

    companion object {
        @JvmStatic
        fun newInstance() = BeatBoxFragment()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        retainInstance = true

        beatBox = BeatBoxModel(requireActivity().applicationContext)
        beatBox.loadSounds()
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View? = inflater.inflate(R.layout.fragment_beat_box, container, false)

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        initRecyclerView()
    }

    override fun onDestroy() {
        beatBox.release()
        super.onDestroy()
    }

    private fun initRecyclerView() {
        adapter = SoundAdapter(beatBox)
        recyclerView.layoutManager = GridLayoutManager(activity, SPAN_COUNT)
        recyclerView.adapter = adapter
        adapter.setSounds(beatBox.sounds)
    }
}
