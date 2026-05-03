import FCS6350SImage from '../../assets/images/projects/fcs-6350-s.png';
import SC100Image from '../../assets/images/projects/sc-100.png';
import SPA1050Image from '../../assets/images/projects/spa-1050.png';
import VDM4051Image from '../../assets/images/projects/vdm-4051.png';
import HDR731Image from '../../assets/images/projects/hdr-731.png';
import CityPassImage from '../../assets/images/projects/citypass.png';
import CityPassMemberImage from '../../assets/images/projects/citypass-member.png';
import CityPassVendorImage from '../../assets/images/projects/citypass-vendor.png';

interface Project {
  id: number;
  title: string;
  category: string;
  company: "高盛大" | "卡訊電子";
  imageUrl: string;
  skills: string[];
  content: {
    summary: string;
    highlights: string[];
  }
}

const projects: Project[] = [
  { 
    id: 1, 
    title: "數位會議系統主機", 
    category: "會議系統", 
    company: "卡訊電子",
    imageUrl: FCS6350SImage,
    skills: ["Vue3", "Vite", "Pinia", "Fabric.js"],
    content: {
      summary: "參與需求規劃與流程管理，主導 Vue3 前端架構設計。",
      highlights: [
        "利用 Fabric.js 實作視覺化佈局介面，簡化大規模麥克風單體管理。",
        "結合 Pinia 處理大量設備狀態同步，提供即時操作回饋。",
        "將複雜硬體配置轉化為直覺圖形化地圖，提升操作精確度。"
      ]
    }
  },
  { 
    id: 2, 
    title: "智慧影音物聯網控制器", 
    category: "環境控制系統", 
    company: "卡訊電子",
    imageUrl: SC100Image,
    skills: ["Vue3", "Vite", "Vuex","Fabric.js"],
    content: {
      summary: "主導前端架構設計與開發時程管理。",
      highlights: [
        "針對「情境管理」與「環控模組」封裝高度解耦的公用組件庫。",
        "使用 Fabric.js 結合 Vuex 實作 Canvas 編輯器，處理大量物件狀態同步。",
        "實現功能邏輯與 UI 分離，確保複雜環控情境下的操作流暢度。"
      ]
    }
  },
  { 
    id: 3, 
    title: "串流廣播主機", 
    category: "廣播系統", 
    company: "卡訊電子",
    imageUrl: SPA1050Image,
    skills: ["Vue2", "Vue Cli", "Vuex", "Electron", "Fabric.js", "Web Audio API"],
    content: {
      summary: "負責系統前端開發，聚焦音訊與視覺的即時同步。",
      highlights: [
        "運用 Web Audio API 處理高頻寬音訊串流，確保低延遲播音與監聽。",
        "整合 Fabric.js 開發自定義即時看板編輯器。",
        "採用 Electron 進行封裝，實作穩定的 HDMI 多媒體畫面輸出方案。"
      ]
    }
  },
  { 
    id: 4, 
    title: "網路分佈式多媒體發布系統", 
    category: "電視牆控制系統", 
    company: "卡訊電子",
    imageUrl: VDM4051Image,
    skills: ["Vue2", "Vue Cli", "Vuex", "Draggable"],
    content: {
      summary: "主導電視牆控制系統開發與操作流程優化。",
      highlights:[
        "透過 Vue.Draggable 實作拖拉式版面配置（來源裁切與視窗排列）。",
        "使用 Vuex 管理複雜的多層級影音來源切換邏輯。",
        "提升多媒體發布的靈活性，降低非技術人員的管理難度。"
      ]
    }
  },
  { 
    id: 5, 
    title: "串流媒體處理器", 
    category: "直錄播系統", 
    company: "卡訊電子",
    imageUrl: HDR731Image,
    skills: ["Vue2", "Vue Cli", "Vuex", "Fabric.js"],
    content: {
      summary: "優化 PGM 畫面佈局編輯體驗與後續維護。",
      highlights: [
        "利用 Fabric.js 建構視覺化介面，實作畫面遮罩與物件配置。",
        "將前端操作精確轉換為控制指令，與後端編碼器深度對接。",
        "重新設計操作流程，顯著提升影音處理任務的控制精準度。"
      ]
    }
  },
  { 
    id: 6, 
    title: "CityPass 都會通", 
    category: "電商平台", 
    company: "高盛大",
    imageUrl: CityPassImage,
    skills: ["Vue2", "Nuxt", "MapBox", "Gulp", "PHP", "Laravel"],
    content: {
      summary: "負責大型電商平台前端開發與性能優化。",
      highlights: [
        "採用 Nuxt.js (SSR) 提升首頁載入速度與搜尋引擎排名 (SEO)。",
        "整合 MapBox API 提供地圖導覽，並優化異步資料加載邏輯。",
        "在處理大量產品圖資的同時，維持流暢的使用者操作體驗。"
      ]
    }
  },
  { 
    id: 7, 
    title: "CityPass 管理後台", 
    category: "管理後台", 
    company: "高盛大",
    imageUrl: CityPassMemberImage,
    skills: ["jQuery", "PHP", "CodeIgniter", "Blade"],
    content: {
      summary: "維護平台內部系統並開發新功能。",
      highlights: [
        "在 CodeIgniter 架構中導入 Blade 模板引擎，優化 View 層開發。",
        "參與後端權限控管與統計邏輯開發，實現即時銷售狀況監控。",
        "運用 jQuery 實作異步表單驗證，確保管理商品與會員時的數據穩定性。"
      ]
    }
  },
  { 
    id: 8, 
    title: "CityPass 供應商管理平台", 
    category: "管理後台", 
    company: "高盛大",
    imageUrl: CityPassVendorImage,
    skills: ["Vue2", "PHP", "Laravel"],
    content: {
      summary: "主導平台開發，跨足前後端邏輯整合。",
      highlights: [
        "於 Laravel Views 層深度整合 Vue.js，並撰寫部分後端 API 業務邏輯。",
        "規畫引導式流程 (Onboarding) 與卡片式儀表板，簡化商家入駐門檻。",
        "實作商品管理、促銷活動設定與訂單監控功能，提升自助管理效率。"
      ]
    }
  },
];

export default projects