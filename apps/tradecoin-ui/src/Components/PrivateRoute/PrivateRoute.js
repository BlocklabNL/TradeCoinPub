import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ children, ...rest }) => {
    let token = useSelector((state) => state.auth.token)

    console.log(token);

    if (token == '') {
        const jwtFromStorage = localStorage.getItem("jwt");
        if (jwtFromStorage) {
            token = jwtFromStorage;
        }
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                token ? (
                    <div>{children}</div>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};