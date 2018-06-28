/**
 * Github users component
 *
 * Copyright © 2018-present Norbert Nader
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GithubUsers.css';
import GithubUserSearchBar from '../../components/GithubUserSearchBar';
import GithubUserList from '../../components/GithubUserList';

class GithubUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }

  componentDidMount() {
    this.updateState();
  }

  /**
   * Add user to state
   * @param id
   * @param login
   */
  addUser(id, login) {
    let i = this.state.users.length - 1;
    while (i >= 0) {
      if (this.state.users[i].id === id) {
        return;
      }
      i -= 1;
    }
    const newState = [...this.state.users, { id, login }];
    localStorage.setItem('users', JSON.stringify(newState));
    this.setState({
      users: newState,
    });
  }

  /**
   * Remove user from state
   * @param id
   */
  removeUser(id) {
    const users = [...this.state.users];
    let i = users.length - 1;
    while (i >= 0) {
      if (users[i].id === id) {
        users.splice(i, 1);
        break;
      }
      i -= 1;
    }
    localStorage.setItem('users', JSON.stringify([...users]));
    this.setState({
      users: [...users],
    });
  }

  /**
   * Updates state from cache
   */
  updateState() {
    const cachedUsers = localStorage.getItem('users');
    if (cachedUsers) {
      this.setState({
        users: JSON.parse(cachedUsers),
      });
    }
  }

  render() {
    return (
      <div className={s.githubContainer}>
        <h1>@ Github Mentioner</h1>
        <GithubUserSearchBar addUser={this.addUser} />
        <GithubUserList users={this.state.users} removeUser={this.removeUser} />
      </div>
    );
  }
}

export default withStyles(s)(GithubUsers);
