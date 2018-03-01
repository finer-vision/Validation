import React, {Component} from "react";
import {render} from "react-dom";
import Validation from "../../src/Validation/index";

class File extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.validation = new Validation();

        this.state = {
            errors: [],
            form: {
                file: {}
            }
        };
    }

    onSubmit(event) {
        event.preventDefault();

        const validator = this.validation.validate(this.state.form, {
            file: 'required|file_max:5'
        });

        this.setState({errors: validator.errors});
    }

    onChange(event) {
        const {form} = this.state;
        form[event.target.name] = event.target.files[0];
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
                    name="file"
                    type="file"
                    value={this.state.form.file.path}
                    onChange={this.onChange}
                />
                <br/>

                <button type="submit">Submit</button>
            </form>
        );
    }
}

render(<File/>, document.querySelector('#root'));
