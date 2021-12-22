import React from "react";
import { newGuid } from "utils/guid";
import { ReactComponent as Alert } from "assets/icons/Alert.svg";
import { ReactComponent as Check } from "assets/icons/Check.svg";
import { ReactComponent as ChevronsLeft } from "assets/icons/ChevronsLeft.svg";
import { ReactComponent as ChevronsRight } from "assets/icons/ChevronsRight.svg";
import { ReactComponent as Copy } from "assets/icons/Copy.svg";
import { ReactComponent as Edit } from "assets/icons/Edit.svg";
import { ReactComponent as Home } from "assets/icons/Home.svg";
import { ReactComponent as Like } from "assets/icons/Like.svg";
import { ReactComponent as LikeFilled } from "assets/icons/LikeFilled.svg";
import { ReactComponent as Login } from "assets/icons/Login.svg";
import { ReactComponent as Logout } from "assets/icons/Logout.svg";
import { ReactComponent as Minus } from "assets/icons/Minus.svg";
import { ReactComponent as Paperclip } from "assets/icons/Paperclip.svg";
import { ReactComponent as Plus } from "assets/icons/Plus.svg";
import { ReactComponent as Settings } from "assets/icons/Settings.svg";
import { ReactComponent as Spinner } from "assets/icons/Spinner.svg";
import { ReactComponent as ThumbsDown } from "assets/icons/ThumbsDown.svg";
import { ReactComponent as ThumbsUp } from "assets/icons/ThumbsUp.svg";
import { ReactComponent as Trash } from "assets/icons/Trash.svg";
import { ReactComponent as User } from "assets/icons/User.svg";
import { ReactComponent as UserAvatar } from "assets/icons/UserAvatar.svg";
import { ReactComponent as Visibility } from "assets/icons/Visibility.svg";
import { ReactComponent as VisibilityOff } from "assets/icons/VisibilityOff.svg";
import { ReactComponent as X } from "assets/icons/X.svg";

export const iconTypes = new Map([
    ["Alert", <Alert key={newGuid()} />],
    ["Check", <Check key={newGuid()} />],
    ["ChevronsLeft", <ChevronsLeft key={newGuid()} />],
    ["ChevronsRight", <ChevronsRight key={newGuid()} />],
    ["Copy", <Copy key={newGuid()} />],
    ["Edit", <Edit key={newGuid()} />],
    ["Home", <Home key={newGuid()} />],
    ["Like", <Like key={newGuid()} />],
    ["LikeFilled", <LikeFilled key={newGuid()} />],
    ["Login", <Login key={newGuid()} />],
    ["Logout", <Logout key={newGuid()} />],
    ["Minus", <Minus key={newGuid()} />],
    ["Paperclip", <Paperclip key={newGuid()} />],
    ["Plus", <Plus key={newGuid()} />],
    ["Settings", <Settings key={newGuid()} />],
    ["Spinner", <Spinner key={newGuid()} />],
    ["ThumbsDown", <ThumbsDown key={newGuid()} />],
    ["ThumbsUp", <ThumbsUp key={newGuid()} />],
    ["Trash", <Trash key={newGuid()} />],
    ["User", <User key={newGuid()} />],
    ["UserAvatar", <UserAvatar key={newGuid()} />],
    ["Visibility", <Visibility key={newGuid()} />],
    ["VisibilityOff", <VisibilityOff key={newGuid()} />],
    ["X", <X key={newGuid()} />],
]);
