
const initTimeLine = () => {
	const widthTimeLineStep = $(".timeline__stepper .timeline__step").width();
	const activeTimeLineStepCount = $(".timeline__stepper .timeline__step.is-active").length;
	const timelineMarker = $(".timeline__step-active-marker");

	timelineMarker?.css("--slide-width", `${widthTimeLineStep * activeTimeLineStepCount}px`);
}

$(document).ready(function () {
	initTimeLine();
});