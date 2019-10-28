import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import agent from '../../agent';
import { articleListSelect, homeComponentSelect } from './../../selectors';

import { CHANGE_TAB } from '../../constants/actionTypes';

import ArticleList from './../ArticleList';

const YourFeedTab = props => {
    if (props.token) {
      const clickHandler = ev => {
        ev.preventDefault();
        props.onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
      }
  
      return (
        <li className="nav-item">
          <a  href=""
              className={ props.tab === 'feed' ? 'nav-link active' : 'nav-link' }
              onClick={clickHandler}>
            Your Feed
          </a>
        </li>
      );
    }
    return null;
  };
  
const GlobalFeedTab = props => {
    const clickHandler = ev => {
        ev.preventDefault();
        props.onTabClick('all', agent.Articles.all, agent.Articles.all());
    };
    return (
        <li className="nav-item">
        <a
            href=""
            className={ props.tab === 'all' ? 'nav-link active' : 'nav-link' }
            onClick={clickHandler}>
            Global Feed
        </a>
        </li>
    );
};

const TagFilterTab = props => {
    if (!props.tag) {
        return null;
    }

    return (
        <li className="nav-item">
        <a href="" className="nav-link active">
            <i className="ion-pound"></i> {props.tag}
        </a>
        </li>
    );
};

const MainView = () => {
    const { token } = useSelector(homeComponentSelect);
    const {
        tab, tag, pager,
        articles,
        loading,
        articlesCount,
        currentPage
    } = useSelector(articleListSelect)

    const dispatch = useDispatch();
    const onTabClick = (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload });
    return (
      <div className="col-md-9">
        <div className="feed-toggle">
          <ul className="nav nav-pills outline-active">
  
            <YourFeedTab
              token={token}
              tab={tab}
              onTabClick={onTabClick} />
  
            <GlobalFeedTab tab={tab} onTabClick={onTabClick} />
  
            <TagFilterTab tag={tag} />
  
          </ul>
        </div>
  
        <ArticleList 
            pager = {pager}
            articles = {articles}
            loading = {loading}
            articlesCount = {articlesCount}
            currentPage = {currentPage}
        />
      </div>
    );
  };

export default MainView;
