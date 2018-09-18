const deviceID = '6F254E3A05A92840'
module.exports = deviceID

// const KNoTCloud = require('knot-cloud');

// var exports = module.exports = {};
// const device = '3bc50eb362b31a3e';
// const sensor_id = 1;

// async function connect(callback){
//     const cloud = new KNoTCloud('192.168.0.103', 3000, 
//     'aea12477-5f34-4d9f-9f4c-d371bd8e0000', '472f00ec4005604a4f1a08f88bebeb18f77ad990');   

//     try{
//         await cloud.connect();
        
//         if(callback)
//             callback();

//     }
//     catch (err){
//         console.error(err);
//     }
//     finally{
//         // await cloud.close();
//     }
// }


// // async function main() {
// //     const cloud = new KNoTCloud('192.168.0.103', 3000, 
// //     'aea12477-5f34-4d9f-9f4c-d371bd8e0000', '472f00ec4005604a4f1a08f88bebeb18f77ad990');    

// //     try{
// //         await cloud.connect();
        
// //         var schemaRoom = await cloud.getDevices();
// //         listAllRoomsName(schemaRoom);
// //         console.log(schemaRoom);
// //         // while(true){
// //         // }

// //         var deviceData = await cloud.getData(device);
// //         console.log("3");
// //         await cloud.subscribe(device);

// //         cloud.on(openDoor);

// //     }
// //     catch (err){
// //         console.error(err);
// //     }
// //     finally{
// //         // await cloud.close();
// //     }
// // }

// exports.setCountDogEat = function (thingId) {
//     this.connect(() => {
//         var deviceData = await cloud.getData(device);

//         for(var dd in deviceData) {
//             var data = deviceData[dd];
//             if(data.sensor_id == sendorId){
//                 console.log(data.value);
//             }
//         }
//     });    
// }

// function setCountDogEat(cloud, sendorId) {
//     var deviceData = await cloud.getData(device);

//     for(var dd in deviceData) {
//         var data = deviceData[dd];

//         if(data.sensor_id == 2){
//             console.log(data.value);
//         }
//     }
// }

// // function listAllRoomsName(schemaRoom){
// //     var roomNames = [];

// //     for(var sr in schemaRoom) {
// //         room = schemaRoom[sr];
// //         if(!roomNames.includes(room.name)){
// //             console.log(room.name);
// //             roomNames.push(room.name);
// //         }
// //      }
// // }

// // function openDoor(deviceData){
// //     for(var dd in deviceData) {
// //         var data = deviceData[dd];

// //         if(data.sensor_id == 2 && data.value <= 100){
// //             console.log(data);
//             // await cloud.setData('3bc50eb362b31a3e', 1, true); 
//             //se usar await, tem que usar async na assinatura da funcao
//         // }

//         // for(var d in dataArray){
//         //     var data = dataArray[d];
//         //     // console.log(data.sensor_id);
//         //     if(data.sensor_id == 2){
//         //         console.log(data);
//         //         // await cloud.setData('7e133545550e496a', 1, true); se usar await, tem que usar async na assinatura da funcao
//         //     }
//         // }           
// //     }
// // }