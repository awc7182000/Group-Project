import react from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

export default(props) => {

    return(
        <div className="Inputs">
            <h1 class="welcome">Welcome!</h1>
            <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">First Name:</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder=""
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
  </InputGroup>

  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">Last Name: </InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder=""
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
  </InputGroup>

  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">Email:</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder=""
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
  </InputGroup>

  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">Password: </InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder=""
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
  </InputGroup>
  <button class="submit">
  Submit
</button>
        </div>
    )
}