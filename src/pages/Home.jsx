import React from 'react'
import { Graphics } from '../components/Graphics'
import { Filters } from '../components/Filters'

export const Home = () => {
    const containerStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr',
    }

    const contentStyle = {
        ...containerStyle,
        gridTemplateColumns: '1fr 3fr',
        border: '1px solid black',
    }

    return (
        <div style={containerStyle}>
            <div id="header">
                Header
            </div>
            <div id="content" style={contentStyle}>
                <Filters />
                <Graphics />
            </div>
        </div>
    )
}
