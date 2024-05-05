import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";


export default function Cancel() {
    const {t} = useTranslation('cancel');
    return (
        <div style={{ marginTop: 20, padding: 20 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {t('cancel.typo.head')}
            </Typography>
            <Typography variant="body1">
                {t('cancel.typo.transaction')}
            </Typography>
        </div>
    );
}
