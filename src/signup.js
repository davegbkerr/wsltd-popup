import React from 'react';

class Signup extends React.Component {

    constructor() {
        // call parent constructor
        super();
        // initialise state - form is error-free
        this.state = {
            isError: false
        }
        // hard bind functions to overcome scope issues
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
    }

    formSubmitHandler(event) {
        // prevent actual form submit
        event.preventDefault();
        // perform some rudimentary validation on the submitted email address
        if (/^.+@.+\..+$/.test(this.refs.email.value)) {
            // success! call completeForm() to show thank you message
            this.setState({
                isError: false
            });
            this.props.completeForm();
        } else {
            // validation fail - form is in error state
            this.setState({
                isError: true
            })
        }
    }

    render() {
        // check error status of form - set error message if required
        let error = this.state.isError ? <p className="error">Please enter a valid email address</p> : null;
        return (
            // form markup
            <div className="popupSignup">
                <p>Sign up to our newsletter to get more great offers.</p>
                <form className="signupForm" onSubmit={this.formSubmitHandler}>
                    <input type="email" placeholder="" name="email" id="email" ref="email" placeholder="Email address" />
                    <input type="submit" name="submit" value="Sign up" id="submit" />
                    {/* show error message if required */}
                    {error}
                </form>
            </div>
        );
    }
}

export default Signup;


