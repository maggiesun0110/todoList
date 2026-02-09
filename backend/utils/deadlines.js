
function getDeadlineForPriorityColor(deadline)
{
    if(!deadline) return "low";
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffDays = (deadlineDate - today) / (1000 * 60 * 60 * 24);

    if(diffDays < 2) return "high";
    if(diffDays < 4) return "medium";
    return "low";
}
function getDeadlineForPriorityDays(deadline)
{
    if(!deadline || deadline === "") return "no";
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

    return diffDays;
}

function formatDeadline(deadline)
{
    if(!deadline || deadline === "") return "";
    const deadlineDate = new Date(deadline);
    const month = deadlineDate.toLocaleDateString('en-US', { month: 'short' });
    const day = deadlineDate.getDate();
    const weekday = deadlineDate.toLocaleDateString('en-US', { weekday: 'short' });
    return `${month} ${day}, ${weekday}`;
}

module.exports = {
    getDeadlineForPriorityColor,
    getDeadlineForPriorityDays,
    formatDeadline
};