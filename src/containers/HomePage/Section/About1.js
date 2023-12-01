import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class About1 extends Component {
    render() {
        return (
            <>
                <div className="section-share section-about">
                    <div className="about-content">
                        <div className="about-social">
                            <h3 className="about-heading">
                                Thêm thông tin về BookingCare
                            </h3>
                            <iframe
                                width="100%"
                                height="350px"
                                src="https://www.youtube.com/embed/OASGscJQXp0"
                                title="[Lyric HD] Tíc Tắc - B-Ray (Prod. by Omito Beats)"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen
                            ></iframe>
                        </div>
                        <div className="about-info">
                            <div className="info-app">
                                <h4>Tải ứng dụng BookingCare</h4>
                                <p>
                                    <i className="fas fa-check"></i>Đặt khám
                                    nhanh hơn
                                </p>
                                <p>
                                    <i className="fas fa-check"></i>Nhận thông
                                    báo từ hệ
                                </p>
                                <p>
                                    <i className="fas fa-check"></i>Nhận hướng
                                    dẫn đi khám chi tiết
                                </p>
                                <div className="info-down-app">
                                    <div className="googleplay"></div>
                                    <div className="appstore"></div>
                                </div>
                                <div className="link-app">
                                    Hoặc mở liên kết:{" "}
                                    <a
                                        target="blank"
                                        href="https://bookingcare.vn/"
                                    >
                                        https://bookingcare.vn/
                                    </a>
                                </div>
                            </div>
                            <div className="info-down"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About1);
