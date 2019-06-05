import React from 'react';

class Timer extends React.Component {
    constructor(props){
        super(props);
        // set state from properties passed down from popup - the amount of time remaining and mins and secs for same
        this.state = {
            timeLeft: props.time,
            minutes: Math.floor(props.time/60),
            seconds: props.time % 60,
        };
        // initialise interval for countdown here to allow us to easily clear it later
        this.interval = null;
        // the usual bindings
        this.update = this.update.bind(this);
    }

    // method to update the timer
    update() {
        // if we're not already at 0 time left
        if ( this.state.timeLeft >= 0 ) {
            // update minutes and seconds from time remaining for display purposes
            let minutes = Math.floor(this.state.timeLeft/60);
            let seconds = this.state.timeLeft % 60;
            this.setState({
                minutes,
                seconds
            });
            // decrement the time remaining
            this.state.timeLeft--;
        } else {
            // if we've reached zero, kill the popup and clear the interval (as unmounting popup will unmount this)
            this.props.closePopup();
            clearInterval(this);
        }
    }

    // start the time when the component mounts (if it's not already at zero)
    componentWillMount() {
        if ( this.state.timeLeft > 0 ) {
            // call the update function every second
            this.interval = setInterval(this.update, 1000);
        }
    }

    componentWillUnmount() {
        // stop the timer when the component is unmounted (prevents all sorts of issues later on)
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="popupTimer">
                <p>Offer ends in:</p>
                {/* render minutes and seconds with leading "0" as required */}
                <p className="time">{this.state.minutes}:{ (this.state.seconds < 10) ? "0" + this.state.seconds : this.state.seconds}</p>
            </div>
        );
    }
}

export default Timer;