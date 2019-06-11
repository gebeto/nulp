package com.gebeto.criminalintent

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.support.v4.app.Fragment
import android.text.Editable
import android.text.TextWatcher
import android.view.*
import android.widget.*
import java.util.*

/**
 * CrimeFragment
 * @author gebeto
 */
class CrimeFragment: Fragment() {
    /**
     * STATICS
     */
    companion object {
        private const val ARG_CRIME_ID = "crime_id"
        private const val DIALOG_DATE = "DialogDate"
        private const val REQUEST_DATE = 0

        /**
         * Wraps the logic for making the bundle args, giving them to fragment,
         * and making the fragment
         */
        fun newInstance(crimeID: UUID): CrimeFragment {
            val args = Bundle()
            args.putSerializable(ARG_CRIME_ID, crimeID)
            val fragment = CrimeFragment()
            fragment.arguments = args
            return fragment
        }
    }

    /**
     * --------------------------------------------------------------------------------------------
     * Instance variables
     */
    private lateinit var mCrime: Crime
    private lateinit var mTitleField: EditText
    private lateinit var mDateButton: Button
    private lateinit var mSolvedCheckbox: CheckBox

    /**
     * --------------------------------------------------------------------------------------------
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Grab the crimeID from the Intent bundle
        mCrime = CrimeLab.get(activity!!.applicationContext)
                .getCrime(arguments!!.getSerializable(ARG_CRIME_ID) as UUID)!!
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        // super.onCreateView(inflater!!, container, savedInstanceState);
        // inflates the fragment's view
        val v = inflater!!.inflate(R.layout.fragment_crime, container, false)

        // get the EditText from the view
        mTitleField = v.findViewById(R.id.crime_title)

        //set the EditText text to Crime's title, but still Editable
        mTitleField.setText(mCrime.mTitle, TextView.BufferType.EDITABLE)

        // set the Crime's title to the text in the EditText
        mTitleField.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int){}

            override fun afterTextChanged(p0: Editable?){}

            override fun onTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
                mCrime.mTitle = p0.toString()
            }
        })

        // get the Date Button from the view
        mDateButton = v.findViewById(R.id.crime_date)

        // make the button text the Crime's date text
        updateDate()

        // if the Date button is clicked, a DatePicker dialog fragment is shown
        mDateButton.setOnClickListener {
            val dialog = DatePickerFragment.newInstance(mCrime.mDate)
            /**
             * Make CrimeFragment the target fragment of the DatePickerFragment
             * Passes in a request code to know how to go back
             */
            dialog.setTargetFragment(CrimeFragment@this, REQUEST_DATE)
            dialog.show(fragmentManager, DIALOG_DATE)
        }

        // get the Checkbox from the view
        mSolvedCheckbox = v.findViewById(R.id.crime_solved)
        mSolvedCheckbox.isChecked = mCrime.mSolved

        // changed whether the crime was solved via checkbox listener
        mSolvedCheckbox.setOnCheckedChangeListener { _, p1 -> mCrime.mSolved = p1 }

        // return the view with all its active components to the screen
        return v
    }

    override fun onPause() {
        super.onPause()
        CrimeLab.get(activity!!.applicationContext).updateCrime(mCrime)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) {
        if (resultCode != Activity.RESULT_OK) return
        if (requestCode == REQUEST_DATE) {
            mCrime.mDate = data.getSerializableExtra(DatePickerFragment.EXTRA_DATE) as Date
            updateDate()
        }
    }


    private fun updateDate() {
        mDateButton.text = mCrime.mDate.toString()
    }
}