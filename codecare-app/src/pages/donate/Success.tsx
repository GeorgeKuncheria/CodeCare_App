import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Success() {
    const {t} = useTranslation('success');
    return (
        <div style={{ marginTop: 20, padding: 20 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {t('success.typo.head')}
            </Typography>
            <Typography variant="body1">
                {t('success.typo.transaction')}
            </Typography>
        </div>
    );
}
