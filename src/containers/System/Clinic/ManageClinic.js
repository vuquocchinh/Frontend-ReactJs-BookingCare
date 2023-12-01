import React, { Component } from "react";
import { connect } from "react-redux";
import MarkDownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageClinic.scss";
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import { createNewClinic } from "../../../services/userService";

const mdParser = new MarkDownIt();

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
        };
    }

    componentDidMount() {}

    componentDidUpdate() {}

    handleOnchangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    };

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };

    handleSaveNewClinic = async () => {
        console.log(this.state);
        let res = await createNewClinic(this.state);
        if (res && res.errCode === 0) {
            this.state = {
                name: "",
                address: "",
                imageBase64: "",
                descriptionHTML: "",
                descriptionMarkdown: "",
            };
            toast.success("Add new clinic succeed!");
        } else {
            toast.error("Somthing wrongs...");
            console.log(">>>check res error: ", res);
        }
    };
    render() {
        return (
            <>
                <div className="manage-specialty-container">
                    <div className="ms-title">Quản Lý phòng khám</div>
                    <div className="add-new-specialty row">
                        <div className="col-12 name-upload">
                            <div className="col-6 form-group ">
                                <label>Tên phòng khám</label>
                                <input
                                    className="form-control"
                                    type="text "
                                    value={this.state.name}
                                    onChange={(event) =>
                                        this.handleOnchangeInput(event, "name")
                                    }
                                />
                            </div>

                            <div className="col-6 form-group img">
                                <label> Ảnh</label>
                                <input
                                    type="file"
                                    class="form-control-file"
                                    id="exampleFormControlFile1"
                                    onChange={(event) =>
                                        this.handleOnchangeImage(event)
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-6 form-group mb-3 ">
                            <label>đia chỉ </label>
                            <input
                                className="form-control"
                                type="text "
                                value={this.state.address}
                                onChange={(event) =>
                                    this.handleOnchangeInput(event, "address")
                                }
                            />
                        </div>

                        <div className="col-12 ">
                            <MdEditor
                                style={{ height: "300px" }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.contentMarkdown}
                            />
                        </div>

                        <div className="col-12">
                            <button
                                className="btn-save-specialty"
                                onClick={() => this.handleSaveNewClinic()}
                            >
                                Save
                            </button>{" "}
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
