import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGE, CRUD_ACTIONS, dateFormat } from "../../../utils";
import * as action from "../../../store/actions";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import Select from "react-select";
import { Toast, toast } from "react-toastify";
import _, { flatMap } from "lodash";
import moment from "moment";
import {
    getAllPatientForDoctor,
    postSendRemedy,
} from "../../../services/userService";
import RemedyModal from "./RemedyModal";
import LoadingOverlay from "react-loading-overlay";

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf("day").valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        };
    }

    componentDidMount() {
        this.getDataPatient();
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();

        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate,
        });

        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            });
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) { }

    handleOnChangeDatePicker = (date) => {
        console.log("Selected Date:", date);
        this.setState(
            {
                currentDate: date[0],
            },
            async () => {
                await this.getDataPatient();
            }
        );
    };

    handleBtnConfirm = (item) => {
        console.log("check item", item);
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        };

        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
        });
    };

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {},
        });
    };

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true,
        });

        console.log("check data modal", dataModal);
        let res = await postSendRemedy({
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            timeType: dataModal.timeType,
            patientName: dataModal.patientName,
            language: this.props.language,
        });

        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false,
            });
            toast.success("send Remedy succeeds");
            this.closeRemedyModal();
            await this.getDataPatient();
        } else {
            this.setState({
                isShowLoading: false,
            });
            toast.error(" Something wrongs ....");
            console.log("error send remedy: ", res);
        }
    };

    handleBtnRemedy = () => { };

    render() {
        console.log("check currentdate", this.state);

        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text="Loading..."
                >
                    <div className="manage-patient-container">
                        <div className="m-p-title">
                            {/* <FormattedMessage id="manage-patient.title" /> */}
                            Quản lý bệnh nhân khám bệnh
                        </div>
                        <div className="manage-patient-body row">
                            <div className="col-4 form-group mb-3">
                                <label>Chọn ngày khám</label>

                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                />
                            </div>

                            <div className="col-12 table-manage-patient">
                                <table style={{ width: "100%" }}>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Mail</th>
                                            <th>Thời gian</th>
                                            <th>Họ và tên</th>
                                            <th>Địa chỉ </th>
                                            <th>Giơi tính</th>
                                            <th>Actions</th>
                                        </tr>

                                        {dataPatient &&
                                            dataPatient.length > 0 ? (
                                            dataPatient.map((item, index) => {
                                                let time =
                                                    language === LANGUAGE.VI
                                                        ? item
                                                            .timeTypeDataPatient
                                                            .valueVi
                                                        : item
                                                            .timeTypeDataPatient
                                                            .valueEn;
                                                let gender =
                                                    language === LANGUAGE.VI && item.patientData.genderData
                                                        ? item.patientData.genderData.valueVi
                                                        : language === LANGUAGE.EN && item.patientData.genderData
                                                            ? item.patientData.genderData.valueEn
                                                            : "Nam";

                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .email
                                                            }
                                                        </td>
                                                        <td>{time}</td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .firstName
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .address
                                                            }
                                                        </td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button
                                                                className="mp-btn-confirm"
                                                                onClick={() =>
                                                                    this.handleBtnConfirm(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                Xác nhận
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {" "}
                                                    No Data
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(action.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(action.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
