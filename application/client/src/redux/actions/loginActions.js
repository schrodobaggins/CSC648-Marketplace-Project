import axios from 'axios';

export const setUsername = (username) => ({
    type: 'USER_SET_USERNAME',
    username
});

export const setPassword = (password) => ({
    type: 'USER_SET_PASSWORD',
    password
});

export const updateUserFirstName = (first_name) => ({
    type: "USER_UPDATE_FIRSTNAME",
    first_name
});

export const updateUserLastName = (last_name) => ({
    type: "USER_UPDATE_LASTNAME",
    last_name
});

export const loginUser = () => {
    return (dispatch, getState) => {
        const userData = {
            "username": getState().registerReducer.username,
            "password": getState().registerReducer.password,
        };

        console.log(userData);

        axios.post('/api/login', userData, {
            "headers": {
                "content-type":"application/json",
            },
        })
            .then((res) => {
                console.log(res);
                if(res.status === 201) {
                    dispatch(setUserId(res.data.user_id));
                    dispatch(redirectUserAfterLogin(true));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
};  

export const getUserProfile = () => {
    return (dispatch, getState) => {
        axios.get(`/api/users/${getState().loginReducer.user_id}`)
            .then((res) => {
                console.log(res);
                if(res.status === 200) {

                    console.log(res.data);
                    dispatch(updateUserFirstName(res.data.first_name));
                    dispatch(updateUserLastName(res.data.last_name));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const redirectUserAfterLogin = (loggedIn) => ({
    type: "USER_IS_LOGGEDIN",
    loggedIn
});

export const setUserId = (user_id) => ({
    type: "USER_SET_ID",
    user_id
});
