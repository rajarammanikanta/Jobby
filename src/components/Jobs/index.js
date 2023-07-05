import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Profile from '../Profile'
import Header from '../Header'
import JobsPage from '../JobsPage'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobDetails: [],
    searchInput: '',
    apiStatus: apiConstants.initial,
    checkBoxInput: [],
    radioButtonInput: 0,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {searchInput, checkBoxInput, radioButtonInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkBoxInput.join(
      ',',
    )}&minimum_package=${radioButtonInput}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.jobs.map(eachJobs => ({
        id: eachJobs.id,
        companyLogo: eachJobs.company_logo_url,
        employmentType: eachJobs.employment_type,
        jobDescription: eachJobs.job_description,
        location: eachJobs.location,
        packageFor: eachJobs.package_per_annum,
        rating: eachJobs.rating,
        title: eachJobs.title,
      }))

      this.setState({apiStatus: apiConstants.success, jobDetails: updatedData})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  clickToRetry = () => {
    this.getJobDetails()
  }

  onChangeCheckBox = event => {
    this.setState(
      preState => ({
        checkBoxInput: [...preState.checkBoxInput, event.target.value],
      }),
      this.getJobDetails,
    )
  }

  onChangeRadioButton = event => {
    this.setState({radioButtonInput: event.target.value}, this.getJobDetails)
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-heading">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.clickToRetry}
      >
        Retry
      </button>
    </div>
  )

  getSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  keyDown = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  renderJobsView = () => {
    const {jobDetails} = this.state
    const getNoOfJobs = jobDetails.length > 0
    return getNoOfJobs ? (
      <div>
        {jobDetails.map(eachJob => (
          <JobsPage eachJob={eachJob} id={eachJob.id} />
        ))}
      </div>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="no-jobs">No Jobs Found</h1>
        <p className="no-jobs">
          We could not find any jobs. Try another filters.
        </p>
      </div>
    )
  }

  renderApiStatusViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderJobsView()
      case apiConstants.failure:
        return this.renderJobsFailureView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {checkBoxInput} = this.state
    console.log(checkBoxInput)
    return (
      <div className="background-container">
        <Header />
        <div className="job-container">
          <div className="left-container">
            <Profile />
            <hr className="horizontal-line" />
            <div>
              <h1 className="label-heading">Type of Employment</h1>
              <ul className="employ-list-container">
                {employmentTypesList.map(eachEmploy => (
                  <li>
                    <input
                      type="checkbox"
                      id={eachEmploy.employmentTypeId}
                      value={eachEmploy.employmentTypeId}
                      onChange={this.onChangeCheckBox}
                    />
                    <label
                      htmlFor={eachEmploy.employmentTypeId}
                      className="label"
                    >
                      {eachEmploy.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="horizontal-line" />
            <div>
              <h1 className="label-heading">Salary Range</h1>
              <ul className="salary-list-container">
                {salaryRangesList.map(eachSalary => (
                  <li>
                    <input
                      type="radio"
                      id={eachSalary.salaryRangeId}
                      name="salary"
                      value={eachSalary.salaryRangeId}
                      onChange={this.onChangeRadioButton}
                    />
                    <label htmlFor={eachSalary.salaryRangeId} className="label">
                      {eachSalary.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="right-container">
            <div className="search-icon-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.getSearchInput}
                onKeyDown={this.keyDown}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-icon-button"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div>{this.renderApiStatusViews()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
