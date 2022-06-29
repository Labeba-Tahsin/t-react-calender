import React, { Component } from 'react'
import moment from 'moment';
import './t-calender.css';
import * as f from './t-calender-functions';

export default class Tcalender extends Component {

    weekdays = [0, 1, 2, 3, 4, 5, 6].map(day => moment().weekday(day).format('ddd'));
    months = [['Jan', 'Feb', 'Mar', 'Apr'], ['May', 'Jun', 'Jul', 'Aug'], ['Sep', 'Oct', 'Nov', 'Dec']];

    state = {
        showDays: true,
        showMonths: false,
        showYears: false,
        d: moment(),
        month: f.getFullMonth(moment()),
        monthName: moment().format('MMMM'),
        yr: moment().format('YYYY'),
        yrRange: f.generateDecade(2021, 2030)
    }



    render() {
        const prevMonth = (d) => {
            const m = d.subtract(1, 'months');
            this.setState({
                d: m, month: f.getFullMonth(m), monthName: m.format('MMMM'), yr: m.format('YYYY')
            })
        }

        const prevYr = (d) => {
            const m = d.subtract(1, 'years');
            this.setState({
                d: m, month: f.getFullMonth(m), monthName: m.format('MMMM'), yr: m.format('YYYY')
            })
        }

        const navPrevYr = (y) => {
            this.setState({
                yr: (parseInt(y) - 1).toString()
            })
        }

        const nextMonth = (d) => {
            const m = d.add(1, 'months');
            this.setState({
                d: m, month: f.getFullMonth(m), monthName: m.format('MMMM'), yr: m.format('YYYY')
            })
        }

        const nextYr = (d) => {
            const m = d.add(1, 'years');
            this.setState({
                d: m, month: f.getFullMonth(m), monthName: m.format('MMMM'), yr: m.format('YYYY')
            })
        }

        const navNextYr = (y) => {
            this.setState({
                yr: (parseInt(y) + 1).toString()
            })
        }

        const navigateMonth = (month) => {
            const d = new Date('01' + month + this.state.yr);
            const m = moment(d);
            this.setState({
                showDays: true, showMonths: false, showYears: false, d: m, month: f.getFullMonth(m), monthName: m.format('MMMM'), yr: m.format('YYYY')
            })
        }

        const navigateYr = (yr) => {
            const m = moment().year(yr)
            this.setState({
                showDays: false, showMonths: true, showYears: false, yr: m.format('YYYY')
            })
        }

        const showMonths = () => {
            this.setState({
                showDays: false, showMonths: true, showYears: false
            })
        }

        const showYears = () => {
            this.setState({
                showDays: false, showMonths: false, showYears: true
            })
        }

        const prevDecade = (yr) => {
            this.setState({
                yrRange: f.generateDecade(yr - 10, yr - 1)
            })
        }

        const nextDecade = (yr) => {
            this.setState({
                yrRange: f.generateDecade(yr + 1, yr + 10)
            })
        }

        const clickDate = (d) => {
            this.props.dateSelect(d.toDate());
        }

        return (
            <div className='t-container'>
                {this.state.showDays && <div className='t-show-days'>
                    <div className='t-month-bar t-cal-header '>
                        <div className='bt-l'>
                            <button onClick={() => prevYr(this.state.d)}>{'‹‹'}</button>
                            <button onClick={() => prevMonth(this.state.d)}>{'‹'}</button>
                        </div>
                        <button className='bt-m' onClick={() => showMonths()}>{this.state.monthName}{" " + this.state.yr}</button>
                        <div className='bt-r'>
                            <button onClick={() => nextMonth(this.state.d)}>{'›'}</button>
                            <button onClick={() => nextYr(this.state.d)}>{'››'}</button>
                        </div>
                    </div>
                    <div className='t-month-header'>
                        {this.weekdays.map((day, k) =>
                            <span key={k} className='t-weekday' >{day}</span>
                        )}
                    </div>
                    <div className='t-month-body'>
                        {
                            this.state.month.map((row, i1) => (
                                <div key={i1}>
                                    {row.map((day, i2) => (
                                        <span key={i2} onClick={() => clickDate(moment(new Date(this.state.yr + '-' + moment().month(this.state.monthName).format("M") + '-' + day)))}
                                            className={i2 % 7 === 0 || i2 % 6 === 0 ? 'red t-weekday' :
                                                (moment().isSame(new Date(this.state.yr + '-' + moment().month(this.state.monthName).format("M") + '-' + day), 'day')) ? 'today t-weekday' : 't-weekday'}>{day}</span>
                                    ))}
                                </div>
                            ))
                        }
                    </div>
                </div>
                }
                {this.state.showMonths && <div className='t-show-months'>
                    <div className='t-yr-header t-cal-header'>
                        <div className='bt-l'>
                            <button onClick={() => navPrevYr(this.state.yr)}>{'‹'}</button>
                        </div>
                        <button className='bt-m' onClick={() => showYears()}>{this.state.yr}</button>
                        <div className='bt-r'>
                            <button onClick={() => navNextYr(this.state.yr)}>{'›'}</button>
                        </div>
                    </div>
                    <div className='t-months-body'>
                        {this.months.map((row, id1) => (
                            <div key={id1}>
                                {
                                    row.map((month, id2) => (
                                        <span key={id2} onClick={() => navigateMonth(month)}>{month}</span>
                                    ))
                                }
                            </div>
                        ))}
                    </div>
                </div>
                }
                {
                    this.state.showYears && <div className='t-show-years'>
                        <div className='t-decade-header t-cal-header'>
                            <div className='bt-l'>
                                <button disabled={this.state.yrRange[0][0] === 0} onClick={() => prevDecade(this.state.yrRange[0][0])}>{'‹'}</button>
                            </div>
                            <div className='t-decade-title'>
                                <span> {this.state.yrRange[0][0]}</span>
                                <span> - </span>
                                <span> {this.state.yrRange[2][1]}</span>
                            </div>
                            <div className='bt-r'>
                                <button onClick={() => nextDecade(this.state.yrRange[2][1])}>{'›'}</button>
                            </div>
                        </div>
                        <div className='t-decade-body'>
                            {this.state.yrRange.map((row, k) => (
                                <div key={k}>{
                                    row.map((yr, i) => (
                                        <span key={i} onClick={() => navigateYr(yr)}>{yr}</span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        )
    }
}
