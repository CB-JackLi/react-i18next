jest.unmock('../src/I18nextProvider');
import React from 'react';
import Enzyme from 'enzyme';
import PropTypes from 'prop-types';
import  I18nextProvider from '../src/I18nextProvider';

describe('I18nextProvider', () => {
  it('should provide i18n context', () => {
    const i18n = {
      options: {},
      services: {
        resourceStore: {
          data: {}
        }
      },
      changeLanguage: () => {}
    };
    const wrapper = new I18nextProvider({ i18n, initialI18nStore: {}, initialLanguage: 'en' });
    expect(wrapper.getChildContext().i18n).toBe(i18n);
    expect(I18nextProvider.childContextTypes.i18n)
      .toBe(PropTypes.object.isRequired);
  });
  it('should throw an exception if you try to change i18n object', () => {
    const i18n = { t: () => {} };
    const anotherI18n = { i18n: { another: true } };
    const wrapper = Enzyme.shallow(<I18nextProvider i18n={i18n} />);
    function setAnotherI18n() {
      wrapper.setProps(anotherI18n);
    }
    expect(setAnotherI18n).toThrowError('[react-i18next][I18nextProvider]does not support changing the i18n object.');
  });
  it('should render children', () => {
    const div = React.createFactory('div');
    const child = React.createElement(div);
    const wrapper = new I18nextProvider({ i18n: {}, children: child });
    const render = wrapper.render();
    expect(render).toBe(child);
  });
  it('should have i18n proptype required', () => {
    expect(I18nextProvider.propTypes.i18n)
      .toBe(PropTypes.object.isRequired);
  });
  it('should have children proptype required', () => {
    expect(I18nextProvider.propTypes.children)
      .toBe(PropTypes.element.isRequired);
  });
  it('should not throw an exception if you set the same i18n object', () => {
    const i18n = { t: () => {} };
    const wrapper = Enzyme.shallow(<I18nextProvider i18n={i18n} />);
    function setSameI18n() {
      wrapper.setProps(i18n);
    }
    expect(setSameI18n).not.toThrowError();
  });
});
