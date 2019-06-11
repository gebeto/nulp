package com.gebeto.criminalintent

import java.util.*

/**
 * Crime
 * @author gebeto
 */
class Crime(val mID: UUID = UUID.randomUUID(),
                 var mDate: Date = Date(),
                 var mTitle: String? = null,
                 var mSolved: Boolean = false) {

    constructor(id: UUID): this(id, Date(), null, false)
}