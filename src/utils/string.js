export const handleRemoveAllSpaces = (string) => {
	if (string) {
		return string.replace(/\s+/g, "");
	} else {
		return "";
	}
};
