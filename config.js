// config.js

const config = {
    // 儲存所有 iCal 匯出連結 (輸入)
    icalUrls: {
        // 第一棟民宿：6 房的實體資源
        'house1': { 
            agoda_4room: "https://ycs.agoda.com/en-us/api/ari/icalendar?key=3McT6Ss1RjzR5fkUUOQVIEHw1wX4NSv6", 
            agoda_5room: "https://ycs.agoda.com/en-us/api/ari/icalendar?key=hznjnpeIAaCVSkNpzLYm9VeXal%2bEi2WB",
            agoda_6room: "https://ycs.agoda.com/en-us/api/ari/icalendar?key=nJDQZCzvNB7jG8ycB1tgRFYT5nskn8kJ",
            
            // ❗請替換為您的實際連結❗
            airbnb: "YOUR_AIRBNB_EXPORT_ICAL_LINK", 
            google: "https://calendar.google.com/calendar/ical/a77a451f0a645261b0202f6faf810082df31f92d20fe20c19cbb10945d9714f4%40group.calendar.google.com/public/basic.ics", 
            // ❗請替換為您的實際連結❗
            tripcom: "YOUR_TRIPCOM_EXPORT_ICAL_LINK" 
        },
        
        // 第二棟民宿 (house2) - ❗請替換為您的實際連結❗
        'house2': {
            agoda_main: "YOUR_AGODA_HOUSE2_ICAL_LINK",
            airbnb: "YOUR_AIRBNB_HOUSE2_ICAL_LINK",
            google: "YOUR_GOOGLE_HOUSE2_ICAL_LINK"
        }
    },
    
    // Vercel 託管這個 iCal 輸出連結的 URL 基礎路徑
    baseUrl: 'https://ical-sync-service.vercel.app/api/ical'
};

module.exports = config;
