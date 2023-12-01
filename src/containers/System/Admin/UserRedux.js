import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGE, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as action from "../../../store/actions";
import TableManageUser from "./TableManageUser";
import "./UserRedux.scss";
// import Lightbox from "react-image-lightbox";
// import "react-image-lightbox/style.css";

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: "",
            isOpen: false,

            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            phoneNumber: "",
            gender: "",
            role: "",
            position: "",
            avatar: "",

            action: "",
            userEditId: "",
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // try {
        //     let res = await getAllCodeService("gender");
        //     let positionRes = await getAllCodeService("position");
        //     let roleRes = await getAllCodeService("role");
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data,
        //             positionArr: positionRes.data,
        //             roleArr: roleRes.data,
        //         });
        //     }
        //     console.log("check res get gender position  role :", res);
        // } catch (e) {
        //     console.log(e);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * render -> didupdate
         * hien tai (this) va qua khu (previous)
         * []  [3]
         * [3] [3]
         */
        // console.log("check prev props :", prevProps.positionRedux);

        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender:
                    arrGenders && arrGenders.length > 0
                        ? arrGenders[0].keyMap
                        : "",
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;

            this.setState({
                positionArr: arrPositions,
                position:
                    arrPositions && arrPositions.length > 0
                        ? arrPositions[0].keyMap
                        : "",
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;

            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
            });
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;
            let arrGenders = this.props.genderRedux;
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                address: "",
                phoneNumber: "",
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
                position:
                    arrPositions && arrPositions.length > 0
                        ? arrPositions[0].keyMap
                        : "",
                gender:
                    arrGenders && arrGenders.length > 0
                        ? arrGenders[0].keyMap
                        : "",
                avatar: "",
                previewImgURL: "",

                action: CRUD_ACTIONS.CREATE, //dk set lai button save
            });
        }
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file); //convert file
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64,
            });
        }
    };
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;

        this.setState({
            isOpen: true,
        });
    };

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            });
        }

        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux create user
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phonenumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            });
        }
    };

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = [
            "email",
            "password",
            "firstName",
            "lastName",
            "address",
            "phoneNumber",
        ];

        for (let i = 0; i < arrCheck.length; i++) {
            // console.log(arrCheck[i], "sdfasf", this.state[arrCheck[i]]);
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert("this input is requied1: " + arrCheck[i]);
                break;
            }
        }
        return isValid;
    };

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };

    handelEditUserFromParent = (user) => {
        let imageBase64 = "";
        if (user.image) {
            imageBase64 = new Buffer(user.image, "base64").toString("binary"); //convert file revice from user to  base64
        }
        this.setState({
            email: user.email,
            password: "HARDCODE",
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phonenumber,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: "",
            previewImgURL: imageBase64,

            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
        });
    };
    render() {

        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;

        let {
            email,
            password,
            firstName,
            lastName,
            address,
            phoneNumber,
            gender,
            role,
            position,
            //  avatar,
        } = this.state;
        return (
            <>
                <div className="text-center">
                    <div className="title">
                        {" "}
                        Add New User
                    </div>
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <form className="row g-3">
                                <div className="col-12 mb-3">
                                    <b>
                                        {" "}
                                        <FormattedMessage id="manage-user.add" />
                                    </b>
                                </div>
                                <div className="col-6">
                                    <label>
                                        {" "}
                                        <FormattedMessage id="manage-user.email" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        value={email}
                                        onChange={(event) =>
                                            this.onChangeInput(event, "email")
                                        }
                                        disabled={
                                            this.state.action ===
                                                CRUD_ACTIONS.EDIT
                                                ? true
                                                : false
                                        }
                                    />
                                </div>
                                <div className="col-6">
                                    <label>
                                        {" "}
                                        <FormattedMessage id="manage-user.password" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        value={password}
                                        onChange={(event) =>
                                            this.onChangeInput(
                                                event,
                                                "password"
                                            )
                                        }
                                        disabled={
                                            this.state.action ===
                                                CRUD_ACTIONS.EDIT
                                                ? true
                                                : false
                                        }
                                    />
                                </div>
                                <div className="col-6">
                                    <label>
                                        {" "}
                                        <FormattedMessage id="manage-user.first-name" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={firstName}
                                        onChange={(event) =>
                                            this.onChangeInput(
                                                event,
                                                "firstName"
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-6">
                                    <label>
                                        {" "}
                                        <FormattedMessage id="manage-user.last-name" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={lastName}
                                        onChange={(event) =>
                                            this.onChangeInput(
                                                event,
                                                "lastName"
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-6">
                                    <label>
                                        {" "}
                                        <FormattedMessage id="manage-user.phone-number" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(event) =>
                                            this.onChangeInput(
                                                event,
                                                "phoneNumber"
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-6">
                                    <label>
                                        {" "}
                                        <FormattedMessage id="manage-user.address" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={address}
                                        onChange={(event) =>
                                            this.onChangeInput(event, "address")
                                        }
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label
                                        for="inputState"
                                        className="form-label"
                                    >
                                        <FormattedMessage id="manage-user.gender" />
                                    </label>
                                    <select
                                        value={gender}
                                        id="inputState"
                                        className="form-select"
                                        onChange={(event) =>
                                            this.onChangeInput(event, "gender")
                                        }
                                    >
                                        {genders &&
                                            genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option
                                                        selected
                                                        key={index}
                                                        value={item.keyMap}
                                                    >
                                                        {language ===
                                                            LANGUAGE.VI
                                                            ? item.valueVi
                                                            : item.valueEn}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label
                                        for="inputState"
                                        className="form-label"
                                    >
                                        <FormattedMessage id="manage-user.position" />
                                    </label>
                                    <select
                                        value={position}
                                        id="inputState"
                                        className="form-select"
                                        onChange={(event) =>
                                            this.onChangeInput(
                                                event,
                                                "position"
                                            )
                                        }
                                    >
                                        {positions &&
                                            positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (
                                                    <option
                                                        selected
                                                        key={index}
                                                        value={item.keyMap}
                                                    >
                                                        {language ===
                                                            LANGUAGE.VI
                                                            ? item.valueVi
                                                            : item.valueEn}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label
                                        for="inputState"
                                        className="form-label"
                                    >
                                        <FormattedMessage id="manage-user.role" />
                                    </label>
                                    <select
                                        value={role}
                                        id="inputState"
                                        className="form-select"
                                        onChange={(event) =>
                                            this.onChangeInput(event, "role")
                                        }
                                    >
                                        {roles &&
                                            roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (
                                                    <option
                                                        selected
                                                        key={index}
                                                        value={item.keyMap}
                                                    >
                                                        {language ===
                                                            LANGUAGE.VI
                                                            ? item.valueVi
                                                            : item.valueEn}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label
                                        for="inputState"
                                        className="form-label"
                                    >
                                        <FormattedMessage id="manage-user.image" />
                                    </label>
                                    <div className="preview-img-container">
                                        <input
                                            id="previewImg"
                                            type="file"
                                            hidden
                                            onChange={(event) =>
                                                this.handleOnchangeImage(event)
                                            }
                                        />
                                        <label
                                            className="label-upload"
                                            htmlFor="previewImg"
                                        >
                                            Tải ảnh{" "}
                                            <i className="fas fa-file-upload"></i>
                                        </label>
                                        <div
                                            className="preview-image"
                                            style={{
                                                backgroundImage: `url(${this.state.previewImgURL})`,
                                            }}
                                            onClick={() =>
                                                this.openPreviewImage()
                                            }
                                        ></div>
                                    </div>
                                </div>
                                <div className="col-12 mt-3">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="gridCheck"
                                        />
                                        <label
                                            className="form-check-label"
                                            for="gridCheck"
                                        >
                                            <FormattedMessage id="manage-user.check" />
                                        </label>
                                    </div>
                                </div>
                                <div className="col-12 my-3">
                                    <button
                                        type="button"
                                        className={
                                            this.state.action ===
                                                CRUD_ACTIONS.EDIT
                                                ? "btn btn-warning"
                                                : "btn btn-primary"
                                        }
                                        onClick={() => this.handleSaveUser()}
                                    >
                                        {this.state.action ===
                                            CRUD_ACTIONS.EDIT ? (
                                            <FormattedMessage id="manage-user.edit" />
                                        ) : (
                                            <FormattedMessage id="manage-user.save" />
                                        )}
                                    </button>
                                </div>
                                <div className="col-12 mb-5">
                                    <TableManageUser
                                        handleEditFromParentKey={
                                            this.handelEditUserFromParent
                                        }
                                        action={this.state.action}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* 
                    {this.state.isOpen === true && (
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() =>
                                this.setState({ isOpen: false })
                            }
                        />
                    )} */}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(action.fetchGenderStart()),
        getPositionStart: () => dispatch(action.fetchPositionStart()),
        getRoleStart: () => dispatch(action.fetchRoleStart()),
        createNewUser: (data) => dispatch(action.createNewUser(data)),
        editAUserRedux: (data) => dispatch(action.editAUser(data)),

        fetchUserRedux: () => dispatch(action.fetchAllUserStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
