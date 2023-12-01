import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import "./Login.scss";
import { handleLoginApi } from "../../services/userService";
import { every } from "lodash";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errMessage: "",
        };
    }

    handleOnChangeUserName = (event) => {
        this.setState({
            username: event.target.value,
        });
    };
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };
    handleKeyDown = (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
            this.handleLogin();
        }
    };

    handleLogin = async () => {
        // console.log("all state ", this.state);
        this.setState({
            errMessage: "",
        }); //clear func khi reload

        try {
            let data = await handleLoginApi(
                this.state.username,
                this.state.password
            );
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log("Ok success");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                    });
                }
            }
            console.log("check bug: ", error.response.data.message);
        }
    };

    handleShowHideEye = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content">
                        <div className="login-content row">
                            <div className="col-12 text-center text-login">
                                Login
                            </div>
                            <div className="col-12 form-gruop login-input">
                                <label className="label-name">UserName:</label>
                                <div className="input-list">
                                    <input
                                        type="text"
                                        className="form-control input-item"
                                        placeholder="Enter username"
                                        value={this.state.username}
                                        onChange={(event) =>
                                            this.handleOnChangeUserName(event)
                                        }
                                    />
                                    <i className="far fa-user input-icon"></i>
                                </div>
                            </div>
                            <div className="col-12 form-gruop login-input">
                                <label className="label-name">Password:</label>
                                <div className="input-list">
                                    <input
                                        type={
                                            this.state.isShowPassword
                                                ? " text"
                                                : "password"
                                        }
                                        className="form-control input-item"
                                        placeholder="Enter your password"
                                        value={this.state.password}
                                        onChange={(event) =>
                                            this.handleOnChangePassword(event)
                                        }
                                        onKeyDown={(event) =>
                                            this.handleKeyDown(event)
                                        }
                                    />
                                    <i className="fas fa-lock input-icon"></i>
                                    <span
                                        onClick={() => this.handleShowHideEye()}
                                    >
                                        <i
                                            className={
                                                this.state.isShowPassword
                                                    ? "fas fa-eye icon-eye"
                                                    : "fas fa-eye-slash icon-eye"
                                            }
                                        ></i>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12" style={{ color: "red" }}>
                                {this.state.errMessage}
                            </div>
                            <div className="col-12  mt-3">
                                <button
                                    className="btn-login"
                                    onClick={() => this.handleLogin()}
                                >
                                    Login
                                </button>
                            </div>
                            <div className="col-12 mt-2">
                                <a href="/" className="forgot-password">
                                    Forgot your Password?
                                </a>
                            </div>
                            <div className="col-12 text-center mt-3">
                                <span className="text-other-login">
                                    Or Login with:
                                </span>
                            </div>
                            <div className="col-12 social-login">
                                <i className="fab fa-facebook-f facebook"></i>
                                <i className="fab fa-google-plus-g google"></i>
                            </div>
                            <div className="col-12 text-center sign-up">
                                <div className="text-other-login">
                                    Or sign up using
                                </div>
                                <div>
                                    <a className="singUp-new" href="/">
                                        SING UP
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) =>
            dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
