import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {details, toggleIsFavorite} = props
  const {id, title, date, isFavorite} = details
  const newDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const onClickStar = () => {
    toggleIsFavorite(id)
  }

  const isFavoriteIcon = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="each-appointment">
      <div className="details">
        <p className="title-appointment">{title}</p>
        <p className="date-appointment">{newDate}</p>
      </div>
      <button
        type="button"
        className="star-button"
        onClick={onClickStar}
        data-testId="star"
      >
        <img src={isFavoriteIcon} className="star-icon" alt="star" />
      </button>
    </li>
  )
}
export default AppointmentItem
