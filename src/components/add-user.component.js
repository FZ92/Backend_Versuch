import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveTutorial = this.saveTutorial.bind(this);
        this.newTutorial = this.newTutorial.bind(this);

        this.state = {
            UserID: null,
            Email: "",
            Passwort: "",
            Geloescht: false,

            submitted: false
        };
    }

    onChangeTitle(e) {
        this.setState({
            UserID: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            Email: e.target.value
        });
    }

    saveTutorial() {
        var data = {
            UserID: this.state.UserID,
            Email: this.state.Email
        };

        UserDataService.create(data)
            .then(response => {
                this.setState({
                    UserID: response.data.UserID,
                    Email: response.data.Email,
                    Passwort: response.data.Passwort,

                    Geloescht: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newTutorial() {
        this.setState({
            UserID: null,
            Vorname: "",
            Geloescht: false,

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newTutorial}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="UserID">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="UserID"
                                required
                                value={this.state.UserID}
                                onChange={this.onChangeTitle}
                                name="UserID"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Email"
                                required
                                value={this.state.Email}
                                onChange={this.onChangeDescription}
                                name="Email"
                            />
                        </div>

                        <button onClick={this.saveTutorial} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}