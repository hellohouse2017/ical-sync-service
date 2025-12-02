// api/sync.js
const ical = require('node-ical');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const fetch = require('node-fetch'); // 確保使用 node-fetch

// DB_PATH 已修正為 Vercel 允許寫入的 /tmp 資料夾
const DB_PATH = path.join('/tmp', 'availability-db.json'); 

// --- 資料庫操作函式 (保持不變) ---

const readDb = () => {
    try {
        if (fs.existsSync(DB_PATH)) {
            const data = fs.readFileSync(DB_PATH, 'utf8');
            return JSON.parse(data);
        }
    } catch (e) {
        console.error("Error reading DB:", e);
    }
    return Object.keys(config.icalUrls).reduce((acc, unitId) => {
        acc[unitId] = { sources: {}, busyDates: [] };
        return acc;
    }, {});
};

const writeDb = (data) => {
    try {
        // 使用 wx 旗標，如果檔案存在，則寫入失敗 (這是 Vercel 的一個安全性機制，但 /tmp 通常可行)
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
        console.log("DB updated successfully.");
    } catch (e) {
        // 如果寫入失敗，可能是因為檔案不存在，嘗試重新創建
        if (e.code === 'EACCES') { 
            console.warn("DB access denied, trying to rewrite.");
            fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
        } else {
            console.error("Error writing DB:", e);
        }
    }
};

// --- iCal 同步核心函式 (保持不變) ---

async function getBusyDates(url) {
    if (!url || url.includes('YOUR_')) return []; 

    try {
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
                let current = new Date(event.start.getFullYear(), event.start.getMonth(), event.start.getDate());
                const end = new Date(event.end.getFullYear(), event.end.getMonth(), event.end.getDate());

                while (current < end) {
                    busyDates.push(current.toISOString().substring(0, 10));
                    current.setDate(current.getDate() + 1);
                }
            }
        }
        return [...new Set(busyDates)];
    } catch (e) {
        console.error(`Failed to fetch or parse iCal URL: ${url}`, e.message);
        return [];
    }
}

async function runSync() {
    const db = readDb();
    
    for (const unitId of Object.keys(config.icalUrls)) {
        const unitUrls = config.icalUrls[unitId];
        const unitData = db[unitId] || { sources: {}, busyDates: [] };
        db[unitId] = unitData;

        const allBusyDates = [];
        
        for (const source in unitUrls) {
            const url = unitUrls[source];
            const dates = await getBusyDates(url);
            
            unitData.sources[source] = dates;
            allBusyDates.push(...dates);
        }

        unitData.busyDates = [...new Set(allBusyDates)].sort();
    }
    
    writeDb(db);
    return { success: true, message: `Synced ${Object.keys(db).length} units.` };
}


// Vercel 導出的函式
module.exports = async (req, res) => {
    try {
        const result = await runSync();
        res.status(200).json(result); 
    } catch (error) {
        console.error("Critical Sync Error:", error);
        res.status(500).json({ success: false, message: 'Sync failed', error: error.message });
    }
};
