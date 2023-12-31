import { client } from "../app"


const serverToDev = "detpos/local_server/whreq";
const devToServer = "detpos/device/whreq";

export const connectingFunction = async() => {

  return new Promise((resolve) => {
  let num = 1;
  let conditon = false
  //looping for the whole request

  const interval =  setInterval(() => {
    client.publish(serverToDev, num.toString());
    num++;
    if (num == 9) {
      num = 1;
    }
    console.log(num);
  }, 100);

  // Handle incoming messages
  client.on("message", (topic, message) => {
    if (topic == devToServer) {
      conditon = true
      resolve(conditon);
    }
  });

   setTimeout(() => {
    clearInterval(interval);
    if (!conditon) {
      resolve(conditon); false;
    }
  } , 10000)


})

};