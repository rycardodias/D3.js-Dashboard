import React, { useState, useEffect } from 'react'
import GridLayout from "react-grid-layout";
import { ChartHandler } from '../components/ChartHandler';

export const Home = () => {
    const barSize = 2
    const graphSize = 3

    const initialLayout = [
        { i: "1", x: 0, y: 0, w: 2, h: 1, desc: "Casos Covid" },
        { i: "2", x: 0, y: 0, w: 2, h: 1, desc: "Casos Variola" },
    ];

    const [currentLayout, setcurrentLayout] = useState(initialLayout)

    useEffect(() => {
        const savedLayout = localStorage.getItem('layout')

        savedLayout ? setcurrentLayout(JSON.parse(savedLayout)) : setcurrentLayout(initialLayout)
    }, [])

    const handleDragStop = (e) => {
        //faz alterações perante as coordenadas que se encotnra
        e.map(item => {
            if (item['x'] < barSize) {
                item['x'] = 0 //encosta à esquerda caso esteja parcialmente dentro da lista
                item['w'] = barSize
                item['h'] = 1
            } else {
                item['w'] = graphSize
                item['h'] = graphSize * 3
            }
        })
        setcurrentLayout(e)
    }

    const getDescription = (id) => {
        return initialLayout.filter(item => item.i === id)[0].desc
    }

    const handleSave = () => {
        localStorage.setItem('layout', JSON.stringify(currentLayout))
    }

    const handleReset = () => {
        localStorage.removeItem('layout')
        setcurrentLayout(initialLayout)
    }

    return (
        <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleReset}>Reset</button>
            <GridLayout
                className="layout"
                style={{ border: '1px solid black' }}
                layout={currentLayout}
                cols={12}
                rowHeight={20}
                width={window.innerWidth}
                onDragStop={handleDragStop}
            >
                {currentLayout.map(item => {
                    return (
                        <div key={item.i} style={{ border: '1px solid black' }}>
                            {item.x === 0
                                ? getDescription(item.i)
                                : <ChartHandler key={item.i} />
                            }
                        </div>
                    )
                })}

            </GridLayout>

        </>
    )
}
