import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenEditUser: false,
            userEdit: {},
        };
    }
    //ham chay dau
    async componentDidMount() {
        this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
        console.log("get user from node.js ", this.state.arrUsers);
    };

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    };

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };
    toggleEditUserModal = () => {
        this.setState({
            isOpenEditUser: this.state.isOpenModalUser,
        });
    };

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false,
                });
            }
        } catch (e) {
            console.log(e);
        }
        console.log(" check data : ", data);
    };
    handleDeleteUser = async (id) => {
        try {
            let response = await deleteUserService(id);
            console.log("check", response);
            if (response && response.errCode === 0) {
                await this.getAllUsersFromReact();
            } else {
                alert(response.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleEditUser = (user) => {
        console.log("check user: ", user);
        this.setState({
            isOpenEditUser: true,
            userEdit: user,
        });
    };

    DoEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenEditUser: false,
                });
            } else {
                alert(res.errCode);
            }
        } catch (e) {
            console.log(e);
        }
    };
    /*life cycle 
     * run component :
       1  run constructor-> init state
     * 2 did mount (set state)
     * 3.render
     */

    render() {
        let arrUsers = this.state.arrUsers;
        console.log("check render: ", arrUsers);

        return (
            <>
                <div className="users-container">
                    <ModalUser
                        isOpen={this.state.isOpenModalUser}
                        toggleUserModal={this.toggleUserModal}
                        createNewUser={this.createNewUser}
                    />
                    {this.state.isOpenEditUser && (
                        <ModalEditUser
                            isOpen={this.state.isOpenEditUser}
                            toggleUserModal={this.toggleEditUserModal}
                            currentUser={this.state.userEdit}
                            eidtUser={this.DoEditUser}
                            // createNewUser={this.createNewUser}
                        />
                    )}

                    <div className="text-center mt-3">Manage users</div>
                    <div className="mx-3">
                        <button
                            className="btn btn-primary px-3"
                            onClick={() => this.handleAddNewUser()}
                        >
                            <i className="fas fa-plus"></i> Add new user
                        </button>
                    </div>

                    <div className="user-table mt-3 mx-3">
                        <table id="customers">
                            <tbody className="">
                                <tr>
                                    <th>Email</th>
                                    <th>FirstName</th>
                                    <th>LastName</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>

                                {arrUsers &&
                                    arrUsers.map((item, index) => {
                                        return (
                                            <tr
                                                className="divClass"
                                                key={index}
                                            >
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <button
                                                        className="btn-edit"
                                                        onClick={() =>
                                                            this.handleEditUser(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <i className="fas fa-edit "></i>
                                                    </button>
                                                    <button
                                                        className="btn-del"
                                                        onClick={() =>
                                                            this.handleDeleteUser(
                                                                item.id
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
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
