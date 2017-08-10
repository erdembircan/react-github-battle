var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Loading = require('./Loading');

function RepoGrid(props) {
  return (
    <ul className='popular-list'>
      {props.repos.map((r, index) => {
        return (
          <li key={r.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img className='avatar' src={r.owner.avatar_url} alt={'Avatar for ' + r.owner.login} />
              </li>
              <li>
                <a href={r.html_url} target='_blank'>{r.name}</a>
              </li>
              <li>@{r.owner.login}</li>
              <li>{r.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  );
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

function SelectLanguage(props) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Phyton'];
  return (
    <ul className='languages'>
      {languages.map((lang) => {
        return (
          <li style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
            onClick={props.onSelect.bind(null, lang)}
            key={lang}>
            {lang}
          </li>
        );
      })}
    </ul>
  );
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

// SelectLanguage.defaultProps = {
// 	selectedLanguage:'All',
// }

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState({ selectedLanguage: lang, repos: null });

    api.fetchPopularRepos(lang)
      .then(function (repos) {
        this.setState({ repos: repos });
      }.bind(this));
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos ?
          <Loading text='Downloading'/>
          :
          <RepoGrid repos={this.state.repos} />}
      </div>
    );
  }
}

module.exports = Popular;
