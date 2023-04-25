function showAnimation(setShow) {
	const timeout = setTimeout(() => {
		setShow(true);
	}, 500);
	return () => {
		clearTimeout(timeout);
	};
}

export default showAnimation;