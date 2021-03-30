import React, {Component} from 'react';
import cns from 'classnames';
import { Field } from "formik";
import get from "lodash/get";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
  } from 'react-day-picker/moment';
import moment from 'moment';
// import downArrowIcon from '../../images/input/down-arrow.svg'

export default class Input extends Component {
    constructor(props, ctx){
        super(props, ctx)

        this.onFocus     = this.onFocus.bind(this)
        this.onMouseDown = this.onMouseDown.bind(this)
        this.onChange    = this.onChange.bind(this)
        this.onClear     = this.onClear.bind(this)

        let value = this.props.value || ''
        this.value = value
        this.state = {value}
    }
    onFocus(e){
        e.target.select()
    }
    /* work around a bug with clicking into selected input text in Safari */
    onMouseDown(e){
        if (e.target === document.activeElement) e.target.setSelectionRange(0,0)
    }
    onChange(e){
        
        let value = e.target.value
        this.value = value
        this.props.onChange && this.props.onChange(value)
        this.setState({value})
    }
    onClear(){
        // this.props.close();
        let value = ''
        this.value = this.refs.input.value = value
        // this.props.onChange && this.props.onChange('')

        if (this.props.focusOnClear)
            this.setState({value}, ()=>this.refs.input.focus())
        else
            this.setState({value})
       
    }
    componentDidMount(){
        if (this.props.autofocus) this.refs.input.focus()
        if (this.props.setAutofocus) {
            document.getElementById('input').select()
        }
    }
    render(){
        const { placeholder, topShadow, label, errorText, limit, name, isFormikField, isTextArea, type, mustRemoveSpacesFor, isDatePicker, disabledDays} = this.props
        let className = "styled-input "

        if (this.props.className) className += this.props.className

        if (isFormikField) {
            if (isDatePicker) {
                return (
                    <Field
                    name={name}
                    render={({ field, form }) => {
                        let error = form.errors ? get(form.errors, field.name) : null
                        error = error ? error.toString() : error

                        return (
                            <div className={className}>
                                <div className="background-image" />
                                {(label || errorText) && (
                                    <div className="label-section">
                                        <label className='label'>{label || ''}</label>
                                        <label className='error'>{error || ''}</label>
                                    </div>
                                )}
                                <DayPickerInput
                                    id="input"
                                    ref="input"
                                    formatDate={formatDate}
                                    parseDate={parseDate}
                                    placeholder={placeholder}
                                    dayPickerProps = {{disabledDays}}
                                    value={field.value}
                                    className="search-bar"
                                    onDayChange={selectedDay => {
                                        form.setFieldValue(name, `${formatDate(selectedDay)}`)
                                    }}
                                />
                                {/* <object type="image/svg+xml" data={downArrowIcon} className="down-arrow"/> */}
                                <div className="calendar-icon"/>
                                {topShadow && <div className="top-shadow" />}
                            </div>
                        );
                    }}
                />
                ) 
            }
            if (isTextArea) {
                return (
                    <Field
                    name={name}
                    render={({ field, form }) => {
                        let error = form.errors ? get(form.errors, field.name) : null
                        error = error ? error.toString() : error

                        return (
                            <div className={className}>
                                <div className="background-image" />
                                {(label || errorText) && (
                                    <div className="label-section">
                                        <label className='label'>{label || ''}</label>
                                        <label className='error'>{error || ''}</label>
                                    </div>
                                )}
                                <textarea
                                    id="input"
                                    ref="input"
                                    type={type || "text"}
                                    placeholder={placeholder}
                                    value={field.value}
                                    className="search-bar"
                                    onChange={v => {
                                        let {target: {value}} = v
                                        let mustRemoveSpaces = mustRemoveSpacesFor === name
                                        if (mustRemoveSpaces) {
                                            value = value.replace(' ', '')
                                        }
                                        form.setFieldValue(name, value)
                                    }}
                                />
                                <div className="search-x" onClick={this.onClear} />
                                {topShadow && <div className="top-shadow" />}
                                {limit && <div className={cns("limit", {'limit--error': field.value.length >= limit})}>{`${field.value.length}/${limit}`}</div>}
                            </div>
                        );
                    }}
                />
                ) 
            } 
            return (
                <Field
                    name={name}
                    render={({ field, form }) => {
                        let error = form.errors ? get(form.errors, field.name) : null
                        error = error ? error.toString() : error

                        return (
                            <div className={className}>
                                <div className="background-image" />
                                {(label || errorText) && (
                                    <div className="label-section">
                                        <label className='label'>{label || ''}</label>
                                        <label className='error'>{error || ''}</label>
                                    </div>
                                )}
                                <input
                                    id="input"
                                    ref="input"
                                    type={type || "text"}
                                    placeholder={placeholder}
                                    value={field.value}
                                    className="search-bar"
                                    onChange={v => {
                                        let {target: {value}} = v
                                        let mustRemoveSpaces = mustRemoveSpacesFor === name
                                        if (mustRemoveSpaces) {
                                            value = value.replace(' ', '')
                                        }
                                        form.setFieldValue(name, value)
                                    }}
                                />
                                <div className="search-x" onClick={this.onClear} />
                                {topShadow && <div className="top-shadow" />}
                                {limit && <div className={cns("limit", {'limit--error': field.value.length >= limit})}>{`${field.value.length}/${limit}`}</div>}
                            </div>
                        );
                    }}
                />
            )
        } else {
            return (
                <div className={className}>
                    <div className="background-image" />
                    {(label || errorText) && (
                        <div className="label-section">
                            <label className='label'>{label || ''}</label>
                            <label className='error'>{errorText || ''}</label>
                        </div>
                    )}
                    <input ref="input"
                         type="text"
                         placeholder={placeholder}
                         value={this.value}
                         className="search-bar"
                         onChange={this.onChange}
                         onFocus={this.onFocus}
                         onMouseDown={this.onMouseDown} />
                    <div className="search-x" onClick={this.onClear} />
                    {topShadow && <div className="top-shadow" />}
                    {limit && <div className={cns("limit", {'limit--error': this.value.length >= limit})}>{`${this.value.length}/${limit}`}</div>}
                </div>
            )  
        }
    }
}
