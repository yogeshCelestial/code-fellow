import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CircularProgress } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'white',
  color: 'black',
  boxShadow: 24,
  p: 4,
};

type LoaderProp = {
    open: boolean,
}

export default function Loader(props: LoaderProp) {
    const {open} = props;

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} textAlign='center'>
          <Typography id="modal-modal-title" variant="h5">
            Analyzing Code
          </Typography>
          <Box textAlign='center' mt='20px'>
            <CircularProgress variant='indeterminate' />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
