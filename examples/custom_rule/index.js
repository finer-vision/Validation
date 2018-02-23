import React, {Component} from "react";
import {render} from "react-dom";
import Validation from "../../src/Validation/index";

class CustomRule extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.validation = new Validation();

        this.state = {
            errors: [],
            form: {
                name: ''
            }
        };
    }

    componentDidMount() {
        Validation.addRule('test_rule', input => ({
            passed: input.length > 0,
            error: 'This is a custom validation error'
        }));
    }

    onSubmit(event) {
        event.preventDefault();

        const validator = this.validation.validate(this.state.form, {
            name: 'required|test_rule'
        });

        this.setState({errors: validator.errors});
    }

    onChange(event) {
        const {form} = this.state;
        form[event.target.name] = event.target.value;
        this.setState({form});
    }

    renderErrors() {
        return this.state.errors.map((error, index) => (
            <p key={`error-${index}`}>{error}</p>
        ))
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} noValidate autoComplete="off">
                {this.renderErrors()}

                <input
                    name="name"
                    type="text"
                    value={this.state.form.name}
                    placeholder="Name"
                    onChange={this.onChange}
                />
                <br/>

                <button type="submit">Submit</button>
            </form>
        );
    }
}

render(<CustomRule/>, document.querySelector('#root'));
