import React, { Component } from 'react'

import AddOption from './AddOption'
import Header from './Header'
import Action from './Action'
import Options from './Options'
import OptionModal from './OptionModal'

export default class IndecisionApp extends Component {
    state = {
        options: [],
        selectedOption: undefined
    }
    handleCloseModal = () => {
        this.setState(() => ({
            selectedOption: undefined
        }))
    }
    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }))
    }
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option
            })
        }))
    }
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length)
        const showOption = this.state.options[randomNum]
        this.setState(() => ({
            selectedOption: showOption
        }))
    }
    handleAddOption = (option) => {
        if (!option) {
            return 'Enter valid value to add item'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'That option already exists'
        }
        this.setState((prevState) => ({ 
            options: prevState.options.concat([option])
        }))
    }
    componentDidMount () {
        try {
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)
    
            if (options) {
                this.setState(() => ({ options }))
            }
        } catch (e) {
            // Do nothing at all
        }
    }
    componentDidUpdate (prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
    }
    componentWillUnmount () {
        console.log('componentWillUnmount')
    }
    render() {    
        const subtitle = 'Put your life in the hands of a computer'

        return (
            <div>
                <Header 
                    subtitle={subtitle} 
                />
                <div className="container">
                    <Action 
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick} 
                    />
                    <div className="widget">
                        <Options 
                            options={this.state.options} 
                            removeOptions={this.handleDeleteOptions}
                            removeOption={this.handleDeleteOption} 
                        />
                        <AddOption 
                            handleAddOption={this.handleAddOption} 
                        />
                    </div>
                </div>
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleCloseModal={this.handleCloseModal} 
                />
            </div>
        )
    }
}