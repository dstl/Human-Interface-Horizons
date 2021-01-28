import React from 'react'
import { Link } from 'gatsby'
import '../../styles/footer.scss'

export const Footer = () => {
  return (
    <footer>
      <div className="footer-left">
        <Link className="footer-links" to="/about">
          About
        </Link>
      </div>
      <div className="footer-center">© Crown copyright (2021), Dstl.</div>
      <div className="footer-right">
        <Link className="footer-links" to="/privacy">
          Privacy
        </Link>
      </div>
    </footer>
  )
}
