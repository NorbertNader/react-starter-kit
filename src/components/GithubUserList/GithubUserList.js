/**
 * Github users list component
 *
 * Copyright © 2018-present Norbert Nader
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GithubUserList.css';

class GithubUserList extends React.Component {
  static propTypes = {
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired,
      }),
    ).isRequired,
    removeUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.removeUser = this.removeUser.bind(this);
  }

  /**
   * Remove user from list
   * @param e
   */
  removeUser(e) {
    this.props.removeUser(e.target.dataset.id);
  }

  render() {
    const listItems = this.props.users.map(user => (
      <li key={user.id} className={s.userListItem}>
        @{user.login}
        <button
          data-id={user.id}
          onClick={this.removeUser}
          className={s.removeUserButton}
        >
          X
        </button>
      </li>
    ));
    return <ul className={s.userList}>{listItems}</ul>;
  }
}

export default withStyles(s)(GithubUserList);
