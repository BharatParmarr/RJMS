import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect } from 'react';
import '../css/animation.css';

export default function SimpleAlert({ message, type, open, setOpen }: any) {

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setOpen(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [open, setOpen]);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                zIndex: 1000,
                width: '100%',
                maxWidth: 320,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                animation: open ? 'fadeIn 0.5s' : 'fadeOut 0.5s',
            }}
        >
            {open && (
                <Alert
                    severity={type}
                    variant="filled"
                    action={
                        <CheckIcon
                            onClick={() => {
                                setOpen(false);
                            }}
                        />
                    }
                    sx={{
                        width: '100%',
                        marginBottom: 2,
                        color: '#fff',
                        position: 'relative', // Add this
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                >
                    {message}
                    <div className="timer-line" /> {/* Add this */}
                </Alert>
            )}
        </div>
    );
}