/**
 * Github users search bar component
 *
 * Copyright © 2018-present Norbert Nader
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './GithubUserSearchBar.css';

class GithubUserSearchBar extends React.Component {
  static propTypes = {
    addUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { users: [] };
    this.getUsers = this.getUsers.bind(this);
    this.addUser = this.addUser.bind(this);
    this.input = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('click', this.hideList.bind(this));
  }

  /**
   * Creates request for users, set timeout because of request limit to github api
   * https://developer.github.com/v3/#rate-limiting
   */
  getUsers(e) {
    e.preventDefault();
    const { value } = e.target;
    if (value === '' && this.state.users) {
      this.setState({ users: [] });
      return;
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.timeout = setTimeout(() => {
      fetch(`https://api.github.com/search/users?q=${value}+in:login`)
        .then(response => response.json())
        .then(result => this.setResult(result))
        .catch(err => console.error(err));
    }, 100);
  }

  /**
   * Creates list of users from api response
   * @param result
   */
  setResult(result) {
    if (!result || !result.items) return;
    this.setState({
      users: result.items.map(user => ({ id: user.id, login: user.login })),
    });
  }

  /**
   * Hide user search list
   */
  hideList() {
    this.setState({ users: [] });
  }

  /**
   * Add user to list
   * @param e
   */
  addUser(e) {
    e.target = e.currentTarget;
    this.props.addUser(e.target.dataset.id, e.target.dataset.login);
    this.setState({ users: [] });
  }

  render() {
    let dropdownList;
    const input = this.input.current;
    if (this.state.users.length) {
      const listItems = this.state.users.map(user => {
        const liUid = `user-search-${user.id}`;
        const buttonUid = `user-search-${user.id}`;
        const highlightUid = `highlight-${user.id}`;
        const highlightedText = `${user.login}`
          .split(new RegExp(`^(${input.value})`, 'i'))
          .map(match => {
            if (match.toLowerCase() === input.value.toLowerCase())
              return <b key={highlightUid}>{input.value}</b>;
            return match;
          });
        return (
          <li key={liUid}>
            <button
              key={buttonUid}
              data-id={user.id}
              data-login={user.login}
              onClick={this.addUser}
              className={s.userSearchListItem}
            >
              @{highlightedText}
            </button>
          </li>
        );
      });
      dropdownList = <ul className={s.userSearchList}>{listItems}</ul>;
    } else {
      dropdownList = <ul className={cx(s.userSearchList, s.hidden)} />;
    }
    return (
      <form>
        <input
          className={s.searchUserInput}
          type="text"
          autoComplete="off"
          onInput={this.getUsers}
          ref={this.input}
        />
        {dropdownList}
      </form>
    );
  }
}

export default withStyles(s)(GithubUserSearchBar);
