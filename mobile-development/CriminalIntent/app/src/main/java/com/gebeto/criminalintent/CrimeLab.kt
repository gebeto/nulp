package com.gebeto.criminalintent

import android.content.ContentValues
import android.content.Context
import android.database.sqlite.SQLiteDatabase
import com.gebeto.criminalintent.database.CrimeBaseHelper
import com.gebeto.criminalintent.database.CrimeCursorWrapper
import java.util.*
import kotlin.collections.ArrayList
import com.gebeto.criminalintent.database.CrimeDbSchema.Companion.CrimeTable
import com.gebeto.criminalintent.database.CrimeDbSchema.Companion.CrimeTable.Companion.Cols

/**
 * CrimeLab
 * @author gebeto
 */
class CrimeLab private constructor(context: Context) {
    private var mContext: Context = context.applicationContext
    private var mDatabase: SQLiteDatabase = CrimeBaseHelper(mContext).writableDatabase

    companion object {
        private var sCrimeLab: CrimeLab? = null

        fun get(context: Context): CrimeLab {
            sCrimeLab = sCrimeLab ?: CrimeLab(context)
            return sCrimeLab!!
        }

        private fun getContentValues(crime: Crime): ContentValues {
            val values = ContentValues()
            values.put(Cols.UUID, crime.mID.toString())
            values.put(Cols.TITLE, crime.mTitle)
            values.put(Cols.DATE, crime.mDate.time)
            values.put(Cols.SOLVED, if (crime.mSolved) 1 else 0)
            return values
        }
    }

    fun getCrime(id: UUID): Crime? {
        val cursor = queryCrimesCursor("${Cols.UUID} = ?",
                Array(1, {_ -> id.toString()}))

        cursor.use {
            if (it.count == 0) {
                return null
            }
            it.moveToFirst()
            return it.getCrime()
        }
    }

    fun getCrimes(): MutableList<Crime> {
        val crimes = ArrayList<Crime>()
        val cursor: CrimeCursorWrapper = queryCrimesCursor(null, null)
        cursor.use {
            it.moveToFirst()
            while (!it.isAfterLast) {
                crimes.add(it.getCrime())
                it.moveToNext()
            }
        }
        return crimes
    }

    fun addCrime(c: Crime) {
        val values = getContentValues(c)
        mDatabase.insert(CrimeTable.NAME, null, values)
    }

    fun updateCrime(crime: Crime) {
        val uuidString = crime.mID.toString()
        val values = getContentValues(crime)
        mDatabase.update(CrimeTable.NAME, values, "${Cols.UUID} = ?",
                Array(1, { _ -> uuidString }))
    }

    fun deleteCrime(crime: Crime) {
        mDatabase.delete(CrimeTable.NAME, "${Cols.UUID} = ?",
                Array(1, { _ -> crime.mID.toString() }))
    }

    /**
     * @arg table - table to query
     * @arg columns - the columns you want values for and the order you want to receive them in
     * @arg selection - define which rows to get
     * @arg selectionArgs the values for the arguments in the where clause
     */
    private fun queryCrimesCursor(whereClause: String?, whereArgs: Array<String>?): CrimeCursorWrapper {
        val cursor = mDatabase.query(
                CrimeTable.NAME, // table
                null,            // columns - null selects all columns
                whereClause,     // selection
                whereArgs,       // selectionArgs
                null,            // groupBy
                null,            // having
                null             // orderBy
        )
        return CrimeCursorWrapper(cursor)
    }
}