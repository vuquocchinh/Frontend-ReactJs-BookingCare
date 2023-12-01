import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../../store/actions";
import "./TableManageUser.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGE } from "../../../utils";
import MarkDownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
//impot style manually
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkDownIt();

function handleEditorChange({ html, text }) {
    console.log("handleEditorChange", html, text);
}

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
            genderArr: [],
            positionArr: [],
            roleArr: [],
        };
    }

    componentDidMount() {
        this.props.fetchUserRedux();
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;

            this.setState({
                positionArr: arrPositions,
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;

            this.setState({
                roleArr: arrRoles,
            });
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers,
            });
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id);
    };

    handleEditUser = (user) => {
        this.props.handleEditFromParentKey(user); //fire len th cha userRedux
    };

    showValueByKey = (rowItem, keyItem) => {
        //
        let arrayValue = this.state[keyItem]; //this.state["positionId", "roleId" , "gender"]
        let language = this.props.language;
        if (language === LANGUAGE.VI) {
            return (
                arrayValue &&
                arrayValue.length > 0 &&
                arrayValue.map((item, index) => {
                    // console.log(item);
                    // {language ===
                    //     LANGUAGE.VI
                    //         ? item.valueVi
                    //         : item.valueEn}

                    // return rowItem === item.key && language === LANGUAGE.VI
                    //     ? item.valueVi
                    //     : item.valueEn;
                    return rowItem === item.keyMap ? item.valueVi : "";
                })
            );
        }
        if (language === LANGUAGE.EN) {
            return (
                arrayValue &&
                arrayValue.length > 0 &&
                arrayValue.map((item, index) => {
                    return rowItem === item.keyMap ? item.valueEn : "";
                })
            );
        }
    };

    render() {
        console.log("check all user: ", this.props.listUsers);
        // console.log("check state1111111: ", this.state.usersRedux);
        // console.log("check state222222: ", arrUsers);

        let arrUsers = this.state.usersRedux;

        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        console.log("check genders: ", arrUsers);
        console.log("check positions: ", positions);
        console.log("check roles: ", roles);

        return (
            <>
                <div className="user-table my-5 mx-3">
                    <table id="TableManageUser">
                        <tbody className="">
                            <tr>
                                <th>Email</th>
                                <th>
                                    <FormattedMessage id="manage-user.first-name" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user.address" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user.last-name" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user.phone-number" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user.gender" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user.position" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user.role" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user.actions" />
                                </th>
                            </tr>

                            {arrUsers && //
                                arrUsers.length > 0 &&
                                arrUsers.map((item, index) => {
                                    return (
                                        <tr className="divClass" key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.address}</td>
                                            <td>{item.phonenumber}</td>
                                            <td>
                                                {this.showValueByKey(
                                                    item.gender,
                                                    "genderArr"
                                                )}
                                            </td>
                                            <td>
                                                {this.showValueByKey(
                                                    item.positionId,
                                                    "positionArr"
                                                )}
                                            </td>
                                            <td>
                                                {this.showValueByKey(
                                                    item.roleId,
                                                    "roleArr"
                                                )}
                                            </td>

                                            <td>
                                                <button
                                                    className="btn-edit"
                                                    type="button"
                                                    onClick={() =>
                                                        this.handleEditUser(
                                                            item
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-edit "></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn-del"
                                                    onClick={() =>
                                                        this.handleDeleteUser(
                                                            item
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-trash-alt "></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
                {/* <MdEditor
                    style={{ height: "500px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onchange={handleEditorChange}
                /> */}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        listUsers: state.admin.users,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(action.fetchGenderStart()),
        getPositionStart: () => dispatch(action.fetchPositionStart()),
        getRoleStart: () => dispatch(action.fetchRoleStart()),
        fetchUserRedux: () => dispatch(action.fetchAllUserStart()),
        deleteAUserRedux: (id) => dispatch(action.deleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
