/*

Blank pubnub sketch
 */


// server variables for apps to communicate they must use THE SAME KEYS
//get these keys from your PubNub account
//within your group, you will use 1 of your accounts for the project

let dataServer;
let pubKey = 'pub-c-875b0bf2-1a86-46fd-a1c9-c8911b272614';
let subKey = 'sub-c-9c542192-10af-11ea-b660-563e374d08f6';

//name used to sort your messages. used like a radio station. can be called anything
let channelName = "station1";
let tIMG1,tIMG2,tIMG3;
let imgnumber;

function preload(){
    tIMG1 = loadImage('tainimages/1.jpg');
    tIMG2 = loadImage('tainimages/2.jpg');
    tIMG3 = loadImage('tainimages/3.jpg');

}



function setup() 
{
  
  createCanvas(windowWidth,windowHeight);
  background(255);
  
  

   // initialize pubnub
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });
  
  //attach callbacks to the pubnub object to handle messages and connections
  dataServer.addListener({ message: readIncoming});
  dataServer.subscribe({channels: [channelName]});


}

function draw() 
{
if(imgnumber==1)
{
  image(tIMG1, 0, 0); 
}else if(imgnumber==2)
{
  image(tIMG2, 0, 0); 
}else if(imgnumber==3)
{
  image(tIMG3, 0, 0); 
}

}


///uses built in mouseClicked function to send the data to the pubnub server
function mouseClicked() {
 
let num1 = floor(random(1,4));
  // Send Data to the server to draw it in all other canvases
  dataServer.publish(
    {
      channel: channelName,
      message: 
      {
        trainimg: num1       //get the value from the text box and send it as part of the message   
      }
    });

}

function readIncoming(inMessage) //when new data comes in it triggers this function, 
{                               // this works becsuse we subscribed to the channel in setup()
  
  // simple error check to match the incoming to the channelName
  if(inMessage.channel == channelName)
  {

   imgnumber = inMessage.message.trainimg;
    console.log(imgnumber);
  }
}
