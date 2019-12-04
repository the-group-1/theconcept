


let dataServer;
let pubKey = 'pub-c-875b0bf2-1a86-46fd-a1c9-c8911b272614';
let subKey = 'sub-c-9c542192-10af-11ea-b660-563e374d08f6';

let phoneNumber = "0";

let subtractionIndex;
let equalityVerfier;

let thisPhoneID;
let nextPhoneID, nextPhoneIDglobal;
let publishedPhoneID;
let x=0;

let channelName = "traintalk";
let sendText;
let sendButtton;

function setup() 
{

  createCanvas(windowWidth,windowHeight);
  dataServer = new PubNub(
    {
      publish_key   : pubKey, 
      subscribe_key : subKey,  
      ssl: true,  
      uuid: phoneNumber
    });
    
    dataServer.addListener({ message: readIncoming});
  
    dataServer.subscribe({channels: [channelName]});
  
 
   sendText = createInput();
   sendText.position(5,height-100);
 
   sendButton = createButton('connect');
   sendButton.position(sendText.x + sendText.width,height-100);
   sendButton.mousePressed(connect);
  
   

   nextPhoneIDglobal = parseInt(thisPhoneID)+1
}

function connect() {
dataServer.setUUID(sendText.value());





}

function readIncoming(inMessage){  

  

  publishedPhoneID = parseInt(inMessage.message.newPhoneID);
  
    
  }

function draw() 
{
 

  
    background(255,0,0);
    fill(255);
   
    thisPhoneID = sendText.value();

    nextPhoneID = parseInt(thisPhoneID)+1;

          subtractionIndex = parseInt(thisPhoneID - publishedPhoneID);
          equalityVerfier = parseInt(publishedPhoneID - subtractionIndex);

          if(thisPhoneID==1){

            ellipse(x,height/2,50,50);
            x=x+1;

            if(x==(windowWidth-20)){
              broadcastPhoneID(nextPhoneID);
               }
  


          }else if(thisPhoneID == equalityVerfier)
          {
            ellipse(x,height/2,50,50);
            x=x+1;

            if(x==(windowWidth-20)){
              broadcastPhoneID(nextPhoneID);
               }
  

          }
          
         

         

        
        

        

        

        
      

    text("my number is : " + thisPhoneID, 20, 60);

    text("published ID is: " + publishedPhoneID, 20, 80);

    text("my subtraction index is : " + subtractionIndex, 20, 100);

    text("my equality verifier : " + equalityVerfier, 20, 120);
}

function broadcastPhoneID(nextPhoneID)
{
  dataServer.publish(
    {
      channel: channelName,
      message: 
      {
        newPhoneID: nextPhoneID     
      }
    });


}









