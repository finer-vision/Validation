import React, {Component} from "react";
import {render} from "react-dom";
import Validation from "../../src/Validation/index";

class Basic extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.validation = new Validation();

        this.state = {
            errors: [],
            form: {
                name: '',
                email: ''
            }
        };
    }

    onSubmit(event) {
        event.preventDefault();

        const validator = this.validation.validate(this.state.form, {
            name: 'required|max:255',
            email: 'required|email|max:255',
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
                <input
                    name="email"
                    type="email"
                    value={this.state.form.email}
                    placeholder="Email"
                    onChange={this.onChange}
                />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

render(<Basic/>, document.querySelector('#root'));
