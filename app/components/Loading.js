var React = require('react');
var PropTypes = require('prop-types');


class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text
    };
  }


  componentDidMount() {
    var stopper = this.props.text + '...';
    this.interval = setInterval(() => {
      if (this.state.text === stopper) {
        this.setState({ text: this.props.text });
      }
      else {
        this.setState({ text: this.state.text + '.' });
      };
    }, this.props.speed);
  }


  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <p style={this.props.style}>
        {this.state.text}
      </p>
    );
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
  style : PropTypes.object,

}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300,
  style: {
    textAlign: 'center',
    fontSize: '35px'
  }
}

module.exports = Loading;


