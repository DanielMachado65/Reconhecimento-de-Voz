try{
	var synth = window.speechSynthesis;
	var inputTxt = $('#note-textarea');
	if (speechSynthesis.onvoiceschanged !== undefined) {
	  speechSynthesis.onvoiceschanged = synth.getVoices()[15];
	}
	function speak(){
	    if (synth.speaking) {
	        console.error('speechSynthesis.speaking');
	        return;
	    }
	    if (inputTxt.val() !== '') {
		    var utterThis = new SpeechSynthesisUtterance(inputTxt.val());
		    utterThis.pitch = 1;
		    utterThis.rate = 1.2;
		    synth.speak(utterThis);
	  	}
	}
}catch(e){
	console.log(e);
}