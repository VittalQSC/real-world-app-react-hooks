import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { homeComponentSelect } from '../../selectors';
import agent from '../../agent';

import {
    APP_LOAD,
    HOME_PAGE_UNLOADED,
    APPLY_TAG_FILTER
} from '../../constants/actionTypes';


import Banner from './Banner';
import Tags from './Tags';

function Home() {
    const {
        appName, token, tags
    } = useSelector(homeComponentSelect);
    const dispatch = useDispatch();
    const onLoad = (payload, token) =>
        dispatch({ type: APP_LOAD, payload, token, skipTracking: true });
    const onUnload = () =>
        dispatch({ type: HOME_PAGE_UNLOADED });
    const onClickTag = (tag, pager, payload) =>
        dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload });
    const [tab, setTab] = useState('all');

    useEffect(() => {
        setTab(token ? 'feed' : 'all');
        const articlesPromise = token ?
            agent.Articles.feed :
            agent.Articles.all;
        onLoad(
            tab,
            articlesPromise,
            Promise.all([agent.Tags.getAll(), articlesPromise()])
        );
        return () => {
            onUnload();
        };
    }, [token])

    return (
        <div className="home-page">

            <Banner token={token} appName={appName} />

            <div className="container page">
                <div className="row">
                    {/* <MainView /> */}

                    <div className="col-md-3">
                        <div className="sidebar">

                            <p>Popular Tags</p>

                            <Tags
                                tags={tags}
                                onClickTag={onClickTag} />

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home
