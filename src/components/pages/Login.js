import Form from '../Form';
import Illustration from '../Illustration';
import TextInput from '../Textinput';
import Button from '../Button';
import classes from '../../styles/Signup.module.css';

export default function Signup() {
  return (
    <>
      <h1>Login to your account</h1>

      <div class="column">
        <Illustration />
        <Form className={`${classes.login}`}>
          <TextInput
            type="text"
            placeholder="Enter email"
            icon="alternate_email"
          />

          <TextInput type="password" placeholder="Enter password" icon="lock" />

          <Button>
            <span>Submit Now</span>
          </Button>

          <div className="info">
            Don't have an account? <a href="Signup.html">Signup</a> instead.
          </div>
        </Form>
      </div>
    </>
  );
}
