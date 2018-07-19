$.ajax({
    url: 'https://api.dialogflow.com/v1/query?v=20170712',
    type: 'POST',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        },
    dataType: 'json',
    data: JSON.stringify({
        'query': $('#note-textarea').val(),
        'lang': 'pt-br',
        'contexts': JSON.stringify([
            {
                'name': 'auth',
                'lifespan': 0,
                'parameters': {
                     'token': 'cc4f08cd-7b2c-7916-bdcc-87e2af6250e1'
                }
          }
        ])
    }),
    success: function(data) {
        console.log(data);
    },
    error: function(data) {
        console.log(data);
    }
});