import React from 'react'
import Option from './Option'

const Options = (props) => (
    <div>
        <div className="widget-header">
            <h2>Your Options</h2>
            {props.options.length > 0 && <button className="button button--link" onClick={props.removeOptions}>Remove all</button>}
        </div>
        {props.options.length === 0 && <p className="widget-info">Please enter an option to get started!</p>}
        <ul className="widget-options">
            {
                props.options.map((option, index) => (
                    <Option 
                        count={index + 1}
                        key={option} 
                        option={option}
                        removeOption={props.removeOption} 
                    />
                ))
            }
        </ul>
    </div>
)

export default Options