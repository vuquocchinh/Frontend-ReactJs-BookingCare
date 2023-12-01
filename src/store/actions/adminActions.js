import actionTypes from "./actionTypes";
import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getAllSpecialty,
    getAllClinic,
} from "../../services/userService";
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// });
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log("fetchGenderStart error: ", e);
        }
    };
};
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("position");

            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log("fetchPositionStart error: ", e);
        }
    };
};
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("role");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log("fetchRoleStart error: ", e);
        }
    };
};
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});
export const fetchPositionSuccess = (potisionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: potisionData,
});
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED,
});
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAIDED,
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAIDED,
});
//

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                console.log("user:", res);
                dispatch(fetAllUsersSuccess(res.users.reverse()));
            } else {
                dispatch(fetAllUsersFailed());
            }
        } catch (e) {
            dispatch(fetAllUsersFailed());
            console.log("saveUserFailed error: ", e);
        }
    };
};
export const fetAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data,
});
export const fetAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILDED,
});

//

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed!");
                await dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log("saveUserFailed error: ", e);
        }
    };
};

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILDED,
});

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete the user succeed!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.log("saveUserFailed error: ", e);
        }
    };
};
export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    users: data,
});
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILDED,
});

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Edit the user succeed!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(editUserFailed());
            }
        } catch (e) {
            dispatch(editUserFailed());
            console.log("editUserFailed error: ", e);
        }
    };
};
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILDED,
});

export const fetchTopDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService("");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILDED,
                });
            }
        } catch (e) {
            console.log("FETCH_TOP_DOCTORS_FAILDED error: ", e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILDED,
            });
        }
    };
};

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILDED,
                });
            }
        } catch (e) {
            console.log("FETCH_ALL_DOCTORS_FAILDED error: ", e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILDED,
            });
        }
    };
};

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success("save info detail doctor the user succeed!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                });
            } else {
                toast.error("save info detail doctor the user error!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
                });
            }
        } catch (e) {
            console.log("SAVE_DETAIL_DOCTOR_FAILDED error: ", e);
            toast.error("save info detail doctor the user error!");

            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
            });
        }
    };
};

export const fetchAllScheduleTime = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED,
                });
            }
        } catch (e) {
            console.log("FETCH_ALLCODE_SCHEDULE_TIME_FAILDED error: ", e);

            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED,
            });
        }
    };
};
export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START });
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();

            if (
                resPrice &&
                resPrice.errCode === 0 &&
                resPayment &&
                resPayment.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0 &&
                resSpecialty &&
                resSpecialty.errCode === 0 &&
                resClinic &&
                resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data,
                };
                dispatch(fetchRequiredDoctorInforSuccess(data));
            } else {
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (e) {
            console.log("fetchRequiredDoctorInforFailed error: ", e);

            dispatch(fetchRequiredDoctorInforFailed());
        }
    };
};
export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData,
});
export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});
