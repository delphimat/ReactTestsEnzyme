import React from "react";
import { mount } from 'enzyme';
import CommentBox from "components/CommentBox";
// import Root from "Root";

import { Provider } from 'react-redux';
import { createStore } from  "redux";
import reducers from 'reducers';

let wrapped;

beforeEach(() => {
    wrapped = mount(
        <Provider store={createStore(reducers, {})}>
            <CommentBox />
        </Provider>
    );

    // wrapped = mount(
    //     <Root>
    //         <CommentBox />
    //     </Root>
    // );
});

afterEach(() => {
    wrapped.unmount();
});

it('Has a text area and a button', () => {
    expect(wrapped.find("textarea").length).toEqual(1);
    expect(wrapped.find("button").length).toEqual(1);
});


describe('the text area', () => {
    beforeEach(() => {
        wrapped.find('textarea').simulate('change', {
            target: { value: 'new comment'}
        });

        wrapped.update();
    })

    it('has a text area that users can type in', () => {
        expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
    })

    it('When the input is submited, textarea should get empty', () => {
        expect(wrapped.find('textarea').prop('value')).toEqual('new comment');

        wrapped.find('form').simulate('submit', {});

        wrapped.update();

        expect(wrapped.find('textarea').prop('value')).toEqual('');
    })
})

