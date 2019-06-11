package com.gebeto.criminalintent.database

import android.database.Cursor
import android.database.CursorWrapper
import com.gebeto.criminalintent.Crime
import com.gebeto.criminalintent.database.CrimeDbSchema.Companion.CrimeTable.Companion.Cols
import java.util.*

/**
 * CrimeCursorWrapper
 * @author gebeto
 */
class CrimeCursorWrapper(cursor: Cursor): CursorWrapper(cursor) {
    fun getCrime(): Crime {
        val uuidString = getString(getColumnIndex(Cols.UUID))
        val title = getString(getColumnIndex(Cols.TITLE))
        val date = getLong(getColumnIndex(Cols.DATE))
        val isSolved = getInt(getColumnIndex(Cols.SOLVED))

        val crime = Crime(UUID.fromString(uuidString))
        crime.mTitle = title
        crime.mDate = Date(date)
        crime.mSolved = isSolved != 0

        return crime
    }
}