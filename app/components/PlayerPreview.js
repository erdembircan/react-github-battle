var React = require('react');
var PropTypes = require('prop-types');
var Loading = require('./Loading');

class PlayerPreview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    }

    this.handleAvatarLoad = this.handleAvatarLoad.bind(this);
  }

  handleAvatarLoad(e) {
    console.log('loaded');
    this.setState({ loaded: true });
  }


  render() {
    return (
      <div>
        <div className='column'>
          {!this.state.loaded && <Loading style={{ fontSize: '20px', color: '#f00' }} />}

          <img onLoad={this.handleAvatarLoad} className='avatar' src={this.props.avatar} alt={'Avatar for ' + this.props.username} />
          <h2 className='username'>{this.props.username}</h2>
        </div>
        {this.props.children}
      </div>
    );
  }
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

module.exports = PlayerPreview;