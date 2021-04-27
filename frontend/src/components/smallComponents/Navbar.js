import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="https://static.thenounproject.com/png/130940-200.png" width="50" height="70"/>
          </a>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href='/'>
              Home
            </a>
        </div>

        <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-light" href = '/logout'>
                  Log Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
