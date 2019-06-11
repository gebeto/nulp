package com.gebeto.criminalintent

import android.app.Activity
import android.app.Dialog
import android.content.Intent
import android.os.Bundle
import android.support.v4.app.DialogFragment
import android.support.v7.app.AlertDialog
import android.view.LayoutInflater
import android.widget.DatePicker
import java.util.*

/**
 * DatePickerFragment
 * @author gebeto
 */
class DatePickerFragment: DialogFragment() {
    private lateinit var mDatePicker: DatePicker

    /**
     * STATICS
     */
    companion object {
        // bundle key for date
        private const val ARG_DATE = "date"
        const val EXTRA_DATE = "com.gebeto.criminalintent.date"

        // Wrap the fragment with a Bundle args
        fun newInstance(date: Date): DatePickerFragment {
            val args = Bundle()
            args.putSerializable(ARG_DATE, date)

            val fragment = DatePickerFragment()
            fragment.arguments = args
            return fragment
        }
    }

    //---------------------------------------------------------------------------------------------

    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        val date = arguments!!.getSerializable(ARG_DATE) as Date
        val calender = Calendar.getInstance()
        calender.time = date
        val year = calender.get(Calendar.YEAR)
        val month = calender.get(Calendar.MONTH)
        val day = calender.get(Calendar.DAY_OF_MONTH)

        // inflate the dialog
        val view = LayoutInflater.from(activity).inflate(R.layout.dialog_date, null)

        // get the date picker
        mDatePicker = view.findViewById<DatePicker>(R.id.dialog_date_picker)
        // set the date as the current date
        mDatePicker.init(year, month, day, null)
        return AlertDialog.Builder(activity!!.applicationContext)
                .setView(view)
                .setTitle(R.string.date_picker_title)
                // retrieves the selected date and calls sendResult
                .setPositiveButton(android.R.string.ok) { _, _ ->
                    val date = GregorianCalendar(
                            mDatePicker.year,
                            mDatePicker.month,
                            mDatePicker.dayOfMonth).time
                    sendResult(Activity.RESULT_OK, date)
                }
                .create()
    }

    /**
     * We need to send a date back to CrimeFragment and we will use an Intent extra
     *
     */
    private fun sendResult(resultCode: Int, date: Date) {
        if (targetFragment == null)  return
        val intent = Intent()
        intent.putExtra(EXTRA_DATE, date)
        targetFragment!!.onActivityResult(targetRequestCode, resultCode, intent)
    }
}