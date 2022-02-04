import React from "react";
import { useHistory } from "react-router-dom";
import { ROUTES } from "routes";
import { Button } from "ui-kit";

export const EditProfileSettings = ({ isUser }) => {
    const history = useHistory();

    const handleRouteToEditProfile = () => {
        history.push(ROUTES.SETTINGS);
    };

    if (isUser) {
        return (
            <Button typeIcon="Settings" onClick={handleRouteToEditProfile}>
                Редактировать профиль
            </Button>
        );
    }
    return null;
};
