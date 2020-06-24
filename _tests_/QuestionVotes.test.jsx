/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import QuestionVotes from '../client/src/components/QuestionVotes.jsx';

describe('Question Vote Count Component', () => {
  test('should render the search component on the screen', () => {
    const wrapper = shallow(<QuestionVotes
      questionId={1}
      questionVotes={6}
      handleVote={() => {}}
    />);
    expect(wrapper).toExist();
  });

  test('should render correct vote count', () => {
    const wrapper = shallow(<QuestionVotes
      questionId={1}
      questionVotes={6}
      handleVote={() => {}}
    />);
    expect(wrapper.find('.vote-count').text()).toBe('6votes');
  });

  test('should increase or decrease vote count by calling handleVote', () => {
    const mockHandleVote = jest.fn();
    const wrapper = shallow(<QuestionVotes
      questionId={1}
      questionVotes={6}
      handleVote={mockHandleVote}
    />);
    wrapper.find('.up-vote').simulate('click');
    expect(mockHandleVote.mock.calls.length).toBe(1);
    wrapper.find('.down-vote').simulate('click');
    expect(mockHandleVote.mock.calls.length).toBe(2);
  });
});
