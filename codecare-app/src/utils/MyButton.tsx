import { Button, ButtonProps } from '@mui/material';

type MyButtonProps = {
  label: string;
} &ButtonProps;


const MyButton: React.FC<MyButtonProps> = ({ label, ...props }) => {
  return (
    <Button
      {...props}
    >
      {label}
    </Button>
  );
};

export default MyButton;
