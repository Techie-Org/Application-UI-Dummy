import React from 'react';
import { Avatar } from '@mui/material';
import Button from 'components/_DesignWrappers/Button';
import LocalForm from 'components/_DesignWrappers/LocalForm';
import TextField from 'components/_DesignWrappers/TextField';
import CheckBoxField from 'components/_DesignWrappers/CheckBoxField';
import TextLink from 'components/_DesignWrappers/TextLink';
import { shallowWithIntl } from '@internals/testing/intl-enzyme-test-helper';
import SignUp from '..';

const registerUserMock = jest.fn();

const defaultProps = {
  registerUser: registerUserMock,
};

describe('SignUp component tests', () => {
  const componentWrapper = shallowWithIntl(<SignUp {...defaultProps} />).dive();

  it('should render SignUp component', () => {
    expect(componentWrapper.find(LocalForm).length).toBe(1);
    expect(componentWrapper.find(Avatar).length).toBe(1);
    expect(componentWrapper.find(TextField).length).toBe(5);
    expect(componentWrapper.find(CheckBoxField).length).toBe(1);
    expect(componentWrapper.find(Button).length).toBe(1);
    expect(componentWrapper.find(TextLink).length).toBe(1);
  });
  it('should render email and password textfields', () => {
    expect(componentWrapper.find(TextField).length).toBe(5);
    expect(componentWrapper.find(TextField).at(0).props().model).toEqual('.name');
    expect(componentWrapper.find(TextField).at(1).props().model).toEqual('.email');
  });
  it('should dispatch registerUser action on form submit', () => {
    const formDataMock = { email: 'test@gmail.com', password: 'test@1234' };
    const signUpForm = componentWrapper.find('[data-test-id="signUpForm"]');

    expect(signUpForm.exists()).toBeTruthy();
    signUpForm.simulate('submit', { ...formDataMock });
    expect(registerUserMock).toHaveBeenCalledWith(formDataMock);
  });
});
