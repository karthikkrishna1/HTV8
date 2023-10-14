import axios from 'axios';

let input_array = [
  'this game sucks, you suck',
  'stop being a dumbass',
  'Let\'s do this once and for all',
  'This is coming along nicely'
];

let output_array = [];

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
    inputs: input_array,
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
    for (let i = 0; i < response.data.classifications.length; i++) {
      if (response.data.classifications[i].confidence < 0.90 || response.data.classifications[i].prediction === "Benign") { // if input is good enough
        output_array[output_array.length] = response.data.classifications[i].input
      }
    }

    for (let i = 0; i < output_array.length; i++) {
      console.log(output_array[i]);
    }
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