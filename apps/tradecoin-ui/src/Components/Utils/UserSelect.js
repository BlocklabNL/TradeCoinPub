import { React, useState, useMemo, useRef } from 'react'

import debounce from 'lodash/debounce';

import { Select, Spin } from 'antd';

async function fetchUserList(query, selectValue) {
    console.log('fetching user', query);
    return fetch(`http://localhost:3030/user?query=${query}`)
        .then((response) => response.json())
        .then(

            // (body) =>
            // body.userList.map((user) => ({
            //     label: `${user.fname} ${user.lname} (${user.email})`,
            //     value: user._id,
            // })),

            (body) =>
                body.userList.reduce((options, user) => {
                    let value = user._id
                    if (selectValue === "baddress") {
                        value = user.baddress
                    }
                    options.push({
                        label: `${user.fname} ${user.lname} (${user.email})`,
                        value: value,
                    });
                    return options;
                }, [])
        );
}

function UserSelect({ selectValue, fetchOptions, debounceTimeout = 800, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);
    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            fetchUserList(value, selectValue).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }
                console.log(newOptions);
                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    return (
        <Select
            showSearch={true}
            labelInValue
            showArrow={false}
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
        />
    );
}

export default UserSelect;