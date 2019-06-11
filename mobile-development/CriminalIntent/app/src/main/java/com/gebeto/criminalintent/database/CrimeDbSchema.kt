package com.gebeto.criminalintent.database

/**
 * CrimeDbSchema
 * @author gebeto
 */
class CrimeDbSchema {
    /**
     * CrimeTable exists only to define the String constants needed to describe the moving pieces
     * of the table definition
     */
    companion object {
        class CrimeTable {
            companion object {
                const val NAME = "crimes"
                /**
                 * Cols exists only to define the String constants needed to describe the columns
                 * of the table
                 */
                class Cols {
                    companion object {
                        const val UUID = "uuid"
                        const val TITLE = "title"
                        const val DATE = "date"
                        const val SOLVED = "solved"
                    }
                }
            }
        }
    }
}