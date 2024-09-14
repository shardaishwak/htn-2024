'use client'
import React from 'react'
import { useParams } from 'next/navigation'

const StartupPage = () => {
    const params = useParams()
    const { id } = params

    return (
      <div>
        <h1>Startup {id}</h1>
        {/* Fetch and display DAO details based on the id */}
      </div>
    )
}

export default StartupPage
