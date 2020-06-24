import React from 'react';

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
      <div className="search-wrapper">
        <div className="input-container">
          <i className="icon-search" />
          <input
            type="text"
            className="search-input"
            value={searchtext}
            onChange={this.handleChange}
            placeholder="Have a question? Search for answers"
          />
        </div>
      </div>
    );
  }
}

export default Search;
