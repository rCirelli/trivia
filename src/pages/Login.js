import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Input from '../components/Input';
import { dataUser } from '../redux/actions';
import logo from '../trivia.png';
import '../App.css';
import api from '../service/api';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  valitadionButton = () => {
    const { name, email } = this.state;
    if (!name || !email) {
      return this.setState({ isDisabled: true });
    }
    return this.setState({ isDisabled: false });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.valitadionButton());
  };

  saveLocalStorage = async () => {
    const response = await api();
    localStorage.setItem('token', response.token);
  };

  submit = () => {
    const { history, dispatch } = this.props;
    const newState = { ...this.state };
    delete newState.isDisabled;
    dispatch(dataUser(newState));
    this.saveLocalStorage().then(() => history.push('/game'));
  };

  config = () => {
    const { history } = this.props;
    history.push('/config');
  };

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-16">
        <img className="App-logo max-w-md" src={ logo } alt="trivia" />
        <div
          className="flex flex-col justify-center items-center gap-7 bg-[#07DBAC]
          px-10 py-7 rounded-lg"
        >
          <Input
            textLabel="Nome"
            type="text"
            id="name"
            name="name"
            value={ name }
            handleChange={ this.handleChange }
            dataTestid="input-player-name"
          />
          <Input
            textLabel="Email"
            type="text"
            id="email"
            name="email"
            value={ email }
            handleChange={ this.handleChange }
            dataTestid="input-gravatar-email"
          />
          <button
            className="p-2 w-full rounded-lg bg-violet-700 text-violet-200 font-bold
            hover:bg-violet-600"
            data-testid="btn-play"
            type="button"
            disabled={ isDisabled }
            onClick={ this.submit }
          >
            Play
          </button>
          <button
            className="p-2 w-full rounded-lg bg-violet-700 text-violet-200 font-bold
            hover:bg-violet-600"
            data-testid="btn-settings"
            type="button"
            onClick={ this.config }
          >
            Configurações
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(withRouter(Login));

// referencia withRouter usado para crição do teste que tenham history.push() em sua construção: https://thewebdev.info/2022/03/08/how-to-fix-the-cannot-read-property-push-of-undefined-error-with-react-router/#:~:text=with%20React%20Router%3F-,To%20fix%20the%20%22Cannot%20read%20property%20'push'%20of%20undefined,props.
