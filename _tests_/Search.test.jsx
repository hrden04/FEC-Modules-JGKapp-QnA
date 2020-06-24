/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import Search from '../client/src/components/Search.jsx';

describe('Search Component', () => {
  test('should render the search component on the screen', () => {
    const wrapper = mount(<Search />);
    expect(wrapper).toExist();
  });

  test('should allow text input', () => {
    const wrapper = mount(<Search />);
    const testVal = 'test';
    wrapper.find('.search-input').simulate('change', { target: { value: testVal } });
    expect(wrapper.find('.search-input').instance().value).toBe(testVal);
  });
});
