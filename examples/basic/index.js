import React, {Component} from "react";
import {render} from "react-dom";
import Validation from "../../src/Validation/index";

class Basic extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.check = this.check.bind(this);

        this.validation = new Validation();

        this.state = {
            errors: [],
            form: {
                name: '',
                email: '',
                remember: false,
                description: ''
            }
        };
    }

    onSubmit(event) {
        event.preventDefault();

        const validator = this.validation.validate(this.state.form, {
            name: 'required|in:test,1|max:255',
            email: 'required|email|max:255',
            remember: 'checked',
            description: 'required|words:3'
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

    check(event) {
        const {form} = this.state;
        form[event.target.name] = event.target.checked;
        this.setState({form});
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
                <input
                    name="email"
                    type="email"
                    value={this.state.form.email}
                    placeholder="Email"
                    onChange={this.onChange}
                />
                <br/>
                <label>
                    Remember Me&nbsp;
                    <input
                        name="remember"
                        type="checkbox"
                        value={this.state.form.remember}
                        onChange={this.check}
                    />
                </label>
                <br/>
                <textarea name="description" onChange={this.onChange} value={this.state.form.description}/>
                <br/>

                <button type="submit">Submit</button>
            </form>
        );
    }
}

render(<Basic/>, document.querySelector('#root'));
