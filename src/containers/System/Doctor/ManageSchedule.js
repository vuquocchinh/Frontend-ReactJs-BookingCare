import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGE, CRUD_ACTIONS, dateFormat } from "../../../utils";
import * as action from "../../../store/actions";
import "./ManageSchedule.scss";
import DatePicker from "../../../components/Input/DatePicker";
import Select from "react-select";
import { Toast, toast } from "react-toastify";
import _ from "lodash";
import moment from "moment";
import { saveBulkScheduleDoctor } from "../../../services/userService";

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentData: "",
            rangeTime: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect,
            });
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map((item, index) => ({
                    ...item,
                    isSelected: false,
                }));
            }
            this.setState({
                rangeTime: data,
            });
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    };

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });
    };

    handleOnChangeDataPicker = (data) => {
        this.setState({ currentData: data[0] });
    };

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map((item) => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            });
            this.setState({
                rangeTime: rangeTime,
            });
        }
    };

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentData } = this.state;
        let result = [];
        if (!currentData) {
            toast.error("Invalid date!");
            return;
        }

        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selected doctor!");
            return;
        }

        // let formatDate = moment(currentData).format(dateFormat.SEND_TO_SERVER);
        console.log("currentData", currentData);
        let formatDate = new Date(currentData).getTime();
        console.log("formatDate", formatDate);
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(
                (item) => item.isSelected === true
            );
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                });
            } else {
                toast.error("invalid selected time!");
                return;
            }
        }

        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatDate: formatDate,
        });

        if (res && res.errCode === 0) {
            toast.success("Save infor succeed!");
        } else {
            toast.error("error saveBulkScheduleDoctor ");
            console.log("saveBulkScheduleDoctor error >>res:", res);
        }

        //console.log("check result : ", result);
    };
    render() {
        //  console.log("check state: ", this.state);
        let { rangeTime } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

        return (
            <>
                <div className="manage-schedule-container">
                    <div className="m-s-title">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>
                                    {" "}
                                    <FormattedMessage id="manage-schedule.choose-doctor" />
                                </label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    {" "}
                                    <FormattedMessage id="manage-schedule.choose-data" />
                                </label>
                                <DatePicker
                                    onChange={this.handleOnChangeDataPicker}
                                    className="form-control"
                                    value={this.state.currentData}
                                    minDate={yesterday}
                                />
                            </div>

                            <div className="col-12 pick-hour-container">
                                {rangeTime &&
                                    rangeTime.length > 0 &&
                                    rangeTime.map((item, index) => {
                                        return (
                                            <button
                                                className={
                                                    item.isSelected === true
                                                        ? "btn btn-schedule active"
                                                        : "btn btn-schedule"
                                                }
                                                key={index}
                                                onClick={() =>
                                                    this.handleClickBtnTime(
                                                        item
                                                    )
                                                }
                                            >
                                                {language === LANGUAGE.VI
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </button>
                                        );
                                    })}
                            </div>
                            <div className="col-12">
                                <button
                                    className="btn btn-save-schedule btn-primary"
                                    onClick={() => this.handleSaveSchedule()}
                                >
                                    <FormattedMessage id="manage-schedule.save" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(action.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(action.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
