import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGE } from "../../utils/constant";

import { changeLanguageApp } from "../../store/actions/appActions";

class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
        //fire acton
    };

    render() {
        let language = this.props.language;
        console.log("check pops: ", this.props);
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <a href="/">
                                <div className="header-logo"></div>
                            </a>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeHeader.specialy" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="homeHeader.searchdoctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeHeader.healthfacility" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="homeHeader.choosehospital" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeHeader.doctor" />
                                    </b>{" "}
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="homeHeader.choosedoctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeHeader.medicalpackage" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="homeHeader.healthcheck" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"></i>{" "}
                                <FormattedMessage id="homeHeader.support" />
                                {/* <p>0971213792</p> */}
                            </div>
                            <div
                                className={
                                    language === LANGUAGE.VI
                                        ? "language-vi active"
                                        : "language-vi "
                                }
                            >
                                <span
                                    onClick={() =>
                                        this.changeLanguage(LANGUAGE.VI)
                                    }
                                >
                                    VietNam
                                </span>
                            </div>
                            <div>|</div>
                            <div
                                className={
                                    language === LANGUAGE.EN
                                        ? "language-en active"
                                        : "language-en "
                                }
                            >
                                <span
                                    onClick={() =>
                                        this.changeLanguage(LANGUAGE.EN)
                                    }
                                >
                                    English
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true && (
                    <div className="home-header-banner">
                        <div className="home-header__up">
                            <h1 className="title1">
                                <FormattedMessage id="banner.title1" />
                            </h1>
                            <h2 className="title2">
                                <b>
                                    <FormattedMessage id="banner.title2" />
                                </b>
                            </h2>
                            <div className="home-header__search">
                                <i className="fas fa-search"></i>
                                <input
                                    type="text"
                                    placeholder="Tìm chuyên khoa"
                                />
                            </div>
                        </div>
                        <div className="home-header__down">
                            <div className="home-header__options">
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <b>
                                            <FormattedMessage id="banner.child1" />
                                        </b>
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-mobile"></i>
                                    </div>
                                    <div className="text-child">
                                        <b>
                                            {" "}
                                            <FormattedMessage id="banner.child2" />
                                        </b>
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-file-alt"></i>
                                    </div>
                                    <div className="text-child">
                                        <b>
                                            {" "}
                                            <FormattedMessage id="banner.child3" />
                                        </b>
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-vial"></i>
                                    </div>
                                    <div className="text-child">
                                        <b>
                                            {" "}
                                            <FormattedMessage id="banner.child4" />
                                        </b>
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-vial"></i>
                                    </div>
                                    <div className="text-child">
                                        <b>
                                            {" "}
                                            <FormattedMessage id="banner.child5" />
                                        </b>
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <b>
                                            <FormattedMessage id="banner.child6" />
                                        </b>
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <b>
                                            {" "}
                                            <FormattedMessage id="banner.child7" />
                                        </b>
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <b>
                                            {" "}
                                            <FormattedMessage id="banner.child8" />
                                        </b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) =>
            dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
