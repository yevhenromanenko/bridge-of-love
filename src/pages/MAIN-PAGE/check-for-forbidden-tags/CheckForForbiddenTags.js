
const CheckForForbiddenTags = (text) => {
    const forbiddenTags = ["%Name%", "%Age%", "%Country%"];
    return forbiddenTags.some((tag) => text.includes(tag));
};

export default CheckForForbiddenTags;
