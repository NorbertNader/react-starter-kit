/**
 * Github users list route
 *
 * Copyright © 2018-present Norbert Nader
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import GithubUsers from './GithubUsers';

async function action() {
  return {
    title: 'Github users list',
    chunks: ['github-users'],
    component: <GithubUsers />,
  };
}

export default action;
