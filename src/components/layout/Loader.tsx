import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Roller } from 'react-awesome-spinners';
const useStyles = makeStyles((theme: any) => ({
  container: {
    position: 'fixed',
    zIndex: 99999,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#8e89a73d'
  }

}))

const Loader = (props: any) => {
  const classes = useStyles()
  return (
    <div className={classes.container} hidden={!props.showLoader}>
      <Roller />
    </div>
    
  )

}

export default Loader;