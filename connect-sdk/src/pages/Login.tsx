import { useNavigate } from 'react-router-dom'
import { venlyConnect } from '../libs/venlyConnect'
import '../css/Login.css'
import venly from '../assets/venly.svg'
import linesLg from '../assets/lines-lg.svg'
import google from '../assets/google.svg'
import facebook from '../assets/facebook.svg'
import apple from '../assets/apple.svg'

export default function Login() {
  const navigate = useNavigate()

  async function login(social?: string) {
    const res = await venlyConnect.authenticate({
      ...social && { idpHint: social }
    })
    if (res.isAuthenticated)
      navigate('/')
  }

  return <>
    <div className="login">
      <div className="login__header">
        <div className="login__icon">
          <img src={venly} className="login__img" alt="Venly logo" />
          <div className="login__bg">
            <img src={linesLg} width={768} height={768}/>
          </div>
        </div>
        <h1 className="login__title">Venly Demo</h1>
        <p className="login__subtitle">Use your preferred method to sign in.</p>
      </div>
      <div className="login__form">
        <button className="btn btn--primary btn--large" onClick={() => login()}>Sign in</button>
      </div>
      <div className="login__divider">OR</div>
      <div className="login__socials">
        <button className="btn btn--large" onClick={() => login('google')}>
          <img src={google} width="24" height="24" alt="Google" />
          Sign in with Google
        </button>
        <button className="btn btn--large" onClick={() => login('facebook')}>
          <img src={facebook} width="24" height="24" alt="Facebook" />
          Sign in with Facebook
        </button>
        <button className="btn btn--large" onClick={() => login('apple')}>
          <img src={apple} width="24" height="24" alt="Apple" />
          Sign in with Apple
        </button>
      </div>
    </div>
  </>
}
