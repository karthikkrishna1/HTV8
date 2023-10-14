import axios from 'axios';

const options = {
  method: 'POST',
  url: 'https://api.cohere.ai/v1/classify',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: 'Bearer xC36OoXLBZNXOSzHuAvGWNfVq7qUHvfO1k17Jnhy'
  },
  data: {
    truncate: 'END',
    model: 'large',
    inputs: [
      'this game sucks, you suck',
      'stop being a dumbass',
      'Let\'s do this once and for all',
      'This is coming along nicely'
    ],
    examples: [
      {text: 'you are hot trash', label: 'Toxic'},
      {text: 'go to hell', label: 'Toxic'},
      {text: 'get rekt moron', label: 'Toxic'},
      {text: 'get a brain and use it', label: 'Toxic'},
      {text: 'say what you mean, you jerk.', label: 'Toxic'},
      {text: 'Are you really this stupid', label: 'Toxic'},
      {text: 'I will honestly kill you', label: 'Toxic'},
      {text: 'yo how are you', label: 'Benign'},
      {text: 'I\'m curious, how did that happen', label: 'Benign'},
      {text: 'Try that again', label: 'Benign'},
      {text: 'Hello everyone, excited to be here', label: 'Benign'},
      {text: 'I think I saw it first', label: 'Benign'},
      {text: 'That is an interesting point', label: 'Benign'},
      {text: 'I love this', label: 'Benign'},
      {text: 'We should try that sometime', label: 'Benign'},
      {text: 'You should go for it', label: 'Benign'}
    ]
  }
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data.classifications[0].input);
    console.log(response.data.classifications[0].prediction);
    console.log(response.data.classifications[0].confidence);
  })
  .catch(function (error) {
    console.error(error);
  });

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
