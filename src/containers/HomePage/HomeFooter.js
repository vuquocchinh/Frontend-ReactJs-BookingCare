import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeFooter.scss";
import { FormattedMessage } from "react-intl";
class HomeFooter extends Component {
    render() {
        return (
            <>
                <div className="footer-container">
                    <div className="footer-company-info">
                        <div className="footer-logo"></div>
                        <div className="footer-info">
                            <b>Công Ty Cổ Phần Dịch Vụ BookingCare</b>
                            <p>
                                <i className="fas fa-map-marker-alt"></i>Hutech Campus, VQ4P+249, Phường Tân Phú, Quận 9, Thành phố Hồ Chí Minh, Việt Nam
                            </p>
                            <p>
                                <i className="fas fa-check"></i> ĐKKD số:
                                0106790291. Sở KHĐT HCM cấp ngày 16/03/2015
                            </p>
                        </div>
                    </div>
                    <div className="footer-company-hotline">
                        <ul>
                            <li>
                                <a href="/">Liên hệ hợp tác</a>
                            </li>
                            <li>
                                <a href="/">Danh bạ y tế</a>
                            </li>
                            <li>
                                <a href="/">Sức khỏe doanh nghiệp</a>
                            </li>
                            <li>
                                <a href="/">Gói chuyển đổi số doanh nghiệp</a>
                            </li>
                            <li>
                                <a href="/">Tuyển dụng</a>
                            </li>
                            <li>
                                <a href="/">Câu hỏi thường gặp</a>
                            </li>
                            <li>
                                <a href="/">Điều khoản sử dụng</a>
                            </li>
                            <li>
                                <a href="/">Chính sách Bảo mật</a>
                            </li>
                            <li>
                                <a href="/">
                                    Quy trình hỗ trợ giải quyết khiếu nại
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-company-address">
                        <div>
                            <b>Trụ sở tại Hồ Chí Minh</b>
                            <p>
                                Hutech Campus, Thành phố Hồ Chí Minh, Việt Nam
                            </p>
                            <b>Văn phòng tại TP Hồ Chí Minh</b>
                            <p>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</p>
                            <b>Hỗ trợ khách hàng</b>
                            <p>support@bookingcare.vn (7h - 18h)</p>
                            <b>Hotline</b>
                            <p>
                                <span>024-7301-2468</span> (7h - 18h)
                            </p>
                        </div>
                    </div>
                </div>
                <div className="end-footer">
                    <div className="footer-copy">
                        <div>
                            <p> &copy; 2023 BookingCare.</p>
                        </div>
                        <div className="social">
                            <div className="fb"></div>
                            <div className="ytb"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
