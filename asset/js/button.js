const rstbtEle = document.querySelector('.restart-button')
const elStyle = rstbtEle.style

rstbtEle.onmousemove = function(e) {

	const boundingClientRect = rstbtEle.getBoundingClientRect()

	const x = e.clientX - boundingClientRect.left
	const y = e.clientY - boundingClientRect.top
	const xc = boundingClientRect.width/2
	const yc = boundingClientRect.height/2
	
	const dx = x - xc
	const dy = y - yc

	elStyle.setProperty('--bt_rx', `${ dy/-5 }deg`)
	elStyle.setProperty('--bt_ry', `${ dx/10 }deg`)
}

rstbtEle.onmouseleave = function(e) {
	elStyle.setProperty('--bt_ty', '0')
	elStyle.setProperty('--bt_rx', '0')
	elStyle.setProperty('--bt_ry', '0')
	
}

rstbtEle.onmousedown = function(e) {
	elStyle.setProperty('--bt_tz', '-5rem')
	
}

rstbtEle.onmouseup = function(e) {
	
	elStyle.setProperty('--bt_tz', '-12px')
	
}

