try{
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
    var recognition = new SpeechRecognition();
}catch(e){
    console.error(e);
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
        var accessToken ="57b17c520a314701a3f2815d160473ee";
        var baseUrl = "https://api.dialogflow.com/v1/";
        var text = $('#note-textarea').val();
        $.ajax({
          type: 'POST',
          url: baseUrl + "query?v=20180716",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          headers: {
              "Authorization": "Bearer " + accessToken
          },
          data: JSON.stringify({ query: text, lang: "pt-br", sessionId: "somerandomthing" }),
          success: function(data) {
              console.log(data.result.fulfillment.speech);
              console.log(data.result.action);
              try{
                var synth = window.speechSynthesis;
                if (speechSynthesis.onvoiceschanged !== undefined) {
                  speechSynthesis.onvoiceschanged = synth.getVoices()[15];
                }
                if (synth.speaking) {
                    console.error('speechSynthesis.speaking');
                    return;
                }
                if (inputTxt.val() !== '') {
                  var utterThis = new SpeechSynthesisUtterance(data.result.fulfillment.speech);
                  utterThis.pitch = 1.4;
                  utterThis.rate = 1.2;
                  synth.speak(utterThis);
                  utterThis.onend = function(event) {
                    console.log('terminou');
                  }
                  utterThis.onerror = function(event) {
                    console.log('deu erro aqui');
                  }
                  utterThis.onmark = function(event) {
                    console.log('mark tag');
                  }
                  utterThis.onpause = function(event) {
                    console.log('uma pausa foi feita');
                  }
                }
              }catch(e){
                console.log(e);
              }
          },
          error: function () {
              alert('Not working yet');
              // alert("error: [" + textStatus + "] --> " + responseData);
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