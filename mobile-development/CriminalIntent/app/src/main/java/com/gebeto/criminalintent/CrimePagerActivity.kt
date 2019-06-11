package com.gebeto.criminalintent

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v4.app.FragmentStatePagerAdapter
import android.support.v4.view.ViewPager
import android.support.v7.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_crime_pager.*
import java.util.*

/**
 * CrimePagerActivity
 * @author gebeto
 */
class CrimePagerActivity: AppCompatActivity() {
    private lateinit var mViewPager: ViewPager
    private lateinit var mCrimes: List<Crime>

    companion object {
        private const val EXTRA_CRIME_ID = "com.gebeto.criminalintent.crime_id"

        /**
         * Creates an Intent that holds the crimeID passed in
         */
        fun newIntent(packageContext: Context, crimeID: UUID): Intent {
            val intent = Intent(packageContext, CrimePagerActivity::class.java)
            intent.putExtra(EXTRA_CRIME_ID, crimeID)
            return intent
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_crime_pager)

        val crimeID = intent.getSerializableExtra(EXTRA_CRIME_ID) as UUID
        // get the ViewPager layout
        mViewPager = findViewById<ViewPager>(R.id.crime_view_pager)
        // get the list of crimes
        mCrimes = CrimeLab.get(this).getCrimes()



        /**
         * give the ViewPager a PagerAdapter which requires the FragmentManager
         * and must implement getItem and getCount
        */
        mViewPager.adapter = (object: FragmentStatePagerAdapter(supportFragmentManager) {
            /** fetches the Crime instance for the position and returns a CrimeFragment
             * associated with the Crime ID
             */
            override fun getItem(position: Int): Fragment {
                val crime = mCrimes[position]
                return CrimeFragment.newInstance(crime.mID)
            }

            // returns the number of items in the array list
            override fun getCount(): Int = mCrimes.size
        })

        // Set the view to the Crime associated with the ID
        var i = 0
        var found = false
        while (i < mCrimes.size && !found) {
            if (mCrimes[i].mID == crimeID) {
                mViewPager.currentItem = i
                found = true
            }
            i++
        }

        /**
         * Add a Listener to whenever the user moves between pages to see if we are on the
         * first or last page to disable the buttons
         */
        mViewPager.addOnPageChangeListener(object: ViewPager.OnPageChangeListener {
            override fun onPageScrollStateChanged(state: Int) {}
            override fun onPageScrolled(position: Int, positionOffset: Float, positionOffsetPixels: Int) {}
            override fun onPageSelected(position: Int) {
                to_first.isEnabled = position != 0
                to_last.isEnabled = position != mCrimes.size - 1
            }
        })

        // set a listener on the First button to set the ViewPager to item 0 aka first crime
        to_first.setOnClickListener { mViewPager.currentItem = 0 }

        // set a listener on the Last button to set the ViewPager to item size-1 aka last crime
        to_last.setOnClickListener { mViewPager.currentItem = mCrimes.size - 1 }
    }
}