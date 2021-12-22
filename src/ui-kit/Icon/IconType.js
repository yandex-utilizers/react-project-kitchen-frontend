import React from "react";
import { newGuid } from "utils/guid";
import { ReactComponent as Spinner } from "assets/icons/Spinner.svg";
import { ReactComponent as Visibility } from "assets/icons/Visibility.svg";
import { ReactComponent as VisibilityOff } from "assets/icons/VisibilityOff.svg";

export const iconTypes = new Map([
    ["Spinner", <Spinner key={newGuid()} />],
    ["Visibility", <Visibility key={newGuid()} />],
    ["VisibilityOff", <VisibilityOff key={newGuid()} />],
]);
