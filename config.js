// config.js

// 將您的房源 ID 命名為 'unit1'，如果有多個房源請自行增加 'unit2', 'unit3'
const config = {
    // 儲存所有 iCal 匯出連結
    icalUrls: {
        'unit1': {
            // 從 Agoda 匯出 (輸入) - 請替換為您的連結
            agoda: "YOUR_AGODA_EXPORT_ICAL_LINK", 
            // 從 Airbnb 匯出 (輸入) - 請替換為您的連結
            airbnb: "YOUR_AIRBNB_EXPORT_ICAL_LINK", 
            // 從 Google 行事曆匯出 (輸入) - 請替換為您的連結
            google: "YOUR_GOOGLE_CALENDAR_PRIVATE_ICAL_LINK", 
            // 從 Trip.com 匯出 (輸入) - 請替換為您的連結
            tripcom: "YOUR_TRIPCOM_EXPORT_ICAL_LINK" 
        }
    },
    // Vercel 託管這個 iCal 輸出連結的 URL 基礎路徑
    // Vercel 部署後，您必須回來將 'YOUR_VERCEL_APP_URL' 替換為實際的網址
    baseUrl: 'https://YOUR_VERCEL_APP_URL.vercel.app/api/ical'
};

module.exports = config;
