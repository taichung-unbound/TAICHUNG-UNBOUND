# 台中無界｜Technical Stack

## 01｜Prototype 目標

第一階段先完成可操作 Prototype：

- 網頁直接開啟
- 3D 場景
- 玩家角色
- 第三人稱移動
- 相機控制
- 基本台中街景
- 一台可駕駛機車／汽車
- 登入畫面
- 年代選擇
- 地圖選擇
- 基本任務
- 基本存檔

---

## 02｜Frontend

主要技術：

- React
- Vite
- Three.js
- React Three Fiber
- Drei

用途：

- 網頁 UI
- 3D 世界
- 人物
- 場景
- 車輛
- 相機
- 互動

---

## 03｜3D

第一階段採：

- Three.js
- React Three Fiber

3D 資源格式：

- GLB
- GLTF

後續可使用：

- Blender
- AI 3D 工具
- 自製模型
- 合法授權素材

---

## 04｜Backend

後端規劃：

- Node.js
- Express

用途：

- 玩家帳號
- API
- 任務
- 金錢
- 房屋
- 車輛
- 寵物
- 存檔
- 多人系統

---

## 05｜Database

規劃使用：

- PostgreSQL

第一階段可使用：

- Neon PostgreSQL

資料包含：

- Users
- Characters
- Inventory
- Vehicles
- Properties
- Pets
- Missions
- Progress

---

## 06｜Authentication

第一階段規劃：

- Google Login
- Email Verification

帳號資料與遊戲角色分開。

---

## 07｜Multiplayer

多人即時系統規劃：

- WebSocket

後續可評估：

- Socket.IO

用途：

- 玩家位置
- 組隊
- 任務同步
- 即時事件

---

## 08｜Hosting

規劃：

### Frontend

可使用：

- Vercel
- Render Static Site

### Backend

可使用：

- Render Web Service

### Database

- Neon PostgreSQL

工作專案與《台中無界》完全分開。

---

## 09｜Map System

不一次載入整個台中。

採：

- Chunk Streaming
- LOD
- Dynamic Loading
- Asset Streaming

重要地區使用高細節模型。

---

## 10｜Responsive

支援：

- Desktop
- Laptop
- Tablet
- Mobile

Desktop 為主要遊戲體驗。

手機版 UI 重新排版，不直接縮小桌面介面。

---

## 11｜Graphics

目標：

**High-quality Realistic 3D**

包含：

- PBR Materials
- Dynamic Lighting
- Shadows
- Reflections
- Weather
- Day / Night Cycle

需同時兼顧網頁效能。

---

## 12｜Version Plan

### Concept V0.1
完成

### Prototype V0.1
下一階段

目標：

**角色可以真正站在台中的 3D 場景裡移動。**

---

## 13｜核心原則

先完成小而能玩的 Prototype。

再逐步擴充：

角色
→ 場景
→ 車輛
→ 任務
→ 帳號
→ 存檔
→ 多人
→ 整個台中
