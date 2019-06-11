package com.gebeto.criminalintent

import android.support.v4.app.Fragment

/**
 * CrimeListActivity
 * @author gebeto
 */
class CrimeListActivity: SingleFragmentActivity() {
    override fun createFragment(): Fragment? = CrimeListFragment()
}