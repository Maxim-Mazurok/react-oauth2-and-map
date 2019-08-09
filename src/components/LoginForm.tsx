import React, { Component } from 'react';
import { Input } from './Input';

export class LoginForm extends Component {
  state = {
    seo_title: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    const { seo_title } = this.state;
    return (
      <form id="article-form">
        <Input
          text="SEO title"
          label="seo_title"
          type="text"
          id="seo_title"
          value={seo_title}
          handleChange={this.handleChange}
        />
      </form>
    );
  }
}
