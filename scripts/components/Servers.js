import React from 'react'
import PropTypes from 'prop-types'

import Server from './Server'

export default function Servers({ data }) {
  const { guilds: servers } = data

  return Object.entries(servers).map(([id, server]) => (
    <Server key={id} server={{ id, ...server }} />
  ))
}

Servers.propTypes = {
  data: PropTypes.object.isRequired,
}