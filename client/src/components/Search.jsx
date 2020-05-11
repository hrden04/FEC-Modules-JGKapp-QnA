import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchtext: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      searchtext: e.target.value,
    });
  }

  render() {
    const { searchtext } = this.state;
    return (
      <input
        type="search"
        value={searchtext}
        onChange={this.handleChange}
        placeholder="Have a question? Search for answers"
      />
    );
  }
}

export default Search;
