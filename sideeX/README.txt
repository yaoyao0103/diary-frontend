diary-script.zip裡面包含兩個內容:
config: 環境設定
suite: 三個suite: diary folder user，每個suite裡面包含相關之case腳本。

運行方式:
在localhost開啟前端React app，並確定連上後端(目前是串接後端的Heroku App)
1. 安裝並開啟selenium server
2. 下載SideeX Webserver，設定好serviceconfig，透過cmd 輸入指令 sideex-webservice --config {serviceconfig的目錄} 打開webserver。
3. 將三個腳本匯入至sideeX
4. 即可透過撥放按鈕來進行腳本play。