import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import Slider from "react-slick";

class HandBook extends Component {
    render() {
        return (
            <>
                <div className="section-share section-handbook">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section">Cẩm nang</span>
                            <button className="btn-section">
                                tất cả bài viết
                            </button>
                        </div>
                        <div className="section-body">
                            <Slider {...this.props.settings}>
                                <div className="section-customize">
                                    <div className="outer-bg">
                                        <div className="bg-image section-handbook-img"></div>
                                    </div>
                                    <div className="position text-center">
                                        <div>
                                            <b>
                                                Tiến sĩ, Bác sĩ Nguyễn Thị Thanh
                                                Thủy 1
                                            </b>
                                        </div>
                                        <span>Cơ xương khớp</span>
                                    </div>
                                </div>{" "}
                                <div className="section-customize">
                                    <div className="outer-bg">
                                        <div className="bg-image section-handbook-img"></div>
                                    </div>
                                    <div className="position text-center">
                                        <div>
                                            <b>
                                                Tiến sĩ, Bác sĩ Nguyễn Thị Thanh
                                                Thủy 2
                                            </b>
                                        </div>
                                        <span>Cơ xương khớp</span>
                                    </div>
                                </div>{" "}
                                <div className="section-customize">
                                    <div className="outer-bg">
                                        <div className="bg-image section-handbook-img"></div>
                                    </div>
                                    <div className="position text-center">
                                        <div>
                                            <b>
                                                Tiến sĩ, Bác sĩ Nguyễn Thị Thanh
                                                Thủy 3
                                            </b>
                                        </div>
                                        <span>Cơ xương khớp</span>
                                    </div>
                                </div>{" "}
                                <div className="section-customize">
                                    <div className="outer-bg">
                                        <div className="bg-image section-handbook-img"></div>
                                    </div>
                                    <div className="position text-center">
                                        <div>
                                            <b>
                                                Tiến sĩ, Bác sĩ Nguyễn Thị Thanh
                                                Thủy 4
                                            </b>
                                        </div>
                                        <span>Cơ xương khớp</span>
                                    </div>
                                </div>{" "}
                                <div className="section-customize">
                                    <div className="outer-bg">
                                        <div className="bg-image section-handbook-img"></div>
                                    </div>
                                    <div className="position text-center">
                                        <div>
                                            <b>
                                                Tiến sĩ, Bác sĩ Nguyễn Thị Thanh
                                                Thủy 5
                                            </b>
                                        </div>
                                        <span>Cơ xương khớp</span>
                                    </div>
                                </div>{" "}
                                <div className="section-customize">
                                    <div className="outer-bg">
                                        <div className="bg-image section-handbook-img"></div>
                                    </div>
                                    <div className="position text-center">
                                        <div>
                                            <b>
                                                Tiến sĩ, Bác sĩ Nguyễn Thị Thanh
                                                Thủy 6
                                            </b>
                                        </div>
                                        <span>Cơ xương khớp</span>
                                    </div>
                                </div>
                            </Slider>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
