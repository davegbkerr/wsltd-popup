import React from 'react';
import Timer from './timer.js';
import Signup from './signup.js';
import Currency from 'react-currency-formatter';
import './styles.scss';
import {CSSTransitionGroup} from "react-transition-group";

class Popup extends React.Component {

    render() {
        // initatialise variables to check form completion
        const isComplete = this.props.isComplete;
        let popupCopy;

        // set content of popup to either countdown + form or thank you message
        if (isComplete) {

            popupCopy = <div className="popupBody">
                <div className="popupCopy">
                    <h3 class="success">
                    <span>Thank you!</span><br />
                    You have registered, please check your inbox for confirmation.
                    </h3>
                </div>
            </div>;

        } else {

            popupCopy = <div className="popupBody">
                <div className="popupCopy">
                        <h3>
                            {/* pull through variables as props for price, discount, etc */}
                            <span>{this.props.offer}</span>&nbsp;today!<br />
                            You'll pay&nbsp;
                            <span>
                                {/* currency component for localisation */}
                                <Currency
                                    quantity={this.props.price}
                                    currency="GBP"
                                    locale="en_GB"
                                />
                            </span>
                        </h3>
                        <p className="bold">{this.props.text}</p>
                </div>
                {/* call timer component with inherited properties */}
                <Timer
                    time={this.props.time}
                    closePopup={this.props.closePopup}
                />
                {/* call sign up form component with inherited properties */}
                <Signup
                    isError={this.props.isError}
                    isComplete={this.props.isComplete}
                    completeForm={this.props.completeForm}
                />
            </div>;
        }

        return (
            // render with css transition for fade-in on mount
            <CSSTransitionGroup
            transitionAppear={true}
            transitionEnter={true}
            transitionLeave={true}
            transitionName="fader"
            transitionEnterTimeout={500}
            transitionAppearTimeout={500}
            transitionLeaveTimeout={500}>
                {/* implement closing class based on inherited prop */}
                <div className={`popupWrapper ${this.props.closingClass}`} key="popup">
                    <div className="popupContent">
                        <div className="popupHeader">
                            {/* close popup if user clicks close "x"... */}
                            <button className="closeButton" onClick={this.props.closePopup}></button>
                        </div>
                        {popupCopy}
                    </div>
                    {/* ...or if they click on the background overlay (outside the modal) */}
                    <div className="popupOverlay" onClick={this.props.closePopup}></div>
                </div>
            </CSSTransitionGroup>
        );
    }
}

export default Popup;