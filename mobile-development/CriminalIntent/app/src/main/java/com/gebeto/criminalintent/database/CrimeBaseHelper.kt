package com.gebeto.criminalintent.database

import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper
import com.gebeto.criminalintent.database.CrimeDbSchema.Companion.CrimeTable
import com.gebeto.criminalintent.database.CrimeDbSchema.Companion.CrimeTable.Companion.Cols

/**
 * CrimeBaseHelper
 * @author gebeto
 */
class CrimeBaseHelper(context: Context) : SQLiteOpenHelper(context, DATABASE_NAME, null, VERSION) {
    companion object {
        private const val VERSION = 1
        private const val DATABASE_NAME = "crimeBase.db"
    }

    override fun onCreate(p0: SQLiteDatabase?) {
        p0?.execSQL("create table ${CrimeTable.NAME} (_id integer primary key autoincrement,"
        + "${Cols.UUID}, ${Cols.TITLE}, ${Cols.DATE}, ${Cols.SOLVED})")
    }

    override fun onUpgrade(p0: SQLiteDatabase?, p1: Int, p2: Int) {}
}