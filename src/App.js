import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Component } from "react"
import { Redirect, Route, withRouter } from 'react-router-dom'
import { Alert } from 'react-bootstrap';


import SearchBar from './Components/SearchBar'
import Map from './Containers/Map'
import Title from './Components/Title'
import Slider from './Components/Slider'
import BuildingDataContainer from './Containers/BuildingDataContainer'
import ActionBar from './Components/ActionBar';
import LoginForm from './Components/LoginForm'
import SignUpForm from './Components/SignUpForm'
import { Data } from '@react-google-maps/api';

class App extends Component {

  state = {
    buildings: [],
    range: 400,
    center: {
      lat: 40.665889,
      lng: -73.983694
    },
    selected: null,
    current_user: {},
    loginCount: 0,
    signupCount: 0
  }

  componentDidMount() {
    if (window.sessionStorage.accessToken) {
      fetch('http://localhost:3000/auto_login', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${window.sessionStorage.accessToken}`
          }
      })
      .then(resp => resp.json())
      .then(user => {
        console.log("auto login: ", user)
        this.setState({
                current_user: user
            })
      })
    }
  }

  logoutUser = () => {
    window.sessionStorage.clear()
    this.setState({ current_user: {}, selected: null, buildings: [] });
  };

  loginUser = ({ username, password }) => {
    console.log("in app loginUser...", username, password)

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Accepts": 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    };
    fetch("http://localhost:3000/login", options)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        if (data.user) {
          window.sessionStorage.accessToken = data.token
          this.props.history.push('/')
          this.setState({
            current_user: data.user
          })
        } else {
          let newLoginCount = this.state.loginCount + 1
          this.setState(prevState => {
            return ({
              loginCount: newLoginCount
            })
          })
        }
      })
  }

  signup = (newUserObj) => {
		let options = {
			method: "POST",
			headers: {         
			'Content-Type': 'application/json',
			"Accepts": 'application/json'
			},
			body: JSON.stringify({user: newUserObj})
		}

		fetch("http://localhost:3000/users", options)
		.then(resp => resp.json())
		.then(data => {		
			console.log(data)	
			if (data.user) {
				window.sessionStorage.accessToken = data.token
				this.setState({
					currentUser: data.user
				})
			} else {

				let newSignupCount = this.state.loginCount + 1
				this.setState(prevState => {
					return ({
						signupCount: newSignupCount
					})
				})
			}
		})
	}

  getBuildings() {
    fetch("http://localhost:3000/buildings")
      .then(res => res.json())
      .then(data => {
        this.setState({ buildings: data })
      })
  }

  updateRange = (newRange) => {
    let options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${window.sessionStorage.accessToken}`

      }
    }

    let searchLat = this.coordToString(this.state.center.lat)
    let searchLng = this.coordToString(this.state.center.lng)

    // BUG: need to make sure center lat/long are 6 decimalsm per NYC data
    // console.log(`http://localhost:3000/buildings/${searchLat}/${searchLng}/${newRange}`)

    fetch(`http://localhost:3000/buildings/${searchLat}/${searchLng}/${newRange}`, options)
      .then(resp => resp.json())
      .then(data => {
        console.log("range data: ", data)
        if (data.message) {
          return <Redirect to="/" />
        } else {
          this.setState({
            buildings: data,
            range: newRange
          })
        }
      })
  }

  updateCenter = (newLat, newLng) => {
    let options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${window.sessionStorage.accessToken}`
      }
    }

    let choppedLat = newLat.toFixed(6)
    let choppedLng = newLng.toFixed(6)

    let searchLat = String(choppedLat.replace(".", ""))
    let searchLng = String(choppedLng.replace(".", ""))

    fetch(`http://localhost:3000/buildings/${searchLat}/${searchLng}/${this.state.range}`, options)
      .then(resp => resp.json())
      .then(data => {
        if (data.message) {
          return <Redirect to="/" />
        } else {
          this.setState({
            buildings: data,
            center: {
              lat: parseFloat(choppedLat),
              lng: parseFloat(choppedLng)
            }
          })
        }
      })
  }

  coordToString = (coord) => {
    return coord.toString().replace(".", "")
  }

  selected = () => {
    let split = this.props.location.pathname.split("/")
    // console.log("Building ID: ", parseInt(split[2]))
    // console.log("Building Data: ", this.state.buildings.find(b => b.id === parseInt(split[2])))
    return this.state.buildings.find(b => b.id === parseInt(split[2]))
  }

  setSelected = (bldg) => {
    this.setState({ selected: bldg })
  }

  clearSelected = () => {
    this.setState({ selected: null })
  }

