package com.gebeto.criminalintent

import android.app.Fragment
import android.os.Bundle
import android.support.v7.app.AppCompatActivity

/**
 * SingleFragmentActivity
 * @author gebeto
 */
abstract class SingleFragmentActivity: AppCompatActivity() {

    /**
     * Forces an activity to create a child fragment
     */
    protected abstract fun createFragment(): android.support.v4.app.Fragment?

    /**
     * Gives the fragment container this fragment
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_fragment)

        var fragment = supportFragmentManager.findFragmentById(R.id.fragment_container)
        if (fragment == null) {
            fragment = createFragment()
            supportFragmentManager.beginTransaction().add(R.id.fragment_container, fragment!!).commit()
        }
    }
}