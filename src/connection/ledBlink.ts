let Gpio = require("onoff").Gpio;
// import * from 'onoff'

let gpioAndDevice = {
  "1": 17,
  "2": 18,
  "3": 27,
  "4": 22,
  "5": 23,
  "6": 24,
  "7": 5,
  "8": 6,
};

let arr = [17, 18, 27, 22, 23, 24, 5, 6];

const blinkLed = (ledNo: number) => {
  //   let LED = new Gpio(arr[ledNo], "out");

  console.log(arr[ledNo]);

  //   LED.writeSync(1);

  //   setTimeout(() => {
  //     LED.writeSync(0);
  //   }, 250);
};

export default blinkLed;
