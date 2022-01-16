const floatEle = document.querySelector('.float')

floatEle.onmousemove = function(e) {

	const elTarget = e.target
	const elStyle = elTarget.style
	const boundingClientRect = elTarget.getBoundingClientRect()

	const x = e.clientX - boundingClientRect.left
	const y = e.clientY - boundingClientRect.top
	const xc = boundingClientRect.width/2
	const yc = boundingClientRect.height/2
	
	const dx = x - xc
	const dy = y - yc

	elStyle.setProperty('--rx', `${ dy/-5 }deg`)
	elStyle.setProperty('--ry', `${ dx/10 }deg`)
}

floatEle.onmouseleave = function(e) {
	elStyle = e.target.style
	elStyle.setProperty('--ty', '0')
	elStyle.setProperty('--rx', '0')
	elStyle.setProperty('--ry', '0')
	
}

floatEle.onmousedown = function(e) {
	e.target.style.setProperty('--tz', '-5rem')
	
}

floatEle.onmouseup = function(e) {
	
	e.target.style.setProperty('--tz', '-12px')
	
}

