import React from 'react'
import PropTypes from 'prop-types'

import SearchResult from './SearchResult'

export default class Search extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      query: '',
    }
  }

  handleQueryChange = (event) => {
    this.setState({ query: event.currentTarget.value })
  }

  allBlobs() {
    const {
      data: { guilds, community },
    } = this.props

    const allGuilds = { ...guilds, ...community }

    // Inject `invite` and `server` properties to all emoji objects.
    return Object.values(allGuilds).reduce(
      (acc, guild) => [
        ...guild.emoji.map((emoji) => ({
          ...emoji,
          invite: guild.invite,
          server: guild.name,
        })),
        ...acc,
      ],
      []
    )
  }

  filterBlobs() {
    const { query } = this.state

    return this.allBlobs()
      .filter((blob) => blob.name.includes(query.toLowerCase()))
      .sort(({ name: a }, { name: b }) => a.length - b.length)
      .slice(0, 8 * 5)
  }

  render() {
    const { query } = this.state

    const results = query === '' ? [] : this.filterBlobs()

    return (
      <React.Fragment>
        <input
          id="search-field"
          type="text"
          placeholder="Search blobs..."
          value={query}
          onChange={this.handleQueryChange}
        />
        <div id="search-results">
          {results.map((blob) => (
            <SearchResult key={blob.id} blob={blob} />
          ))}
        </div>
      </React.Fragment>
    )
  }
}
