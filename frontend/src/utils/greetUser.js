export function greet(user) {
	const currentTime = new Date();

	const currentHour = currentTime.getHours();

	if (currentHour < 12) return `Good morning ${user}!`;
	if (currentHour < 18) return `Good afternoon ${user}!`;
	else return `Good evening ${user}!`;
}
