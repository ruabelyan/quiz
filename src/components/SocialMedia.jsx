import { FaLinkedin, FaGithub } from 'react-icons/fa';
import React from 'react'
import { Link } from 'react-router-dom';

export const SocialMedia = () => {
  return (
    <div className='social-logos'>
        <Link to='https://github.com/' className='git'><FaGithub /></Link>
        <Link to='https://www.linkedin.com/in/' className='git'><FaLinkedin /></Link>
    </div>
  )
}
