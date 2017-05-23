import React, { PropTypes } from 'react';
import { Button, Icon, Input } from 'react-materialize';

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
