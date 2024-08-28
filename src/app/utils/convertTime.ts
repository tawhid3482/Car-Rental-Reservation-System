export const convertTime = (time: string): number => {
    // Split the time into hours and minutes.
    const [hours, minutes] = time.split(":");
    // Calculate the time in hours by adding the hours and minutes divided by 60.
    return Number(hours) + Number(minutes) / 60;
};