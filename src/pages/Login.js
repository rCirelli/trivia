import React, { Component } from 'react';
import Input from '../components/Input';

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
        <button data-testid="btn-play" type="button" disabled={ isDisabled }>Play</button>
      </div>
    );
  }
}

export default Login;
