function splash_screen() {
	var splash = $('#splash');
	TweenMax.to(splash, 0.5, 
	{
		height: '200vh',
		width: '200vw',
		opacity: 1,
		transform: 'translate(-50vw, -50vh)',
		delay: 0.5,
		ease: Circ.easeIn,
		onComplete: second
	}
	);
};
function second() {
	var tedx = $('#ted_logo');
	var college = $('#college');
	TweenMax.to(tedx, 0.5, 
	{
		x: '0px'
	}
	);
	TweenMax.to(college, 1, 
	{
		transform: 'rotateX(0deg)',
		ease: Bounce.easeOut,
		delay: 0.6
	}
	);	
}