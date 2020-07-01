/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import Question from '../client/src/components/Question.jsx';

const questionProp = {
  question_id: 6,
  question_text: 'Et quisquam voluptas unde illo iure.',
  product_id: 1001,
  created_at: '2020-03-10T06:00:00.000Z',
  user_id: 44,
  question_votes: 7,
};

const results = {
  message: 'Successfully retrieved answers for question id: 7',
  answers: [
    {
      answer_id: 29,
      answer_text: 'Atque quia nisi sequi neque fugiat voluptatibus. Sit blanditiis dolore consequuntur consequatur enim. Ut quo modi quis repellendus omnis saepe in. Hic temporibus repellat recusandae inventore velit accusantium maiores quia.',
      created_at: '2019-06-30T06:00:00.000Z',
      answer_upvotes: 0,
      answer_downvotes: 0,
      username: 'Christina_Wilderman59',
      user_avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/jayphen/128.jpg',
    },
    {
      answer_id: 36,
      answer_text: 'Ut explicabo doloribus unde ut in dolor dolor labore voluptatem. Placeat quis esse minima. Est dolorum quis et.',
      created_at: '2019-05-20T06:00:00.000Z',
      answer_upvotes: 0,
      answer_downvotes: 0,
      username: 'Marcelina.Ratke8',
      user_avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/greenbes/128.jpg',
    },
    {
      answer_id: 32,
      answer_text: 'Aliquam et quo. Ea recusandae ut nulla. Enim non et qui qui officia. Ab provident vel. Est harum quam a aut asperiores mollitia eos sit.',
      created_at: '2019-05-11T06:00:00.000Z',
      answer_upvotes: 0,
      answer_downvotes: 0,
      username: 'Karlie.Marks',
      user_avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/chanpory/128.jpg',
    },
    {
      answer_id: 31,
      answer_text: 'Mollitia hic doloribus sed natus at impedit voluptatem. Reiciendis temporibus deleniti illum aut ut fugiat at. Enim sunt blanditiis dolor mollitia autem ratione tenetur voluptas eius. Quod temporibus fugit omnis ea ducimus. Tempore velit voluptatem numquam porro dignissimos quibusdam officiis.',
      created_at: '2020-05-01T06:00:00.000Z',
      answer_upvotes: 0,
      answer_downvotes: 0,
      username: 'Kiley_Mitchell45',
      user_avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/magugzbrand2d/128.jpg',
    },
    {
      answer_id: 35,
      answer_text: 'Eos repellat dolor ratione quae. At nihil odit iure sit nesciunt. Rerum suscipit aspernatur. Atque iste quia accusamus dolorum.',
      created_at: '2020-02-12T07:00:00.000Z',
      answer_upvotes: 0,
      answer_downvotes: 0,
      username: 'Lysanne.Welch',
      user_avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/alek_djuric/128.jpg',
    },
    {
      answer_id: 33,
      answer_text: 'Aut fuga eaque sint ipsum et illo omnis quod ducimus. Qui quia et et explicabo autem suscipit. Ut labore mollitia consequatur. Rerum nobis eos labore odio rerum. Sit aut velit blanditiis.',
      created_at: '2019-09-27T06:00:00.000Z',
      answer_upvotes: 0,
      answer_downvotes: 0,
      username: 'Isaiah90',
      user_avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/happypeter1983/128.jpg',
    },
    {
      answer_id: 37,
      answer_text: 'Mollitia quia id error facere quasi. Quasi modi et est consequatur repudiandae ut et voluptatem ut. Dolorem itaque et.',
      created_at: '2019-09-30T06:00:00.000Z',
      answer_upvotes: 0,
      answer_downvotes: 0,
      username: 'Marcelina.Ratke8',
      user_avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/greenbes/128.jpg',
    },
    {
      answer_id: 34,
      answer_text: 'Nulla sint ad hic doloribus in quia laborum eveniet velit. Praesentium quod dicta laborum excepturi. Cupiditate incidunt perspiciatis consequuntur ut similique doloremque.',
      created_at: '2020-02-05T07:00:00.000Z',
      answer_upvotes: 0,
      answer_downvotes: 0,
      username: 'Karelle55',
      user_avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/donjain/128.jpg',
    },
    {
      answer_id: 30,
      answer_text: 'Modi optio dignissimos inventore velit et deserunt. Delectus sequi veritatis nam fugit in assumenda molestiae doloremque ratione. Et explicabo aliquid id aperiam amet cum molestiae. Repellat deserunt dolor in et sed laboriosam.',
      created_at: '2019-12-05T07:00:00.000Z',
      answer_upvotes: 0,
      answer_downvotes: 0,
      username: 'Guy7',
      user_avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/a_harris88/128.jpg',
    },
  ],
};

describe('Question Component', () => {
  beforeEach(() => {
    axios.get = jest.fn();
    axios.get.mockResolvedValue({ data: results });
  });

  test('should render the question component on the screen', () => {
    const wrapper = shallow(<Question question={questionProp} handleVote={() => {}} />);
    expect(wrapper).toExist();
  });

  test('should invoke getAnswersByQuestionId when mounted', () => {
    const wrapper = shallow(<Question question={questionProp} handleVote={() => {}} />);
    const mock = jest.fn();
    const instance = wrapper.instance();
    instance.getAnswersByQuestionId = mock;
    wrapper.update();
    instance.componentDidMount();
    expect(mock).toHaveBeenCalled();
  });

  test('Should render voting component', () => {
    const wrapper = shallow(<Question question={questionProp} handleVote={() => {}} />);
    expect(wrapper.find('QuestionVotes').length).toBe(1);
  });

  test('should render only the first answer', (done) => {
    const wrapper = shallow(<Question question={questionProp} handleVote={() => {}} />);
    const instance = wrapper.instance();
    Promise.resolve({})
      .then(instance.componentDidMount.bind(instance))
      .then(() => {
        expect(wrapper.find('Answer').length).toBe(1);
        done();
      });
  });

  test('should render more or less answers on request', (done) => {
    const wrapper = shallow(<Question question={questionProp} handleVote={() => {}} />);
    const instance = wrapper.instance();
    Promise.resolve({})
      .then(instance.componentDidMount.bind(instance))
      .then(() => {
        expect(wrapper.find('Answer').length).toBe(1);
        wrapper.find('.show-more').simulate('click');
        const nextCount = wrapper.find('Answer').length;
        expect(nextCount).toBeGreaterThan(1);
        wrapper.find('.show-more').simulate('click');
        const lastCount = wrapper.find('Answer').length;
        expect(lastCount).toBeGreaterThan(nextCount);
        wrapper.find('.collapse-answers').simulate('click');
        expect(wrapper.find('Answer').length).toBe(1);
        done();
      });
  });
});
