import React, { PropTypes } from 'react';
import { Icon, Input } from 'react-materialize';

/**
 * Search bar stateless functional component
 */
const SearchBox = ({ onChange }) =>
  <div>
    <Input
      id="search"
      s={6}
      label="Search"
      onChange={onChange}
      validate
      className="search"
    ><Icon style={{ color: 'white' }}>search</Icon></Input>
  </div>;

SearchBox.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SearchBox;
