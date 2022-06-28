import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../components/Input';
import { fetchToken, dataUser } from '../redux/actions';

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
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.valitadionButton());
  }

  saveLocalStorage = () => {
    const { ranking } = this.props;
    localStorage.setItem('ranking', ranking.ranking);
    localStorage.setItem('token', ranking.token);
  }

  submit = () => {
    const { history, dispatch } = this.props;
    const newState = { ...this.state };
    delete newState.isDisabled;
    dispatch(fetchToken()).then(() => {
      dispatch(dataUser(newState));
      this.saveLocalStorage();
      history.push('/game');
    });
  }

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div>
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
          data-testid="btn-play"
          type="button"
          disabled={ isDisabled }
          onClick={ this.submit }
        >
          Play
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
  ranking: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  ranking: state.ranking,
});

export default connect(mapStateToProps)(Login);
