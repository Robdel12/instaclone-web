import React from 'react';
import Loading from './Loading';
import InputField from './InputField';
import Photo from './Photo';
import { withRouter } from 'react-router';

class CreatePostView extends React.Component {
  get isDisabledBtn() {
    return !this.state.imageUrl;
  }

  state = {
    description: '',
    imageUrl: '',
  }

  handleInput = (stateKey, event) => {
    this.setState({[stateKey]: event.target.value});
  }

  render () {
    if (this.props.data.loading) {
      return <Loading />;
    }

    // redirect if no user is logged in
    // Todo: this can be done before render.
    if (!this.props.data.user) {
      // Todo show a flash message
      console.warn('only logged in users can create new posts');
      this.props.router.push('/');
    }

    return (
      <div className="columns" style={{maxWidth: "1040px", margin: "0 auto"}}>
        <div className="column">
          <InputField
            labelName='Description'
            placeholder='Description'
            stateKey="description"
            value={this.state.description}
            handleChange={this.handleInput}
            />

          <InputField
            labelName='Image URL'
            placeholder='example.com/images/01.jpg'
            stateKey="imageUrl"
            value={this.state.imageUrl}
            handleChange={this.handleInput}
            />

          <div className="control is-grouped" style={{marginTop: "15px"}}>
            <p className="control">
              <button
                disabled={this.isDisabledBtn}
                className="button is-primary"
                onClick={this.handlePost.bind(this)}>
                Submit
              </button>
            </p>
            <p className="control">
              <button className="button is-link">Cancel</button>
            </p>
          </div>
        </div>
        <div className="column">
          <div style={{maxWidth: "600px", margin: "0 auto", padding: "20px 0"}}>
            <Photo user={this.props.data.user} photo={this.state} />
          </div>

        </div>
      </div>
    );
  }

  handlePost() {
    let { description, imageUrl } = this.state;

    this.props.handlePost(description, imageUrl);
  }
}

export default withRouter(CreatePostView);
