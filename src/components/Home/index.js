import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Home extends Component {
  clickToHome = () => {
    const {history} = this.props
    history.replace('/jobs')
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        <div className="heading-container">
          <h1 className="main-heading">
            Find The Job That <br />
            Fits Your Life
          </h1>
          <p className="main-description">
            Millions of people are searching for jobs,salary information,company
            reviews.Find the job that fits your abilities and potential.
          </p>
          <button
            type="button"
            className="find-jobs-button"
            onClick={this.clickToHome}
          >
            Find Jobs
          </button>
        </div>
      </div>
    )
  }
}

export default Home
