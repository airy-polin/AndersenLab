export default function debounce(fn, ms) {
	let timerId;

	return function() {
		const fnCall = () => { fn.apply(this, arguments) }
		clearTimeout(timerId);
		timerId = setTimeout(fnCall, ms)
	};
}