import React from 'react'

const Header = ({ title }) => {
  const [img, setImg] = React.useState('')
  
  React.useEffect(() => {
    setImg(JSON.parse(localStorage.getItem("thumbnail")).thumbnail);
  }, [])
  return (
    <>
      <div className="header">
        <img className="logo" src="/images/logo2.png" alt="coin tracker icon" />
        <div className="title">{title}</div>
        <img className="avatar" src={img} alt="user" />
      </div>
    </>
  );
}

export default Header