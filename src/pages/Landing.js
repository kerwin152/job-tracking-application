import logo from '../assets/images/logo.svg';
import jobhunt from '../assets/images/job_hunt.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import {Logo} from '../components';
import { Link } from 'react-router-dom';

const Landing = () => {
    return(
        <Wrapper> 
            <nav>
                <Logo />
            </nav>
            <div className='container page'>
                <div className='info'>
                    <h1>
                        job <span> tracking </span> app
                    </h1>
                    <p>
                        You will have an excellent job soon!!!
                    </p>
                    <Link to='/register' className='btn btn-hero'>Login/Register</Link>
                </div>
                <img src={jobhunt} alt='job hunt' className='img main-img'/>
            </div>
        </Wrapper>
    );
};


export default Landing;