/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Answer from '../client/src/components/Answer.jsx';

const answerProp = {
  answer_id: 29,
  answer_text: 'Atque quia nisi sequi neque fugiat voluptatibus. Sit blanditiis dolore consequuntur consequatur enim. Ut quo modi quis repellendus omnis saepe in. Hic temporibus repellat recusandae inventore velit accusantium maiores quia.',
  created_at: '2019-06-30T06:00:00.000Z',
  answer_upvotes: 0,
  answer_downvotes: 0,
  username: 'Christina_Wilderman59',
  user_avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/jayphen/128.jpg',
};

describe('Answer Component', () => {
  test('should render the answer component on the screen', () => {
    const wrapper = shallow(<Answer answer={answerProp} />);
    expect(wrapper).toExist();
  });
});
