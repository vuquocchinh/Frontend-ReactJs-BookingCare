import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import localization from "moment/locale/vi"; //covert lich ra tieng viet
import { LANGUAGE } from "../../../utils/constant";
import { getScheduleDoctorByDate } from "../../../services/userService";
import "./DoctorSchedule.scss";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {},
        };
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);

        if (this.props.doctorIdFromParent) {
            let res = await getScheduleDoctorByDate(
                this.props.doctorIdFromParent,
                allDays[0].value
            );
            this.setState({
                allAvalableTime: res.data ? res.data : [],
            });
        }
        this.setState({
            allDays: allDays,
        });
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGE.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date())
                        .add(i, "days")
                        .format("DD/MM"); //20/7
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date())
                        .add(i, "days")
                        .format("dddd - DD/MM");

                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date())
                        .add(i, "days")
                        .format("DD/MM");
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelEn = moment(new Date())
                        .add(i, "days")
                        .local("en")
                        .format("dddd - DD/MM");
                    object.label = this.capitalizeFirstLetter(labelEn);
                }
            }
            object.value = moment(new Date())
                .add(i, "days")
                .startOf("day")
                .valueOf();
            allDays.push(object);
        }
        return allDays;
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays,
            });
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(
                this.props.doctorIdFromParent,
                allDays[0].value
            );

            this.setState({
                allAvalableTime: res.data ? res.data : [],
            });
        }
    }

    handleOnChangeSelect = async (event) => {
        if (
            this.props.doctorIdFromParent &&
            this.props.doctorIdFromParent !== -1
        ) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);

            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data ? res.data : [],
                });
            }
        }
    };

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time,
        });
    };

    closeBookingClose = () => {
        this.setState({
            isOpenModalBooking: false,
        });
    };

    render() {
        let {
            allDays,
            allAvalableTime,
            isOpenModalBooking,
            dataScheduleTimeModal,
        } = this.state;
        console.log("check shedule", dataScheduleTimeModal);
        let { language } = this.props;
        return (
            <>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select
                            onChange={(event) =>
                                this.handleOnChangeSelect(event)
                            }
                        >
                            {allDays &&
                                allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index}>
                                            {item.label}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div className="all-available-item">
                        <div className="text-calendar">
                            <i className="fas fa-calendar-alt"></i>
                            <span className="caledar-schedule">
                                {
                                    <FormattedMessage id="patient.detail-doctor.schedule" />
                                }
                            </span>
                        </div>

                        <div className="time-content">
                            {allAvalableTime && allAvalableTime.length > 0 ? (
                                <div className="aaa">
                                    <div className="time-content-btns">
                                        {allAvalableTime.map((item, index) => {
                                            let timeDisplay =
                                                language === LANGUAGE.VI
                                                    ? item.timeTypeData.valueVi
                                                    : item.timeTypeData.valueEn;
                                            return (
                                                <button
                                                    onClick={() =>
                                                        this.handleClickScheduleTime(
                                                            item
                                                        )
                                                    }
                                                    key={index}
                                                    className={
                                                        language === LANGUAGE.VI
                                                            ? "btn-vie"
                                                            : "btn-en"
                                                    }
                                                >
                                                    {timeDisplay}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="book-free">
                                        <span>
                                            <FormattedMessage id="patient.detail-doctor.choose" />
                                            <i className="far fa-hand-point-up"></i>
                                            <FormattedMessage id="patient.detail-doctor.book-free" />
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="no-schedule">
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    dataTime={dataScheduleTimeModal}
                    closeBookingClose={this.closeBookingClose}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