  addCommentHandler = (formData) => {
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${window.sessionStorage.accessToken}`
      },
      body: JSON.stringify({ comment: formData })
    }

    fetch('http://localhost:3000/comments', options)
      .then(resp => resp.json())
      .then(comment => {
        console.log(comment)
        let newBuildings = [...this.state.buildings]
        let pId = comment.project_id
        let updatedBuilding = newBuildings.find(b => b.projects.find(p => p.id === pId))
        let project = updatedBuilding.projects.find(p => p.id === pId)
        project.comments.push(comment)

        let i = newBuildings.findIndex(b => b.id === updatedBuilding.id)
        newBuildings.splice(i, 1, updatedBuilding)
        this.setState({ buildings: newBuildings, selected: updatedBuilding })
      })
  }

  addPhoto = (formData) => {
    let options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.accessToken}`
      },
      body: formData
    }

    fetch('http://localhost:3000/photos', options)
      .then(resp => resp.json())
      .then(photo => {
        let newBuildings = [...this.state.buildings]
        let pId = photo.project_id
        let updatedBuilding = newBuildings.find(b => b.projects.find(p => p.id === pId))
        let project = updatedBuilding.projects.find(p => p.id === pId)
        project.photos.push(photo)

        let i = newBuildings.findIndex(b => b.id === updatedBuilding.id)
        newBuildings.splice(i, 1, updatedBuilding)
        this.setState({ buildings: newBuildings, selected: updatedBuilding })
      })
  }

  unfollowHandler = (followId) => {
    let options = {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.accessToken}`
      }
    }

    fetch(`http://localhost:3000/user_projects/${followId}`, options)
    .then(resp => resp.json())
    .then(project => {
      console.log("In unfollowHandler, project:", project)
      let newBuildings = [...this.state.buildings]
      let pId = project.id
      let updatedBuilding = newBuildings.find(b => b.projects.find(p => p.id === pId))
      let i = updatedBuilding.projects.findIndex(p => p.id === pId)
      updatedBuilding.projects.splice(i, 1, project)
      this.setState({ buildings: newBuildings, selected: updatedBuilding })
    })
  }

  followHandler = (formData) => {
    console.log("IN APP followHandler()...", formData)
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${window.sessionStorage.accessToken}`
      },
      body: JSON.stringify({ user_project: formData })
    }

    fetch('http://localhost:3000/user_projects', options)
    .then(resp => resp.json())
    .then(data => {
      console.log("AFTER UP FETCH: ", data)
      let newBuildings = [...this.state.buildings]
      let pId = data.user_project.project_id
      let updatedBuilding = newBuildings.find(b => b.projects.find(p => p.id === pId))
      let project = updatedBuilding.projects.find(p => p.id === pId)

      if (!project.stakeholders.find(s => s.id === data.stakeholder.id)) {
        project.stakeholders.push(data.stakeholder)
      }

      let updatedUser = this.state.current_user
      updatedUser.user_projects.push(data.user_project)

      let i = newBuildings.findIndex(b => b.id === updatedBuilding.id)
      newBuildings.splice(i, 1, updatedBuilding)
      this.setState({ buildings: newBuildings, selected: updatedBuilding, current_user: updatedUser })
    })
  }

  render() {
    console.log("App rendering...", this.state.current_user.username)

    if (window.sessionStorage.accessToken && this.state.current_user.username) {
      console.log("LOGGED IN")
      return (
        <div>
          <Title />
          <SearchBar center={this.state.center} updateCenter={this.updateCenter} search={this.search} />
          <Slider range={this.state.range} updateRange={this.updateRange} />
          <ActionBar current_user={this.state.current_user} logout={this.logoutUser} />
          <Map buildings={this.state.buildings} range={this.state.range} center={this.state.center} selected={this.state.selected} setSelected={this.setSelected} clearSelected={this.clearSelected} />

          <Route path="/building" render={(windowProps) => <BuildingDataContainer building={this.selected()} windowProps={windowProps} addPhoto={this.addPhoto} addCommentHandler={this.addCommentHandler} current_user={this.state.current_user} followHandler={this.followHandler} unfollowHandler={this.unfollowHandler}/>} />
        </div>
      )
    } else {
      console.log("LOGGED OUT")
      return (
        <div>
          <Title />
          <SearchBar center={this.state.center} updateCenter={this.updateCenter} search={this.search} />
          <ActionBar current_user={this.state.current_user} logout={this.logoutUser} login={this.loginUser}/>
          <Slider range={this.state.range} updateRange={this.updateRange} />
          <Map buildings={this.state.buildings} range={this.state.range} center={this.state.center} selected={this.state.selected} setSelected={this.setSelected} clearSelected={this.clearSelected} />
          <Route path="/login" render={() => <LoginForm login={this.loginUser}/>} />
          <Route path="/signup" render={() => <SignUpForm />} />
        </div>
      )
    }

  }
}

export default withRouter(App);