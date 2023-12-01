import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
        };
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: "harcode",
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            });
        }
    }

    onCloseValueInputModal = () => {
        this.setState({
            id: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
        });
    };

    toggle = () => {
        this.props.toggleUserModal();
    };

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };

    checkValideInput = () => {
        let isValid = true;
        let arrInput = [
            "email",
            "password",
            "firstName",
            "lastName",
            "address",
        ];
        for (let i = 0; i < arrInput.length; i++) {
            console.log(
                "checkarrInput : ",
                arrInput,
                "checkarrInput[i]: ",
                arrInput[i]
            );
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Missing parameter : " + arrInput[i]);
                break;
            }
        }
        return isValid;
    };

    handelSaveUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            //call api edit user modal
            this.props.eidtUser(this.state);
        }
    };

    render() {
        return (
            <div>
                <Button color="danger" onClick={this.toggle}>
                    {this.props.buttonLabel}
                </Button>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => this.toggle()}
                    className={"modal-user-container"}
                    size="lg"
                    centered
                >
                    <ModalHeader toggle={() => this.toggle()}>
                        Modal Edit New User
                    </ModalHeader>
                    <ModalBody>
                        <div className="modal-user-body">
                            <div className="input-container">
                                <label>Email</label>
                                <input
                                    value={this.state.email}
                                    type="text"
                                    onChange={(event) =>
                                        this.handleOnChangeInput(event, "email")
                                    }
                                    disabled
                                />
                            </div>
                            <div className="input-container">
                                <label>Password</label>
                                <input
                                    value={this.state.password}
                                    type="password"
                                    onChange={(event) =>
                                        this.handleOnChangeInput(
                                            event,
                                            "password"
                                        )
                                    }
                                    disabled
                                />
                            </div>
                            <div className="input-container">
                                <label>FirstName</label>
                                <input
                                    value={this.state.firstName}
                                    type="text"
                                    onChange={(event) =>
                                        this.handleOnChangeInput(
                                            event,
                                            "firstName"
                                        )
                                    }
                                />
                            </div>
                            <div className="input-container">
                                <label>LastName</label>
                                <input
                                    value={this.state.lastName}
                                    type="text"
                                    onChange={(event) =>
                                        this.handleOnChangeInput(
                                            event,
                                            "lastName"
                                        )
                                    }
                                />
                            </div>
                            <div className="input-container max-width-input">
                                <label>Address</label>
                                <input
                                    value={this.state.address}
                                    type="text"
                                    onChange={(event) =>
                                        this.handleOnChangeInput(
                                            event,
                                            "address"
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className="px-3"
                            color="primary"
                            onClick={() => this.handelSaveUser()}
                        >
                            Save Change
                        </Button>{" "}
                        <Button
                            className="px-3"
                            color="secondary"
                            onClick={() => this.toggle()}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
