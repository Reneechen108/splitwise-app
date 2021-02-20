import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import fake from '../images/account.png';

const Footer = () => {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <h4>Contact us</h4>
            <ul className="list-unstyled">
              <li><a style={{textDecoration: "none"}} href="http://www.gmail.com"><FontAwesomeIcon icon={faEnvelope} /> Email </a></li>
              <li><a href="http://www.facebook.com"><FontAwesomeIcon icon={faFacebook} /> Facebook </a></li>
              <li><a href="http://www.twitter.com"><FontAwesomeIcon icon={faTwitter} /> Twitter </a></li>
              <li><a href="http://www.github.com"><FontAwesomeIcon icon={faGithub} /> Github </a></li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6">
            <h4>Splitwise</h4>
            <ul className="list-unstyled">
              <li>About</li>
              <li>Bolg</li>
              <li>Jobs</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div className="col-md-6 col-sm-6">
            <img style={{width: "50vw"}} src={fake} alt="fake feature"/>
            
          </div>
        </div>
        <div className="footer-bottom">
          <p className="text-xs-center">
            &copy;{new Date().getFullYear} Splitwise App - All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;