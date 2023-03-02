import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileDetails extends Component {
  state = {
    userData: {},
    apiStatusResult: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchedUserDetails()
  }

  renderFetchedProfileData = () => this.fetchedUserDetails()

  renderFailureView = () => (
    <div className="profileFailureViewCon">
      <button
        type="button"
        className="retryBtn"
        onClick={this.renderFetchedProfileData}
      >
        Retry
      </button>
    </div>
  )

  fetchedUserDetails = async () => {
    this.setState({apiStatusResult: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/profile`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedUserData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        apiStatusResult: apiStatusConstants.success,
        userData: updatedUserData,
      })
    } else {
      this.setState({apiStatusResult: apiStatusConstants.failure})
    }
  }

  renterProfileDetails = () => {
    const {userData} = this.state
    return (
      <div className="profileCon">
        <div className="profileIcon">
          <img
            src={userData.profileImageUrl}
            alt="profile"
            className="userProfileAvatar"
          />
        </div>
        <h1 className="profileHeading">{userData.name}</h1>
        <p className="profileProfession">{userData.shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFetchedUserDetails = () => {
    const {apiStatusResult} = this.state

    switch (apiStatusResult) {
      case apiStatusConstants.success:
        return this.renterProfileDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return this.renderFetchedUserDetails()
  }
}
export default ProfileDetails
