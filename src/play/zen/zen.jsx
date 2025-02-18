import React from 'react';
import Button from 'react-bootstrap/Button';
import './zen.css';

export function Zen() {
  const [isZen, setIsZen] = React.useState(false);

  function toggleZen() {
    setIsZen(!isZen);
  }

  if (isZen) {
    return (
      <div className='zen'>
        <img onClick={toggleZen} src='logo.svg' />
      </div>
    );
  } else {
    return (
      <Button variant='outline-primary' size='sm' onClick={toggleZen}>
        ☯
      </Button>
    );
  }
}
