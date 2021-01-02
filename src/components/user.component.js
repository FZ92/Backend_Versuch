import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class Tutorial extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getTutorial = this.getTutorial.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateTutorial = this.updateTutorial.bind(this);
        this.deleteTutorial = this.deleteTutorial.bind(this);

        this.state = {
            currentUser: {
                UserID: null,
                Email: "",
                Geloescht: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getTutorial(this.props.match.params.UserID);
    }

    onChangeTitle(e) {
        const UserID = e.target.value;

        this.setState(function(prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    UserID: UserID
                }
            };
        });
    }

    onChangeDescription(e) {
        const Email = e.target.value;

        this.setState(prevState => ({
            currentUser: {
                ...prevState.currentUser,
                Email: Email
            }
        }));
    }

    getTutorial(UserID) {
        UserDataService.get(UserID)
            .then(response => {
                this.setState({
                    currentUser: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
        var data = {
            UserID: this.state.currentUser.UserID,
            Email: this.state.currentUser.Email,
            Geloescht: status
        };

        UserDataService.update(this.state.currentUser.UserID, data)
            .then(response => {
                this.setState(prevState => ({
                    currentUser: {
                        ...prevState.currentUser,
                        Geloescht: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateTutorial() {
        UserDataService.update(
            this.state.currentUser.UserID,
            this.state.currentUser
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The tutorial was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteTutorial() {
        UserDataService.delete(this.state.currentUser.UserID)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/User')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div>
                {currentUser ? (
                    <div className="edit-form">
                        <h4>Tutorial</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentUser.Email}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentUser.Email}
                                    onChange={this.onChangeDescription}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentUser.Geloescht ? "Published" : "Pending"}
                            </div>
                        </form>

                        {currentUser.Geloescht ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(false)}
                            >
                                UnPublish
                            </button>
                        ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(true)}
                            >
                                Publish
                            </button>
                        )}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteTutorial}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateTutorial}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Tutorial...</p>
                    </div>
                )}
            </div>
        );
    }
}
