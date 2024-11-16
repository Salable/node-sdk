import { add } from "date-fns";

function getEndTime(interval: number, type: 'days' | 'weeks' | 'months' | 'years') {
    return add(new Date(), { [type]: interval });
};

export default getEndTime;