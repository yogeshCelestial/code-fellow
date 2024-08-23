import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { initialType, ScoreType } from '../App';
import { Divider, LinearProgress } from '@mui/material';

type PropType = {
    open: boolean;
    handleClose: () => void;
    report: initialType;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70vw',
    color: 'black',
    bgcolor:'whitesmoke',
    boxShadow: 24,
    p: 3,
}

const ResultModal = (props: PropType) => {
    const { open, handleClose, report } = props;
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography mb='10px' id="modal-modal-title" variant="h4">
                        Audit Report
                    </Typography>
                    <Divider />
                    <Typography m='10px 0' variant='h5'>Check Report</Typography>
                    <Typography paddingLeft='10px'>{report?.checkReport}</Typography>
                    <Typography m='10px 0' variant='h5'>Quality Scores</Typography>
                    <Box display='flex' flexWrap='wrap' justifyContent='space-evenly'>
                        {report.qualityScores.map((score: ScoreType) => (
                            <Box width='35%' key={score.metric} display='flex' flexDirection='column' justifyContent='space-between'>
                                <Box>
                                    <Typography>
                                        {score.metric} : {score.score * 10}%
                                    </Typography>
                                </Box>
                                <Box>
                                    <Box sx={{ width: '100%', mr: 1 }}>
                                        <LinearProgress variant="determinate" {...props} />
                                    </Box>
                                    <Box sx={{ minWidth: 35 }}>
                                        <Typography variant="h6" color="text.primary">{`${Math.round(
                                            score.score * 10,
                                        )}%`}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Typography m='10px 0' variant='h5'>Suggestion For Improvements</Typography>
                    <Typography paddingLeft='10px'>{report?.suggestions}</Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default ResultModal;


