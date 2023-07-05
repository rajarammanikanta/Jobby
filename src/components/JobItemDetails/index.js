import {Component} from 'react'

import Cookies from 'js-cookie'

class JobItemDetails extends Component {
  state = {jobItemsList: [], smilarJobsList: []}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getFormattedData = data => ({
    id: data.id,
    companyLogo: data.company_logo_url,
    companyWebsite: data.company_website_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    life_at_company: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    package: data.package_per_annum,
    rating: data.rating,
    skills: data.skills.map(eachSkills => ({
      imageUrl: eachSkills.image_url,
      name: eachSkills.name,
    })),
  })

  getFormattedSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    id: data.id,
    rating: data.rating,
    location: data.location,
    title: data.title,
  })

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const jobItemUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobItemUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedJobDetails = this.getFormattedData(data.job_details)
      console.log(updatedJobDetails)
      const updatedSimilarData = data.similar_jobs.map(eachSimilar =>
        this.getFormattedSimilarData(eachSimilar),
      )
      console.log(updatedSimilarData)
      this.setState({
        jobItemsList: updatedJobDetails,
        smilarJobsList: updatedSimilarData,
      })
    }
  }

  render() {
    return (
      <>
        <h1>Hello</h1>
      </>
    )
  }
}

export default JobItemDetails
