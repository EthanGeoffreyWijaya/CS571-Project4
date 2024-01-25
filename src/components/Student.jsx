const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <p><b>Major:</b> {props.major}</p>
        <p><b>Credits Taken:</b> {props.numCredits}</p>
        <p><b>Number of interests:</b> {props.interests.length}</p>
        <p><b>Interests:</b></p>
        <ul>
            {props.interests.map(interest => {
                return <li key={interest}>{interest}</li>
            })}
        </ul>
        <p>{(props.fromWisconsin)?"Is from Wisconsin!" : "Is not from Wisconsin."}</p>

    </div>
}

export default Student;