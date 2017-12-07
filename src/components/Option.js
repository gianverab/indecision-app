import React from 'react'

const Option = (props) => (
    <li className="widget-option">
        {props.count}. {props.option}
        <button
            className="button button--darklink" 
            onClick={(e) => {
                props.removeOption(props.option)
            }}
        >Remove</button>
    </li>
)

export default Option