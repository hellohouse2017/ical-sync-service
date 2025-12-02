// api/ical.js
const { ICalCalendar } = require('ical-generator');
const fs = require('fs');
const path = require('path');

// DB_PATH 已修正為 /tmp
const DB_PATH = path.join('/tmp', 'availability-db.json'); 

// 讀取資料庫
const readDb = () => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        // 檔案不存在或讀取失敗
        return {}; 
    }
};

module.exports = async (req, res) => {
    // 取得 unitId (房源 ID)
    const unitId = req.query.unitId;

    if (!unitId) {
        return res.status(400).send("Missing unitId. Usage: /api/ical?unitId=house1");
    }

    const db = readDb();
    const unitData = db[unitId];

    // 建立 iCal 檔案
    const calendar = new ICalCalendar({ 
        name: `Availability Sync for ${unitId}`,
        ttl: 60 * 5 // 設定 TTL 為 5 分鐘
    });

    if (unitData && unitData.busyDates.length > 0) {
        unitData.busyDates.forEach(dateStr => {
            const start = new Date(dateStr + 'T00:00:00'); 
            const end = new Date(start);
            end.setDate(start.getDate() + 1); 

            calendar.createEvent({
                start: start,
                end: end,
                summary: `BUSY - Reserved by other platforms (${unitId})`,
                allDay: true
            });
        });
    }

    // 設定回傳標頭並輸出 iCal 內容
    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.status(200).send(calendar.toString());
};
