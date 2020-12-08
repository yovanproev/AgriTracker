import React from 'react'

export const TableHeader = (props) => {
    return (
        <div className="header">
            <h2 style={{padding: "20px 0"}}>{props.children}</h2>
        </div>
    )
}

