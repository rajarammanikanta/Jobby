import {AiFillStar} from 'react-icons/ai'
import {IoIosPin} from 'react-icons/io'
import {FaSuitcase} from 'react-icons/fa'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

const JobsPage = props => {
  const {eachJob} = props
  const {
    title,
    companyLogo,
    rating,
    location,
    employmentType,
    packageFor,
    jobDescription,
    id,
  } = eachJob
  return (
    <>
      <Link to={`/jobs/${id}`} className="links">
        <div className="job-card-container">
          <div className="first-part-container">
            <img
              src={companyLogo}
              alt="company logo"
              className="company-logo-image"
            />
            <div className="title-rating-container">
              <p className="title">{title}</p>
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <AiFillStar className="star-icon" />
              </div>
            </div>
          </div>
          <div className="second-part-container">
            <div className="location-and-employ">
              <div className="location-container">
                <IoIosPin fill="white" />
                <p className="location">{location}</p>
              </div>
              <div className="employ-container">
                <FaSuitcase fill="white" />
                <p className="employ">{employmentType}</p>
              </div>
            </div>
            <div>
              <p className="package">{packageFor}</p>
            </div>
          </div>
          <hr />
          <div>
            <h3 className="description-heading">Description</h3>
            <p className="description">{jobDescription}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default withRouter(JobsPage)
