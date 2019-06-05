import React, { Component } from 'react';
import Popup from '../../src/popup';
import {render} from "react-dom";
import Cookies from 'universal-cookie';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            // if cookie not set show popup, and flip
            showPopup: ! new Cookies().get('dkwsl-closed'),
            // set the amount discounted in %
            percentOff: 20,
            // find price from DOM element
            price: document.querySelector('.current-price') ? document.querySelector('.current-price').getAttribute('data-atb-price') : null,
            // set countdown timer value in seconds
            countdownSeconds: 120,
            // closing class for popup defaults to blank
            closingClass: "",
            // form not completed by default
            isComplete: false,
            // form not in error state by default
            isError: false
        };
        // set overflow class on body
        document.body.classList.add('modal-open');
        // hard bind functions to overcome scope issues
        this.closePopup = this.closePopup.bind(this);
        this.completeForm = this.completeForm.bind(this);
    }

    closePopup() {
        // amend css class to allow fadeout
        this.setState({
            closingClass: "fader-leave fader-leave-active"
        });
        // delay unmount to allow css animation to finish
        setTimeout(() => {
            this.setState({
                showPopup: false
            });
        }, 500);
        // unset overflow class on body
        document.body.classList.remove('modal-open');
    }

    completeForm() {
        this.setState({
            isComplete: true
        })
    }

    setCloseCookie() {
        // set cookie to let us know that modal has already run (if it's not already set)
        const cookies = new Cookies();
        if (!cookies.get('dkwsl-closed')) {
            const expiryDate = new Date(Date.now() + 3600 * 1000 * 24 * 365);
            cookies.set('dkwsl-closed', 'true', {path: '/', expires: expiryDate });
        }
    }

    render() {
        // as soon as we've rendered set the cookie - we only want to show this once
        this.setCloseCookie();
        return (
            this.state.showPopup && this.state.price ?
                /* if we should show the modal and can find a price, call the popup component and pass values
                 * and methods as properties for inherited use */
                    <Popup
                        offer={this.state.percentOff + '% off today'}
                        price={this.state.price * ( 100 - this.state.percentOff ) / 100}
                        text='Enter code 20FORU at checkout'
                        time={this.state.countdownSeconds}
                        closingClass={this.state.closingClass}
                        closePopup={this.closePopup}
                        isError={this.state.isError}
                        isComplete={this.state.isComplete}
                        completeForm={this.completeForm}
                    />
                : null
        );
    }
}

// render the whole app by appending a new wrapper div to the body to prevent conflicts
render(<App />,
    document.body.appendChild(document.createElement("DIV"))
);