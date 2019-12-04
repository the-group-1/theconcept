/*
Randomizes the position/size of incoming text, but only updates on new messages.
 */


// server variables for apps to communicate they must use THE SAME KEYS
//get these keys from your PubNub account
//within your group, you will use 1 of your accounts for the project

//code derived from Atelier I - DIGF2014-002 OCADU[FALL2019]
//provided by Professor Nick Puckett
//edited to current augmentation by undergrad 3174195 - Joshua Linton [20191129]


let dataServer;
let pubKey = 'pub-c-c802c29e-defa-4e5f-b668-6a8b9af8cff1';
let subKey = 'sub-c-bb1d275c-1237-11ea-a365-4a09dafe54f0';



//name used to sort your messages. used like a radio station. can be called anything
let channelName = "stationTalk";

let incomingText = ""; //variable that will hold the incoming message text
let randPosX = 0;
let randPosY = 0;
let randSize = 0;

function setup() 
{
  
  createCanvas(640, 550);
  //
  //
  //I decided that this was the best current route as I both couldn't get the mesaages onto the background image, though it would have been difficult to see at times. Though the random factor of inefficient messaging can express the spatial physics of cavernous public spaces of utlity.
  //
  //
  background(255);
  
  

   // initialize pubnub
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });
  
  //attach callbacks to the pubnub object to handle messages and connections
  dataServer.addListener({ message: readIncoming });
  dataServer.subscribe({channels: [channelName]});

  //create the text fields for the message to be sent
  sendText = createInput();
  sendText.position(400,height-10);

  sendButton = createButton('Public Talk');
  sendButton.position(sendText.x + sendText.width,height-10);
  sendButton.mousePressed(sendTheMessage);

}

function draw() 
{
    
    noStroke();
    
    textSize(randSize)
    text(incomingText,randPosX, randPosY);

}


///uses built in mouseClicked function to send the data to the pubnub server
function sendTheMessage() {
 

  // Send Data to the server to draw it in all other canvases
  dataServer.publish(
    {
      channel: channelName,
      message: 
      {
        messageText: sendText.value()       //get the value from the text box and send it as part of the message   
      }
    });

}

function readIncoming(inMessage) //when new data comes in it triggers this function, 
{                               // this works becsuse we subscribed to the channel in setup()
  
  // simple error check to match the incoming to the channelName
  if(inMessage.channel == channelName)
  {
  incomingText = inMessage.message.messageText;
  randPosX = random(5,width-100);
  randPosY = random(5,height-20);
  randSize = random(10,100);
  }
}
//code derived from Atelier I - DIGF2014-002 OCADU[FALL2019]
//provided by Professor Nick Puckett
//edited to current augmentation by undergrad 3174195 - Joshua Linton [20191129]