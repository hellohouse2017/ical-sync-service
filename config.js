// config.js

// 將您的房源 ID 命名為 'house1' 和 'house2'
const config = {
    // 儲存所有 iCal 匯出連結 (輸入)
    icalUrls: {
        // 第一棟民宿：6 房的實體資源
        'house1': { 
            // Agoda 衍生房源 1: 四房銷售頁面的 iCal
            agoda_4room: "https://ycs.agoda.com/en-us/api/ari/icalendar?key=3McT6Ss1RjzR5fkUUOQVIEHw1wX4NSv6", 
            // Agoda 衍生房源 2: 五房銷售頁面的 iCal
            agoda_5room: "https://ycs.agoda.com/en-us/api/ari/icalendar?key=hznjnpeIAaCVSkNpzLYm9VeXal%2bEi2WB",
            // Agoda 衍生房源 3: 六房銷售頁面的 iCal
            agoda_6room: "https://ycs.agoda.com/en-us/api/ari/icalendar?key=nJDQZCzvNB7jG8ycB1tgRFYT5nskn8kJ",
            
            // Airbnb 訂單 (❗請務必替換為您的實際連結❗)
            airbnb: "YOUR_AIRBNB_EXPORT_ICAL_LINK", 
            
            // Google Calendar (您的自有訂單)
            google: "https://calendar.google.com/calendar/ical/a77a451f0a645261b0202f6faf810082df31f92d20fe20c19cbb10945d9714f4%40group.calendar.google.com/public/basic.ics", 
            
            // Trip.com 訂單 (❗請務必替換為您的實際連結❗)
            tripcom: "YOUR_TRIPCOM_EXPORT_ICAL_LINK" 
        },
        
        // 第二棟民宿：請依此結構填入您的 iCal 連結 (❗請務必替換為您的實際連結❗)
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
