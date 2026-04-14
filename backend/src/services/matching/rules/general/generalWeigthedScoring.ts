export const timeAvailabilityRule = (ctx) => {
  const time = ctx.adopter.daily_care_time;

  if (time >= 150) {
    return { type: 'welfare', value: 10 };
  }

  if (time >= 60) {
    return { type: 'welfare', value: 5 };
  }

  return { type: 'welfare', value: -10 };
};