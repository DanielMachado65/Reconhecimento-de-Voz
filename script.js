try{
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
    var recognition = new SpeechRecognition();
}catch(e){
    console.error(e);
      $('.no-browser-support').show();
      $('.app').hide();
}
var button_click = $("#button-click");
// HACK: essa é a classe/função que trata o audio. 
$('#button-click').on("click", function Speech() {
    recognition.interimResults = false;
    button_click.disabled = true;
    recognition.start();
    console.log('audio começou a ser gravado');
    recognition.onresult = function(event) {
        var speechResult = event.results[0][0].transcript;
        $('#note-textarea').val(speechResult);
        //TODO: restante do código para tratamento entra aqui
        console.log('Confidence: ' + event.results[0][0].confidence);
        $.ajax({
        url: 'https://api.wit.ai/message',
        data: {
        'q':  $('#note-textarea').val(),
        'access_token' : 'KVK4NH345RMGO4FW7U7U3PBYWPTOY2XS'
        },
        dataType: 'jsonp',
        method: 'GET',
            success: function(response) {
               try{
                  console.log(response);
                  var synth = window.speechSynthesis;
                  var inputTxt = $('#note-textarea');
                  if (speechSynthesis.onvoiceschanged !== undefined) {
                    speechSynthesis.onvoiceschanged = synth.getVoices()[15];
                  }
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
                }catch(e){
                  console.log(e);
                }
            }
        });
       
    }
    recognition.onspeechend = function() {
        recognition.stop();
        $("#button-click").prop('checked', false);
        button_click.disabled = false;
    }
    recognition.onerror = function(event) {
        button_click.disabled = false;
        $("#button-click").prop('checked', false);
        console.log(event.error);
    }
    /* Tratamento de erro */
    recognition.onaudioend = function(event) {
        $("#button-click").prop('checked', false);
        recognition.stop();
    }
    
    recognition.onend = function(event) {
        $("#button-click").prop('checked', false);
        recognition.stop();
    }
    
    recognition.onsoundend = function(event) {
        $("#button-click").prop('checked', false);
        recognition.stop();
    }
});