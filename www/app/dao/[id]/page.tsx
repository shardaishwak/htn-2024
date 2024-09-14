'use client'
import React from 'react'
import { useParams } from 'next/navigation'

const DaoPage = () => {
    const params = useParams()
    const { id } = params

    return (
      <div>
        <h1>DAO {id}</h1>
        {/* Fetch and display DAO details based on the id */}
      </div>
    )
}

export default DaoPage
