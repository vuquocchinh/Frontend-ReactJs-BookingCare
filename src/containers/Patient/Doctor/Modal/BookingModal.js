import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { FormattedMessage } from "react-intl";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import { Modal } from "reactstrap";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGE } from "../../../../utils";
import Select from "react-select";
import { postPatientBookAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            phoneNumber: "",
            email: "",
            address: "",
            reason: "",
            birthday: "",
            selectedGender: "",
            doctorId: "",
            genders: "",
            timeType: "",
            //dataTime: [],
        };
    }

    async componentDidMount() {
        this.props.getGenders();
        // if (this.props.dataTime !== prevProps.dataTime) {
        //     let { doctorId, timeType } = this.props.dataTime;
        //     this.setState({
        //         doctorId: doctorId,
        //         timeType: timeType,
        //     });
        // }
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        console.log("fata", data);

        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label =
                    language === LANGUAGE.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            });
        }
        console.log("gender", result);
        return result;
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            let { doctorId, timeType } = this.props.dataTime;
            this.setState({
                doctorId: doctorId,
                timeType: timeType,
            });
        }
        if (this.props.genders !== prevProps.genders) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let { doctorId, timeType } = this.props.dataTime;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,
                });
            }
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }
    }

    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy,
        });
    };

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0],
        });
    };

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption,
        });
    };

    handleConfirmBooking = async () => {
        //validate/ can validate
        let date = new Date(this.state.birthday).getTime();
        let timeString = await this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);

        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,

            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        });

        if (res && res.errCode === 0) {
            toast.success("Succeed!");
            this.props.closeBookingClose();
        } else {
            toast.error("Error!");
        }
    };

    buildTimeBooking = async (dataTime) => {
        console.log("dataiem id", dataTime);
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time =
                language === LANGUAGE.VI
                    ? dataTime.timeTypeData.valueVi
                    : dataTime.timeTypeData.valueEn;

            let date =
                language === LANGUAGE.VI
                    ? moment
                        .unix(+dataTime.date / 1000)
                        .format("dddd - DD/MM/YYYY")
                    : moment
                        .unix(+dataTime.date / 1000)
                        .local("en")
                        .format("ddd - MM/DD/YYYY");
            console.log("dataiem id", time, date);
            return `${time}- ${date}`;
        }
        return "";
    };

    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name =
                language === LANGUAGE.VI
                    ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                    : ` ${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
            return name;
        }
        return "";
    };

    render() {
        let { isOpenModal, closeBookingClose, dataTime } = this.props;

        console.log("check datatiem doctor id , tiemtype", dataTime);
        console.log("check props", this.props);

        let doctorId =
            dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";

        return (
            <Modal
                isOpen={isOpenModal}
                // toggle={this.toggle}
                className={"booking-modal-container"}
                size="lg"
                centered
                style={{ marginBottom: "200px" }}
            >
                <div className="booking-modal-container">
                    <div className="booking-modal-header">
                        <span className="left">
                            <FormattedMessage id="patient.booking-modal.title" />
                        </span>
                        <span className="right" onClick={closeBookingClose}>
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="booking-modal-body">
                        <div className="doctor-infor">
                            {" "}
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                                isShowLinkDetail={false}
                                isShowPrice={true}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.fullName" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.fullName}
                                    onChange={(event) =>
                                        this.handleOnchangeInput(
                                            event,
                                            "fullName"
                                        )
                                    }
                                />{" "}
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.phoneNumber" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.phoneNumber}
                                    onChange={(event) =>
                                        this.handleOnchangeInput(
                                            event,
                                            "phoneNumber"
                                        )
                                    }
                                />{" "}
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.email" />
                                </label>
                                <input
                                    className="form-control"
                                    type="email"
                                    value={this.state.email}
                                    onChange={(event) =>
                                        this.handleOnchangeInput(event, "email")
                                    }
                                />{" "}
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.address" />{" "}
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.address}
                                    onChange={(event) =>
                                        this.handleOnchangeInput(
                                            event,
                                            "address"
                                        )
                                    }
                                />{" "}
                            </div>
                            <div className="col-12 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.reason" />
                                </label>
                                <input
                                    className="form-control"
                                    value={this.state.reason}
                                    onChange={(event) =>
                                        this.handleOnchangeInput(
                                            event,
                                            "reason"
                                        )
                                    }
                                />{" "}
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.birthday" />
                                </label>
                                <DatePicker
                                    className="form-control"
                                    value={this.state.birthday}
                                    onChange={this.handleOnchangeDatePicker}
                                />{" "}
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.gender" />
                                </label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />{" "}
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button
                            className="btn-booking-confirm"
                            onClick={() => this.handleConfirmBooking()}
                        >
                            <FormattedMessage id="patient.booking-modal.btnConfirm" />
                        </button>
                        <button
                            className="btn-booking-cancel"
                            onClick={closeBookingClose}
                        >
                            <FormattedMessage id="patient.booking-modal.btnCancel" />
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
