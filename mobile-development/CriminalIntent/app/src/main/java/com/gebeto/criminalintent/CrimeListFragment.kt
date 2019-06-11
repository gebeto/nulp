package com.gebeto.criminalintent

import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.text.format.DateFormat
import android.util.Log
import android.view.*
import android.widget.ImageView
import android.widget.TextView

/**
 * CrimeListFragment
 * @author gebeto
 */
class CrimeListFragment: Fragment() {

    /**
     * --------------------------------------------------------------------------------------------
     * Statics
     * --------------------------------------------------------------------------------------------
     */
    companion object {
        private var mCrimePosition = -1
        private const val SAVED_SUBTITLE_VISIBLE = "subtitle"
    }

    /**
     * --------------------------------------------------------------------------------------------
     * Instance variables
     * --------------------------------------------------------------------------------------------
     */
    private lateinit var mCrimeRecyclerView: RecyclerView
    private var mAdapter: CrimeAdapter? = null
    private var mSubtitleVisible: Boolean = false

    /**
     * --------------------------------------------------------------------------------------------
     * Class methods
     * --------------------------------------------------------------------------------------------
     */

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setHasOptionsMenu(true)
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // fragment_crime_list.xml has a RecyclerView element = crime_recycler_view
        // inflate the fragment into the activity
        val view = inflater.inflate(R.layout.fragment_crime_list, container, false)

        // grab the recyclerView and give it a required layoutManager
        mCrimeRecyclerView = view.findViewById(R.id.crime_recycler_view)
        mCrimeRecyclerView.layoutManager = LinearLayoutManager(activity)

        // restore the subtitle visibility due to destroyed activity via rotation, etc
        if (savedInstanceState != null) {
            mSubtitleVisible = savedInstanceState.getBoolean(SAVED_SUBTITLE_VISIBLE)
        }
        updateUI()
        return view
    }

    /**
     * WHen a user comes back from possibly editing a Crime, we want to reload the list UI
     * onResume is safest place to update a fragment view
     */
    override fun onResume() {
        super.onResume()
        updateUI()
        Log.d("CrimeListFragment", "onResume()")
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        outState.putBoolean(SAVED_SUBTITLE_VISIBLE, mSubtitleVisible)
    }

    /**
     * Creates a toolbar menu
     */
    override fun onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) {
        super.onCreateOptionsMenu(menu, inflater)
        inflater.inflate(R.menu.fragment_crime_list, menu)

        val subtitleItem = menu.findItem(R.id.show_subtitle)
        subtitleItem.title =
                if (mSubtitleVisible) getString(R.string.hide_subtitle)
                else getString(R.string.show_subtitle)
    }

    /**
     * Delegates what to do based on the menu item selected
     */
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        val finished =
            when(item.itemId) {
                R.id.new_crime -> {
                    val crime = Crime()
                    CrimeLab.get(activity!!.applicationContext).addCrime(crime)
                    val intent = CrimePagerActivity.newIntent(activity!!.applicationContext, crime.mID)
                    startActivity(intent)
                    return true
                }
                R.id.show_subtitle -> {
                    mSubtitleVisible = !mSubtitleVisible
                    activity!!.invalidateOptionsMenu()
                    updateSubtitle()
                    return true
                }
                else -> super.onOptionsItemSelected(item)
            }
        return finished
    }

    private fun updateSubtitle() {
        val crimeLab = CrimeLab.get(activity!!.applicationContext)
        val crimeCount = crimeLab.getCrimes().size
        val subtitle =
                if (mSubtitleVisible) resources.getQuantityString(R.plurals.subtitle_plural, crimeCount, crimeCount)
                else null
        val activity = activity as AppCompatActivity
        activity.supportActionBar!!.subtitle = subtitle
    }

    private fun updateUI() {
        val crimeLab = CrimeLab.get(activity!!.applicationContext)
        val crimes = crimeLab.getCrimes()

        if (mAdapter == null) {
            // create a new adapter
            mAdapter = CrimeAdapter(crimes)
            // Connect the adapter to the recyclerView
            mCrimeRecyclerView.adapter = mAdapter
        } else {
            if (mCrimePosition > -1) {
                mAdapter!!.notifyItemChanged(mCrimePosition)
                mCrimePosition = -1
            } else {
                mAdapter!!.setCrimes(crimes)
                mAdapter!!.notifyDataSetChanged()
            }
        }
        updateSubtitle()
    }

    /**
     * --------------------------------------------------------------------------------------------
     * INNER CLASSES
     * --------------------------------------------------------------------------------------------
     */


    /**
     * in Kotlin, we must give the view passed into the constructor directly
     * as a substitute for a super() call
     *
     * create a ViewHolder that holders the crime list item's view
     *
     * super(itemView) = super(inflater!!.inflate(R.layout.list_item_crime, parent, false))
     * MUST give it the direct value in Kotlin
     */
    private class CrimeHolder(inflater: LayoutInflater, parent: ViewGroup) :
            RecyclerView.ViewHolder(inflater.inflate(R.layout.list_item_crime, parent, false)),
            View.OnClickListener {

        private lateinit var mCrime: Crime
        private var mTitleTextView: TextView = itemView.findViewById(R.id.crime_title)
        private var mDateTextView: TextView = itemView.findViewById(R.id.crime_date)
        private var mSolvedImageView: ImageView = itemView.findViewById(R.id.crime_solved)

        init {
            itemView.setOnClickListener(this)
        }


        /**
         * When given a crime, this CrimeHolder will update the title and date for this Crime
         */
        fun bind(crime: Crime) {
            mCrime = crime
            mTitleTextView.text = mCrime.mTitle
            mDateTextView.text = DateFormat.format("EEEE, MMM d, yyyy", mCrime.mDate)
            mSolvedImageView.visibility = if (crime.mSolved) View.VISIBLE else View.GONE
        }

        override fun onClick(p0: View) {
            mCrimePosition = adapterPosition
            p0.context.startActivity(CrimePagerActivity.newIntent(p0.context, mCrime.mID))
        }
    }


    private class CrimeAdapter(private var mCrimes: MutableList<Crime>):
            RecyclerView.Adapter<CrimeHolder>() {

        /**
         * - Calls our CrimeHolder to make our custom ViewHolders
         * - Called by RecyclerView when it needs a new view to display
         * - Gets the layoutInflater from the ViewGroup and returns a CrimeHolder of it
         */
        override fun onCreateViewHolder(parent: ViewGroup?, viewType: Int): CrimeHolder
                = CrimeHolder(LayoutInflater.from(parent!!.context), parent)


        /**
         * Bind the crime (data) to the CrimeHolder
         */
        override fun onBindViewHolder(holder: CrimeHolder, position: Int) {
            holder.bind(CrimeLab.get(holder.itemView.context).getCrimes()[position])
        }

        /**
         * Sees how many items are in the RecyclerView that need to be shown
         */
        override fun getItemCount(): Int = mCrimes.size

        fun setCrimes(crimes: MutableList<Crime>) {
            mCrimes = crimes
        }
    }
}