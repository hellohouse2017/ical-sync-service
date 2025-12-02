// api/sync.js
const ical = require('node-ical');
const fs = require('fs');
const path = require('path');
const config = require('../config');

// 修改 DB_PATH，指向 /tmp 臨時資料夾
const DB_PATH = path.join('/tmp', 'availability-db.json'); 
// ... (其他程式碼保持不變)
// --- 資料庫操作函式 ---

// 讀取/初始化資料庫
const readDb = () => {
    try {
        if (fs.existsSync(DB_PATH)) {
            const data = fs.readFileSync(DB_PATH, 'utf8');
            return JSON.parse(data);
        }
    } catch (e) {
        console.error("Error reading DB:", e);
    }
    // 如果檔案不存在或讀取失敗，返回空結構
    return Object.keys(config.icalUrls).reduce((acc, unitId) => {
        acc[unitId] = { sources: {}, busyDates: [] };
        return acc;
    }, {});
};

// 寫入資料庫
const writeDb = (data) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
        console.log("DB updated successfully.");
    } catch (e) {
        console.error("Error writing DB:", e);
    }
};

// --- iCal 同步核心函式 ---

// 解析 iCal 並提取忙碌日期
async function getBusyDates(url) {
    if (!url || url.includes('YOUR_')) return []; // 跳過未設定的連結

    try {
        // 使用 node-fetch 處理 HTTPS 請求
        const fetch = require('node-fetch');
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const icalText = await response.text();
        const data = await ical.parseICS(icalText);
        
        const busyDates = [];
        
        for (const i in data) {
            const event = data[i];
            if (event.type === 'VEVENT' && event.start && event.end) {
                // 處理全天事件 (iCal 可能不會帶時區，但我們確保以天為單位)
                let current = new Date(event.start.getFullYear(), event.start.getMonth(), event.start.getDate());
                const end = new Date(event.end.getFullYear(), event.end.getMonth(), event.end.getDate());

                // 迴圈遍歷所有忙碌的日期
                while (current < end) {
                    busyDates.push(current.toISOString().substring(0, 10));
                    current.setDate(current.getDate() + 1);
                }
            }
        }
        // 確保日期是唯一的
        return [...new Set(busyDates)];

    } catch (e) {
        console.error(`Failed to fetch or parse iCal URL: ${url}`, e.message);
        return [];
    }
}

// 主同步函式
async function runSync() {
    const db = readDb();
    
    for (const unitId of Object.keys(config.icalUrls)) {
        const unitUrls = config.icalUrls[unitId];
        // 確保 unitData 存在
        const unitData = db[unitId] || { sources: {}, busyDates: [] };
        db[unitId] = unitData;

        const allBusyDates = [];
        
        // 遍歷所有來源連結
        for (const source in unitUrls) {
            const url = unitUrls[source];
            const dates = await getBusyDates(url);
            
            unitData.sources[source] = dates;
            allBusyDates.push(...dates);
        }

        // 合併所有忙碌日期 (去重和排序)
        unitData.busyDates = [...new Set(allBusyDates)].sort();
    }
    
    // 將最終結果寫入資料庫
    writeDb(db);
    return { success: true, message: `Synced ${Object.keys(db).length} units.` };
}


// Vercel 導出的函式
module.exports = async (req, res) => {
    try {
        const result = await runSync();
        // Vercel Cron Job 函式不需要長久執行，直接返回
        res.status(200).json(result); 
    } catch (error) {
        console.error("Critical Sync Error:", error);
        res.status(500).json({ success: false, message: 'Sync failed', error: error.message });
    }
};
