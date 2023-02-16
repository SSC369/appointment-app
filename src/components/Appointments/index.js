import {Component} from 'react'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFavorite: false,
    isStarredButtonClicked: false,
  }

  onClickStarredButton = () => {
    const {isStarredButtonClicked} = this.state
    if (isStarredButtonClicked === false) {
      this.setState({
        isStarredButtonClicked: true,
      })
    } else {
      this.setState({
        isStarredButtonClicked: false,
      })
    }
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isFavorite: !eachItem.isFavorite}
        }
        return eachItem
      }),
    }))
  }

  onInputText = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onInputDate = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  onSubmitAdd = event => {
    event.preventDefault()
    const {dateInput, titleInput, isFavorite} = this.state
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: dateInput,
      isFavorite,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
    }))

    this.setState({
      dateInput: '',
      titleInput: '',
    })
  }

  render() {
    const {
      dateInput,
      titleInput,
      appointmentsList,
      isStarredButtonClicked,
    } = this.state

    const initialList = appointmentsList

    const filteredData = isStarredButtonClicked
      ? appointmentsList.filter(eachItem => eachItem.isFavorite === true)
      : initialList

    const starredClassName = isStarredButtonClicked
      ? 'starred-clicked'
      : 'starred-click'

    return (
      <div className="bg-container">
        <div className="inner-container">
          <div className="appointment-input-container">
            <form className="form-container" onSubmit={this.onSubmitAdd}>
              <h1 className="heading">Add Appointment</h1>

              <label htmlFor="title" className="title">
                Title
              </label>
              <input
                id="title"
                placeholder="Title"
                value={titleInput}
                type="text"
                className="input-element"
                onChange={this.onInputText}
              />

              <label htmlFor="date" className="date">
                Date
              </label>
              <input
                id="date"
                value={dateInput}
                type="date"
                className="input-date"
                onChange={this.onInputDate}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>

          <div className="appointment-starred">
            <h1 className="appointment-heading">Appointments</h1>
            <button
              type="button"
              className={starredClassName}
              onClick={this.onClickStarredButton}
            >
              Starred
            </button>
          </div>

          <ul className="appointments-container">
            {filteredData.map(eachItem => (
              <AppointmentItem
                details={eachItem}
                key={eachItem.id}
                toggleIsFavorite={this.toggleIsFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
