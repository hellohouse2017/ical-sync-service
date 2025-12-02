// config.js (更新範例)
const config = {
    icalUrls: {
        // 第一棟民宿：6 房的實體資源
        'house1': { 
            // Agoda 衍生房源 1: 四房銷售頁面的 iCal
            agoda_4room: "https://ycs.agoda.com/en-us/api/ari/icalendar?key=3McT6Ss1RjzR5fkUUOQVIEHw1wX4NSv6", 
            // Agoda 衍生房源 2: 五房銷售頁面的 iCal
            agoda_5room: "https://ycs.agoda.com/en-us/api/ari/icalendar?key=hznjnpeIAaCVSkNpzLYm9VeXal%2bEi2WB",
            // Agoda 衍生房源 3: 六房銷售頁面的 iCal
            agoda_6room: "https://ycs.agoda.com/en-us/api/ari/icalendar?key=nJDQZCzvNB7jG8ycB1tgRFYT5nskn8kJ",
            
            // Airbnb 訂單 (假設 Airbnb 只有一個主要房源連結)
            airbnb: "YOUR_AIRBNB_EXPORT_ICAL_LINK", 
            
            // Google Calendar (您的自有訂單)
            google: "https://calendar.google.com/calendar/ical/a77a451f0a645261b0202f6faf810082df31f92d20fe20c19cbb10945d9714f4%40group.calendar.google.com/public/basic.ics", 
            
            // Trip.com 訂單
            tripcom: "YOUR_TRIPCOM_EXPORT_ICAL_LINK" 
        },
        // 第二棟民宿 (假設只有一個主要房源連結)
        'house2': {
            // Agoda 衍生房源 1: 四房銷售頁面的 iCal
            agoda_4room: "AGODA_4_ROOM_ICAL_LINK", 
            // Agoda 衍生房源 2: 五房銷售頁面的 iCal
            agoda_5room: "AGODA_5_ROOM_ICAL_LINK",
            // Agoda 衍生房源 3: 六房銷售頁面的 iCal
            agoda_6room: "AGODA_6_ROOM_ICAL_LINK",
            
            // Airbnb 訂單 (假設 Airbnb 只有一個主要房源連結)
            airbnb: "YOUR_AIRBNB_EXPORT_ICAL_LINK", 
            
            // Google Calendar (您的自有訂單)
            google: "YOUR_GOOGLE_CALENDAR_ICAL_LINK", 
            
            // Trip.com 訂單
            tripcom: "YOUR_TRIPCOM_EXPORT_ICAL_LINK" 
        }
    },
    // ...
};
